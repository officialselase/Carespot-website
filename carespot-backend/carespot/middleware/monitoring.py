"""
Comprehensive monitoring middleware for security and performance tracking.
"""

import time
import logging
from django.utils.deprecation import MiddlewareMixin
from django.core.cache import cache
from carespot.utils.monitoring import security_monitor, performance_monitor
from carespot.utils.security import check_security_headers


class SecurityMonitoringMiddleware(MiddlewareMixin):
    """
    Middleware for comprehensive security monitoring.
    """
    
    def __init__(self, get_response=None):
        super().__init__(get_response)
        self.logger = logging.getLogger('django.security')
    
    def process_request(self, request):
        """Process incoming requests for security monitoring."""
        # Track request start time
        request._start_time = time.time()
        
        # Check for suspicious patterns
        self.check_suspicious_patterns(request)
        
        return None
    
    def process_response(self, request, response):
        """Process responses and add security headers."""
        # Calculate response time
        if hasattr(request, '_start_time'):
            response_time = time.time() - request._start_time
            performance_monitor.track_request_time(request, response_time)
            
            # Update performance stats
            self.update_performance_stats(response_time)
        
        # Add security headers
        response = check_security_headers(response)
        
        return response
    
    def check_suspicious_patterns(self, request):
        """Check for suspicious request patterns."""
        # Check for SQL injection attempts
        suspicious_params = ['union', 'select', 'drop', 'insert', 'delete', '--', ';']
        query_string = request.GET.urlencode().lower()
        
        for param in suspicious_params:
            if param in query_string:
                security_monitor.track_suspicious_request(
                    request, 
                    f'Potential SQL injection attempt: {param}'
                )
                break
        
        # Check for XSS attempts
        xss_patterns = ['<script', 'javascript:', 'onerror=', 'onload=']
        for pattern in xss_patterns:
            if pattern in query_string:
                security_monitor.track_suspicious_request(
                    request,
                    f'Potential XSS attempt: {pattern}'
                )
                break
        
        # Check for path traversal attempts
        if '../' in request.path or '..\\' in request.path:
            security_monitor.track_suspicious_request(
                request,
                'Path traversal attempt detected'
            )
    
    def update_performance_stats(self, response_time):
        """Update performance statistics in cache."""
        # Update average response time
        current_avg = cache.get('avg_response_time', 0)
        total_requests = cache.get('total_requests', 0)
        
        new_avg = ((current_avg * total_requests) + response_time) / (total_requests + 1)
        
        cache.set('avg_response_time', new_avg, timeout=3600)
        cache.set('total_requests', total_requests + 1, timeout=3600)
        
        # Track slow requests
        if response_time > performance_monitor.slow_request_threshold:
            slow_count = cache.get('slow_requests_count', 0)
            cache.set('slow_requests_count', slow_count + 1, timeout=3600)