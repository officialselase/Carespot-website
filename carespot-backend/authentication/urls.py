"""
Authentication URL Configuration
"""

from django.urls import path
from . import views, api_views

app_name = 'authentication'

urlpatterns = [
    # Authentication endpoints
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('logout-all/', views.logout_all, name='logout_all'),
    path('refresh-token/', views.refresh_token, name='refresh_token'),
    
    # Email verification
    path('verify-email/', views.verify_email, name='verify_email'),
    path('resend-verification/', views.resend_verification_email, name='resend_verification'),
    
    # Password management
    path('password-reset/', views.password_reset_request, name='password_reset_request'),
    path('password-reset-confirm/', views.password_reset_confirm, name='password_reset_confirm'),
    path('change-password/', views.change_password, name='change_password'),
    
    # Profile management
    path('profile/', views.profile, name='profile'),
    path('profile/update/', views.update_profile, name='update_profile'),
    
    # Two-factor authentication
    path('2fa/setup/', views.setup_2fa, name='setup_2fa'),
    path('2fa/enable/', views.enable_2fa, name='enable_2fa'),
    path('2fa/disable/', views.disable_2fa, name='disable_2fa'),
    path('2fa/backup-codes/', views.regenerate_backup_codes, name='regenerate_backup_codes'),
    
    # Role-Based Access Control API endpoints
    path('api/permissions/', api_views.user_permissions, name='api_user_permissions'),
    path('api/check-permission/', api_views.check_permission, name='api_check_permission'),
    path('api/users/', api_views.UserListView.as_view(), name='api_user_list'),
    path('api/users/<uuid:pk>/', api_views.UserDetailView.as_view(), name='api_user_detail'),
    path('api/users/<uuid:pk>/change-role/', api_views.RoleChangeView.as_view(), name='api_change_role'),
    path('api/role-permissions/', api_views.role_permissions_matrix, name='api_role_permissions'),
    path('api/user-stats/', api_views.user_stats, name='api_user_stats'),
]