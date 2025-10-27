"""
Comprehensive API validation system for CareSpot backend.
Provides secure input validation, sanitization, and data integrity checks.
"""

import re
import bleach
from typing import Any, Dict, List, Optional, Union
from django.core.exceptions import ValidationError
from django.core.validators import validate_email, URLValidator
from django.utils.html import strip_tags
from rest_framework import serializers
import phonenumbers
from phonenumbers import NumberParseException


class SecurityValidator:
    """Security-focused validation utilities."""
    
    # Allowed HTML tags for rich text content
    ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a']
    ALLOWED_ATTRIBUTES = {'a': ['href', 'title']}
    
    @staticmethod
    def sanitize_html(content: str) -> str:
        """Sanitize HTML content to prevent XSS attacks."""
        if not content:
            return ""
        return bleach.clean(
            content,
            tags=SecurityValidator.ALLOWED_TAGS,
            attributes=SecurityValidator.ALLOWED_ATTRIBUTES,
            strip=True
        )
    
    @staticmethod
    def validate_password_strength(password: str) -> bool:
        """Validate password meets security requirements."""
        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long.")
        
        if not re.search(r'[A-Z]', password):
            raise ValidationError("Password must contain at least one uppercase letter.")
        
        if not re.search(r'[a-z]', password):
            raise ValidationError("Password must contain at least one lowercase letter.")
        
        if not re.search(r'\d', password):
            raise ValidationError("Password must contain at least one digit.")
        
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError("Password must contain at least one special character.")
        
        return True
    
    @staticmethod
    def validate_file_upload(file) -> bool:
        """Validate uploaded files for security."""
        # File size limit (5MB)
        max_size = 5 * 1024 * 1024
        if file.size > max_size:
            raise ValidationError("File size cannot exceed 5MB.")
        
        # Allowed file types
        allowed_types = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf', 'text/plain', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        
        if file.content_type not in allowed_types:
            raise ValidationError("File type not allowed.")
        
        return True


class DataValidator:
    """Data validation utilities for various input types."""
    
    @staticmethod
    def validate_phone_number(phone: str, country_code: str = 'GH') -> str:
        """Validate and format phone number."""
        try:
            parsed = phonenumbers.parse(phone, country_code)
            if not phonenumbers.is_valid_number(parsed):
                raise ValidationError("Invalid phone number.")
            return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
        except NumberParseException:
            raise ValidationError("Invalid phone number format.")
    
    @staticmethod
    def validate_donation_amount(amount: Union[str, float, int]) -> float:
        """Validate donation amount."""
        try:
            amount = float(amount)
        except (ValueError, TypeError):
            raise ValidationError("Invalid amount format.")
        
        if amount <= 0:
            raise ValidationError("Amount must be greater than zero.")
        
        if amount > 100000:  # Maximum donation limit
            raise ValidationError("Amount exceeds maximum limit of $100,000.")
        
        return round(amount, 2)
    
    @staticmethod
    def validate_age(age: Union[str, int]) -> int:
        """Validate age input."""
        try:
            age = int(age)
        except (ValueError, TypeError):
            raise ValidationError("Invalid age format.")
        
        if age < 0 or age > 150:
            raise ValidationError("Age must be between 0 and 150.")
        
        return age
    
    @staticmethod
    def validate_name(name: str) -> str:
        """Validate and sanitize name fields."""
        if not name or not name.strip():
            raise ValidationError("Name cannot be empty.")
        
        name = strip_tags(name.strip())
        
        if len(name) < 2:
            raise ValidationError("Name must be at least 2 characters long.")
        
        if len(name) > 100:
            raise ValidationError("Name cannot exceed 100 characters.")
        
        # Only allow letters, spaces, hyphens, and apostrophes
        if not re.match(r"^[a-zA-Z\s\-']+$", name):
            raise ValidationError("Name contains invalid characters.")
        
        return name


class APIValidationMixin:
    """Mixin for API serializers to add common validation methods."""
    
    def validate_email_field(self, email: str) -> str:
        """Validate email address."""
        if not email:
            raise serializers.ValidationError("Email is required.")
        
        try:
            validate_email(email)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format.")
        
        return email.lower().strip()
    
    def validate_url_field(self, url: str) -> str:
        """Validate URL field."""
        if not url:
            return url
        
        validator = URLValidator()
        try:
            validator(url)
        except ValidationError:
            raise serializers.ValidationError("Invalid URL format.")
        
        return url
    
    def validate_text_field(self, text: str, max_length: int = 1000) -> str:
        """Validate and sanitize text fields."""
        if not text:
            return ""
        
        # Sanitize HTML
        text = SecurityValidator.sanitize_html(text)
        
        if len(text) > max_length:
            raise serializers.ValidationError(f"Text cannot exceed {max_length} characters.")
        
        return text


