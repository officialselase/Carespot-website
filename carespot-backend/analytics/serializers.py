"""
Serializers for analytics models.
"""

from rest_framework import serializers
from .models import (
    AnonymizedUser, PageView, UserAction, ContentPerformance,
    DonationAnalytics, VolunteerAnalytics, SystemMetrics, DataRetentionPolicy
)


class AnonymizedUserSerializer(serializers.ModelSerializer):
    """Serializer for anonymized user data."""
    
    class Meta:
        model = AnonymizedUser
        fields = [
            'id', 'anonymous_id', 'age_range', 'location_region', 'user_type',
            'first_visit', 'last_activity', 'total_sessions', 'total_page_views',
            'is_active_user', 'has_donated', 'has_volunteered', 'has_subscribed_newsletter'
        ]
        read_only_fields = ['id', 'anonymous_id']


class PageViewSerializer(serializers.ModelSerializer):
    """Serializer for page view analytics."""
    
    class Meta:
        model = PageView
        fields = [
            'id', 'anonymous_user', 'page_url', 'page_title', 'referrer_url',
            'session_id', 'user_agent_category', 'browser_family', 'device_type',
            'time_on_page', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class UserActionSerializer(serializers.ModelSerializer):
    """Serializer for user action analytics."""
    
    class Meta:
        model = UserAction
        fields = [
            'id', 'anonymous_user', 'action_type', 'action_name', 'page_url',
            'metadata', 'session_id', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ContentPerformanceSerializer(serializers.ModelSerializer):
    """Serializer for content performance analytics."""
    content_title = serializers.SerializerMethodField()
    
    class Meta:
        model = ContentPerformance
        fields = [
            'content_type', 'object_id', 'content_title', 'total_views',
            'unique_views', 'average_time_on_page', 'bounce_rate',
            'total_shares', 'total_downloads', 'total_interactions',
            'conversion_rate', 'goal_completions', 'date'
        ]
    
    def get_content_title(self, obj):
        """Get the title of the content object."""
        if hasattr(obj.content_object, 'title'):
            return obj.content_object.title
        return str(obj.content_object)


class DonationAnalyticsSerializer(serializers.ModelSerializer):
    """Serializer for donation analytics."""
    
    class Meta:
        model = DonationAnalytics
        fields = [
            'id', 'amount_range', 'payment_method', 'donation_type',
            'donor_age_range', 'donor_location_region', 'is_repeat_donor',
            'campaign_category', 'donation_date'
        ]
        read_only_fields = ['id']


class VolunteerAnalyticsSerializer(serializers.ModelSerializer):
    """Serializer for volunteer analytics."""
    
    class Meta:
        model = VolunteerAnalytics
        fields = [
            'id', 'volunteer_age_range', 'volunteer_location_region',
            'application_status', 'opportunity_category', 'commitment_type',
            'skill_categories', 'application_date'
        ]
        read_only_fields = ['id']


class SystemMetricsSerializer(serializers.ModelSerializer):
    """Serializer for system metrics."""
    
    class Meta:
        model = SystemMetrics
        fields = [
            'id', 'metric_type', 'metric_name', 'metric_value', 'metric_unit',
            'page_url', 'user_segment', 'date', 'hour'
        ]
        read_only_fields = ['id']


class DataRetentionPolicySerializer(serializers.ModelSerializer):
    """Serializer for data retention policies."""
    
    class Meta:
        model = DataRetentionPolicy
        fields = [
            'id', 'data_type', 'retention_days', 'anonymization_days',
            'is_active', 'auto_cleanup', 'description'
        ]
        read_only_fields = ['id']


class AnalyticsDashboardSerializer(serializers.Serializer):
    """Serializer for analytics dashboard data."""
    total_users = serializers.IntegerField()
    active_users_today = serializers.IntegerField()
    total_page_views = serializers.IntegerField()
    total_donations = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_volunteers = serializers.IntegerField()
    conversion_rate = serializers.FloatField()
    top_pages = serializers.ListField(child=serializers.DictField())
    user_demographics = serializers.DictField()
    donation_trends = serializers.ListField(child=serializers.DictField())
    volunteer_trends = serializers.ListField(child=serializers.DictField())


class ContentAnalyticsSerializer(serializers.Serializer):
    """Serializer for content analytics data."""
    content_id = serializers.UUIDField()
    content_type = serializers.CharField()
    content_title = serializers.CharField()
    total_views = serializers.IntegerField()
    unique_views = serializers.IntegerField()
    average_time_on_page = serializers.FloatField()
    bounce_rate = serializers.FloatField()
    engagement_score = serializers.FloatField()
    conversion_rate = serializers.FloatField()


class UserBehaviorSerializer(serializers.Serializer):
    """Serializer for user behavior analytics."""
    user_segment = serializers.CharField()
    total_users = serializers.IntegerField()
    average_session_duration = serializers.FloatField()
    pages_per_session = serializers.FloatField()
    bounce_rate = serializers.FloatField()
    conversion_rate = serializers.FloatField()
    top_actions = serializers.ListField(child=serializers.DictField())
    user_journey = serializers.ListField(child=serializers.DictField())