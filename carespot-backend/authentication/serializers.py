"""
Authentication Serializers
"""

from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import CustomUser
from .email_utils import EmailVerificationManager, PasswordResetManager


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    User registration serializer
    """
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = [
            'email', 'username', 'first_name', 'last_name',
            'phone_number', 'password', 'password_confirm'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        user = CustomUser.objects.create_user(
            password=password,
            **validated_data
        )
        
        # Send verification email
        EmailVerificationManager.send_verification_email(
            user, 
            self.context.get('request')
        )
        
        return user


class UserLoginSerializer(serializers.Serializer):
    """
    User login serializer
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    totp_code = serializers.CharField(max_length=6, required=False, allow_blank=True)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        totp_code = attrs.get('totp_code')
        
        if not email or not password:
            raise serializers.ValidationError('Email and password are required')
        
        # Authenticate user
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        
        if not user:
            raise serializers.ValidationError('Invalid credentials or account locked')
        
        # Check if 2FA is enabled
        if user.is_2fa_enabled:
            if not totp_code:
                raise serializers.ValidationError('2FA code is required')
            
            if not user.verify_totp(totp_code):
                # Try backup codes
                if not user.use_backup_code(totp_code):
                    raise serializers.ValidationError('Invalid 2FA code')
        
        attrs['user'] = user
        return attrs


class PasswordChangeSerializer(serializers.Serializer):
    """
    Password change serializer
    """
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("New passwords don't match")
        return attrs
    
    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect')
        return value


class PasswordResetRequestSerializer(serializers.Serializer):
    """
    Password reset request serializer
    """
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Password reset confirmation serializer
    """
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs


class EmailVerificationSerializer(serializers.Serializer):
    """
    Email verification serializer
    """
    token = serializers.CharField()


class TwoFactorSetupSerializer(serializers.Serializer):
    """
    Two-factor authentication setup serializer
    """
    totp_code = serializers.CharField(max_length=6)
    
    def validate_totp_code(self, value):
        user = self.context['request'].user
        if not user.verify_totp(value):
            raise serializers.ValidationError('Invalid TOTP code')
        return value


class TwoFactorDisableSerializer(serializers.Serializer):
    """
    Two-factor authentication disable serializer
    """
    password = serializers.CharField(write_only=True)
    
    def validate_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Password is incorrect')
        return value


class UserProfileSerializer(serializers.ModelSerializer):
    """
    User profile serializer
    """
    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'phone_number', 'role', 'is_email_verified', 'is_2fa_enabled',
            'created_at', 'last_login', 'last_password_change'
        ]
        read_only_fields = [
            'id', 'email', 'role', 'is_email_verified', 'is_2fa_enabled',
            'created_at', 'last_login', 'last_password_change'
        ]


class RefreshTokenSerializer(serializers.Serializer):
    """
    Refresh token serializer
    """
    refresh_token = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer for admin operations
    """
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    
    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'phone_number', 'role', 'role_display', 'is_active', 
            'is_email_verified', 'is_2fa_enabled', 'is_staff',
            'created_at', 'last_login', 'last_password_change'
        ]
        read_only_fields = [
            'id', 'created_at', 'last_login', 'last_password_change', 'role_display'
        ]
    
    def update(self, instance, validated_data):
        # Only allow role changes by admins
        request = self.context.get('request')
        if request and hasattr(request.user, 'role'):
            if 'role' in validated_data and request.user.role != 'admin':
                validated_data.pop('role')
        
        return super().update(instance, validated_data)