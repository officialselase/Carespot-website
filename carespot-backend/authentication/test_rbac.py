"""
Tests for Role-Based Access Control (RBAC) System
"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from .permissions import RolePermissions, check_user_permission
from .audit import AuditLogger
from .models import AuditLog

User = get_user_model()


class RolePermissionsTest(TestCase):
    """
    Test role permissions matrix
    """
    
    def test_admin_permissions(self):
        """Test admin role has all permissions"""
        self.assertTrue(RolePermissions.has_permission('admin', 'user_management', 'create'))
        self.assertTrue(RolePermissions.has_permission('admin', 'user_management', 'delete'))
        self.assertTrue(RolePermissions.has_permission('admin', 'system_settings', 'update'))
        self.assertTrue(RolePermissions.can_access_admin('admin'))
        self.assertTrue(RolePermissions.can_manage_users('admin'))
    
    def test_staff_permissions(self):
        """Test staff role has limited permissions"""
        self.assertTrue(RolePermissions.has_permission('staff', 'user_management', 'read'))
        self.assertFalse(RolePermissions.has_permission('staff', 'user_management', 'delete'))
        self.assertFalse(RolePermissions.has_permission('staff', 'system_settings', 'update'))
        self.assertTrue(RolePermissions.can_access_admin('staff'))
        self.assertTrue(RolePermissions.can_manage_users('staff'))
    
    def test_volunteer_permissions(self):
        """Test volunteer role has basic permissions"""
        self.assertTrue(RolePermissions.has_permission('volunteer', 'content_management', 'read'))
        self.assertFalse(RolePermissions.has_permission('volunteer', 'user_management', 'read'))
        self.assertFalse(RolePermissions.can_access_admin('volunteer'))
        self.assertFalse(RolePermissions.can_manage_users('volunteer'))
    
    def test_donor_permissions(self):
        """Test donor role permissions"""
        self.assertTrue(RolePermissions.has_permission('donor', 'donation_management', 'create'))
        self.assertFalse(RolePermissions.has_permission('donor', 'user_management', 'read'))
        self.assertFalse(RolePermissions.can_access_admin('donor'))
    
    def test_public_permissions(self):
        """Test public role has minimal permissions"""
        self.assertTrue(RolePermissions.has_permission('public', 'content_management', 'read'))
        self.assertFalse(RolePermissions.has_permission('public', 'donation_management', 'create'))
        self.assertFalse(RolePermissions.can_access_admin('public'))


class UserRoleTest(TestCase):
    """
    Test user role functionality
    """
    
    def setUp(self):
        self.admin_user = User.objects.create_user(
            email='admin@test.com',
            username='admin',
            password='testpass123',
            role='admin'
        )
        self.staff_user = User.objects.create_user(
            email='staff@test.com',
            username='staff',
            password='testpass123',
            role='staff'
        )
        self.volunteer_user = User.objects.create_user(
            email='volunteer@test.com',
            username='volunteer',
            password='testpass123',
            role='volunteer'
        )
    
    def test_user_role_assignment(self):
        """Test user role assignment"""
        self.assertEqual(self.admin_user.role, 'admin')
        self.assertEqual(self.staff_user.role, 'staff')
        self.assertEqual(self.volunteer_user.role, 'volunteer')
    
    def test_user_permission_checking(self):
        """Test user permission checking"""
        self.assertTrue(check_user_permission(self.admin_user, 'user_management', 'delete'))
        self.assertFalse(check_user_permission(self.staff_user, 'user_management', 'delete'))
        self.assertFalse(check_user_permission(self.volunteer_user, 'user_management', 'read'))
    
    def test_role_display(self):
        """Test role display names"""
        self.assertEqual(self.admin_user.get_role_display(), 'Admin')
        self.assertEqual(self.staff_user.get_role_display(), 'Staff')
        self.assertEqual(self.volunteer_user.get_role_display(), 'Volunteer')


class AuditLogTest(TestCase):
    """
    Test audit logging functionality
    """
    
    def setUp(self):
        self.admin_user = User.objects.create_user(
            email='admin@test.com',
            username='admin',
            password='testpass123',
            role='admin'
        )
        self.target_user = User.objects.create_user(
            email='target@test.com',
            username='target',
            password='testpass123',
            role='public'
        )
    
    def test_role_change_logging(self):
        """Test role change audit logging"""
        AuditLogger.log_role_change(
            actor=self.admin_user,
            target_user=self.target_user,
            old_role='public',
            new_role='volunteer'
        )
        
        audit_log = AuditLog.objects.first()
        self.assertIsNotNone(audit_log)
        self.assertEqual(audit_log.action, 'role_change')
        self.assertEqual(audit_log.actor, self.admin_user)
        self.assertEqual(audit_log.target_user, self.target_user)
        self.assertEqual(audit_log.old_values['role'], 'public')
        self.assertEqual(audit_log.new_values['role'], 'volunteer')
    
    def test_user_creation_logging(self):
        """Test user creation audit logging"""
        AuditLogger.log_user_creation(
            actor=self.admin_user,
            target_user=self.target_user
        )
        
        audit_log = AuditLog.objects.first()
        self.assertIsNotNone(audit_log)
        self.assertEqual(audit_log.action, 'user_create')
        self.assertEqual(audit_log.actor, self.admin_user)
        self.assertEqual(audit_log.target_user, self.target_user)
    
    def test_login_attempt_logging(self):
        """Test login attempt audit logging"""
        AuditLogger.log_login_attempt(
            user=self.target_user,
            success=True
        )
        
        audit_log = AuditLog.objects.first()
        self.assertIsNotNone(audit_log)
        self.assertEqual(audit_log.action, 'login_success')
        self.assertEqual(audit_log.target_user, self.target_user)


class RBACAPITest(APITestCase):
    """
    Test RBAC API endpoints
    """
    
    def setUp(self):
        self.admin_user = User.objects.create_user(
            email='admin@test.com',
            username='admin',
            password='testpass123',
            role='admin'
        )
        self.staff_user = User.objects.create_user(
            email='staff@test.com',
            username='staff',
            password='testpass123',
            role='staff'
        )
        self.volunteer_user = User.objects.create_user(
            email='volunteer@test.com',
            username='volunteer',
            password='testpass123',
            role='volunteer'
        )
    
    def test_user_permissions_endpoint(self):
        """Test user permissions API endpoint"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/auth/api/permissions/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['role'], 'Admin')
        self.assertTrue(response.data['can_access_admin'])
        self.assertTrue(response.data['can_manage_users'])
    
    def test_check_permission_endpoint(self):
        """Test check permission API endpoint"""
        self.client.force_authenticate(user=self.staff_user)
        response = self.client.post('/api/auth/api/check-permission/', {
            'resource': 'user_management',
            'action': 'read'
        })
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['has_permission'])
        
        # Test permission denied
        response = self.client.post('/api/auth/api/check-permission/', {
            'resource': 'system_settings',
            'action': 'update'
        })
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data['has_permission'])
    
    def test_user_list_access_control(self):
        """Test user list endpoint access control"""
        # Admin should have access
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/auth/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Staff should have access
        self.client.force_authenticate(user=self.staff_user)
        response = self.client.get('/api/auth/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Volunteer should not have access
        self.client.force_authenticate(user=self.volunteer_user)
        response = self.client.get('/api/auth/api/users/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_role_change_access_control(self):
        """Test role change endpoint access control"""
        # Admin should be able to change roles
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.patch(f'/api/auth/api/users/{self.volunteer_user.id}/change-role/', {
            'role': 'staff'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Staff should not be able to change roles
        self.client.force_authenticate(user=self.staff_user)
        response = self.client.patch(f'/api/auth/api/users/{self.volunteer_user.id}/change-role/', {
            'role': 'admin'
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_role_permissions_matrix_access(self):
        """Test role permissions matrix endpoint access"""
        # Admin should have access
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/auth/api/role-permissions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('roles', response.data)
        
        # Staff should not have access
        self.client.force_authenticate(user=self.staff_user)
        response = self.client.get('/api/auth/api/role-permissions/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)