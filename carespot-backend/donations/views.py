"""
API views for donation management.
"""

from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg, Q
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal

from authentication.permissions import IsOwnerOrReadOnly, HasRolePermission
from .models import DonationCampaign, Donation, RecurringDonation, DonationReceipt
from .serializers import (
    DonationCampaignListSerializer, DonationCampaignDetailSerializer,
    DonationCreateSerializer, DonationSerializer, RecurringDonationSerializer,
    DonationReceiptSerializer, DonationStatsSerializer
)


class DonationCampaignListView(generics.ListCreateAPIView):
    """
    List all donation campaigns or create a new campaign.
    """
    queryset = DonationCampaign.objects.filter(status__in=['active', 'completed'])
    serializer_class = DonationCampaignListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DonationCampaignDetailSerializer
        return DonationCampaignListSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by active campaigns
        active_only = self.request.query_params.get('active_only')
        if active_only == 'true':
            queryset = queryset.filter(
                status='active',
                start_date__lte=timezone.now(),
                end_date__gte=timezone.now()
            )
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )
        
        return queryset.order_by('-created_at')


class DonationCampaignDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a donation campaign.
    """
    queryset = DonationCampaign.objects.all()
    serializer_class = DonationCampaignDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def retrieve(self, request, *args, **kwargs):
        """Increment view count when retrieving campaign details."""
        instance = self.get_object()
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        return super().retrieve(request, *args, **kwargs)


class DonationListCreateView(generics.ListCreateAPIView):
    """
    List donations or create a new donation.
    """
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DonationCreateSerializer
        return DonationSerializer
    
    def get_queryset(self):
        queryset = Donation.objects.all()
        
        # Filter by user's own donations if authenticated
        if self.request.user.is_authenticated:
            if not self.request.user.has_role(['admin', 'staff']):
                queryset = queryset.filter(donor=self.request.user)
        else:
            # Anonymous users can't see donations
            return Donation.objects.none()
        
        # Filter by campaign
        campaign = self.request.query_params.get('campaign')
        if campaign:
            queryset = queryset.filter(campaign__slug=campaign)
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-created_at')


class DonationDetailView(generics.RetrieveAPIView):
    """
    Retrieve donation details.
    """
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Users can only see their own donations unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(donor=self.request.user)
        
        return queryset


class RecurringDonationListView(generics.ListCreateAPIView):
    """
    List or create recurring donations.
    """
    serializer_class = RecurringDonationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = RecurringDonation.objects.all()
        
        # Users can only see their own recurring donations unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(donor=self.request.user)
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-created_at')


class DonationReceiptListView(generics.ListAPIView):
    """
    List donation receipts for the authenticated user.
    """
    serializer_class = DonationReceiptSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = DonationReceipt.objects.all()
        
        # Users can only see their own receipts unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(donation__donor=self.request.user)
        
        # Filter by tax year
        tax_year = self.request.query_params.get('tax_year')
        if tax_year:
            queryset = queryset.filter(tax_year=tax_year)
        
        return queryset.order_by('-receipt_date')


@api_view(['GET'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def donation_stats(request):
    """
    Get donation statistics and analytics.
    """
    # Calculate date ranges
    now = timezone.now()
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    # Basic stats
    total_donations = Donation.objects.filter(status='completed').aggregate(
        total=Sum('amount')
    )['total'] or Decimal('0.00')
    
    total_donors = Donation.objects.filter(status='completed').values('donor_email').distinct().count()
    
    average_donation = Donation.objects.filter(status='completed').aggregate(
        avg=Avg('amount')
    )['avg'] or Decimal('0.00')
    
    monthly_total = Donation.objects.filter(
        status='completed',
        payment_date__gte=month_start
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
    
    # Top campaigns
    top_campaigns = list(DonationCampaign.objects.annotate(
        total_raised=Sum('donations__amount', filter=Q(donations__status='completed'))
    ).order_by('-total_raised')[:5].values('title', 'total_raised'))
    
    # Recent donations (non-anonymous)
    recent_donations = list(Donation.objects.filter(
        status='completed',
        is_anonymous=False
    ).order_by('-payment_date')[:10].values(
        'donor_name', 'amount', 'payment_date', 'campaign__title'
    ))
    
    # Payment methods breakdown
    payment_methods = dict(Donation.objects.filter(
        status='completed'
    ).values('payment_method').annotate(
        count=Count('id'),
        total=Sum('amount')
    ).values_list('payment_method', 'total'))
    
    stats_data = {
        'total_donations': total_donations,
        'total_donors': total_donors,
        'average_donation': average_donation,
        'monthly_total': monthly_total,
        'top_campaigns': top_campaigns,
        'recent_donations': recent_donations,
        'payment_methods': payment_methods
    }
    
    serializer = DonationStatsSerializer(stats_data)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def process_donation_webhook(request):
    """
    Handle payment processor webhooks for donation updates.
    """
    # This would handle webhooks from Stripe, PayPal, etc.
    # Implementation depends on the specific payment processor
    
    webhook_data = request.data
    payment_intent_id = webhook_data.get('payment_intent_id')
    status = webhook_data.get('status')
    
    try:
        donation = Donation.objects.get(payment_intent_id=payment_intent_id)
        
        if status == 'succeeded':
            donation.status = 'completed'
            donation.payment_date = timezone.now()
            donation.save()
            
            # Update campaign total
            donation.campaign.update_current_amount()
            
        elif status == 'failed':
            donation.status = 'failed'
            donation.save()
        
        return Response({'status': 'success'})
    
    except Donation.DoesNotExist:
        return Response(
            {'error': 'Donation not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )