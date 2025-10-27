#!/usr/bin/env python
"""
Demo script to showcase Role-Based Access Control (RBAC) functionality
"""

import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'carespot.settings')
django.setup()

from django.contrib.auth import get_user_model
from authentication.permissions import RolePermissions, check_user_permission
from authentication.audit import AuditLogger
from authentication.models import AuditLog

User = get_user_model()

def create_demo_users():
    """Create demo users with different roles"""
    print("🔧 Creating demo users...")
    
    # Create users with different roles
    users = {}
    
    roles = ['admin', 'staff', 'volunteer', 'donor', 'public']
    for role in roles:
        email = f"{role}@carespot.com"
        try:
            user = User.objects.get(email=email)
            print(f"   ✓ User {email} already exists")
        except User.DoesNotExist:
            user = User.objects.create_user(
                email=email,
                username=role,
                password='demo123',
                first_name=role.title(),
                last_name='User',
                role=role
            )
            print(f"   ✓ Created {role} user: {email}")
        
        users[role] = user
    
    return users

def demo_permissions():
    """Demonstrate permission checking"""
    print("\n🔐 Permission Matrix Demo:")
    print("=" * 60)
    
    resources = ['user_management', 'content_management', 'donation_management', 'system_settings']
    actions = ['create', 'read', 'update', 'delete']
    roles = ['admin', 'staff', 'volunteer', 'donor', 'public']
    
    # Print header
    print(f"{'Role':<12} | {'Resource':<20} | {'Actions'}")
    print("-" * 60)
    
    for role in roles:
        permissions = RolePermissions.get_user_permissions(role)
        if permissions:
            for resource, allowed_actions in permissions.items():
                actions_str = ', '.join(allowed_actions)
                print(f"{role:<12} | {resource:<20} | {actions_str}")
        else:
            print(f"{role:<12} | {'No permissions':<20} | ")
        print("-" * 60)

def demo_user_permission_checking(users):
    """Demonstrate user permission checking"""
    print("\n👤 User Permission Checking Demo:")
    print("=" * 50)
    
    test_cases = [
        ('admin', 'user_management', 'delete'),
        ('staff', 'user_management', 'delete'),
        ('volunteer', 'content_management', 'read'),
        ('donor', 'donation_management', 'create'),
        ('public', 'system_settings', 'read'),
    ]
    
    for role, resource, action in test_cases:
        user = users[role]
        has_permission = check_user_permission(user, resource, action)
        status = "✅ ALLOWED" if has_permission else "❌ DENIED"
        print(f"{role:<10} | {resource:<18} | {action:<8} | {status}")

def demo_role_changes(users):
    """Demonstrate role changes with audit logging"""
    print("\n🔄 Role Change Demo with Audit Logging:")
    print("=" * 50)
    
    admin_user = users['admin']
    target_user = users['public']
    
    # Change role from public to volunteer
    old_role = target_user.role
    new_role = 'volunteer'
    
    print(f"Changing {target_user.email} role from {old_role} to {new_role}")
    
    target_user.role = new_role
    target_user.save()
    
    # Log the change
    AuditLogger.log_role_change(
        actor=admin_user,
        target_user=target_user,
        old_role=old_role,
        new_role=new_role
    )
    
    print(f"✅ Role changed successfully")
    
    # Show audit log
    audit_log = AuditLog.objects.filter(action='role_change').first()
    if audit_log:
        print(f"📝 Audit Log Created:")
        print(f"   Actor: {audit_log.actor.email}")
        print(f"   Target: {audit_log.target_user.email}")
        print(f"   Action: {audit_log.get_action_display()}")
        print(f"   Old Role: {audit_log.old_values.get('role')}")
        print(f"   New Role: {audit_log.new_values.get('role')}")
        print(f"   Timestamp: {audit_log.timestamp}")

def demo_admin_capabilities(users):
    """Demonstrate admin-specific capabilities"""
    print("\n👑 Admin Capabilities Demo:")
    print("=" * 40)
    
    roles = ['admin', 'staff', 'volunteer', 'donor', 'public']
    
    for role in roles:
        can_admin = RolePermissions.can_access_admin(role)
        can_manage = RolePermissions.can_manage_users(role)
        
        admin_status = "✅" if can_admin else "❌"
        manage_status = "✅" if can_manage else "❌"
        
        print(f"{role:<10} | Admin Access: {admin_status} | Manage Users: {manage_status}")

def demo_audit_trail():
    """Show recent audit trail"""
    print("\n📋 Recent Audit Trail:")
    print("=" * 70)
    
    recent_logs = AuditLog.objects.all()[:5]
    
    if recent_logs:
        print(f"{'Action':<15} | {'Actor':<20} | {'Target':<20} | {'Time'}")
        print("-" * 70)
        
        for log in recent_logs:
            actor = log.actor.email if log.actor else 'System'
            target = log.target_user.email if log.target_user else 'N/A'
            action = log.get_action_display()
            timestamp = log.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            
            print(f"{action:<15} | {actor:<20} | {target:<20} | {timestamp}")
    else:
        print("No audit logs found")

def main():
    """Main demo function"""
    print("🎯 CareSpot RBAC System Demo")
    print("=" * 50)
    
    # Create demo users
    users = create_demo_users()
    
    # Demo permissions
    demo_permissions()
    
    # Demo user permission checking
    demo_user_permission_checking(users)
    
    # Demo role changes
    demo_role_changes(users)
    
    # Demo admin capabilities
    demo_admin_capabilities(users)
    
    # Show audit trail
    demo_audit_trail()
    
    print("\n✨ Demo completed! RBAC system is working correctly.")
    print("\n💡 Key Features Demonstrated:")
    print("   • Role-based permission matrix")
    print("   • User permission checking")
    print("   • Role change functionality")
    print("   • Audit logging for security")
    print("   • Admin interface capabilities")
    print("\n🔧 Management Commands Available:")
    print("   • python manage.py manage_roles list-roles")
    print("   • python manage.py manage_roles list-permissions")
    print("   • python manage.py manage_roles change-role --email user@example.com --role admin")
    print("   • python manage.py manage_roles list-users")

if __name__ == '__main__':
    main()