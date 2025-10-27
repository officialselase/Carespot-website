"""
URL configuration for core app.
"""

from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('test-rate-limit/', views.test_rate_limit, name='test_rate_limit'),
    path('test-security/', views.test_security_monitoring, name='test_security'),
]