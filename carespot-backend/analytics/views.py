"""
API views for analytics with data anonymization.
"""

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg, Q
from django.utils import timezone
from datetime import timedelta, datetime
from decimal import Decimal

from authentication.permissions import HasRolePermission
from .models import (
    AnonymizedUser, PageView, UserAction, ContentPerformance,
    DonationAnalytics, VolunteerAnalytics, SystemMetrics, DataRetentionPolicy
)
from .serializers import (
    AnonymizedUserSerializer, PageViewSerializer, UserActionSerializer,
    ContentPerformanceSerializer, DonationAnalyticsSerializer,
    VolunteerAnalyticsSerializer, SystemMetricsSerializer,
    DataRetentionPolicySerializer, AnalyticsDashboardSerializer,
    ContentAnalyticsSerializer, UserBehaviorSerializer
)


class AnonymizedUserListView(generics.ListAPIView):
    """
    List anonymized user data for analytics.
    """
    queryset = AnonymizedUser.objects.all()
    serializer_class = AnonymizedUserSerializer
    permission_classes = [HasRolePermission(['admin', 'staff'])]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by user type
        user_type = self.request.query_params.get('user_type')
        if user_type:
            queryset = queryset.filter(user_type=user_type)
        
        # Filter by activity
        active_only = self.request.query_params.get('active_only')
        if active_only == 'true':
            queryset = queryset.filter(is_active_user=True)
        
        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date:
            queryset = queryset.filter(first_visit__gte=start_date)
        if end_date:
            queryset = queryset.filter(first_visit__lte=end_date)
        
        return queryset.order_by('-last_activity')


class PageViewListView(generics.ListCreateAPIView):
    """
    List page views or create new page view record.
    """
    queryset = PageView.objects.all()
    serializer_class = PageViewSerializer
    permission_classes = [permissions.AllowAny]  # Allow anonymous tracking
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by page URL
        page_url = self.request.query_params.get('page_url')
        if page_url:
            queryset = queryset.filter(page_url__icontains=page_url)
        
        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date:
            queryset = queryset.filter(created_at__gte=start_date)
        if end_date:
            queryset = queryset.filter(created_at__lte=end_date)
        
        return queryset.order_by('-created_at')


class UserActionListView(generics.ListCreateAPIView):
    """
    List user actions or create new action record.
    """
    queryset = UserAction.objects.all()
    serializer_class = UserActionSerializer
    permission_classes = [permissions.AllowAny]  # Allow anonymous tracking
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by action type
        action_type = self.request.query_params.get('action_type')
        if action_type:
            queryset = queryset.filter(action_type=action_type)
        
        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date:
            queryset = queryset.filter(created_at__gte=start_date)
        if end_date:
            queryset = queryset.filter(created_at__lte=end_date)
        
        return queryset.order_by('-created_at')


class ContentPerformanceListView(generics.ListAPIView):
    """
    List content performance analytics.
    """
    queryset = ContentPerformance.objects.all()
    serializer_class = ContentPerformanceSerializer
    permission_classes = [HasRolePermission(['admin', 'staff'])]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by content type
        content_type = self.request.query_params.get('content_type')
        if content_type:
            queryset = queryset.filter(content_type__model=content_type)
        
        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        return queryset.order_by('-date', '-total_views')


class SystemMetricsListView(generics.ListCreateAPIView):
    """
    List system metrics or create new metric record.
    """
    queryset = SystemMetrics.objects.all()
    serializer_class = SystemMetricsSerializer
    permission_classes = [HasRolePermission(['admin', 'staff'])]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by metric type
        metric_type = self.request.query_params.get('metric_type')
        if metric_type:
            queryset = queryset.filter(metric_type=metric_type)
        
        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        return queryset.order_by('-date', '-hour')


class DataRetentionPolicyListView(generics.ListCreateAPIView):
    """
    List or create data retention policies.
    """
    queryset = DataRetentionPolicy.objects.all()
    serializer_class = DataRetentionPolicySerializer
    permission_classes = [HasRolePermission(['admin'])]


@api_view(['GET'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def analytics_dashboard(request):
    """
    Get analytics dashboard data with anonymized metrics.
    """
    # Calculate date ranges
    now = timezone.now()
    today = now.date()
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)
    
    # Basic metrics
    total_users = AnonymizedUser.objects.count()
    active_users_today = AnonymizedUser.objects.filter(
        last_activity__date=today
    ).count()
    
    total_page_views = PageView.objects.count()
    
    # Donation metrics (anonymized)
    donation_analytics = DonationAnalytics.objects.filter(
        donation_date__gte=month_ago
    )
    total_donations = donation_analytics.count()
    
    # Volunteer metrics (anonymized)
    volunteer_analytics = VolunteerAnalytics.objects.filter(
        application_date__gte=month_ago
    )
    total_volunteers = volunteer_analytics.count()
    
    # Conversion rate (anonymized)
    total_actions = UserAction.objects.filter(
        created_at__date__gte=month_ago
    ).count()
    conversion_actions = UserAction.objects.filter(
        created_at__date__gte=month_ago,
        action_type__in=['donation', 'volunteer_application']
    ).count()
    conversion_rate = (conversion_actions / total_actions * 100) if total_actions > 0 else 0
    
    # Top pages
    top_pages = list(PageView.objects.filter(
        created_at__date__gte=week_ago
    ).values('page_url', 'page_title').annotate(
        views=Count('id')
    ).order_by('-views')[:10])
    
    # User demographics (anonymized)
    user_demographics = {
        'age_ranges': dict(AnonymizedUser.objects.exclude(
            age_range=''
        ).values_list('age_range').annotate(Count('id'))),
        'user_types': dict(AnonymizedUser.objects.values_list(
            'user_type'
        ).annotate(Count('id'))),
        'active_users': AnonymizedUser.objects.filter(is_active_user=True).count(),
        'donors': AnonymizedUser.objects.filter(has_donated=True).count(),
        'volunteers': AnonymizedUser.objects.filter(has_volunteered=True).count(),
    }
    
    # Donation trends (anonymized)
    donation_trends = list(DonationAnalytics.objects.filter(
        donation_date__gte=month_ago
    ).values('donation_date').annotate(
        count=Count('id')
    ).order_by('donation_date'))
    
    # Volunteer trends (anonymized)
    volunteer_trends = list(VolunteerAnalytics.objects.filter(
        application_date__gte=month_ago
    ).values('application_date').annotate(
        count=Count('id')
    ).order_by('application_date'))
    
    dashboard_data = {
        'total_users': total_users,
        'active_users_today': active_users_today,
        'total_page_views': total_page_views,
        'total_donations': total_donations,
        'total_volunteers': total_volunteers,
        'conversion_rate': conversion_rate,
        'top_pages': top_pages,
        'user_demographics': user_demographics,
        'donation_trends': donation_trends,
        'volunteer_trends': volunteer_trends,
    }
    
    serializer = AnalyticsDashboardSerializer(dashboard_data)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def content_analytics(request):
    """
    Get content performance analytics.
    """
    # Get date range
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')
    
    if not start_date:
        start_date = (timezone.now() - timedelta(days=30)).date()
    if not end_date:
        end_date = timezone.now().date()
    
    # Get content performance data
    content_performance = ContentPerformance.objects.filter(
        date__range=[start_date, end_date]
    ).select_related('content_type')
    
    # Aggregate by content
    content_data = {}
    for performance in content_performance:
        key = f"{performance.content_type.model}_{performance.object_id}"
        if key not in content_data:
            content_data[key] = {
                'content_id': performance.object_id,
                'content_type': performance.content_type.model,
                'content_title': getattr(performance.content_object, 'title', str(performance.content_object)),
                'total_views': 0,
                'unique_views': 0,
                'total_time': 0,
                'total_bounces': 0,
                'days': 0,
            }
        
        content_data[key]['total_views'] += performance.total_views
        content_data[key]['unique_views'] += performance.unique_views
        content_data[key]['total_time'] += performance.average_time_on_page * performance.total_views
        content_data[key]['total_bounces'] += performance.bounce_rate * performance.total_views / 100
        content_data[key]['days'] += 1
    
    # Calculate averages and engagement scores
    analytics_data = []
    for data in content_data.values():
        avg_time = data['total_time'] / data['total_views'] if data['total_views'] > 0 else 0
        bounce_rate = data['total_bounces'] / data['total_views'] * 100 if data['total_views'] > 0 else 0
        
        # Simple engagement score calculation
        engagement_score = (
            (data['total_views'] * 0.3) +
            (avg_time / 60 * 0.3) +  # Convert to minutes
            ((100 - bounce_rate) * 0.4)
        )
        
        analytics_data.append({
            'content_id': data['content_id'],
            'content_type': data['content_type'],
            'content_title': data['content_title'],
            'total_views': data['total_views'],
            'unique_views': data['unique_views'],
            'average_time_on_page': avg_time,
            'bounce_rate': bounce_rate,
            'engagement_score': engagement_score,
            'conversion_rate': 0.0,  # Would need additional data to calculate
        })
    
    # Sort by engagement score
    analytics_data.sort(key=lambda x: x['engagement_score'], reverse=True)
    
    serializer = ContentAnalyticsSerializer(analytics_data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def user_behavior_analytics(request):
    """
    Get user behavior analytics with anonymized data.
    """
    # Get date range
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')
    
    if not start_date:
        start_date = (timezone.now() - timedelta(days=30)).date()
    if not end_date:
        end_date = timezone.now().date()
    
    # Analyze different user segments
    segments = ['new_users', 'returning_users', 'donors', 'volunteers']
    behavior_data = []
    
    for segment in segments:
        # Filter users based on segment
        if segment == 'new_users':
            users = AnonymizedUser.objects.filter(
                first_visit__date__range=[start_date, end_date]
            )
        elif segment == 'returning_users':
            users = AnonymizedUser.objects.filter(
                first_visit__date__lt=start_date,
                last_activity__date__range=[start_date, end_date]
            )
        elif segment == 'donors':
            users = AnonymizedUser.objects.filter(
                has_donated=True,
                last_activity__date__range=[start_date, end_date]
            )
        elif segment == 'volunteers':
            users = AnonymizedUser.objects.filter(
                has_volunteered=True,
                last_activity__date__range=[start_date, end_date]
            )
        
        if not users.exists():
            continue
        
        # Calculate metrics for this segment
        total_users = users.count()
        avg_sessions = users.aggregate(avg=Avg('total_sessions'))['avg'] or 0
        avg_page_views = users.aggregate(avg=Avg('total_page_views'))['avg'] or 0
        pages_per_session = avg_page_views / avg_sessions if avg_sessions > 0 else 0
        
        # Get top actions for this segment
        user_ids = users.values_list('id', flat=True)
        top_actions = list(UserAction.objects.filter(
            anonymous_user_id__in=user_ids,
            created_at__date__range=[start_date, end_date]
        ).values('action_type', 'action_name').annotate(
            count=Count('id')
        ).order_by('-count')[:5])
        
        behavior_data.append({
            'user_segment': segment,
            'total_users': total_users,
            'average_session_duration': 0.0,  # Would need session tracking
            'pages_per_session': pages_per_session,
            'bounce_rate': 0.0,  # Would need additional calculation
            'conversion_rate': 0.0,  # Would need conversion tracking
            'top_actions': top_actions,
            'user_journey': [],  # Would need path analysis
        })
    
    serializer = UserBehaviorSerializer(behavior_data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin'])])
def cleanup_old_data(request):
    """
    Clean up old analytics data based on retention policies.
    """
    policies = DataRetentionPolicy.objects.filter(is_active=True, auto_cleanup=True)
    cleanup_results = {}
    
    for policy in policies:
        cutoff_date = timezone.now() - timedelta(days=policy.retention_days)
        
        if policy.data_type == 'page_views':
            deleted_count = PageView.objects.filter(created_at__lt=cutoff_date).count()
            PageView.objects.filter(created_at__lt=cutoff_date).delete()
        elif policy.data_type == 'user_actions':
            deleted_count = UserAction.objects.filter(created_at__lt=cutoff_date).count()
            UserAction.objects.filter(created_at__lt=cutoff_date).delete()
        elif policy.data_type == 'content_performance':
            deleted_count = ContentPerformance.objects.filter(date__lt=cutoff_date.date()).count()
            ContentPerformance.objects.filter(date__lt=cutoff_date.date()).delete()
        elif policy.data_type == 'donation_analytics':
            deleted_count = DonationAnalytics.objects.filter(donation_date__lt=cutoff_date.date()).count()
            DonationAnalytics.objects.filter(donation_date__lt=cutoff_date.date()).delete()
        elif policy.data_type == 'volunteer_analytics':
            deleted_count = VolunteerAnalytics.objects.filter(application_date__lt=cutoff_date.date()).count()
            VolunteerAnalytics.objects.filter(application_date__lt=cutoff_date.date()).delete()
        elif policy.data_type == 'system_metrics':
            deleted_count = SystemMetrics.objects.filter(date__lt=cutoff_date.date()).count()
            SystemMetrics.objects.filter(date__lt=cutoff_date.date()).delete()
        else:
            deleted_count = 0
        
        cleanup_results[policy.data_type] = deleted_count
    
    return Response({
        'status': 'success',
        'cleanup_results': cleanup_results,
        'cleanup_date': timezone.now()
    })


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def track_page_view(request):
    """
    Track a page view with anonymized data.
    """
    try:
        # Get or create anonymized user
        session_id = request.data.get('session_id', '')
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Create anonymized session ID
        import hashlib
        anonymous_session = hashlib.sha256(f"{session_id}_{timezone.now().date()}".encode()).hexdigest()[:32]
        
        # Get or create anonymized user based on session
        anonymous_user, created = AnonymizedUser.objects.get_or_create(
            anonymous_id=anonymous_session,
            defaults={
                'first_visit': timezone.now(),
                'last_activity': timezone.now(),
                'user_type': 'visitor',
            }
        )
        
        if not created:
            anonymous_user.last_activity = timezone.now()
            anonymous_user.total_page_views += 1
            anonymous_user.save()
        
        # Create page view record
        PageView.objects.create(
            anonymous_user=anonymous_user,
            page_url=request.data.get('page_url', ''),
            page_title=request.data.get('page_title', ''),
            referrer_url=request.data.get('referrer_url', ''),
            session_id=anonymous_session,
            user_agent_category=request.data.get('device_type', ''),
            browser_family=request.data.get('browser', ''),
            device_type=request.data.get('device_type', ''),
        )
        
        return Response({'status': 'success'})
    
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def track_user_action(request):
    """
    Track a user action with anonymized data.
    """
    try:
        session_id = request.data.get('session_id', '')
        
        # Create anonymized session ID
        import hashlib
        anonymous_session = hashlib.sha256(f"{session_id}_{timezone.now().date()}".encode()).hexdigest()[:32]
        
        # Get anonymized user
        try:
            anonymous_user = AnonymizedUser.objects.get(anonymous_id=anonymous_session)
        except AnonymizedUser.DoesNotExist:
            # Create if doesn't exist
            anonymous_user = AnonymizedUser.objects.create(
                anonymous_id=anonymous_session,
                first_visit=timezone.now(),
                last_activity=timezone.now(),
                user_type='visitor',
            )
        
        # Create user action record
        UserAction.objects.create(
            anonymous_user=anonymous_user,
            action_type=request.data.get('action_type', ''),
            action_name=request.data.get('action_name', ''),
            page_url=request.data.get('page_url', ''),
            metadata=request.data.get('metadata', {}),
            session_id=anonymous_session,
        )
        
        return Response({'status': 'success'})
    
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )