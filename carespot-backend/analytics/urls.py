"""
URL configuration for analytics app.
"""

from django.urls import path, include
from . import views

app_name = 'analytics'

# API v1 URLs
v1_urlpatterns = [
    # Anonymized user data
    path('users/', views.AnonymizedUserListView.as_view(), name='anonymized-user-list'),
    
    # Page views and user actions
    path('page-views/', views.PageViewListView.as_view(), name='page-view-list'),
    path('user-actions/', views.UserActionListView.as_view(), name='user-action-list'),
    
    # Content performance
    path('content-performance/', views.ContentPerformanceListView.as_view(), name='content-performance-list'),
    
    # System metrics
    path('system-metrics/', views.SystemMetricsListView.as_view(), name='system-metrics-list'),
    
    # Data retention policies
    path('retention-policies/', views.DataRetentionPolicyListView.as_view(), name='retention-policy-list'),
    
    # Dashboard and reporting
    path('dashboard/', views.analytics_dashboard, name='analytics-dashboard'),
    path('content-analytics/', views.content_analytics, name='content-analytics'),
    path('user-behavior/', views.user_behavior_analytics, name='user-behavior-analytics'),
    
    # Data management
    path('cleanup/', views.cleanup_old_data, name='cleanup-old-data'),
    
    # Tracking endpoints (public)
    path('track/page-view/', views.track_page_view, name='track-page-view'),
    path('track/user-action/', views.track_user_action, name='track-user-action'),
]

urlpatterns = [
    path('v1/', include(v1_urlpatterns)),
]