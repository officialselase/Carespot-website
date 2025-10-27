"""
Django management command to show token statistics.
Usage: python manage.py token_stats
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth import get_user_model
from authentication.models import RefreshToken, LoginAttempt
from datetime import timedelta

User = get_user_model()


class Command(BaseCommand):
    help = 'Display token and authentication statistics'

    def add_arguments(self, parser):
        parser.add_argument(
            '--detailed',
            action='store_true',
            help='Show detailed breakdown by user role',
        )

    def handle(self, *args, **options):
        detailed = options['detailed']
        
        self.stdout.write(self.style.SUCCESS('=== TOKEN STATISTICS ===\n'))
        
        # Refresh Token Statistics
        total_refresh_tokens = RefreshToken.objects.count()
        active_refresh_tokens = RefreshToken.objects.filter(is_revoked=False).count()
        expired_refresh_tokens = RefreshToken.objects.filter(
            expires_at__lt=timezone.now()
        ).count()
        revoked_refresh_tokens = RefreshToken.objects.filter(is_revoked=True).count()
        
        self.stdout.write('Refresh Tokens:')
        self.stdout.write(f'  Total: {total_refresh_tokens}')
        self.stdout.write(f'  Active: {active_refresh_tokens}')
        self.stdout.write(f'  Expired: {expired_refresh_tokens}')
        self.stdout.write(f'  Revoked: {revoked_refresh_tokens}')
        
        # User Token Statistics
        users_with_reset_tokens = User.objects.filter(
            password_reset_token__isnull=False
        ).count()
        
        users_with_verification_tokens = User.objects.filter(
            email_verification_token__isnull=False
        ).count()
        
        expired_reset_tokens = User.objects.filter(
            password_reset_token__isnull=False,
            password_reset_sent_at__lt=timezone.now() - timedelta(hours=1)
        ).count()
        
        expired_verification_tokens = User.objects.filter(
            email_verification_token__isnull=False,
            email_verification_sent_at__lt=timezone.now() - timedelta(hours=24)
        ).count()
        
        self.stdout.write('\nUser Authentication Tokens:')
        self.stdout.write(f'  Password Reset Tokens: {users_with_reset_tokens}')
        self.stdout.write(f'    - Expired: {expired_reset_tokens}')
        self.stdout.write(f'  Email Verification Tokens: {users_with_verification_tokens}')
        self.stdout.write(f'    - Expired: {expired_verification_tokens}')
        
        # Account Security Statistics
        locked_accounts = User.objects.filter(
            account_locked_until__gt=timezone.now()
        ).count()
        
        expired_locks = User.objects.filter(
            account_locked_until__lt=timezone.now()
        ).count()
        
        users_with_2fa = User.objects.filter(is_2fa_enabled=True).count()
        
        self.stdout.write('\nAccount Security:')
        self.stdout.write(f'  Currently Locked Accounts: {locked_accounts}')
        self.stdout.write(f'  Expired Locks (need cleanup): {expired_locks}')
        self.stdout.write(f'  Users with 2FA Enabled: {users_with_2fa}')
        
        # Login Attempt Statistics
        today = timezone.now().date()
        login_attempts_today = LoginAttempt.objects.filter(
            timestamp__date=today
        ).count()
        
        successful_logins_today = LoginAttempt.objects.filter(
            timestamp__date=today,
            success=True
        ).count()
        
        failed_logins_today = LoginAttempt.objects.filter(
            timestamp__date=today,
            success=False
        ).count()
        
        # Last 7 days
        week_ago = timezone.now() - timedelta(days=7)
        login_attempts_week = LoginAttempt.objects.filter(
            timestamp__gte=week_ago
        ).count()
        
        self.stdout.write('\nLogin Activity:')
        self.stdout.write(f'  Today: {login_attempts_today} attempts ({successful_logins_today} successful, {failed_logins_today} failed)')
        self.stdout.write(f'  Last 7 days: {login_attempts_week} attempts')
        
        # Cleanup Recommendations
        self.stdout.write(self.style.WARNING('\n=== CLEANUP RECOMMENDATIONS ==='))
        
        cleanup_needed = []
        if expired_refresh_tokens > 0:
            cleanup_needed.append(f'{expired_refresh_tokens} expired refresh tokens')
        if revoked_refresh_tokens > 10:  # Arbitrary threshold
            cleanup_needed.append(f'{revoked_refresh_tokens} old revoked tokens')
        if expired_reset_tokens > 0:
            cleanup_needed.append(f'{expired_reset_tokens} expired password reset tokens')
        if expired_verification_tokens > 0:
            cleanup_needed.append(f'{expired_verification_tokens} expired email verification tokens')
        if expired_locks > 0:
            cleanup_needed.append(f'{expired_locks} expired account locks')
        
        if cleanup_needed:
            self.stdout.write('Consider running cleanup for:')
            for item in cleanup_needed:
                self.stdout.write(f'  - {item}')
            self.stdout.write('\nRun: python manage.py cleanup_expired_tokens')
        else:
            self.stdout.write(self.style.SUCCESS('No cleanup needed at this time'))
        
        # Detailed breakdown by user role
        if detailed:
            self.stdout.write(self.style.SUCCESS('\n=== DETAILED BREAKDOWN BY USER ROLE ==='))
            
            for role_code, role_name in User.USER_ROLES:
                role_users = User.objects.filter(role=role_code)
                role_count = role_users.count()
                
                if role_count > 0:
                    role_active_tokens = RefreshToken.objects.filter(
                        user__role=role_code,
                        is_revoked=False
                    ).count()
                    
                    role_2fa_users = role_users.filter(is_2fa_enabled=True).count()
                    
                    self.stdout.write(f'\n{role_name} Users ({role_count}):')
                    self.stdout.write(f'  Active Tokens: {role_active_tokens}')
                    self.stdout.write(f'  2FA Enabled: {role_2fa_users}')
        
        self.stdout.write('')