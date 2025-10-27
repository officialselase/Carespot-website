"""
URL configuration for donations app.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'donations'

# API v1 URLs
v1_urlpatterns = [
    # Donation Campaigns
    path('campaigns/', views.DonationCampaignListView.as_view(), name='campaign-list'),
    path('campaigns/<slug:slug>/', views.DonationCampaignDetailView.as_view(), name='campaign-detail'),
    
    # Donations
    path('donations/', views.DonationListCreateView.as_view(), name='donation-list'),
    path('donations/<uuid:pk>/', views.DonationDetailView.as_view(), name='donation-detail'),
    
    # Recurring Donations
    path('recurring/', views.RecurringDonationListView.as_view(), name='recurring-donation-list'),
    
    # Receipts
    path('receipts/', views.DonationReceiptListView.as_view(), name='receipt-list'),
    
    # Statistics and Analytics
    path('stats/', views.donation_stats, name='donation-stats'),
    
    # Webhooks
    path('webhooks/payment/', views.process_donation_webhook, name='payment-webhook'),
]

urlpatterns = [
    path('v1/', include(v1_urlpatterns)),
]