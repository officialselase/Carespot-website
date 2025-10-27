"""
Role-Based Access Control (RBAC) System
"""

from functools import wraps
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser


class RolePermissions:
    """
    Define permission matrix for different user roles
    """
    
    # Define permissions for each role
    ROLE_PERMISSIONS = {
        'admin': {
            'user_management': ['create', 'read', 'update', 'delete'],
            'content_management': ['create', 'read', 'update', 'delete'],
            'donation_management': ['create', 'read', 'update', 'delete'],
            'volunteer_management': ['create', 'read', 'update', 'delete'],
            'system_settings': ['create', 'read', 'update', 'delete'],
            'audit_logs': ['read'],
            'reports': ['read', 'export'],
        },
        'staff': {
            'user_management': ['read', 'update'],
            'content_management': ['create', 'read', 'update'],
            'donation_management': ['read', 'update'],
            'volunteer_management': ['create', 'read', 'update'],
            'system_settings': ['read'],
            'reports': ['read'],
        },
        'volunteer': {
            'content_management': ['read'],
            'donation_management': ['read'],
            'volunteer_management': ['read', 'update'],  # Can update own profile
            'profile_management': ['read', 'update'],
        },
        'donor': {
            'content_management': ['read'],
            'donation_management': ['create', 'read'],  # Can make and view own donations
            'profile_management': ['read', 'update'],
        },
        'public': {
            'content_management': ['read'],  # Can only view public content
        }
    }
    
    @classmethod
    def has_permission(cls, user_role, resource, action):
        """
        Check if a role has permission for a specific resource and action
        """
        if user_role not in cls.ROLE_PERMISSIONS:
            return False
        
        role_perms = cls.ROLE_PERMISSIONS[user_role]
        if resource not in role_perms:
            return False
        
        return action in role_perms[resource]
    
    @classmethod
    def get_user_permissions(cls, user_role):
        """
        Get all permissions for a specific role
        """
        return cls.ROLE_PERMISSIONS.get(user_role, {})
    
    @classmethod
    def can_access_admin(cls, user_role):
        """
        Check if role can access admin interface
        """
        return user_role in ['admin', 'staff']
    
    @classmethod
    def can_manage_users(cls, user_role):
        """
        Check if role can manage other users
        """
        return cls.has_permission(user_role, 'user_management', 'update')


def require_role(*allowed_roles):
    """
    Decorator to require specific roles for view access
    """
    def decorator(view_func):
        @wraps(view_func)
        @login_required
        def _wrapped_view(request, *args, **kwargs):
            if not hasattr(request.user, 'role'):
                return JsonResponse({'error': 'User role not defined'}, status=403)
            
            if request.user.role not in allowed_roles:
                return JsonResponse({
                    'error': 'Insufficient permissions',
                    'required_roles': list(allowed_roles),
                    'user_role': request.user.role
                }, status=403)
            
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator


def require_permission(resource, action):
    """
    Decorator to require specific permission for view access
    """
    def decorator(view_func):
        @wraps(view_func)
        @login_required
        def _wrapped_view(request, *args, **kwargs):
            if not hasattr(request.user, 'role'):
                return JsonResponse({'error': 'User role not defined'}, status=403)
            
            if not RolePermissions.has_permission(request.user.role, resource, action):
                return JsonResponse({
                    'error': f'Permission denied for {action} on {resource}',
                    'user_role': request.user.role
                }, status=403)
            
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator


class RoleBasedPermission(BasePermission):
    """
    DRF Permission class for role-based access control
    """
    
    def __init__(self, allowed_roles=None, resource=None, action=None):
        self.allowed_roles = allowed_roles or []
        self.resource = resource
        self.action = action
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        if not hasattr(request.user, 'role'):
            return False
        
        # Check role-based access
        if self.allowed_roles and request.user.role not in self.allowed_roles:
            return False
        
        # Check permission-based access
        if self.resource and self.action:
            return RolePermissions.has_permission(
                request.user.role, self.resource, self.action
            )
        
        return True
    
    def has_object_permission(self, request, view, obj):
        """
        Object-level permissions
        """
        if not self.has_permission(request, view):
            return False
        
        # Users can always access their own objects
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
        
        # Admins can access everything
        if request.user.role == 'admin':
            return True
        
        # Staff can access most objects
        if request.user.role == 'staff':
            return True
        
        return False


class AdminRequiredPermission(RoleBasedPermission):
    """
    Permission class that requires admin role
    """
    def __init__(self):
        super().__init__(allowed_roles=['admin'])


class StaffRequiredPermission(RoleBasedPermission):
    """
    Permission class that requires staff or admin role
    """
    def __init__(self):
        super().__init__(allowed_roles=['admin', 'staff'])


class VolunteerRequiredPermission(RoleBasedPermission):
    """
    Permission class that requires volunteer, staff, or admin role
    """
    def __init__(self):
        super().__init__(allowed_roles=['admin', 'staff', 'volunteer'])


def check_user_permission(user, resource, action):
    """
    Utility function to check user permissions
    """
    if not user or not user.is_authenticated:
        return False
    
    if not hasattr(user, 'role'):
        return False
    
    return RolePermissions.has_permission(user.role, resource, action)


def get_user_accessible_resources(user):
    """
    Get all resources accessible to a user
    """
    if not user or not user.is_authenticated or not hasattr(user, 'role'):
        return {}
    
    return RolePermissions.get_user_permissions(user.role)


class PermissionMixin:
    """
    Mixin to add permission checking to views
    """
    
    def check_permission(self, resource, action):
        """
        Check if current user has permission
        """
        return check_user_permission(self.request.user, resource, action)
    
    def require_permission(self, resource, action):
        """
        Require permission or raise PermissionDenied
        """
        if not self.check_permission(resource, action):
            raise PermissionDenied(
                f'Permission denied for {action} on {resource}'
            )
    
    def get_user_permissions(self):
        """
        Get current user's permissions
        """
        return get_user_accessible_resources(self.request.user)


class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        
        # Write permissions are only allowed to the owner of the object.
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'author'):
            return obj.author == request.user
        elif hasattr(obj, 'donor'):
            return obj.donor == request.user
        elif hasattr(obj, 'volunteer'):
            return obj.volunteer == request.user
        elif hasattr(obj, 'created_by'):
            return obj.created_by == request.user
        
        # If no ownership field found, allow access for staff/admin
        return request.user.has_role(['admin', 'staff'])


class HasRolePermission(BasePermission):
    """
    Permission class that checks if user has one of the required roles.
    """
    
    def __init__(self, allowed_roles):
        self.allowed_roles = allowed_roles
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        if not hasattr(request.user, 'role'):
            return False
        
        return request.user.role in self.allowed_roles
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)