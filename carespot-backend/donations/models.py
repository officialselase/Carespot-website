"""
Donation models for CareSpot platform.
Handles secure donation tracking with audit trails.
"""

import uuid
from decimal import Decimal
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from authentication.models import BaseAuditModel

User = get_user_model()


class DonationCampaign(BaseAuditModel):
    """
    Donation campaigns for specific causes or projects.
    """
    CAMPAIGN_STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500)
    
    # Financial targets
    target_amount = models.DecimalField(
        max_digits=12, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('1.00'))]
    )
    current_amount = models.DecimalField(
        max_digits=12, 
        decimal_places=2, 
        default=Decimal('0.00')
    )
    
    # Campaign timeline
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=CAMPAIGN_STATUS_CHOICES, default='draft')
    
    # Media and content
    featured_image = models.ImageField(upload_to='campaigns/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    
    # SEO and metadata
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    
    # Tracking
    view_count = models.PositiveIntegerField(default=0)
    share_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'start_date']),
            models.Index(fields=['slug']),
        ]
    
    def __str__(self):
        return self.title
    
    @property
    def progress_percentage(self):
        """Calculate donation progress percentage."""
        if self.target_amount > 0:
            return min(100, (self.current_amount / self.target_amount) * 100)
        return 0
    
    @property
    def is_active(self):
        """Check if campaign is currently active."""
        now = timezone.now()
        return (
            self.status == 'active' and
            self.start_date <= now <= self.end_date
        )
    
    def update_current_amount(self):
        """Update current amount from successful donations."""
        total = self.donations.filter(
            status='completed'
        ).aggregate(
            total=models.Sum('amount')
        )['total'] or Decimal('0.00')
        
        self.current_amount = total
        self.save(update_fields=['current_amount'])


class Donation(BaseAuditModel):
    """
    Individual donation records with secure payment tracking.
    """
    DONATION_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
        ('cancelled', 'Cancelled'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
        ('mtn_momo', 'MTN Mobile Money'),
        ('vodafone_cash', 'Vodafone Cash'),
        ('airteltigo_money', 'AirtelTigo Money'),
        ('bank_transfer', 'Bank Transfer'),
    ]
    
    DONATION_TYPE_CHOICES = [
        ('one_time', 'One-time'),
        ('monthly', 'Monthly Recurring'),
        ('quarterly', 'Quarterly Recurring'),
        ('yearly', 'Yearly Recurring'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Donor information
    donor = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='donations'
    )
    donor_email = models.EmailField()
    donor_name = models.CharField(max_length=100)
    donor_phone = models.CharField(max_length=20, blank=True)
    is_anonymous = models.BooleanField(default=False)
    
    # Campaign association
    campaign = models.ForeignKey(
        DonationCampaign,
        on_delete=models.CASCADE,
        related_name='donations'
    )
    
    # Financial details
    amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('1.00'))]
    )
    currency = models.CharField(max_length=3, default='USD')
    
    # Payment details
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    payment_intent_id = models.CharField(max_length=200, blank=True)
    transaction_id = models.CharField(max_length=200, blank=True)
    payment_processor_fee = models.DecimalField(
        max_digits=8, 
        decimal_places=2, 
        default=Decimal('0.00')
    )
    
    # Status and tracking
    status = models.CharField(max_length=20, choices=DONATION_STATUS_CHOICES, default='pending')
    donation_type = models.CharField(max_length=20, choices=DONATION_TYPE_CHOICES, default='one_time')
    
    # Timestamps
    payment_date = models.DateTimeField(null=True, blank=True)
    refund_date = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    donor_message = models.TextField(blank=True)
    internal_notes = models.TextField(blank=True)
    
    # Receipt and tax information
    receipt_sent = models.BooleanField(default=False)
    receipt_sent_at = models.DateTimeField(null=True, blank=True)
    tax_deductible = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'payment_date']),
            models.Index(fields=['donor_email']),
            models.Index(fields=['campaign', 'status']),
            models.Index(fields=['payment_method', 'status']),
        ]
    
    def __str__(self):
        return f"{self.donor_name} - ${self.amount} ({self.status})"
    
    @property
    def net_amount(self):
        """Calculate net donation amount after processor fees."""
        return self.amount - self.payment_processor_fee


class RecurringDonation(BaseAuditModel):
    """
    Recurring donation subscriptions.
    """
    FREQUENCY_CHOICES = [
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('yearly', 'Yearly'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Donor and campaign
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recurring_donations')
    campaign = models.ForeignKey(DonationCampaign, on_delete=models.CASCADE, related_name='recurring_donations')
    
    # Subscription details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)
    
    # Payment details
    payment_method = models.CharField(max_length=20, choices=Donation.PAYMENT_METHOD_CHOICES)
    subscription_id = models.CharField(max_length=200)  # Stripe/PayPal subscription ID
    
    # Status and scheduling
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    next_payment_date = models.DateTimeField()
    last_payment_date = models.DateTimeField(null=True, blank=True)
    
    # Tracking
    total_donations = models.PositiveIntegerField(default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'next_payment_date']),
            models.Index(fields=['donor', 'status']),
        ]
    
    def __str__(self):
        return f"{self.donor.email} - ${self.amount} {self.frequency}"


class DonationReceipt(BaseAuditModel):
    """
    Tax receipts for donations.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    donation = models.OneToOneField(Donation, on_delete=models.CASCADE, related_name='receipt')
    
    # Receipt details
    receipt_number = models.CharField(max_length=50, unique=True)
    receipt_date = models.DateTimeField(auto_now_add=True)
    
    # Tax information
    tax_year = models.PositiveIntegerField()
    tax_deductible_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # File storage
    receipt_file = models.FileField(upload_to='receipts/', blank=True, null=True)
    
    class Meta:
        ordering = ['-receipt_date']
        indexes = [
            models.Index(fields=['receipt_number']),
            models.Index(fields=['tax_year']),
        ]
    
    def __str__(self):
        return f"Receipt {self.receipt_number}"