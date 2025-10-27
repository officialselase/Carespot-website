"""
JWT Authentication Middleware
"""

from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.models import AnonymousUser
from .jwt_utils import JWTTokenManager


class JWTAuthenticationMiddleware(MiddlewareMixin):
    """
    JWT Authentication Middleware
    """
    
    def process_request(self, request):
        """
        Process request to authenticate user via JWT token
        """
        # Skip authentication for certain paths
        skip_paths = [
            '/api/auth/login/',
            '/api/auth/register/',
            '/api/auth/refresh-token/',
            '/api/auth/password-reset/',
            '/api/auth/password-reset-confirm/',
            '/api/auth/verify-email/',
            '/admin/',
            '/static/',
            '/media/',
        ]
        
        if any(request.path.startswith(path) for path in skip_paths):
            return None
        
        # Get authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            request.user = AnonymousUser()
            return None
        
        # Extract token
        token = auth_header.split(' ')[1]
        
        # Verify token and get user
        user = JWTTokenManager.verify_access_token(token)
        
        if user:
            request.user = user
        else:
            request.user = AnonymousUser()
        
        return None