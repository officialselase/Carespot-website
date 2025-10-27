"""
Analytics models for CareSpot platform with data anonymization.
Handles user behavior tracking, performance metrics, and anonymized reporting.
"""

import uuid
import hashlib
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from authentication.models import BaseAuditModel

User = get_user_model()


class AnonymizedUser(BaseAuditModel):
    """
    Anonymized user data for analytics while preserving privacy.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Anonymized identifier (hash of user ID + salt)
    anonymous_id = models.CharField(max_length=64, unique=True)
    
    # Anonymized demographics (aggregated/generalized)
    age_range = models.CharField(max_length=20, blank=True)  # "18-25", "26-35", etc.
    location_region = models.CharField(max_length=100, blank=True)  # City/State only, no specific address
    user_type = models.CharField(max_length=20, blank=True)  # volunteer, donor, visitor
    
    # Engagement metrics
    first_visit = models.DateTimeField()
    last_activity = models.DateTimeField()
    total_sessions = models.PositiveIntegerField(default=0)
    total_page_views = models.PositiveIntegerField(default=0)
    
    # Behavioral flags (anonymized)
    is_active_user = models.BooleanField(default=False)
    has_donated = models.BooleanField(default=False)
    has_volunteered = models.BooleanField(default=False)
    has_subscribed_newsletter = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-last_activity']
        indexes = [
            models.Index(fields=['anonymous_id']),
            models.Index(fields=['user_type', 'is_active_user']),
            models.Index(fields=['last_activity']),
        ]
    
    def __str__(self):
        return f"Anonymous User {self.anonymous_id[:8]}..."
    
    @classmethod
    def create_from_user(cls, user):
        """Create anonymized user record from actual user."""
        # Create anonymous ID using hash
        anonymous_id = hashlib.sha256(
            f"{user.id}_{timezone.now().date()}".encode()
        ).hexdigest()
        
        # Determine age range
        age_range = ""
        if hasattr(user, 'volunteer_profile') and user.volunteer_profile.date_of_birth:
            age = user.volunteer_profile.age
            if age < 18:
                age_range = "under-18"
            elif age < 25:
                age_range = "18-24"
            elif age < 35:
                age_range = "25-34"
            elif age < 45:
                age_range = "35-44"
            elif age < 55:
                age_range = "45-54"
            elif age < 65:
                age_range = "55-64"
            else:
                age_range = "65+"
        
        # Create or update anonymized record
        anonymized_user, created = cls.objects.get_or_create(
            anonymous_id=anonymous_id,
            defaults={
                'age_range': age_range,
                'user_type': user.role,
                'first_visit': timezone.now(),
                'last_activity': timezone.now(),
                'has_donated': user.donations.filter(status='completed').exists(),
                'has_volunteered': user.volunteer_applications.filter(status='approved').exists(),
            }
        )
        
        if not created:
            # Update existing record
            anonymized_user.last_activity = timezone.now()
            anonymized_user.has_donated = user.donations.filter(status='completed').exists()
            anonymized_user.has_volunteered = user.volunteer_applications.filter(status='approved').exists()
            anonymized_user.save()
        
        return anonymized_user


class PageView(BaseAuditModel):
    """
    Track page views with anonymized user data.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Anonymized user reference
    anonymous_user = models.ForeignKey(AnonymizedUser, on_delete=models.CASCADE, related_name='page_views')
    
    # Page information
    page_url = models.URLField()
    page_title = models.CharField(max_length=200, blank=True)
    referrer_url = models.URLField(blank=True)
    
    # Session information
    session_id = models.CharField(max_length=64)  # Anonymized session ID
    
    # Technical details (anonymized)
    user_agent_category = models.CharField(max_length=50, blank=True)  # mobile, desktop, tablet
    browser_family = models.CharField(max_length=50, blank=True)  # chrome, firefox, safari
    device_type = models.CharField(max_length=50, blank=True)  # mobile, desktop, tablet
    
    # Timing
    time_on_page = models.PositiveIntegerField(null=True, blank=True)  # seconds
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['anonymous_user', 'created_at']),
            models.Index(fields=['page_url', 'created_at']),
            models.Index(fields=['session_id']),
        ]
    
    def __str__(self):
        return f"{self.page_url} - {self.created_at}"


