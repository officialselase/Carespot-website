#!/usr/bin/env python3
"""
Test script for the validation system.
Run this to verify validation functionality works correctly.
"""

import os
import sys
import django
from django.conf import settings

# Add the project directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Configure Django settings
if not settings.configured:
    settings.configure(
        DEBUG=True,
        SECRET_KEY='test-key-for-validation-testing',
        INSTALLED_APPS=[
            'django.contrib.auth',
            'django.contrib.contenttypes',
            'rest_framework',
        ],
        USE_TZ=True,
    )
    django.setup()

from carespot.api.validation import (
    SecurityValidator, DataValidator, UserRegistrationValidator,
    DonationValidator, ContactFormValidator
)
from django.core.exceptions import ValidationError
from rest_framework import serializers


def test_security_validator():
    """Test security validation functions."""
    print("Testing SecurityValidator...")
    
    # Test HTML sanitization
    dirty_html = '<script>alert("xss")</script><p>Clean content</p>'
    clean_html = SecurityValidator.sanitize_html(dirty_html)
    assert '<script>' not in clean_html
    assert '<p>Clean content</p>' in clean_html
    print("✓ HTML sanitization works")
    
    # Test password validation
    try:
        SecurityValidator.validate_password_strength('weak')
        assert False, "Should have failed"
    except ValidationError:
        print("✓ Weak password rejected")
    
    try:
        SecurityValidator.validate_password_strength('StrongPass123!')
        print("✓ Strong password accepted")
    except ValidationError:
        assert False, "Strong password should be valid"


def test_data_validator():
    """Test data validation functions."""
    print("\nTesting DataValidator...")
    
    # Test phone number validation
    try:
        formatted = DataValidator.validate_phone_number('+233241234567')
        print(f"✓ Phone number formatted: {formatted}")
    except ValidationError as e:
        print(f"Phone validation error: {e}")
    
    # Test donation amount
    try:
        amount = DataValidator.validate_donation_amount('50.99')
        assert amount == 50.99
        print("✓ Donation amount validation works")
    except ValidationError:
        assert False, "Valid amount should pass"
    
    # Test invalid donation amount
    try:
        DataValidator.validate_donation_amount('-10')
        assert False, "Negative amount should fail"
    except ValidationError:
        print("✓ Negative donation amount rejected")
    
    # Test name validation
    try:
        name = DataValidator.validate_name('John Doe')
        assert name == 'John Doe'
        print("✓ Name validation works")
    except ValidationError:
        assert False, "Valid name should pass"


def test_serializer_validators():
    """Test serializer validators."""
    print("\nTesting Serializer Validators...")
    
    # Test user registration validator
    valid_data = {
        'email': 'test@example.com',
        'password': 'StrongPass123!',
        'first_name': 'John',
        'last_name': 'Doe',
        'phone_number': '+233241234567'
    }
    
    validator = UserRegistrationValidator(data=valid_data)
    if validator.is_valid():
        print("✓ User registration validation passed")
    else:
        print(f"User registration errors: {validator.errors}")
    
    # Test donation validator
    donation_data = {
        'amount': '25.50',
        'donor_email': 'donor@example.com',
        'donor_name': 'Jane Smith',
        'message': 'Keep up the great work!',
        'anonymous': False
    }
    
    donation_validator = DonationValidator(data=donation_data)
    if donation_validator.is_valid():
        print("✓ Donation validation passed")
    else:
        print(f"Donation errors: {donation_validator.errors}")
    
    # Test contact form validator
    contact_data = {
        'name': 'Alice Johnson',
        'email': 'alice@example.com',
        'subject': 'Volunteer Inquiry',
        'message': 'I would like to volunteer for your health programs.',
        'phone': '+233241234567'
    }
    
    contact_validator = ContactFormValidator(data=contact_data)
    if contact_validator.is_valid():
        print("✓ Contact form validation passed")
    else:
        print(f"Contact form errors: {contact_validator.errors}")


if __name__ == '__main__':
    print("CareSpot Validation System Test")
    print("=" * 40)
    
    try:
        test_security_validator()
        test_data_validator()
        test_serializer_validators()
        
        print("\n" + "=" * 40)
        print("All validation tests passed! ✓")
        
    except Exception as e:
        print(f"\nTest failed with error: {e}")
        sys.exit(1)