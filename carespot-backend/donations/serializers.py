"""
Serializers for donation-related models.
"""

from rest_framework import serializers
from decimal import Decimal
from django.utils import timezone
from .models import DonationCampaign, Donation, RecurringDonation, DonationReceipt


class DonationCampaignListSerializer(serializers.ModelSerializer):
    """
    Serializer for donation campaign list view.
    """
    progress_percentage = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    
    class Meta:
        model = DonationCampaign
        fields = [
            'id', 'title', 'slug', 'short_description', 'featured_image',
            'target_amount', 'current_amount', 'progress_percentage',
            'start_date', 'end_date', 'status', 'is_active',
            'view_count', 'created_at'
        ]
        read_only_fields = ['id', 'current_amount', 'view_count', 'created_at']


class DonationCampaignDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for donation campaign detail view.
    """
    progress_percentage = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    recent_donations = serializers.SerializerMethodField()
    
    class Meta:
        model = DonationCampaign
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'featured_image', 'video_url', 'target_amount', 'current_amount',
            'progress_percentage', 'start_date', 'end_date', 'status',
            'is_active', 'view_count', 'share_count', 'meta_title',
            'meta_description', 'created_at', 'updated_at', 'recent_donations'
        ]
        read_only_fields = [
            'id', 'current_amount', 'view_count', 'share_count',
            'created_at', 'updated_at'
        ]
    
    def get_recent_donations(self, obj):
        """Get recent donations for this campaign (non-anonymous only)."""
        recent = obj.donations.filter(
            status='completed',
            is_anonymous=False
        ).order_by('-payment_date')[:5]
        
        return [{
            'donor_name': donation.donor_name,
            'amount': donation.amount,
            'payment_date': donation.payment_date,
            'donor_message': donation.donor_message
        } for donation in recent]


class DonationCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating donations.
    """
    class Meta:
        model = Donation
        fields = [
            'campaign', 'amount', 'currency', 'payment_method',
            'donor_name', 'donor_email', 'donor_phone', 'is_anonymous',
            'donor_message', 'donation_type'
        ]
    
    def validate_amount(self, value):
        """Validate donation amount."""
        if value < Decimal('1.00'):
            raise serializers.ValidationError("Minimum donation amount is $1.00")
        if value > Decimal('100000.00'):
            raise serializers.ValidationError("Maximum donation amount is $100,000.00")
        return value
    
    def validate_campaign(self, value):
        """Validate campaign is active and accepting donations."""
        if not value.is_active:
            raise serializers.ValidationError("This campaign is not currently accepting donations")
        return value
    
    def create(self, validated_data):
        """Create donation with proper user association."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['donor'] = request.user
        
        return super().create(validated_data)


class DonationSerializer(serializers.ModelSerializer):
    """
    Serializer for donation details.
    """
    net_amount = serializers.ReadOnlyField()
    campaign_title = serializers.CharField(source='campaign.title', read_only=True)
    
    class Meta:
        model = Donation
        fields = [
            'id', 'campaign', 'campaign_title', 'amount', 'currency',
            'payment_method', 'donor_name', 'donor_email', 'is_anonymous',
            'status', 'donation_type', 'payment_date', 'donor_message',
            'net_amount', 'receipt_sent', 'created_at'
        ]
        read_only_fields = [
            'id', 'status', 'payment_date', 'net_amount',
            'receipt_sent', 'created_at'
        ]


class RecurringDonationSerializer(serializers.ModelSerializer):
    """
    Serializer for recurring donations.
    """
    campaign_title = serializers.CharField(source='campaign.title', read_only=True)
    donor_name = serializers.CharField(source='donor.get_full_name', read_only=True)
    
    class Meta:
        model = RecurringDonation
        fields = [
            'id', 'campaign', 'campaign_title', 'donor_name', 'amount',
            'currency', 'frequency', 'payment_method', 'status',
            'next_payment_date', 'last_payment_date', 'total_donations',
            'total_amount', 'created_at'
        ]
        read_only_fields = [
            'id', 'total_donations', 'total_amount', 'last_payment_date',
            'created_at'
        ]


class DonationReceiptSerializer(serializers.ModelSerializer):
    """
    Serializer for donation receipts.
    """
    donation_amount = serializers.DecimalField(
        source='donation.amount',
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    donor_name = serializers.CharField(source='donation.donor_name', read_only=True)
    campaign_title = serializers.CharField(source='donation.campaign.title', read_only=True)
    
    class Meta:
        model = DonationReceipt
        fields = [
            'id', 'receipt_number', 'receipt_date', 'tax_year',
            'tax_deductible_amount', 'receipt_file', 'donation_amount',
            'donor_name', 'campaign_title'
        ]
        read_only_fields = [
            'id', 'receipt_number', 'receipt_date', 'donation_amount',
            'donor_name', 'campaign_title'
        ]


class DonationStatsSerializer(serializers.Serializer):
    """
    Serializer for donation statistics.
    """
    total_donations = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_donors = serializers.IntegerField()
    average_donation = serializers.DecimalField(max_digits=10, decimal_places=2)
    monthly_total = serializers.DecimalField(max_digits=12, decimal_places=2)
    top_campaigns = serializers.ListField(child=serializers.DictField())
    recent_donations = serializers.ListField(child=serializers.DictField())
    payment_methods = serializers.DictField()