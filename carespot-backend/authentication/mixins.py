"""
View mixins for role-based access control
"""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from .permissions import RolePermissions, check_user_permission


class RoleRequiredMixin(LoginRequiredMixin):
    """
    Mixin that requires specific roles for access
    """
    required_roles = []
    
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()
        
        if not hasattr(request.user, 'role'):
            raise PermissionDenied('User role not defined')
        
        if self.required_roles and request.user.role not in self.required_roles:
            raise PermissionDenied(
                f'Access denied. Required roles: {", ".join(self.required_roles)}'
            )
        
        return super().dispatch(request, *args, **kwargs)


class PermissionRequiredMixin(LoginRequiredMixin):
    """
    Mixin that requires specific permissions for access
    """
    required_resource = None
    required_action = None
    
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()
        
        if not self.check_permission(request.user):
            raise PermissionDenied(
                f'Permission denied for {self.required_action} on {self.required_resource}'
            )
        
        return super().dispatch(request, *args, **kwargs)
    
    def check_permission(self, user):
        """
        Check if user has required permission
        """
        if not self.required_resource or not self.required_action:
            return True
        
        return check_user_permission(user, self.required_resource, self.required_action)


class AdminRequiredMixin(RoleRequiredMixin):
    """
    Mixin that requires admin role
    """
    required_roles = ['admin']


class StaffRequiredMixin(RoleRequiredMixin):
    """
    Mixin that requires staff or admin role
    """
    required_roles = ['admin', 'staff']


class VolunteerRequiredMixin(RoleRequiredMixin):
    """
    Mixin that requires volunteer, staff, or admin role
    """
    required_roles = ['admin', 'staff', 'volunteer']


class APIRoleRequiredMixin:
    """
    DRF mixin for role-based access control
    """
    required_roles = []
    
    def check_permissions(self, request):
        super().check_permissions(request)
        
        if not request.user or not request.user.is_authenticated:
            self.permission_denied(request, message='Authentication required')
        
        if not hasattr(request.user, 'role'):
            self.permission_denied(request, message='User role not defined')
        
        if self.required_roles and request.user.role not in self.required_roles:
            self.permission_denied(
                request, 
                message=f'Access denied. Required roles: {", ".join(self.required_roles)}'
            )


class APIPermissionRequiredMixin:
    """
    DRF mixin for permission-based access control
    """
    required_resource = None
    required_action = None
    
    def check_permissions(self, request):
        super().check_permissions(request)
        
        if not request.user or not request.user.is_authenticated:
            self.permission_denied(request, message='Authentication required')
        
        if not self.check_user_permission(request.user):
            self.permission_denied(
                request,
                message=f'Permission denied for {self.required_action} on {self.required_resource}'
            )
    
    def check_user_permission(self, user):
        """
        Check if user has required permission
        """
        if not self.required_resource or not self.required_action:
            return True
        
        return check_user_permission(user, self.required_resource, self.required_action)


class OwnershipMixin:
    """
    Mixin to check object ownership
    """
    ownership_field = 'user'
    
    def check_object_ownership(self, obj, user):
        """
        Check if user owns the object
        """
        if hasattr(obj, self.ownership_field):
            return getattr(obj, self.ownership_field) == user
        return False
    
    def get_object(self):
        """
        Override to check ownership
        """
        obj = super().get_object()
        
        # Admins can access everything
        if self.request.user.role == 'admin':
            return obj
        
        # Staff can access most objects
        if self.request.user.role == 'staff':
            return obj
        
        # Others can only access their own objects
        if not self.check_object_ownership(obj, self.request.user):
            raise PermissionDenied('You can only access your own objects')
        
        return obj


class RoleBasedQuerysetMixin:
    """
    Mixin to filter queryset based on user role
    """
    
    def get_queryset(self):
        """
        Filter queryset based on user role
        """
        queryset = super().get_queryset()
        
        if not self.request.user.is_authenticated:
            return queryset.none()
        
        # Admins see everything
        if self.request.user.role == 'admin':
            return queryset
        
        # Staff see most things
        if self.request.user.role == 'staff':
            return queryset
        
        # Others see only their own objects
        if hasattr(queryset.model, 'user'):
            return queryset.filter(user=self.request.user)
        
        return queryset


class AuditMixin:
    """
    Mixin to add audit logging to views
    """
    
    def log_action(self, action, target_user=None, old_values=None, new_values=None, description=None):
        """
        Log an audit action
        """
        from .audit import AuditLogger
        
        # This would need to be implemented based on the specific action
        # For now, we'll create a generic log entry
        if hasattr(AuditLogger, f'log_{action}'):
            log_method = getattr(AuditLogger, f'log_{action}')
            log_method(
                actor=self.request.user,
                target_user=target_user,
                request=self.request
            )


class PermissionCheckMixin:
    """
    Mixin to add permission checking methods to views
    """
    
    def user_has_permission(self, resource, action, user=None):
        """
        Check if user has specific permission
        """
        user = user or self.request.user
        return check_user_permission(user, resource, action)
    
    def require_permission(self, resource, action, user=None):
        """
        Require permission or raise PermissionDenied
        """
        user = user or self.request.user
        if not self.user_has_permission(resource, action, user):
            raise PermissionDenied(
                f'Permission denied for {action} on {resource}'
            )
    
    def get_user_permissions(self, user=None):
        """
        Get user's permissions
        """
        user = user or self.request.user
        if not user.is_authenticated or not hasattr(user, 'role'):
            return {}
        
        return RolePermissions.get_user_permissions(user.role)