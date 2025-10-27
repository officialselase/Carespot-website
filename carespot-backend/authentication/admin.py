"""
Authentication Admin Configuration
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.http import HttpResponseRedirect
from django.urls import path, reverse
from django.shortcuts import render
from django.contrib import messages
from .models import CustomUser, LoginAttempt, RefreshToken, AuditLog
from .audit import AuditLogger
from .permissions import RolePermissions


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """
    Custom User Admin with Role Management
    """
    list_display = [
        'email', 'username', 'first_name', 'last_name', 'role_badge',
        'is_email_verified', 'is_2fa_enabled', 'is_active', 'created_at'
    ]
    list_filter = [
        'role', 'is_email_verified', 'is_2fa_enabled', 'is_active',
        'is_staff', 'is_superuser', 'created_at'
    ]
    search_fields = ['email', 'username', 'first_name', 'last_name']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('email', 'username', 'password')
        }),
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'phone_number')
        }),
        ('Role & Permissions', {
            'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'description': 'Role determines user permissions. See role permissions matrix below.'
        }),
        ('Security', {
            'fields': (
                'is_email_verified', 'failed_login_attempts', 'account_locked_until',
                'last_login_ip', 'is_2fa_enabled'
            )
        }),
        ('Important Dates', {
            'fields': ('last_login', 'date_joined', 'last_password_change')
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role'),
        }),
    )
    
    readonly_fields = ['last_login', 'date_joined', 'last_password_change', 'created_at', 'updated_at']
    
    actions = ['activate_users', 'deactivate_users', 'bulk_role_change']
    
    def role_badge(self, obj):
        """Display role as a colored badge"""
        colors = {
            'admin': '#dc3545',      # Red
            'staff': '#fd7e14',      # Orange  
            'volunteer': '#198754',  # Green
            'donor': '#0d6efd',      # Blue
            'public': '#6c757d',     # Gray
        }
        color = colors.get(obj.role, '#6c757d')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px;">{}</span>',
            color,
            obj.get_role_display()
        )
    role_badge.short_description = 'Role'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related()
    
    def save_model(self, request, obj, form, change):
        """Override save to log role changes"""
        old_role = None
        if change:
            # Get old values before saving
            old_obj = CustomUser.objects.get(pk=obj.pk)
            old_role = old_obj.role
        
        super().save_model(request, obj, form, change)
        
        # Log role change if it occurred
        if change and old_role and old_role != obj.role:
            AuditLogger.log_role_change(
                actor=request.user,
                target_user=obj,
                old_role=old_role,
                new_role=obj.role,
                request=request
            )
            messages.success(
                request,
                f'Role changed from {old_role} to {obj.role} for {obj.email}'
            )
        elif not change:
            # Log user creation
            AuditLogger.log_user_creation(
                actor=request.user,
                target_user=obj,
                request=request
            )
    
    def activate_users(self, request, queryset):
        """Bulk activate users"""
        count = 0
        for user in queryset:
            if not user.is_active:
                user.is_active = True
                user.save()
                AuditLogger.log_user_activation(
                    actor=request.user,
                    target_user=user,
                    is_active=True,
                    request=request
                )
                count += 1
        
        self.message_user(request, f'{count} users activated successfully.')
    activate_users.short_description = 'Activate selected users'
    
    def deactivate_users(self, request, queryset):
        """Bulk deactivate users"""
        count = 0
        for user in queryset:
            if user.is_active and user != request.user:  # Don't deactivate self
                user.is_active = False
                user.save()
                AuditLogger.log_user_activation(
                    actor=request.user,
                    target_user=user,
                    is_active=False,
                    request=request
                )
                count += 1
        
        self.message_user(request, f'{count} users deactivated successfully.')
    deactivate_users.short_description = 'Deactivate selected users'
    
    def bulk_role_change(self, request, queryset):
        """Redirect to bulk role change page"""
        selected = queryset.values_list('pk', flat=True)
        return HttpResponseRedirect(
            reverse('admin:bulk_role_change') + f'?ids={",".join(map(str, selected))}'
        )
    bulk_role_change.short_description = 'Change role for selected users'
    
    def get_urls(self):
        """Add custom URLs"""
        urls = super().get_urls()
        custom_urls = [
            path('bulk-role-change/', self.admin_site.admin_view(self.bulk_role_change_view), name='bulk_role_change'),
            path('role-permissions/', self.admin_site.admin_view(self.role_permissions_view), name='role_permissions'),
        ]
        return custom_urls + urls
    
    def bulk_role_change_view(self, request):
        """View for bulk role changes"""
        if request.method == 'POST':
            user_ids = request.POST.get('user_ids', '').split(',')
            new_role = request.POST.get('new_role')
            
            if user_ids and new_role:
                users = CustomUser.objects.filter(pk__in=user_ids)
                count = 0
                
                for user in users:
                    old_role = user.role
                    if old_role != new_role:
                        user.role = new_role
                        user.save()
                        
                        AuditLogger.log_role_change(
                            actor=request.user,
                            target_user=user,
                            old_role=old_role,
                            new_role=new_role,
                            request=request
                        )
                        count += 1
                
                messages.success(request, f'Role changed to {new_role} for {count} users.')
                return HttpResponseRedirect(reverse('admin:authentication_customuser_changelist'))
        
        user_ids = request.GET.get('ids', '').split(',')
        users = CustomUser.objects.filter(pk__in=user_ids) if user_ids[0] else []
        
        context = {
            'users': users,
            'user_ids': ','.join(user_ids),
            'role_choices': CustomUser.USER_ROLES,
            'title': 'Bulk Role Change'
        }
        
        return render(request, 'admin/authentication/bulk_role_change.html', context)
    
    def role_permissions_view(self, request):
        """View for role permissions matrix"""
        permissions_matrix = {}
        
        for role_code, role_name in CustomUser.USER_ROLES:
            permissions = RolePermissions.get_user_permissions(role_code)
            permissions_matrix[role_name] = permissions
        
        context = {
            'permissions_matrix': permissions_matrix,
            'title': 'Role Permissions Matrix'
        }
        
        return render(request, 'admin/authentication/role_permissions.html', context)


@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    """
    Login Attempt Admin
    """
    list_display = [
        'email', 'ip_address', 'success_status', 'failure_reason', 'timestamp'
    ]
    list_filter = ['success', 'failure_reason', 'timestamp']
    search_fields = ['email', 'ip_address', 'user_agent']
    ordering = ['-timestamp']
    readonly_fields = ['user', 'email', 'ip_address', 'user_agent', 'success', 'failure_reason', 'timestamp']
    
    def success_status(self, obj):
        if obj.success:
            return format_html('<span style="color: green;">✓ Success</span>')
        else:
            return format_html('<span style="color: red;">✗ Failed</span>')
    success_status.short_description = 'Status'
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False


@admin.register(RefreshToken)
class RefreshTokenAdmin(admin.ModelAdmin):
    """
    Refresh Token Admin
    """
    list_display = [
        'user', 'token_preview', 'created_at', 'expires_at', 'is_revoked', 'ip_address'
    ]
    list_filter = ['is_revoked', 'created_at', 'expires_at']
    search_fields = ['user__email', 'token', 'ip_address']
    ordering = ['-created_at']
    readonly_fields = ['user', 'token', 'created_at', 'expires_at', 'ip_address', 'user_agent']
    
    def token_preview(self, obj):
        return f"{obj.token[:20]}..."
    token_preview.short_description = 'Token'
    
    def has_add_permission(self, request):
        return False
    
    actions = ['revoke_tokens']
    
    def revoke_tokens(self, request, queryset):
        count = queryset.update(is_revoked=True)
        self.message_user(request, f'{count} tokens revoked successfully.')
    revoke_tokens.short_description = 'Revoke selected tokens'


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    """
    Audit Log Admin - Read-only for security
    """
    list_display = [
        'timestamp', 'action_badge', 'actor', 'target_user', 'description', 'ip_address'
    ]
    list_filter = [
        'action', 'timestamp', 'actor__role', 'target_user__role'
    ]
    search_fields = [
        'actor__email', 'target_user__email', 'description', 'ip_address'
    ]
    ordering = ['-timestamp']
    readonly_fields = [
        'actor', 'target_user', 'action', 'old_values', 'new_values', 
        'description', 'ip_address', 'user_agent', 'timestamp'
    ]
    
    def action_badge(self, obj):
        """Display action as a colored badge"""
        colors = {
            'role_change': '#fd7e14',      # Orange
            'user_create': '#198754',      # Green
            'user_update': '#0d6efd',      # Blue
            'user_delete': '#dc3545',      # Red
            'login_success': '#198754',    # Green
            'login_failure': '#dc3545',    # Red
            'password_change': '#6f42c1',  # Purple
            'account_lock': '#dc3545',     # Red
            'account_unlock': '#198754',   # Green
        }
        color = colors.get(obj.action, '#6c757d')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px;">{}</span>',
            color,
            obj.get_action_display()
        )
    action_badge.short_description = 'Action'
    
    def has_add_permission(self, request):
        """Audit logs cannot be manually created"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Audit logs cannot be modified"""
        return False
    
    def has_delete_permission(self, request, obj=None):
        """Only superusers can delete audit logs"""
        return request.user.is_superuser
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('actor', 'target_user')