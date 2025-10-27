"""
Management command to demonstrate RBAC functionality
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from authentication.permissions import RolePermissions, check_user_permission
from authentication.audit import AuditLogger
from authentication.models import AuditLog

User = get_user_model()


class Command(BaseCommand):
    help = 'Demonstrate Role-Based Access Control (RBAC) functionality'
    
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🎯 CareSpot RBAC System Demo'))
        self.stdout.write('=' * 50)
        
        # Create demo users
        users = self.create_demo_users()
        
        # Demo permissions
        self.demo_permissions()
        
        # Demo user permission checking
        self.demo_user_permission_checking(users)
        
        # Demo role changes
        self.demo_role_changes(users)
        
        # Demo admin capabilities
        self.demo_admin_capabilities(users)
        
        # Show audit trail
        self.demo_audit_trail()
        
        self.stdout.write(self.style.SUCCESS('\n✨ Demo completed! RBAC system is working correctly.'))
        self.stdout.write('\n💡 Key Features Demonstrated:')
        self.stdout.write('   • Role-based permission matrix')
        self.stdout.write('   • User permission checking')
        self.stdout.write('   • Role change functionality')
        self.stdout.write('   • Audit logging for security')
        self.stdout.write('   • Admin interface capabilities')
        self.stdout.write('\n🔧 Management Commands Available:')
        self.stdout.write('   • python manage.py manage_roles list-roles')
        self.stdout.write('   • python manage.py manage_roles list-permissions')
        self.stdout.write('   • python manage.py manage_roles change-role --email user@example.com --role admin')
        self.stdout.write('   • python manage.py manage_roles list-users')
    
    def create_demo_users(self):
        """Create demo users with different roles"""
        self.stdout.write('🔧 Creating demo users...')
        
        users = {}
        roles = ['admin', 'staff', 'volunteer', 'donor', 'public']
        
        for role in roles:
            email = f"{role}@carespot.com"
            try:
                user = User.objects.get(email=email)
                self.stdout.write(f"   ✓ User {email} already exists")
            except User.DoesNotExist:
                user = User.objects.create_user(
                    email=email,
                    username=role,
                    password='demo123',
                    first_name=role.title(),
                    last_name='User',
                    role=role
                )
                self.stdout.write(f"   ✓ Created {role} user: {email}")
            
            users[role] = user
        
        return users
    
    def demo_permissions(self):
        """Demonstrate permission checking"""
        self.stdout.write('\n🔐 Permission Matrix Demo:')
        self.stdout.write('=' * 60)
        
        roles = ['admin', 'staff', 'volunteer', 'donor', 'public']
        
        # Print header
        self.stdout.write(f"{'Role':<12} | {'Resource':<20} | {'Actions'}")
        self.stdout.write('-' * 60)
        
        for role in roles:
            permissions = RolePermissions.get_user_permissions(role)
            if permissions:
                for resource, allowed_actions in permissions.items():
                    actions_str = ', '.join(allowed_actions)
                    self.stdout.write(f"{role:<12} | {resource:<20} | {actions_str}")
            else:
                self.stdout.write(f"{role:<12} | {'No permissions':<20} | ")
            self.stdout.write('-' * 60)
    
    def demo_user_permission_checking(self, users):
        """Demonstrate user permission checking"""
        self.stdout.write('\n👤 User Permission Checking Demo:')
        self.stdout.write('=' * 50)
        
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
            self.stdout.write(f"{role:<10} | {resource:<18} | {action:<8} | {status}")
    
    def demo_role_changes(self, users):
        """Demonstrate role changes with audit logging"""
        self.stdout.write('\n🔄 Role Change Demo with Audit Logging:')
        self.stdout.write('=' * 50)
        
        admin_user = users['admin']
        target_user = users['public']
        
        # Change role from public to volunteer
        old_role = target_user.role
        new_role = 'volunteer'
        
        self.stdout.write(f"Changing {target_user.email} role from {old_role} to {new_role}")
        
        target_user.role = new_role
        target_user.save()
        
        # Log the change
        AuditLogger.log_role_change(
            actor=admin_user,
            target_user=target_user,
            old_role=old_role,
            new_role=new_role
        )
        
        self.stdout.write('✅ Role changed successfully')
        
        # Show audit log
        audit_log = AuditLog.objects.filter(action='role_change').first()
        if audit_log:
            self.stdout.write('📝 Audit Log Created:')
            self.stdout.write(f"   Actor: {audit_log.actor.email}")
            self.stdout.write(f"   Target: {audit_log.target_user.email}")
            self.stdout.write(f"   Action: {audit_log.get_action_display()}")
            self.stdout.write(f"   Old Role: {audit_log.old_values.get('role')}")
            self.stdout.write(f"   New Role: {audit_log.new_values.get('role')}")
            self.stdout.write(f"   Timestamp: {audit_log.timestamp}")
    
    def demo_admin_capabilities(self, users):
        """Demonstrate admin-specific capabilities"""
        self.stdout.write('\n👑 Admin Capabilities Demo:')
        self.stdout.write('=' * 40)
        
        roles = ['admin', 'staff', 'volunteer', 'donor', 'public']
        
        for role in roles:
            can_admin = RolePermissions.can_access_admin(role)
            can_manage = RolePermissions.can_manage_users(role)
            
            admin_status = "✅" if can_admin else "❌"
            manage_status = "✅" if can_manage else "❌"
            
            self.stdout.write(f"{role:<10} | Admin Access: {admin_status} | Manage Users: {manage_status}")
    
    def demo_audit_trail(self):
        """Show recent audit trail"""
        self.stdout.write('\n📋 Recent Audit Trail:')
        self.stdout.write('=' * 70)
        
        recent_logs = AuditLog.objects.all()[:5]
        
        if recent_logs:
            self.stdout.write(f"{'Action':<15} | {'Actor':<20} | {'Target':<20} | {'Time'}")
            self.stdout.write('-' * 70)
            
            for log in recent_logs:
                actor = log.actor.email if log.actor else 'System'
                target = log.target_user.email if log.target_user else 'N/A'
                action = log.get_action_display()
                timestamp = log.timestamp.strftime('%Y-%m-%d %H:%M:%S')
                
                self.stdout.write(f"{action:<15} | {actor:<20} | {target:<20} | {timestamp}")
        else:
            self.stdout.write('No audit logs found')