class UserAction(BaseAuditModel):
    """
    Track user actions with anonymized data.
    """
    ACTION_TYPE_CHOICES = [
        ('page_view', 'Page View'),
        ('button_click', 'Button Click'),
        ('form_submit', 'Form Submit'),
        ('download', 'Download'),
        ('donation', 'Donation'),
        ('volunteer_application', 'Volunteer Application'),
        ('newsletter_signup', 'Newsletter Signup'),
        ('search', 'Search'),
        ('share', 'Share'),
        ('contact_form', 'Contact Form'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Anonymized user reference
    anonymous_user = models.ForeignKey(AnonymizedUser, on_delete=models.CASCADE, related_name='actions')
    
    # Action details
    action_type = models.CharField(max_length=30, choices=ACTION_TYPE_CHOICES)
    action_name = models.CharField(max_length=100)  # specific action name
    page_url = models.URLField()
    
    # Action metadata (anonymized)
    metadata = models.JSONField(default=dict, blank=True)  # Additional anonymized data
    
    # Session information
    session_id = models.CharField(max_length=64)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['anonymous_user', 'action_type']),
            models.Index(fields=['action_type', 'created_at']),
            models.Index(fields=['session_id']),
        ]
    
    def __str__(self):
        return f"{self.action_type} - {self.action_name}"


class ContentPerformance(BaseAuditModel):
    """
    Track content performance metrics with anonymized data.
    """
    # Generic foreign key to link to any content model
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Performance metrics
    total_views = models.PositiveIntegerField(default=0)
    unique_views = models.PositiveIntegerField(default=0)
    average_time_on_page = models.FloatField(default=0.0)  # seconds
    bounce_rate = models.FloatField(default=0.0)  # percentage
    
    # Engagement metrics
    total_shares = models.PositiveIntegerField(default=0)
    total_downloads = models.PositiveIntegerField(default=0)
    total_interactions = models.PositiveIntegerField(default=0)
    
    # Conversion metrics
    conversion_rate = models.FloatField(default=0.0)  # percentage
    goal_completions = models.PositiveIntegerField(default=0)
    
    # Time period
    date = models.DateField()
    
    class Meta:
        unique_together = ['content_type', 'object_id', 'date']
        ordering = ['-date']
        indexes = [
            models.Index(fields=['content_type', 'object_id', 'date']),
            models.Index(fields=['date']),
        ]
    
    def __str__(self):
        return f"{self.content_object} - {self.date}"


class DonationAnalytics(BaseAuditModel):
    """
    Anonymized donation analytics for reporting.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Anonymized donation data
    amount_range = models.CharField(max_length=20)  # "1-25", "26-100", etc.
    payment_method = models.CharField(max_length=20)
    donation_type = models.CharField(max_length=20)  # one_time, recurring
    
    # Anonymized donor data
    donor_age_range = models.CharField(max_length=20, blank=True)
    donor_location_region = models.CharField(max_length=100, blank=True)
    is_repeat_donor = models.BooleanField(default=False)
    
    # Campaign information
    campaign_category = models.CharField(max_length=100, blank=True)
    
    # Timing
    donation_date = models.DateField()
    
    class Meta:
        ordering = ['-donation_date']
        indexes = [
            models.Index(fields=['donation_date']),
            models.Index(fields=['amount_range', 'donation_date']),
            models.Index(fields=['payment_method', 'donation_date']),
        ]
    
    def __str__(self):
        return f"Donation {self.amount_range} - {self.donation_date}"
    
    @classmethod
    def create_from_donation(cls, donation):
        """Create anonymized donation record."""
        # Determine amount range
        amount = float(donation.amount)
        if amount < 25:
            amount_range = "1-25"
        elif amount < 50:
            amount_range = "26-50"
        elif amount < 100:
            amount_range = "51-100"
        elif amount < 250:
            amount_range = "101-250"
        elif amount < 500:
            amount_range = "251-500"
        elif amount < 1000:
            amount_range = "501-1000"
        else:
            amount_range = "1000+"
        
        # Get anonymized donor data
        donor_age_range = ""
        donor_location_region = ""
        is_repeat_donor = False
        
        if donation.donor:
            # Check if repeat donor
            is_repeat_donor = donation.donor.donations.filter(
                status='completed',
                created_at__lt=donation.created_at
            ).exists()
            
            # Get age range if available
            if hasattr(donation.donor, 'volunteer_profile') and donation.donor.volunteer_profile.date_of_birth:
                age = donation.donor.volunteer_profile.age
                if age < 25:
                    donor_age_range = "18-24"
                elif age < 35:
                    donor_age_range = "25-34"
                elif age < 45:
                    donor_age_range = "35-44"
                elif age < 55:
                    donor_age_range = "45-54"
                elif age < 65:
                    donor_age_range = "55-64"
                else:
                    donor_age_range = "65+"
        
        return cls.objects.create(
            amount_range=amount_range,
            payment_method=donation.payment_method,
            donation_type=donation.donation_type,
            donor_age_range=donor_age_range,
            donor_location_region=donor_location_region,
            is_repeat_donor=is_repeat_donor,
            campaign_category=donation.campaign.category.name if donation.campaign.category else "",
            donation_date=donation.payment_date.date() if donation.payment_date else donation.created_at.date()
        )


class VolunteerAnalytics(BaseAuditModel):
    """
    Anonymized volunteer analytics for reporting.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Anonymized volunteer data
    volunteer_age_range = models.CharField(max_length=20, blank=True)
    volunteer_location_region = models.CharField(max_length=100, blank=True)
    
    # Application data
    application_status = models.CharField(max_length=20)
    opportunity_category = models.CharField(max_length=100, blank=True)
    commitment_type = models.CharField(max_length=20, blank=True)
    
    # Skills (anonymized)
    skill_categories = models.JSONField(default=list, blank=True)  # List of skill category names
    
    # Timing
    application_date = models.DateField()
    
    class Meta:
        ordering = ['-application_date']
        indexes = [
            models.Index(fields=['application_date']),
            models.Index(fields=['application_status', 'application_date']),
            models.Index(fields=['volunteer_age_range']),
        ]
    
    def __str__(self):
        return f"Volunteer Application - {self.application_date}"
    
    @classmethod
    def create_from_application(cls, application):
        """Create anonymized volunteer record."""
        volunteer_age_range = ""
        volunteer_location_region = ""
        skill_categories = []
        
        if hasattr(application.volunteer, 'volunteer_profile'):
            profile = application.volunteer.volunteer_profile
            
            # Get age range
            if profile.date_of_birth:
                age = profile.age
                if age < 25:
                    volunteer_age_range = "18-24"
                elif age < 35:
                    volunteer_age_range = "25-34"
                elif age < 45:
                    volunteer_age_range = "35-44"
                elif age < 55:
                    volunteer_age_range = "45-54"
                elif age < 65:
                    volunteer_age_range = "55-64"
                else:
                    volunteer_age_range = "65+"
            
            # Get skill categories
            skill_categories = list(
                profile.skills.values_list('category__name', flat=True).distinct()
            )
        
        return cls.objects.create(
            volunteer_age_range=volunteer_age_range,
            volunteer_location_region=volunteer_location_region,
            application_status=application.status,
            opportunity_category=application.opportunity.category.name if application.opportunity.category else "",
            commitment_type=application.opportunity.commitment_type,
            skill_categories=skill_categories,
            application_date=application.created_at.date()
        )


