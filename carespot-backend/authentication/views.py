"""
Authentication Views
"""

import qrcode
import io
import base64
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth import get_user_model
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer, PasswordChangeSerializer,
    PasswordResetRequestSerializer, PasswordResetConfirmSerializer,
    EmailVerificationSerializer, TwoFactorSetupSerializer, TwoFactorDisableSerializer,
    UserProfileSerializer, RefreshTokenSerializer
)
from .jwt_utils import JWTTokenManager
from .email_utils import EmailVerificationManager, PasswordResetManager

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    User registration endpoint
    """
    serializer = UserRegistrationSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Registration successful. Please check your email to verify your account.',
            'user_id': str(user.id),
            'email': user.email
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    User login endpoint
    """
    serializer = UserLoginSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Generate JWT tokens
        tokens = JWTTokenManager.generate_tokens(user, request)
        
        return Response({
            'message': 'Login successful',
            'user': UserProfileSerializer(user).data,
            'tokens': tokens
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    """
    Refresh access token endpoint
    """
    serializer = RefreshTokenSerializer(data=request.data)
    
    if serializer.is_valid():
        refresh_token = serializer.validated_data['refresh_token']
        tokens = JWTTokenManager.refresh_access_token(refresh_token, request)
        
        if tokens:
            return Response(tokens, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid or expired refresh token'
            }, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    User logout endpoint
    """
    # Get refresh token from request
    refresh_token = request.data.get('refresh_token')
    
    if refresh_token:
        JWTTokenManager.revoke_refresh_token(refresh_token)
    
    return Response({
        'message': 'Logout successful'
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_all(request):
    """
    Logout from all devices endpoint
    """
    JWTTokenManager.revoke_all_user_tokens(request.user)
    
    return Response({
        'message': 'Logged out from all devices'
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email(request):
    """
    Email verification endpoint
    """
    serializer = EmailVerificationSerializer(data=request.data)
    
    if serializer.is_valid():
        token = serializer.validated_data['token']
        user, message = EmailVerificationManager.verify_email(token)
        
        if user:
            return Response({
                'message': message,
                'user_id': str(user.id)
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': message
            }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def resend_verification_email(request):
    """
    Resend email verification endpoint
    """
    user = request.user
    
    if user.is_email_verified:
        return Response({
            'message': 'Email is already verified'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    success = EmailVerificationManager.send_verification_email(user, request)
    
    if success:
        return Response({
            'message': 'Verification email sent successfully'
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'Failed to send verification email'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    """
    Password reset request endpoint
    """
    serializer = PasswordResetRequestSerializer(data=request.data)
    
    if serializer.is_valid():
        email = serializer.validated_data['email']
        PasswordResetManager.send_password_reset_email(email, request)
        
        return Response({
            'message': 'If an account with this email exists, a password reset link has been sent.'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    """
    Password reset confirmation endpoint
    """
    serializer = PasswordResetConfirmSerializer(data=request.data)
    
    if serializer.is_valid():
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']
        
        success, message = PasswordResetManager.reset_password(token, new_password)
        
        if success:
            return Response({
                'message': message
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': message
            }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """
    Password change endpoint
    """
    serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = request.user
        new_password = serializer.validated_data['new_password']
        
        user.set_password(new_password)
        user.last_password_change = timezone.now()
        user.save(update_fields=['password', 'last_password_change'])
        
        # Revoke all existing tokens for security
        JWTTokenManager.revoke_all_user_tokens(user)
        
        return Response({
            'message': 'Password changed successfully. Please login again.'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    """
    Get user profile endpoint
    """
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Update user profile endpoint
    """
    serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def setup_2fa(request):
    """
    Setup 2FA endpoint - returns QR code
    """
    user = request.user
    
    if user.is_2fa_enabled:
        return Response({
            'error': '2FA is already enabled'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Generate TOTP secret and URI
    totp_uri = user.get_totp_uri()
    
    # Generate QR code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(totp_uri)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    qr_code_data = base64.b64encode(buffer.getvalue()).decode()
    
    return Response({
        'qr_code': f"data:image/png;base64,{qr_code_data}",
        'secret': user.totp_secret,
        'message': 'Scan the QR code with your authenticator app and enter the code to enable 2FA'
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enable_2fa(request):
    """
    Enable 2FA endpoint
    """
    serializer = TwoFactorSetupSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = request.user
        user.is_2fa_enabled = True
        
        # Generate backup codes
        backup_codes = user.generate_backup_codes()
        user.save(update_fields=['is_2fa_enabled'])
        
        return Response({
            'message': '2FA enabled successfully',
            'backup_codes': backup_codes
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def disable_2fa(request):
    """
    Disable 2FA endpoint
    """
    serializer = TwoFactorDisableSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = request.user
        user.is_2fa_enabled = False
        user.totp_secret = None
        user.backup_codes = []
        user.save(update_fields=['is_2fa_enabled', 'totp_secret', 'backup_codes'])
        
        return Response({
            'message': '2FA disabled successfully'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def regenerate_backup_codes(request):
    """
    Regenerate 2FA backup codes endpoint
    """
    user = request.user
    
    if not user.is_2fa_enabled:
        return Response({
            'error': '2FA is not enabled'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    backup_codes = user.generate_backup_codes()
    
    return Response({
        'message': 'Backup codes regenerated successfully',
        'backup_codes': backup_codes
    }, status=status.HTTP_200_OK)