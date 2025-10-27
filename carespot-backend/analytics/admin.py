"""
Admin configuration for analytics app.
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import (
    AnonymizedUser, PageView, UserAction, ContentPerformance,
    DonationAnalytics, VolunteerAnalytics, SystemMetrics, DataRetentionPolicy
)


@admin.register(AnonymizedUser)
class AnonymizedUserAdmin(admin.ModelAdmin):
    list_display = [
        'anonymous_id_short', 'user_type', 'age_range', 'location_region',
        'total_sessions', 'total_page_views', 'is_active_user',
        'has_donated', 'has_volunteered', 'last_activity'
    ]
    list_filter = [
        'user_type', 'age_range', 'is_active_user', 'has_donated',
        'has_volunteered', 'has_subscribed_newsletter', 'last_activity'
    ]
    search_fields = ['anonymous_id']
    readonly_fields = ['anonymous_id', 'first_visit', 'created_at', 'updated_at']
    
    def anonymous_id_short(self, obj):
        return f"{obj.anonymous_id[:8]}..."
    anonymous_id_short.short_description = 'Anonymous ID'


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = [
        'anonymous_user_short', 'page_url_short', 'page_title',
        'device_type', 'browser_family', 'time_on_page', 'created_at'
    ]
    list_filter = [
        'device_type', 'browser_family', 'user_agent_category', 'created_at'
    ]
    search_fields = ['page_url', 'page_title', 'referrer_url']
    readonly_fields = ['created_at', 'updated_at']
    
    def anonymous_user_short(self, obj):
        return f"{obj.anonymous_user.anonymous_id[:8]}..."
    anonymous_user_short.short_description = 'User'
    
    def page_url_short(self, obj):
        return obj.page_url[:50] + "..." if len(obj.page_url) > 50 else obj.page_url
    page_url_short.short_description = 'Page URL'


@admin.register(UserAction)
class UserActionAdmin(admin.ModelAdmin):
    list_display = [
        'anonymous_user_short', 'action_type', 'action_name',
        'page_url_short', 'created_at'
    ]
    list_filter = ['action_type', 'created_at']
    search_fields = ['action_name', 'page_url']
    readonly_fields = ['created_at', 'updated_at']
    
    def anonymous_user_short(self, obj):
        return f"{obj.anonymous_user.anonymous_id[:8]}..."
    anonymous_user_short.short_description = 'User'
    
    def page_url_short(self, obj):
        return obj.page_url[:50] + "..." if len(obj.page_url) > 50 else obj.page_url
    page_url_short.short_description = 'Page URL'


@admin.register(ContentPerformance)
class ContentPerformanceAdmin(admin.ModelAdmin):
    list_display = [
        'content_object', 'date', 'total_views', 'unique_views',
        'bounce_rate_display', 'conversion_rate_display'
    ]
    list_filter = ['content_type', 'date']
    readonly_fields = ['created_at', 'updated_at']
    
    def bounce_rate_display(self, obj):
        return f"{obj.bounce_rate:.1f}%"
    bounce_rate_display.short_description = 'Bounce Rate'
    
    def conversion_rate_display(self, obj):
        return f"{obj.conversion_rate:.1f}%"
    conversion_rate_display.short_description = 'Conversion Rate'


@admin.register(DonationAnalytics)
class DonationAnalyticsAdmin(admin.ModelAdmin):
    list_display = [
        'amount_range', 'payment_method', 'donation_type',
        'donor_age_range', 'is_repeat_donor', 'campaign_category',
        'donation_date'
    ]
    list_filter = [
        'amount_range', 'payment_method', 'donation_type',
        'donor_age_range', 'is_repeat_donor', 'donation_date'
    ]
    readonly_fields = ['created_at', 'updated_at']


@admin.register(VolunteerAnalytics)
class VolunteerAnalyticsAdmin(admin.ModelAdmin):
    list_display = [
        'volunteer_age_range', 'application_status', 'opportunity_category',
        'commitment_type', 'application_date'
    ]
    list_filter = [
        'volunteer_age_range', 'application_status', 'opportunity_category',
        'commitment_type', 'application_date'
    ]
    readonly_fields = ['created_at', 'updated_at']


@admin.register(SystemMetrics)
class SystemMetricsAdmin(admin.ModelAdmin):
    list_display = [
        'metric_name', 'metric_value', 'metric_unit', 'metric_type',
        'date', 'hour'
    ]
    list_filter = ['metric_type', 'date', 'user_segment']
    search_fields = ['metric_name', 'page_url']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(DataRetentionPolicy)
class DataRetentionPolicyAdmin(admin.ModelAdmin):
    list_display = [
        'data_type', 'retention_days', 'anonymization_days',
        'is_active', 'auto_cleanup'
    ]
    list_filter = ['data_type', 'is_active', 'auto_cleanup']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Policy Details', {
            'fields': ('data_type', 'description')
        }),
        ('Retention Settings', {
            'fields': ('retention_days', 'anonymization_days')
        }),
        ('Automation', {
            'fields': ('is_active', 'auto_cleanup')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )