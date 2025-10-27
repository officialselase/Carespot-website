"""
JWT Token Utilities
"""

import jwt
import uuid
from datetime import datetime, timedelta
from django.conf import settings
from django.utils import timezone
from django.contrib.auth import get_user_model
from .models import RefreshToken

User = get_user_model()


class JWTTokenManager:
    """
    JWT Token Manager for handling access and refresh tokens
    """
    
    @staticmethod
    def generate_tokens(user, request=None):
        """
        Generate access and refresh tokens for user
        """
        # Generate access token (15 minutes)
        access_payload = {
            'user_id': str(user.id),
            'email': user.email,
            'role': user.role,
            'exp': timezone.now() + timedelta(minutes=15),
            'iat': timezone.now(),
            'type': 'access'
        }
        
        access_token = jwt.encode(
            access_payload,
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        
        # Generate refresh token (7 days)
        refresh_token_value = str(uuid.uuid4())
        refresh_expires_at = timezone.now() + timedelta(days=7)
        
        # Get client info
        ip_address = None
        user_agent = ''
        if request:
            ip_address = JWTTokenManager.get_client_ip(request)
            user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Save refresh token to database
        refresh_token = RefreshToken.objects.create(
            user=user,
            token=refresh_token_value,
            expires_at=refresh_expires_at,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        return {
            'access_token': access_token,
            'refresh_token': refresh_token_value,
            'access_expires_in': 900,  # 15 minutes in seconds
            'refresh_expires_in': 604800,  # 7 days in seconds
            'token_type': 'Bearer'
        }
    
    @staticmethod
    def verify_access_token(token):
        """
        Verify and decode access token
        """
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=['HS256']
            )
            
            if payload.get('type') != 'access':
                return None
            
            user_id = payload.get('user_id')
            if not user_id:
                return None
            
            user = User.objects.get(id=user_id)
            if not user.is_active:
                return None
            
            return user
            
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
            return None
    
    @staticmethod
    def refresh_access_token(refresh_token_value, request=None):
        """
        Generate new access token using refresh token
        """
        try:
            refresh_token = RefreshToken.objects.get(
                token=refresh_token_value,
                is_revoked=False
            )
            
            if refresh_token.is_expired():
                refresh_token.revoke()
                return None
            
            user = refresh_token.user
            if not user.is_active:
                return None
            
            # Generate new access token
            access_payload = {
                'user_id': str(user.id),
                'email': user.email,
                'role': user.role,
                'exp': timezone.now() + timedelta(minutes=15),
                'iat': timezone.now(),
                'type': 'access'
            }
            
            access_token = jwt.encode(
                access_payload,
                settings.SECRET_KEY,
                algorithm='HS256'
            )
            
            return {
                'access_token': access_token,
                'expires_in': 900,  # 15 minutes in seconds
                'token_type': 'Bearer'
            }
            
        except RefreshToken.DoesNotExist:
            return None
    
    @staticmethod
    def revoke_refresh_token(refresh_token_value):
        """
        Revoke refresh token
        """
        try:
            refresh_token = RefreshToken.objects.get(token=refresh_token_value)
            refresh_token.revoke()
            return True
        except RefreshToken.DoesNotExist:
            return False
    
    @staticmethod
    def revoke_all_user_tokens(user):
        """
        Revoke all refresh tokens for a user
        """
        RefreshToken.objects.filter(
            user=user,
            is_revoked=False
        ).update(is_revoked=True)
    
    @staticmethod
    def get_client_ip(request):
        """Get client IP address from request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
        return ip
    
    @staticmethod
    def cleanup_expired_tokens():
        """
        Clean up expired refresh tokens
        """
        RefreshToken.objects.filter(
            expires_at__lt=timezone.now()
        ).delete()