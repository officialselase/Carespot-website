"""
Admin configuration for donations app.
"""

from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import DonationCampaign, Donation, RecurringDonation, DonationReceipt


@admin.register(DonationCampaign)
class DonationCampaignAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'status', 'target_amount', 'current_amount', 
        'progress_display', 'start_date', 'end_date', 'view_count'
    ]
    list_filter = ['status', 'start_date', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['current_amount', 'view_count', 'share_count', 'progress_display']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'short_description')
        }),
        ('Financial Details', {
            'fields': ('target_amount', 'current_amount', 'progress_display')
        }),
        ('Timeline', {
            'fields': ('start_date', 'end_date', 'status')
        }),
        ('Media', {
            'fields': ('featured_image', 'video_url')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Statistics', {
            'fields': ('view_count', 'share_count'),
            'classes': ('collapse',)
        })
    )
    
    def progress_display(self, obj):
        """Display progress as a visual bar."""
        percentage = obj.progress_percentage
        color = 'green' if percentage >= 100 else 'orange' if percentage >= 50 else 'red'
        return format_html(
            '<div style="width: 100px; background-color: #f0f0f0;">'
            '<div style="width: {}px; background-color: {}; height: 20px;"></div>'
            '</div> {}%',
            min(percentage, 100), color, round(percentage, 1)
        )
    progress_display.short_description = 'Progress'


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = [
        'donor_name', 'amount', 'currency', 'campaign', 'payment_method',
        'status', 'payment_date', 'is_anonymous'
    ]
    list_filter = [
        'status', 'payment_method', 'donation_type', 'is_anonymous',
        'payment_date', 'created_at'
    ]
    search_fields = ['donor_name', 'donor_email', 'campaign__title']
    readonly_fields = [
        'id', 'net_amount', 'created_at', 'updated_at',
        'payment_date', 'receipt_sent_at'
    ]
    
    fieldsets = (
        ('Donor Information', {
            'fields': ('donor', 'donor_name', 'donor_email', 'donor_phone', 'is_anonymous')
        }),
        ('Donation Details', {
            'fields': ('campaign', 'amount', 'currency', 'net_amount', 'donation_type')
        }),
        ('Payment Information', {
            'fields': ('payment_method', 'payment_intent_id', 'transaction_id', 'payment_processor_fee')
        }),
        ('Status', {
            'fields': ('status', 'payment_date', 'refund_date')
        }),
        ('Messages', {
            'fields': ('donor_message', 'internal_notes')
        }),
        ('Receipt', {
            'fields': ('tax_deductible', 'receipt_sent', 'receipt_sent_at')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def net_amount(self, obj):
        return obj.net_amount
    net_amount.short_description = 'Net Amount'


@admin.register(RecurringDonation)
class RecurringDonationAdmin(admin.ModelAdmin):
    list_display = [
        'donor', 'campaign', 'amount', 'frequency', 'status',
        'next_payment_date', 'total_donations', 'total_amount'
    ]
    list_filter = ['status', 'frequency', 'payment_method', 'created_at']
    search_fields = ['donor__email', 'campaign__title']
    readonly_fields = ['total_donations', 'total_amount', 'created_at', 'updated_at']


@admin.register(DonationReceipt)
class DonationReceiptAdmin(admin.ModelAdmin):
    list_display = [
        'receipt_number', 'donation', 'tax_year', 'tax_deductible_amount',
        'receipt_date'
    ]
    list_filter = ['tax_year', 'receipt_date']
    search_fields = ['receipt_number', 'donation__donor_name']
    readonly_fields = ['receipt_date', 'created_at', 'updated_at']