class SystemMetrics(BaseAuditModel):
    """
    System performance and usage metrics.
    """
    METRIC_TYPE_CHOICES = [
        ('daily_active_users', 'Daily Active Users'),
        ('page_load_time', 'Page Load Time'),
        ('api_response_time', 'API Response Time'),
        ('error_rate', 'Error Rate'),
        ('conversion_rate', 'Conversion Rate'),
        ('bounce_rate', 'Bounce Rate'),
        ('session_duration', 'Session Duration'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Metric details
    metric_type = models.CharField(max_length=30, choices=METRIC_TYPE_CHOICES)
    metric_name = models.CharField(max_length=100)
    metric_value = models.FloatField()
    metric_unit = models.CharField(max_length=20, blank=True)  # seconds, percentage, count, etc.
    
    # Context
    page_url = models.URLField(blank=True)
    user_segment = models.CharField(max_length=50, blank=True)  # new_users, returning_users, etc.
    
    # Time period
    date = models.DateField()
    hour = models.PositiveIntegerField(null=True, blank=True)  # 0-23 for hourly metrics
    
    class Meta:
        ordering = ['-date', '-hour']
        indexes = [
            models.Index(fields=['metric_type', 'date']),
            models.Index(fields=['date', 'hour']),
            models.Index(fields=['page_url', 'date']),
        ]
    
    def __str__(self):
        return f"{self.metric_name}: {self.metric_value} {self.metric_unit} - {self.date}"


class DataRetentionPolicy(BaseAuditModel):
    """
    Define data retention policies for different types of analytics data.
    """
    RETENTION_TYPE_CHOICES = [
        ('page_views', 'Page Views'),
        ('user_actions', 'User Actions'),
        ('content_performance', 'Content Performance'),
        ('donation_analytics', 'Donation Analytics'),
        ('volunteer_analytics', 'Volunteer Analytics'),
        ('system_metrics', 'System Metrics'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Policy details
    data_type = models.CharField(max_length=30, choices=RETENTION_TYPE_CHOICES, unique=True)
    retention_days = models.PositiveIntegerField()
    anonymization_days = models.PositiveIntegerField(null=True, blank=True)
    
    # Policy settings
    is_active = models.BooleanField(default=True)
    auto_cleanup = models.BooleanField(default=True)
    
    # Description
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['data_type']
    
    def __str__(self):
        return f"{self.get_data_type_display()} - {self.retention_days} days"