"""
Security monitoring and alerting utilities for CareSpot.
"""

import logging
import time
from datetime import datetime, timedelta
from django.core.cache import cache
from django.conf import settings
from django.core.mail import send_mail
from .security import SecurityLogger, get_client_ip


class SecurityMonitor:
    """
    Monitors security events and triggers alerts when thresholds are exceeded.
    """
    
    def __init__(self):
        self.logger = logging.getLogger('django.security')
        self.alert_thresholds = {
            'failed_logins': 5,  # per IP per hour
            'rate_limit_hits': 10,  # per IP per hour
            'suspicious_requests': 3,  # per IP per hour
        }
    
    def track_failed_login(self, request, username=None):
        """Track failed login attempts."""
        client_ip = get_client_ip(request)
        cache_key = f'failed_login:{client_ip}'
        
        # Get current count
        current_count = cache.get(cache_key, 0)
        current_count += 1
        
        # Store with 1-hour expiry
        cache.set(cache_key, current_count, timeout=3600)
        
        # Log the event
        SecurityLogger.log_security_event(
            'failed_login',
            {
                'username': username,
                'attempt_count': current_count,
                'ip_address': client_ip
            },
            request
        )
        
        # Check if threshold exceeded
        if current_count >= self.alert_thresholds['failed_logins']:
            self.send_security_alert(
                'Multiple Failed Login Attempts',
                f'IP {client_ip} has {current_count} failed login attempts in the last hour.'
            )
    
    def track_rate_limit_hit(self, request):
        """Track rate limit violations."""
        client_ip = get_client_ip(request)
        cache_key = f'rate_limit_hits:{client_ip}'
        
        current_count = cache.get(cache_key, 0)
        current_count += 1
        cache.set(cache_key, current_count, timeout=3600)
        
        SecurityLogger.log_security_event(
            'rate_limit_exceeded',
            {
                'hit_count': current_count,
                'ip_address': client_ip
            },
            request
        )
        
        if current_count >= self.alert_thresholds['rate_limit_hits']:
            self.send_security_alert(
                'Repeated Rate Limit Violations',
                f'IP {client_ip} has exceeded rate limits {current_count} times in the last hour.'
            )
    
    def track_suspicious_request(self, request, reason):
        """Track suspicious requests."""
        client_ip = get_client_ip(request)
        cache_key = f'suspicious:{client_ip}'
        
        current_count = cache.get(cache_key, 0)
        current_count += 1
        cache.set(cache_key, current_count, timeout=3600)
        
        SecurityLogger.log_security_event(
            'suspicious_request',
            {
                'reason': reason,
                'count': current_count,
                'ip_address': client_ip
            },
            request
        )
        
        if current_count >= self.alert_thresholds['suspicious_requests']:
            self.send_security_alert(
                'Suspicious Activity Detected',
                f'IP {client_ip} has triggered {current_count} suspicious activity alerts. Reason: {reason}'
            )
    
    def send_security_alert(self, subject, message):
        """Send security alert email to administrators."""
        try:
            admin_emails = getattr(settings, 'SECURITY_ALERT_EMAILS', [])
            if admin_emails and not settings.DEBUG:
                send_mail(
                    f'[CareSpot Security Alert] {subject}',
                    f'{message}\n\nTimestamp: {datetime.now().isoformat()}',
                    settings.DEFAULT_FROM_EMAIL,
                    admin_emails,
                    fail_silently=False,
                )
            else:
                # In development, just log the alert
                self.logger.warning(f'Security Alert: {subject} - {message}')
        except Exception as e:
            self.logger.error(f'Failed to send security alert: {str(e)}')


class PerformanceMonitor:
    """
    Monitors application performance and logs slow requests.
    """
    
    def __init__(self):
        self.logger = logging.getLogger('carespot.performance')
        self.slow_request_threshold = 2.0  # seconds
    
    def track_request_time(self, request, response_time):
        """Track request processing time."""
        if response_time > self.slow_request_threshold:
            self.logger.warning(
                f'Slow request detected: {request.method} {request.path} '
                f'took {response_time:.2f}s from IP {get_client_ip(request)}'
            )
    
    def get_performance_stats(self):
        """Get performance statistics from cache."""
        return {
            'avg_response_time': cache.get('avg_response_time', 0),
            'slow_requests_count': cache.get('slow_requests_count', 0),
            'total_requests': cache.get('total_requests', 0),
        }


# Global instances
security_monitor = SecurityMonitor()
performance_monitor = PerformanceMonitor()