"""
API Views for Role-Based Access Control
"""

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .permissions import (
    RoleBasedPermission, AdminRequiredPermission, StaffRequiredPermission,
    RolePermissions, check_user_permission
)
from .mixins import APIRoleRequiredMixin, APIPermissionRequiredMixin
from .serializers import UserSerializer
from .audit import AuditLogger

User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_permissions(request):
    """
    Get current user's permissions
    """
    if not hasattr(request.user, 'role'):
        return Response(
            {'error': 'User role not defined'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    permissions = RolePermissions.get_user_permissions(request.user.role)
    
    return Response({
        'user': request.user.email,
        'role': request.user.get_role_display(),
        'permissions': permissions,
        'can_access_admin': RolePermissions.can_access_admin(request.user.role),
        'can_manage_users': RolePermissions.can_manage_users(request.user.role)
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_permission(request):
    """
    Check if user has specific permission
    """
    resource = request.data.get('resource')
    action = request.data.get('action')
    
    if not resource or not action:
        return Response(
            {'error': 'Both resource and action are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    has_permission = check_user_permission(request.user, resource, action)
    
    return Response({
        'user': request.user.email,
        'role': request.user.get_role_display(),
        'resource': resource,
        'action': action,
        'has_permission': has_permission
    })


class UserListView(APIRoleRequiredMixin, generics.ListAPIView):
    """
    List users - requires staff or admin role
    """
    serializer_class = UserSerializer
    required_roles = ['admin', 'staff']
    
    def get_queryset(self):
        # Admins see all users, staff see non-admin users
        queryset = User.objects.all()
        
        if self.request.user.role == 'staff':
            queryset = queryset.exclude(role='admin')
        
        return queryset.order_by('-created_at')


class UserDetailView(APIPermissionRequiredMixin, generics.RetrieveUpdateAPIView):
    """
    User detail view with permission checking
    """
    serializer_class = UserSerializer
    required_resource = 'user_management'
    required_action = 'read'
    
    def get_queryset(self):
        return User.objects.all()
    
    def get_object(self):
        obj = super().get_object()
        
        # Users can always view/edit their own profile
        if obj == self.request.user:
            return obj
        
        # Check if user has permission to view other users
        if not check_user_permission(self.request.user, 'user_management', 'read'):
            from django.core.exceptions import PermissionDenied
            raise PermissionDenied('You can only view your own profile')
        
        return obj
    
    def perform_update(self, serializer):
        """
        Override to log role changes
        """
        old_role = self.get_object().role
        instance = serializer.save()
        
        # Log role change if it occurred
        if old_role != instance.role:
            AuditLogger.log_role_change(
                actor=self.request.user,
                target_user=instance,
                old_role=old_role,
                new_role=instance.role,
                request=self.request
            )


class RoleChangeView(APIRoleRequiredMixin, generics.UpdateAPIView):
    """
    Change user role - admin only
    """
    serializer_class = UserSerializer
    required_roles = ['admin']
    
    def get_queryset(self):
        return User.objects.all()
    
    def patch(self, request, *args, **kwargs):
        """
        Change user role
        """
        user = self.get_object()
        new_role = request.data.get('role')
        
        if not new_role:
            return Response(
                {'error': 'Role is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if new_role not in dict(User.USER_ROLES):
            return Response(
                {'error': 'Invalid role'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        old_role = user.role
        user.role = new_role
        user.save()
        
        # Log the change
        AuditLogger.log_role_change(
            actor=request.user,
            target_user=user,
            old_role=old_role,
            new_role=new_role,
            request=request
        )
        
        return Response({
            'message': f'Role changed from {old_role} to {new_role}',
            'user': user.email,
            'old_role': old_role,
            'new_role': new_role
        })


@api_view(['GET'])
@permission_classes([AdminRequiredPermission])
def role_permissions_matrix(request):
    """
    Get role permissions matrix - admin only
    """
    matrix = {}
    
    for role_code, role_name in User.USER_ROLES:
        permissions = RolePermissions.get_user_permissions(role_code)
        matrix[role_code] = {
            'name': role_name,
            'permissions': permissions,
            'can_access_admin': RolePermissions.can_access_admin(role_code),
            'can_manage_users': RolePermissions.can_manage_users(role_code)
        }
    
    return Response({
        'roles': matrix,
        'total_roles': len(User.USER_ROLES)
    })


@api_view(['GET'])
@permission_classes([StaffRequiredPermission])
def user_stats(request):
    """
    Get user statistics by role - staff and admin only
    """
    stats = {}
    
    for role_code, role_name in User.USER_ROLES:
        count = User.objects.filter(role=role_code).count()
        active_count = User.objects.filter(role=role_code, is_active=True).count()
        
        stats[role_code] = {
            'name': role_name,
            'total': count,
            'active': active_count,
            'inactive': count - active_count
        }
    
    total_users = User.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    
    return Response({
        'role_stats': stats,
        'total_users': total_users,
        'active_users': active_users,
        'inactive_users': total_users - active_users
    })