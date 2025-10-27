"""
Django management command to clean up expired tokens and authentication data.
Usage: python manage.py cleanup_expired_tokens
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from authentication.models import CustomUser, LoginAttempt, RefreshToken


class Command(BaseCommand):
    help = 'Clean up expired tokens and authentication data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be deleted without actually deleting',
        )
        parser.add_argument(
            '--days',
            type=int,
            default=30,
            help='Delete login attempts older than this many days (default: 30)',
        )
        parser.add_argument(
            '--verbose',
            action='store_true',
            help='Show detailed output',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        days_old = options['days']
        verbose = options['verbose']
        
        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No data will be deleted'))
        
        # Clean up expired refresh tokens
        expired_refresh_tokens = RefreshToken.objects.filter(
            expires_at__lt=timezone.now()
        )
        expired_count = expired_refresh_tokens.count()
        
        if verbose or expired_count > 0:
            self.stdout.write(f'Found {expired_count} expired refresh tokens')
        
        if not dry_run and expired_count > 0:
            expired_refresh_tokens.delete()
            self.stdout.write(
                self.style.SUCCESS(f'Deleted {expired_count} expired refresh tokens')
            )
        
        # Clean up revoked refresh tokens older than 7 days
        old_revoked_tokens = RefreshToken.objects.filter(
            is_revoked=True,
            created_at__lt=timezone.now() - timedelta(days=7)
        )
        revoked_count = old_revoked_tokens.count()
        
        if verbose or revoked_count > 0:
            self.stdout.write(f'Found {revoked_count} old revoked refresh tokens')
        
        if not dry_run and revoked_count > 0:
            old_revoked_tokens.delete()
            self.stdout.write(
                self.style.SUCCESS(f'Deleted {revoked_count} old revoked refresh tokens')
            )
        
        # Clean up expired password reset tokens
        expired_password_resets = CustomUser.objects.filter(
            password_reset_token__isnull=False,
            password_reset_sent_at__lt=timezone.now() - timedelta(hours=1)
        )
        password_reset_count = expired_password_resets.count()
        
        if verbose or password_reset_count > 0:
            self.stdout.write(f'Found {password_reset_count} expired password reset tokens')
        
        if not dry_run and password_reset_count > 0:
            expired_password_resets.update(
                password_reset_token=None,
                password_reset_sent_at=None
            )
            self.stdout.write(
                self.style.SUCCESS(f'Cleared {password_reset_count} expired password reset tokens')
            )
        
        # Clean up expired email verification tokens
        expired_email_verifications = CustomUser.objects.filter(
            email_verification_token__isnull=False,
            email_verification_sent_at__lt=timezone.now() - timedelta(hours=24)
        )
        email_verification_count = expired_email_verifications.count()
        
        if verbose or email_verification_count > 0:
            self.stdout.write(f'Found {email_verification_count} expired email verification tokens')
        
        if not dry_run and email_verification_count > 0:
            expired_email_verifications.update(
                email_verification_token=None,
                email_verification_sent_at=None
            )
            self.stdout.write(
                self.style.SUCCESS(f'Cleared {email_verification_count} expired email verification tokens')
            )
        
        # Clean up old login attempts
        cutoff_date = timezone.now() - timedelta(days=days_old)
        old_login_attempts = LoginAttempt.objects.filter(
            timestamp__lt=cutoff_date
        )
        login_attempts_count = old_login_attempts.count()
        
        if verbose or login_attempts_count > 0:
            self.stdout.write(f'Found {login_attempts_count} login attempts older than {days_old} days')
        
        if not dry_run and login_attempts_count > 0:
            old_login_attempts.delete()
            self.stdout.write(
                self.style.SUCCESS(f'Deleted {login_attempts_count} old login attempts')
            )
        
        # Clean up expired account locks
        expired_locks = CustomUser.objects.filter(
            account_locked_until__lt=timezone.now()
        )
        expired_locks_count = expired_locks.count()
        
        if verbose or expired_locks_count > 0:
            self.stdout.write(f'Found {expired_locks_count} expired account locks')
        
        if not dry_run and expired_locks_count > 0:
            expired_locks.update(account_locked_until=None)
            self.stdout.write(
                self.style.SUCCESS(f'Cleared {expired_locks_count} expired account locks')
            )
        
        # Summary
        total_cleaned = (
            expired_count + revoked_count + password_reset_count + 
            email_verification_count + login_attempts_count + expired_locks_count
        )
        
        if total_cleaned > 0:
            self.stdout.write(
                self.style.SUCCESS(f'\nTotal items cleaned: {total_cleaned}')
            )
        else:
            self.stdout.write('No expired tokens or data found to clean up')