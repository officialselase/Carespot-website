"""
Django management command to revoke all tokens system-wide.
Usage: python manage.py revoke_all_tokens
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from authentication.models import RefreshToken

User = get_user_model()


class Command(BaseCommand):
    help = 'Revoke all tokens system-wide (emergency use)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force revocation without confirmation',
        )
        parser.add_argument(
            '--reason',
            type=str,
            help='Reason for mass token revocation (for logging)',
        )

    def handle(self, *args, **options):
        force = options['force']
        reason = options.get('reason', 'Manual revocation')
        
        # Count tokens to be revoked
        active_tokens = RefreshToken.objects.filter(is_revoked=False)
        token_count = active_tokens.count()
        
        # Count users with reset/verification tokens
        users_with_reset_tokens = User.objects.filter(
            password_reset_token__isnull=False
        ).count()
        
        users_with_verification_tokens = User.objects.filter(
            email_verification_token__isnull=False
        ).count()
        
        total_affected = token_count + users_with_reset_tokens + users_with_verification_tokens
        
        if total_affected == 0:
            self.stdout.write('No active tokens found to revoke')
            return
        
        self.stdout.write(
            self.style.WARNING(
                f'This will revoke:\n'
                f'- {token_count} active refresh tokens\n'
                f'- {users_with_reset_tokens} password reset tokens\n'
                f'- {users_with_verification_tokens} email verification tokens\n'
                f'Total affected: {total_affected}'
            )
        )
        
        if not force:
            confirm = input(
                'Are you sure you want to revoke ALL tokens system-wide? '
                'This will log out all users! (y/N): '
            )
            if confirm.lower() != 'y':
                self.stdout.write('Mass token revocation cancelled.')
                return
        
        # Revoke all active refresh tokens
        revoked_refresh_tokens = active_tokens.update(is_revoked=True)
        
        # Clear all password reset tokens
        cleared_reset_tokens = User.objects.filter(
            password_reset_token__isnull=False
        ).update(
            password_reset_token=None,
            password_reset_sent_at=None
        )
        
        # Clear all email verification tokens
        cleared_verification_tokens = User.objects.filter(
            email_verification_token__isnull=False
        ).update(
            email_verification_token=None,
            email_verification_sent_at=None
        )
        
        # Log the action (you might want to add this to your monitoring system)
        self.stdout.write(
            self.style.SUCCESS(
                f'Mass token revocation completed:\n'
                f'- Revoked {revoked_refresh_tokens} refresh tokens\n'
                f'- Cleared {cleared_reset_tokens} password reset tokens\n'
                f'- Cleared {cleared_verification_tokens} email verification tokens\n'
                f'Reason: {reason}'
            )
        )
        
        self.stdout.write(
            self.style.WARNING(
                'IMPORTANT: All users will need to log in again. '
                'Consider notifying users about this security action.'
            )
        )