"""
Custom Authentication Backends
"""

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import LoginAttempt

User = get_user_model()


class CustomAuthenticationBackend(ModelBackend):
    """
    Custom authentication backend with enhanced security features
    """
    
    def authenticate(self, request, username=None, password=None, **kwargs):
        """
        Authenticate user with enhanced security checks
        """
        if username is None:
            username = kwargs.get('email')
        
        if username is None or password is None:
            return None
        
        # Get client IP and user agent for logging
        ip_address = self.get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '') if request else ''
        
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            # Log failed attempt for non-existent user
            LoginAttempt.objects.create(
                email=username,
                ip_address=ip_address,
                user_agent=user_agent,
                success=False,
                failure_reason='User not found'
            )
            return None
        
        # Check if account is locked
        if user.is_account_locked():
            LoginAttempt.objects.create(
                user=user,
                email=username,
                ip_address=ip_address,
                user_agent=user_agent,
                success=False,
                failure_reason='Account locked'
            )
            return None
        
        # Check if account is active
        if not user.is_active:
            LoginAttempt.objects.create(
                user=user,
                email=username,
                ip_address=ip_address,
                user_agent=user_agent,
                success=False,
                failure_reason='Account inactive'
            )
            return None
        
        # Verify password
        if user.check_password(password):
            # Successful login
            user.reset_failed_login_attempts()
            user.last_login_ip = ip_address
            user.last_login = timezone.now()
            user.save(update_fields=['last_login_ip', 'last_login'])
            
            LoginAttempt.objects.create(
                user=user,
                email=username,
                ip_address=ip_address,
                user_agent=user_agent,
                success=True
            )
            
            return user
        else:
            # Failed login
            user.increment_failed_login()
            LoginAttempt.objects.create(
                user=user,
                email=username,
                ip_address=ip_address,
                user_agent=user_agent,
                success=False,
                failure_reason='Invalid password'
            )
            return None
    
    def get_client_ip(self, request):
        """Get client IP address from request"""
        if not request:
            return '127.0.0.1'
        
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
        return ip