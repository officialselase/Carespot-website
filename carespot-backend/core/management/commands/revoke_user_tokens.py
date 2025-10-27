"""
Django management command to revoke all tokens for a specific user.
Usage: python manage.py revoke_user_tokens --email user@example.com
"""

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from authentication.models import RefreshToken

User = get_user_model()


class Command(BaseCommand):
    help = 'Revoke all tokens for a specific user'

    def add_arguments(self, parser):
        parser.add_argument(
            '--email',
            type=str,
            required=True,
            help='Email of the user whose tokens should be revoked',
        )
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force revocation without confirmation',
        )

    def handle(self, *args, **options):
        email = options['email']
        force = options['force']
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise CommandError(f'User with email "{email}" does not exist')
        
        # Count tokens to be revoked
        active_tokens = RefreshToken.objects.filter(
            user=user,
            is_revoked=False
        )
        token_count = active_tokens.count()
        
        if token_count == 0:
            self.stdout.write(f'No active tokens found for user {email}')
            return
        
        if not force:
            confirm = input(
                f'Are you sure you want to revoke {token_count} active tokens '
                f'for user {email}? (y/N): '
            )
            if confirm.lower() != 'y':
                self.stdout.write('Token revocation cancelled.')
                return
        
        # Revoke all active refresh tokens
        revoked_count = active_tokens.update(is_revoked=True)
        
        # Clear password reset and email verification tokens
        user.password_reset_token = None
        user.password_reset_sent_at = None
        user.email_verification_token = None
        user.email_verification_sent_at = None
        user.save(update_fields=[
            'password_reset_token', 
            'password_reset_sent_at',
            'email_verification_token',
            'email_verification_sent_at'
        ])
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully revoked {revoked_count} tokens for user {email}'
            )
        )
        self.stdout.write(
            self.style.WARNING(
                'User will need to log in again to get new tokens'
            )
        )