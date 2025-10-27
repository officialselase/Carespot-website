"""
Rate limiting middleware for CareSpot API.
Implements IP-based rate limiting with configurable limits.
"""

import time
import logging
from django.core.cache import cache
from django.http import JsonResponse
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger('carespot.security')


class RateLimitMiddleware(MiddlewareMixin):
    """
    Rate limiting middleware that limits requests per IP address.
    Default: 100 requests per minute per IP.
    """
    
    def __init__(self, get_response=None):
        super().__init__(get_response)
        self.rate_limit = getattr(settings, 'RATE_LIMIT_REQUESTS', 100)
        self.rate_window = getattr(settings, 'RATE_LIMIT_WINDOW', 60)  # seconds
        self.enabled = getattr(settings, 'RATELIMIT_ENABLE', True)
    
    def process_request(self, request):
        if not self.enabled:
            return None
            
        # Skip rate limiting for admin and static files
        if request.path.startswith('/admin/') or request.path.startswith('/static/'):
            return None
            
        client_ip = self.get_client_ip(request)
        cache_key = f'rate_limit:{client_ip}'
        
        # Get current request count and timestamp
        current_data = cache.get(cache_key, {'count': 0, 'window_start': time.time()})
        current_time = time.time()
        
        # Reset window if expired
        if current_time - current_data['window_start'] > self.rate_window:
            current_data = {'count': 0, 'window_start': current_time}
        
        # Check if rate limit exceeded
        if current_data['count'] >= self.rate_limit:
            logger.warning(
                f"Rate limit exceeded for IP {client_ip}. "
                f"Count: {current_data['count']}, Limit: {self.rate_limit}"
            )
            return JsonResponse({
                'error': 'Rate limit exceeded',
                'message': f'Too many requests. Limit: {self.rate_limit} per minute.',
                'retry_after': int(self.rate_window - (current_time - current_data['window_start']))
            }, status=429)
        
        # Increment counter
        current_data['count'] += 1
        cache.set(cache_key, current_data, timeout=self.rate_window)
        
        return None
    
    def get_client_ip(self, request):
        """Extract client IP address from request."""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip