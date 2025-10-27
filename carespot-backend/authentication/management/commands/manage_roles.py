"""
Management command for role management operations
"""

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from authentication.audit import AuditLogger
from authentication.permissions import RolePermissions

User = get_user_model()


class Command(BaseCommand):
    help = 'Manage user roles and permissions'
    
    def add_arguments(self, parser):
        parser.add_argument(
            'action',
            choices=['list-roles', 'list-permissions', 'change-role', 'list-users', 'user-permissions'],
            help='Action to perform'
        )
        
        parser.add_argument(
            '--email',
            type=str,
            help='User email for role operations'
        )
        
        parser.add_argument(
            '--role',
            choices=['admin', 'staff', 'volunteer', 'donor', 'public'],
            help='Role to assign to user'
        )
        
        parser.add_argument(
            '--filter-role',
            choices=['admin', 'staff', 'volunteer', 'donor', 'public'],
            help='Filter users by role'
        )
    
    def handle(self, *args, **options):
        action = options['action']
        
        if action == 'list-roles':
            self.list_roles()
        elif action == 'list-permissions':
            self.list_permissions()
        elif action == 'change-role':
            self.change_user_role(options['email'], options['role'])
        elif action == 'list-users':
            self.list_users(options.get('filter_role'))
        elif action == 'user-permissions':
            self.show_user_permissions(options['email'])
    
    def list_roles(self):
        """List all available roles"""
        self.stdout.write(self.style.SUCCESS('Available Roles:'))
        self.stdout.write('-' * 50)
        
        for role_code, role_name in User.USER_ROLES:
            user_count = User.objects.filter(role=role_code).count()
            self.stdout.write(f"{role_code.upper():<12} | {role_name:<15} | {user_count} users")
    
    def list_permissions(self):
        """List permissions for all roles"""
        self.stdout.write(self.style.SUCCESS('Role Permissions Matrix:'))
        self.stdout.write('=' * 80)
        
        for role_code, role_name in User.USER_ROLES:
            self.stdout.write(f"\n{role_name.upper()} ({role_code}):")
            self.stdout.write('-' * 40)
            
            permissions = RolePermissions.get_user_permissions(role_code)
            if not permissions:
                self.stdout.write("  No specific permissions defined")
                continue
            
            for resource, actions in permissions.items():
                actions_str = ', '.join(actions)
                self.stdout.write(f"  {resource:<25} | {actions_str}")
    
    def change_user_role(self, email, new_role):
        """Change user role"""
        if not email or not new_role:
            raise CommandError('Both --email and --role are required for change-role action')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise CommandError(f'User with email {email} does not exist')
        
        old_role = user.role
        if old_role == new_role:
            self.stdout.write(
                self.style.WARNING(f'User {email} already has role {new_role}')
            )
            return
        
        # Change role
        user.role = new_role
        user.save()
        
        # Log the change
        AuditLogger.log_role_change(
            actor=None,  # System/Command
            target_user=user,
            old_role=old_role,
            new_role=new_role
        )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully changed role for {email} from {old_role} to {new_role}'
            )
        )
    
    def list_users(self, filter_role=None):
        """List users with their roles"""
        queryset = User.objects.all().order_by('role', 'email')
        
        if filter_role:
            queryset = queryset.filter(role=filter_role)
            self.stdout.write(self.style.SUCCESS(f'Users with role: {filter_role}'))
        else:
            self.stdout.write(self.style.SUCCESS('All Users:'))
        
        self.stdout.write('-' * 80)
        self.stdout.write(f"{'Email':<30} | {'Role':<12} | {'Active':<8} | {'2FA':<5} | {'Last Login'}")
        self.stdout.write('-' * 80)
        
        for user in queryset:
            last_login = user.last_login.strftime('%Y-%m-%d %H:%M') if user.last_login else 'Never'
            active_status = 'Yes' if user.is_active else 'No'
            tfa_status = 'Yes' if user.is_2fa_enabled else 'No'
            
            self.stdout.write(
                f"{user.email:<30} | {user.role:<12} | {active_status:<8} | {tfa_status:<5} | {last_login}"
            )
        
        total_count = queryset.count()
        self.stdout.write('-' * 80)
        self.stdout.write(f"Total: {total_count} users")
    
    def show_user_permissions(self, email):
        """Show permissions for a specific user"""
        if not email:
            raise CommandError('--email is required for user-permissions action')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise CommandError(f'User with email {email} does not exist')
        
        self.stdout.write(self.style.SUCCESS(f'Permissions for {user.email} (Role: {user.get_role_display()}):'))
        self.stdout.write('-' * 60)
        
        permissions = RolePermissions.get_user_permissions(user.role)
        if not permissions:
            self.stdout.write("No specific permissions defined for this role")
            return
        
        for resource, actions in permissions.items():
            actions_str = ', '.join(actions)
            self.stdout.write(f"{resource:<25} | {actions_str}")
        
        # Show additional capabilities
        self.stdout.write('\nAdditional Capabilities:')
        self.stdout.write('-' * 30)
        
        can_admin = RolePermissions.can_access_admin(user.role)
        can_manage_users = RolePermissions.can_manage_users(user.role)
        
        self.stdout.write(f"Can access admin interface: {'Yes' if can_admin else 'No'}")
        self.stdout.write(f"Can manage other users: {'Yes' if can_manage_users else 'No'}")