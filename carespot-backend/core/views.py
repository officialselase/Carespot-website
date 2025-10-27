"""
Core views for CareSpot application.
"""

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from carespot.utils.monitoring import security_monitor


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Health check endpoint for monitoring.
    """
    return Response({
        'status': 'healthy',
        'message': 'CareSpot API is running',
        'version': '1.0.0'
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def test_rate_limit(request):
    """
    Test endpoint for rate limiting functionality.
    """
    return Response({
        'message': 'Rate limit test successful',
        'ip': request.META.get('REMOTE_ADDR'),
        'timestamp': request.META.get('HTTP_DATE')
    })


@csrf_exempt
@require_http_methods(["POST"])
def test_security_monitoring(request):
    """
    Test endpoint for security monitoring.
    """
    # Simulate a suspicious request
    security_monitor.track_suspicious_request(
        request, 
        'Test suspicious activity'
    )
    
    return JsonResponse({
        'message': 'Security monitoring test completed',
        'status': 'logged'
    })