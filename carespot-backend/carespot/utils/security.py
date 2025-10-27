"""
Security utilities for CareSpot project.
Includes secret key management, encryption, and security helpers.
"""

import os
import secrets
import hashlib
from datetime import datetime, timedelta
from cryptography.fernet import Fernet
from django.conf import settings
from django.core.cache import cache


class SecretKeyManager:
    """
    Manages Django secret key with rotation capability.
    """
    
    @staticmethod
    def generate_secret_key():
        """Generate a new secure secret key."""
        return secrets.token_urlsafe(50)
    
    @staticmethod
    def rotate_secret_key():
        """
        Rotate the secret key and update environment.
        This should be done periodically for enhanced security.
        """
        new_key = SecretKeyManager.generate_secret_key()
        
        # Log the rotation (without exposing the key)
        from django.utils import timezone
        rotation_time = timezone.now()
        
        # In production, this would update the environment variable
        # and restart the application
        print(f"Secret key rotated at {rotation_time}")
        print("New key generated (update your environment variables)")
        
        return new_key
    
    @staticmethod
    def validate_secret_key(key):
        """Validate that a secret key meets security requirements."""
        if not key:
            return False, "Secret key cannot be empty"
        
        if len(key) < 32:
            return False, "Secret key must be at least 32 characters long"
        
        if key.startswith('django-insecure-'):
            return False, "Using default insecure key in production"
        
        return True, "Secret key is valid"


class SecurityLogger:
    """
    Security event logging utility.
    """
    
    @staticmethod
    def log_security_event(event_type, details, request=None):
        """Log security-related events."""
        import logging
        logger = logging.getLogger('django.security')
        
        log_data = {
            'event_type': event_type,
            'timestamp': datetime.now().isoformat(),
            'details': details
        }
        
        if request:
            log_data.update({
                'ip_address': get_client_ip(request),
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'path': request.path,
                'method': request.method,
                'user': str(request.user) if hasattr(request, 'user') else 'Anonymous'
            })
        
        logger.warning(f"Security Event: {log_data}")


def get_client_ip(request):
    """Extract client IP address from request."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def hash_sensitive_data(data):
    """Hash sensitive data for logging purposes."""
    return hashlib.sha256(str(data).encode()).hexdigest()[:16]


class EncryptionHelper:
    """
    Helper class for encrypting/decrypting sensitive data.
    """
    
    def __init__(self):
        # In production, this key should be stored securely
        self.key = Fernet.generate_key()
        self.cipher = Fernet(self.key)
    
    def encrypt(self, data):
        """Encrypt sensitive data."""
        if isinstance(data, str):
            data = data.encode()
        return self.cipher.encrypt(data)
    
    def decrypt(self, encrypted_data):
        """Decrypt sensitive data."""
        decrypted = self.cipher.decrypt(encrypted_data)
        return decrypted.decode()


def check_security_headers(response):
    """Add security headers to response."""
    response['X-Content-Type-Options'] = 'nosniff'
    response['X-Frame-Options'] = 'DENY'
    response['X-XSS-Protection'] = '1; mode=block'
    response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response