class UserRegistrationValidator(APIValidationMixin, serializers.Serializer):
    """Validator for user registration data."""
    
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=128)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=20, required=False)
    
    def validate_email(self, value):
        return self.validate_email_field(value)
    
    def validate_password(self, value):
        SecurityValidator.validate_password_strength(value)
        return value
    
    def validate_first_name(self, value):
        return DataValidator.validate_name(value)
    
    def validate_last_name(self, value):
        return DataValidator.validate_name(value)
    
    def validate_phone_number(self, value):
        if value:
            return DataValidator.validate_phone_number(value)
        return value


class DonationValidator(APIValidationMixin, serializers.Serializer):
    """Validator for donation data."""
    
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    donor_email = serializers.EmailField()
    donor_name = serializers.CharField(max_length=200)
    message = serializers.CharField(max_length=500, required=False, allow_blank=True)
    anonymous = serializers.BooleanField(default=False)
    
    def validate_amount(self, value):
        return DataValidator.validate_donation_amount(value)
    
    def validate_donor_email(self, value):
        return self.validate_email_field(value)
    
    def validate_donor_name(self, value):
        return DataValidator.validate_name(value)
    
    def validate_message(self, value):
        return self.validate_text_field(value, max_length=500)


class ContactFormValidator(APIValidationMixin, serializers.Serializer):
    """Validator for contact form submissions."""
    
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=200)
    message = serializers.CharField(max_length=2000)
    phone = serializers.CharField(max_length=20, required=False)
    
    def validate_name(self, value):
        return DataValidator.validate_name(value)
    
    def validate_email(self, value):
        return self.validate_email_field(value)
    
    def validate_subject(self, value):
        return self.validate_text_field(value, max_length=200)
    
    def validate_message(self, value):
        return self.validate_text_field(value, max_length=2000)
    
    def validate_phone(self, value):
        if value:
            return DataValidator.validate_phone_number(value)
        return value


class VolunteerApplicationValidator(APIValidationMixin, serializers.Serializer):
    """Validator for volunteer application data."""
    
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    age = serializers.IntegerField()
    skills = serializers.CharField(max_length=1000)
    availability = serializers.CharField(max_length=500)
    motivation = serializers.CharField(max_length=2000)
    
    def validate_first_name(self, value):
        return DataValidator.validate_name(value)
    
    def validate_last_name(self, value):
        return DataValidator.validate_name(value)
    
    def validate_email(self, value):
        return self.validate_email_field(value)
    
    def validate_phone(self, value):
        return DataValidator.validate_phone_number(value)
    
    def validate_age(self, value):
        return DataValidator.validate_age(value)
    
    def validate_skills(self, value):
        return self.validate_text_field(value, max_length=1000)
    
    def validate_availability(self, value):
        return self.validate_text_field(value, max_length=500)
    
    def validate_motivation(self, value):
        return self.validate_text_field(value, max_length=2000)


class BulkDataValidator:
    """Validator for bulk data operations."""
    
    @staticmethod
    def validate_csv_upload(file) -> bool:
        """Validate CSV file upload."""
        SecurityValidator.validate_file_upload(file)
        
        if not file.name.endswith('.csv'):
            raise ValidationError("File must be a CSV file.")
        
        return True
    
    @staticmethod
    def validate_batch_size(batch_size: int) -> int:
        """Validate batch processing size."""
        if batch_size <= 0:
            raise ValidationError("Batch size must be positive.")
        
        if batch_size > 1000:
            raise ValidationError("Batch size cannot exceed 1000 records.")
        
        return batch_size


# Validation decorator for API views
def validate_request_data(validator_class):
    """Decorator to validate request data using specified validator."""
    def decorator(view_func):
        def wrapper(self, request, *args, **kwargs):
            validator = validator_class(data=request.data)
            if not validator.is_valid():
                return Response(
                    {'errors': validator.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
            request.validated_data = validator.validated_data
            return view_func(self, request, *args, **kwargs)
        return wrapper
    return decorator