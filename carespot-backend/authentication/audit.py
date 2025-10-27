"""
Audit Logging System for Permission Changes
"""

from django.contrib.auth import get_user_model
from django.utils import timezone
import json

User = get_user_model()


class AuditLogger:
    """
    Utility class for logging audit events
    """
    
    @staticmethod
    def log_role_change(actor, target_user, old_role, new_role, request=None):
        """
        Log role change event
        """
        from .models import AuditLog
        return AuditLog.objects.create(
            actor=actor,
            target_user=target_user,
            action='role_change',
            old_values={'role': old_role},
            new_values={'role': new_role},
            description=f"Role changed from {old_role} to {new_role}",
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_user_creation(actor, target_user, request=None):
        """
        Log user creation event
        """
        from .models import AuditLog
        return AuditLog.objects.create(
            actor=actor,
            target_user=target_user,
            action='user_create',
            new_values={
                'email': target_user.email,
                'role': target_user.role,
                'is_active': target_user.is_active
            },
            description=f"User {target_user.email} created with role {target_user.role}",
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_user_update(actor, target_user, old_values, new_values, request=None):
        """
        Log user update event
        """
        from .models import AuditLog
        return AuditLog.objects.create(
            actor=actor,
            target_user=target_user,
            action='user_update',
            old_values=old_values,
            new_values=new_values,
            description=f"User {target_user.email} updated",
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_user_activation(actor, target_user, is_active, request=None):
        """
        Log user activation/deactivation event
        """
        from .models import AuditLog
        action = 'user_activate' if is_active else 'user_deactivate'
        description = f"User {target_user.email} {'activated' if is_active else 'deactivated'}"
        
        return AuditLog.objects.create(
            actor=actor,
            target_user=target_user,
            action=action,
            new_values={'is_active': is_active},
            description=description,
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_login_attempt(user, success, failure_reason=None, request=None):
        """
        Log login attempt
        """
        from .models import AuditLog
        action = 'login_success' if success else 'login_failure'
        description = 'Successful login' if success else f'Failed login: {failure_reason}'
        
        return AuditLog.objects.create(
            target_user=user,
            action=action,
            description=description,
            new_values={'success': success, 'failure_reason': failure_reason},
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_password_change(user, request=None):
        """
        Log password change event
        """
        from .models import AuditLog
        return AuditLog.objects.create(
            actor=user,
            target_user=user,
            action='password_change',
            description=f"Password changed for {user.email}",
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_password_reset(user, request=None):
        """
        Log password reset event
        """
        from .models import AuditLog
        return AuditLog.objects.create(
            target_user=user,
            action='password_reset',
            description=f"Password reset for {user.email}",
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_2fa_change(user, enabled, request=None):
        """
        Log 2FA enable/disable event
        """
        from .models import AuditLog
        action = '2fa_enable' if enabled else '2fa_disable'
        description = f"2FA {'enabled' if enabled else 'disabled'} for {user.email}"
        
        return AuditLog.objects.create(
            actor=user,
            target_user=user,
            action=action,
            new_values={'is_2fa_enabled': enabled},
            description=description,
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_account_lock(user, locked, request=None):
        """
        Log account lock/unlock event
        """
        from .models import AuditLog
        action = 'account_lock' if locked else 'account_unlock'
        description = f"Account {'locked' if locked else 'unlocked'} for {user.email}"
        
        return AuditLog.objects.create(
            target_user=user,
            action=action,
            new_values={'account_locked': locked},
            description=description,
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def log_permission_change(actor, target_user, resource, action_type, granted, request=None):
        """
        Log permission grant/revoke event
        """
        from .models import AuditLog
        action = 'permission_grant' if granted else 'permission_revoke'
        description = f"Permission {'granted' if granted else 'revoked'}: {action_type} on {resource} for {target_user.email}"
        
        return AuditLog.objects.create(
            actor=actor,
            target_user=target_user,
            action=action,
            new_values={
                'resource': resource,
                'action_type': action_type,
                'granted': granted
            },
            description=description,
            ip_address=AuditLogger._get_ip(request),
            user_agent=AuditLogger._get_user_agent(request)
        )
    
    @staticmethod
    def _get_ip(request):
        """
        Extract IP address from request
        """
        if not request:
            return None
        
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
    
    @staticmethod
    def _get_user_agent(request):
        """
        Extract user agent from request
        """
        if not request:
            return ''
        return request.META.get('HTTP_USER_AGENT', '')


def audit_user_changes(sender, instance, created, **kwargs):
    """
    Signal handler to audit user model changes
    """
    if created:
        # Log user creation
        AuditLogger.log_user_creation(
            actor=None,  # System created
            target_user=instance
        )
    else:
        # Log user updates
        if hasattr(instance, '_old_values'):
            old_values = instance._old_values
            new_values = {}
            
            # Check for role changes
            if 'role' in old_values and old_values['role'] != instance.role:
                AuditLogger.log_role_change(
                    actor=None,  # Will be set by the view
                    target_user=instance,
                    old_role=old_values['role'],
                    new_role=instance.role
                )
                new_values['role'] = instance.role
            
            # Check for activation changes
            if 'is_active' in old_values and old_values['is_active'] != instance.is_active:
                AuditLogger.log_user_activation(
                    actor=None,  # Will be set by the view
                    target_user=instance,
                    is_active=instance.is_active
                )
                new_values['is_active'] = instance.is_active
            
            # Log general updates if there are changes
            if new_values:
                AuditLogger.log_user_update(
                    actor=None,  # Will be set by the view
                    target_user=instance,
                    old_values=old_values,
                    new_values=new_values
                )