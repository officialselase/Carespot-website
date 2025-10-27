"""
API Versioning Strategy for CareSpot
Implements URL-based versioning with backward compatibility.
"""

from rest_framework.versioning import URLPathVersioning
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings


class CareSpotAPIVersioning(URLPathVersioning):
    """
    Custom API versioning class with enhanced security and validation.
    """
    default_version = 'v1'
    allowed_versions = ['v1', 'v2']
    version_param = 'version'
    
    def determine_version(self, request, *args, **kwargs):
        """
        Determine API version with security logging.
        """
        version = super().determine_version(request, *args, **kwargs)
        
        # Log API version usage for monitoring
        if hasattr(request, 'user') and request.user.is_authenticated:
            from carespot.utils.monitoring import api_monitor
            api_monitor.log_api_version_usage(
                user=request.user,
                version=version,
                endpoint=request.path,
                method=request.method
            )
        
        return version
    
    def reverse(self, viewname, args=None, kwargs=None, request=None, format=None, **extra):
        """
        Override reverse to include version in URL.
        """
        if request and hasattr(request, 'version'):
            kwargs = kwargs or {}
            kwargs['version'] = request.version
        
        return super().reverse(viewname, args, kwargs, request, format, **extra)


def get_api_version_info():
    """
    Get information about available API versions.
    """
    return {
        'current_version': 'v1',
        'supported_versions': ['v1', 'v2'],
        'deprecated_versions': [],
        'version_info': {
            'v1': {
                'status': 'stable',
                'release_date': '2024-01-01',
                'deprecation_date': None,
                'features': [
                    'Authentication',
                    'User Management',
                    'Role-Based Access Control',
                    'Basic API endpoints'
                ]
            },
            'v2': {
                'status': 'development',
                'release_date': '2024-06-01',
                'deprecation_date': None,
                'features': [
                    'Enhanced Authentication',
                    'Advanced User Management',
                    'Payment Integration',
                    'Content Management',
                    'Analytics API'
                ]
            }
        }
    }


def check_version_compatibility(version, feature=None):
    """
    Check if a specific feature is available in the given API version.
    """
    version_info = get_api_version_info()
    
    if version not in version_info['supported_versions']:
        return False
    
    if feature:
        features = version_info['version_info'].get(version, {}).get('features', [])
        return feature in features
    
    return True


class APIVersionMiddleware:
    """
    Middleware to handle API versioning and compatibility checks.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # Add version info to request
        if request.path.startswith('/api/'):
            request.api_version_info = get_api_version_info()
        
        response = self.get_response(request)
        
        # Add version headers to API responses
        if request.path.startswith('/api/'):
            response['X-API-Version'] = getattr(request, 'version', 'v1')
            response['X-API-Supported-Versions'] = ','.join(
                get_api_version_info()['supported_versions']
            )
        
        return response