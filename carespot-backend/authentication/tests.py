"""
Authentication Tests
"""

from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework import status
import json

User = get_user_model()


class CustomUserModelTest(TestCase):
    """Test custom user model functionality"""
    
    def setUp(self):
        self.user_data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'testpass123'
        }
    
    def test_create_user(self):
        """Test creating a regular user"""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.role, 'public')
        self.assertFalse(user.is_email_verified)
        self.assertFalse(user.is_2fa_enabled)
    
    def test_create_superuser(self):
        """Test creating a superuser"""
        user = User.objects.create_superuser(
            email='admin@example.com',
            username='admin',
            password='adminpass123'
        )
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertEqual(user.role, 'admin')
    
    def test_account_locking(self):
        """Test account locking functionality"""
        user = User.objects.create_user(**self.user_data)
        
        # Test account is not locked initially
        self.assertFalse(user.is_account_locked())
        
        # Lock account
        user.lock_account(duration_minutes=30)
        self.assertTrue(user.is_account_locked())
        
        # Unlock account
        user.unlock_account()
        self.assertFalse(user.is_account_locked())
        self.assertEqual(user.failed_login_attempts, 0)


class AuthenticationAPITest(APITestCase):
    """Test authentication API endpoints"""
    
    def setUp(self):
        self.client = Client()
        self.user_data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'TestPass123!',
            'password_confirm': 'TestPass123!'
        }
    
    def test_user_registration(self):
        """Test user registration endpoint"""
        url = reverse('authentication:register')
        response = self.client.post(url, self.user_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)
        self.assertIn('user_id', response.data)
        
        # Check user was created
        user = User.objects.get(email=self.user_data['email'])
        self.assertEqual(user.username, self.user_data['username'])
        self.assertFalse(user.is_email_verified)
    
    def test_user_registration_password_mismatch(self):
        """Test registration with password mismatch"""
        data = self.user_data.copy()
        data['password_confirm'] = 'DifferentPass123!'
        
        url = reverse('authentication:register')
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)
    
    def test_user_login_success(self):
        """Test successful user login"""
        # Create user first
        user = User.objects.create_user(
            email=self.user_data['email'],
            username=self.user_data['username'],
            password=self.user_data['password'],
            is_email_verified=True
        )
        
        login_data = {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        }
        
        url = reverse('authentication:login')
        response = self.client.post(url, login_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('tokens', response.data)
        self.assertIn('user', response.data)
        self.assertIn('access_token', response.data['tokens'])
        self.assertIn('refresh_token', response.data['tokens'])
    
    def test_user_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        login_data = {
            'email': 'nonexistent@example.com',
            'password': 'wrongpassword'
        }
        
        url = reverse('authentication:login')
        response = self.client.post(url, login_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_user_login_unverified_email(self):
        """Test login with unverified email"""
        # Create user with unverified email
        user = User.objects.create_user(
            email=self.user_data['email'],
            username=self.user_data['username'],
            password=self.user_data['password'],
            is_email_verified=False
        )
        
        login_data = {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        }
        
        url = reverse('authentication:login')
        response = self.client.post(url, login_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email verification', response.data['non_field_errors'][0].lower())


class TokenManagementTest(TestCase):
    """Test token management functionality"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpass123',
            is_email_verified=True
        )
    
    def test_token_generation(self):
        """Test JWT token generation"""
        from authentication.jwt_utils import JWTTokenManager
        
        tokens = JWTTokenManager.generate_tokens(self.user)
        
        self.assertIn('access_token', tokens)
        self.assertIn('refresh_token', tokens)
        self.assertIn('expires_in', tokens)
        
        # Verify token can be decoded
        user = JWTTokenManager.verify_access_token(tokens['access_token'])
        self.assertEqual(user.id, self.user.id)
    
    def test_token_refresh(self):
        """Test token refresh functionality"""
        from authentication.jwt_utils import JWTTokenManager
        from authentication.models import RefreshToken
        
        # Generate initial tokens
        tokens = JWTTokenManager.generate_tokens(self.user)
        refresh_token_value = tokens['refresh_token']
        
        # Refresh the token
        new_tokens = JWTTokenManager.refresh_access_token(refresh_token_value)
        
        self.assertIsNotNone(new_tokens)
        self.assertIn('access_token', new_tokens)
        self.assertNotEqual(tokens['access_token'], new_tokens['access_token'])


class SecurityTest(TestCase):
    """Test security features"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpass123'
        )
    
    def test_failed_login_attempts(self):
        """Test failed login attempt tracking"""
        # Simulate failed login attempts
        for i in range(3):
            self.user.increment_failed_login()
        
        self.assertEqual(self.user.failed_login_attempts, 3)
        self.assertFalse(self.user.is_account_locked())
        
        # Simulate 2 more failed attempts (should lock account)
        for i in range(2):
            self.user.increment_failed_login()
        
        self.assertEqual(self.user.failed_login_attempts, 5)
        self.assertTrue(self.user.is_account_locked())
    
    def test_password_reset_token_generation(self):
        """Test password reset token functionality"""
        from authentication.email_utils import PasswordResetManager
        
        # Generate reset token
        token = PasswordResetManager.generate_reset_token()
        self.assertEqual(len(token), 64)
        
        # Test token validation
        self.user.password_reset_token = token
        self.user.password_reset_sent_at = timezone.now()
        self.user.save()
        
        self.assertTrue(self.user.can_reset_password())
    
    def test_email_verification_token(self):
        """Test email verification token functionality"""
        from authentication.email_utils import EmailVerificationManager
        
        # Generate verification token
        token = EmailVerificationManager.generate_verification_token()
        self.assertEqual(len(token), 64)
        
        # Test token validation
        self.user.email_verification_token = token
        self.user.email_verification_sent_at = timezone.now()
        self.user.save()
        
        self.assertTrue(self.user.can_verify_email())
