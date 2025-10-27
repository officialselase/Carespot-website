"""
Email Verification and Password Reset Utilities
"""

import secrets
import string
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth import get_user_model

User = get_user_model()


class EmailVerificationManager:
    """
    Handle email verification functionality
    """
    
    @staticmethod
    def generate_verification_token():
        """Generate secure verification token"""
        return ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(64))
    
    @staticmethod
    def send_verification_email(user, request=None):
        """
        Send email verification email to user
        """
        # Generate verification token
        token = EmailVerificationManager.generate_verification_token()
        user.email_verification_token = token
        user.email_verification_sent_at = timezone.now()
        user.save(update_fields=['email_verification_token', 'email_verification_sent_at'])
        
        # Build verification URL
        if request:
            domain = request.get_host()
            protocol = 'https' if request.is_secure() else 'http'
        else:
            domain = getattr(settings, 'FRONTEND_DOMAIN', 'localhost:5173')
            protocol = 'https' if getattr(settings, 'USE_HTTPS', False) else 'http'
        
        verification_url = f"{protocol}://{domain}/verify-email?token={token}"
        
        # Email context
        context = {
            'user': user,
            'verification_url': verification_url,
            'site_name': 'CareSpot',
        }
        
        # Render email templates
        html_message = render_to_string('authentication/email_verification.html', context)
        plain_message = strip_tags(html_message)
        
        # Send email
        try:
            send_mail(
                subject='Verify your CareSpot account',
                message=plain_message,
                from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@carespot.org'),
                recipient_list=[user.email],
                html_message=html_message,
                fail_silently=False,
            )
            return True
        except Exception as e:
            # Log error in production
            print(f"Failed to send verification email: {e}")
            return False
    
    @staticmethod
    def verify_email(token):
        """
        Verify email using token
        """
        try:
            user = User.objects.get(
                email_verification_token=token,
                is_email_verified=False
            )
            
            if not user.can_verify_email():
                return None, "Verification token has expired"
            
            user.is_email_verified = True
            user.email_verification_token = None
            user.email_verification_sent_at = None
            user.save(update_fields=[
                'is_email_verified',
                'email_verification_token',
                'email_verification_sent_at'
            ])
            
            return user, "Email verified successfully"
            
        except User.DoesNotExist:
            return None, "Invalid verification token"


class PasswordResetManager:
    """
    Handle password reset functionality
    """
    
    @staticmethod
    def generate_reset_token():
        """Generate secure password reset token"""
        return ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(64))
    
    @staticmethod
    def send_password_reset_email(email, request=None):
        """
        Send password reset email
        """
        try:
            user = User.objects.get(email=email, is_active=True)
        except User.DoesNotExist:
            # Don't reveal if email exists or not
            return True
        
        # Generate reset token
        token = PasswordResetManager.generate_reset_token()
        user.password_reset_token = token
        user.password_reset_sent_at = timezone.now()
        user.save(update_fields=['password_reset_token', 'password_reset_sent_at'])
        
        # Build reset URL
        if request:
            domain = request.get_host()
            protocol = 'https' if request.is_secure() else 'http'
        else:
            domain = getattr(settings, 'FRONTEND_DOMAIN', 'localhost:5173')
            protocol = 'https' if getattr(settings, 'USE_HTTPS', False) else 'http'
        
        reset_url = f"{protocol}://{domain}/reset-password?token={token}"
        
        # Email context
        context = {
            'user': user,
            'reset_url': reset_url,
            'site_name': 'CareSpot',
            'expiry_hours': 1,
        }
        
        # Render email templates
        html_message = render_to_string('authentication/password_reset.html', context)
        plain_message = strip_tags(html_message)
        
        # Send email
        try:
            send_mail(
                subject='Reset your CareSpot password',
                message=plain_message,
                from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@carespot.org'),
                recipient_list=[user.email],
                html_message=html_message,
                fail_silently=False,
            )
            return True
        except Exception as e:
            # Log error in production
            print(f"Failed to send password reset email: {e}")
            return False
    
    @staticmethod
    def verify_reset_token(token):
        """
        Verify password reset token
        """
        try:
            user = User.objects.get(password_reset_token=token)
            
            if not user.can_reset_password():
                return None, "Password reset token has expired"
            
            return user, "Token is valid"
            
        except User.DoesNotExist:
            return None, "Invalid password reset token"
    
    @staticmethod
    def reset_password(token, new_password):
        """
        Reset password using token
        """
        user, message = PasswordResetManager.verify_reset_token(token)
        
        if not user:
            return False, message
        
        # Set new password
        user.set_password(new_password)
        user.password_reset_token = None
        user.password_reset_sent_at = None
        user.last_password_change = timezone.now()
        user.save(update_fields=[
            'password',
            'password_reset_token',
            'password_reset_sent_at',
            'last_password_change'
        ])
        
        # Revoke all existing refresh tokens for security
        from .jwt_utils import JWTTokenManager
        JWTTokenManager.revoke_all_user_tokens(user)
        
        return True, "Password reset successfully"