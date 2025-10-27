"""
Custom User Model with Enhanced Security Features
"""

import uuid
import pyotp
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from datetime import timedelta
from django.core.validators import RegexValidator


class BaseAuditModel(models.Model):
    """
    Abstract base model with audit fields for tracking creation and updates.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class CustomUser(AbstractUser):
    """
    Custom User model with enhanced security features
    """
    USER_ROLES = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('volunteer', 'Volunteer'),
        ('donor', 'Donor'),
        ('public', 'Public'),
    ]
    
    # Basic Information
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        validators=[RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
        )]
    )
    
    # Role and Permissions
    role = models.CharField(max_length=20, choices=USER_ROLES, default='public')
    
    # Security Fields
    is_email_verified = models.BooleanField(default=False)
    email_verification_token = models.CharField(max_length=255, blank=True, null=True)
    email_verification_sent_at = models.DateTimeField(blank=True, null=True)
    
    # Password Reset
    password_reset_token = models.CharField(max_length=255, blank=True, null=True)
    password_reset_sent_at = models.DateTimeField(blank=True, null=True)
    
    # Account Security
    failed_login_attempts = models.PositiveIntegerField(default=0)
    account_locked_until = models.DateTimeField(blank=True, null=True)
    last_login_ip = models.GenericIPAddressField(blank=True, null=True)
    
    # Two-Factor Authentication
    is_2fa_enabled = models.BooleanField(default=False)
    totp_secret = models.CharField(max_length=32, blank=True, null=True)
    backup_codes = models.JSONField(default=list, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_password_change = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    class Meta:
        db_table = 'auth_user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
    
    def is_account_locked(self):
        """Check if account is currently locked"""
        if self.account_locked_until:
            return timezone.now() < self.account_locked_until
        return False
    
    def lock_account(self, duration_minutes=30):
        """Lock account for specified duration"""
        self.account_locked_until = timezone.now() + timedelta(minutes=duration_minutes)
        self.save(update_fields=['account_locked_until'])
    
    def unlock_account(self):
        """Unlock account and reset failed attempts"""
        self.account_locked_until = None
        self.failed_login_attempts = 0
        self.save(update_fields=['account_locked_until', 'failed_login_attempts'])
    
    def increment_failed_login(self):
        """Increment failed login attempts and lock if threshold reached"""
        self.failed_login_attempts += 1
        if self.failed_login_attempts >= 5:
            self.lock_account()
        self.save(update_fields=['failed_login_attempts'])
    
    def reset_failed_login_attempts(self):
        """Reset failed login attempts on successful login"""
        if self.failed_login_attempts > 0:
            self.failed_login_attempts = 0
            self.save(update_fields=['failed_login_attempts'])
    
    def generate_totp_secret(self):
        """Generate TOTP secret for 2FA"""
        if not self.totp_secret:
            self.totp_secret = pyotp.random_base32()
            self.save(update_fields=['totp_secret'])
        return self.totp_secret
    
    def get_totp_uri(self):
        """Get TOTP URI for QR code generation"""
        if not self.totp_secret:
            self.generate_totp_secret()
        
        totp = pyotp.TOTP(self.totp_secret)
        return totp.provisioning_uri(
            name=self.email,
            issuer_name="CareSpot"
        )
    
    def verify_totp(self, token):
        """Verify TOTP token"""
        if not self.totp_secret:
            return False
        
        totp = pyotp.TOTP(self.totp_secret)
        return totp.verify(token, valid_window=1)
    
    def generate_backup_codes(self, count=10):
        """Generate backup codes for 2FA"""
        import secrets
        import string
        
        codes = []
        for _ in range(count):
            code = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(8))
            codes.append(code)
        
        self.backup_codes = codes
        self.save(update_fields=['backup_codes'])
        return codes
    
    def use_backup_code(self, code):
        """Use a backup code and remove it from available codes"""
        if code in self.backup_codes:
            self.backup_codes.remove(code)
            self.save(update_fields=['backup_codes'])
            return True
        return False
    
    def can_reset_password(self):
        """Check if password reset token is still valid"""
        if not self.password_reset_sent_at:
            return False
        
        # Token valid for 1 hour
        expiry_time = self.password_reset_sent_at + timedelta(hours=1)
        return timezone.now() < expiry_time
    
    def can_verify_email(self):
        """Check if email verification token is still valid"""
        if not self.email_verification_sent_at:
            return False
        
        # Token valid for 24 hours
        expiry_time = self.email_verification_sent_at + timedelta(hours=24)
        return timezone.now() < expiry_time
    
    def has_role(self, roles):
        """Check if user has one of the specified roles"""
        if isinstance(roles, str):
            return self.role == roles
        return self.role in roles


class LoginAttempt(models.Model):
    """
    Track login attempts for security monitoring
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    email = models.EmailField()
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    success = models.BooleanField(default=False)
    failure_reason = models.CharField(max_length=100, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'auth_login_attempt'
        ordering = ['-timestamp']
    
    def __str__(self):
        status = "Success" if self.success else f"Failed ({self.failure_reason})"
        return f"{self.email} - {status} - {self.timestamp}"


class RefreshToken(models.Model):
    """
    Custom refresh token model for JWT authentication
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_revoked = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    
    class Meta:
        db_table = 'auth_refresh_token'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.token[:20]}..."
    
    def is_expired(self):
        """Check if token is expired"""
        return timezone.now() > self.expires_at
    
    def revoke(self):
        """Revoke the token"""
        self.is_revoked = True
        self.save(update_fields=['is_revoked'])


class AuditLog(models.Model):
    """
    Audit log for tracking permission and role changes
    """
    ACTION_CHOICES = [
        ('role_change', 'Role Change'),
        ('permission_grant', 'Permission Grant'),
        ('permission_revoke', 'Permission Revoke'),
        ('user_create', 'User Create'),
        ('user_update', 'User Update'),
        ('user_delete', 'User Delete'),
        ('user_activate', 'User Activate'),
        ('user_deactivate', 'User Deactivate'),
        ('login_success', 'Login Success'),
        ('login_failure', 'Login Failure'),
        ('password_change', 'Password Change'),
        ('password_reset', 'Password Reset'),
        ('2fa_enable', '2FA Enable'),
        ('2fa_disable', '2FA Disable'),
        ('account_lock', 'Account Lock'),
        ('account_unlock', 'Account Unlock'),
    ]
    
    # Who performed the action
    actor = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='audit_actions_performed'
    )
    
    # Who was affected by the action
    target_user = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='audit_actions_received'
    )
    
    # What action was performed
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    
    # Details about the change
    old_values = models.JSONField(default=dict, blank=True)
    new_values = models.JSONField(default=dict, blank=True)
    
    # Additional context
    description = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    
    # Timestamp
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'auth_audit_log'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['actor', 'timestamp']),
            models.Index(fields=['target_user', 'timestamp']),
            models.Index(fields=['action', 'timestamp']),
        ]
    
    def __str__(self):
        actor_name = self.actor.email if self.actor else 'System'
        target_name = self.target_user.email if self.target_user else 'N/A'
        return f"{actor_name} -> {self.get_action_display()} -> {target_name} at {self.timestamp}"