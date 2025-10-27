"""
API views for volunteer management.
"""

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q, Sum, Count, Avg
from django.utils import timezone
from datetime import timedelta

from authentication.permissions import IsOwnerOrReadOnly, HasRolePermission
from .models import (
    SkillCategory, Skill, VolunteerOpportunity, VolunteerProfile,
    VolunteerApplication, VolunteerAssignment, VolunteerTimeLog,
    ApplicationDocument, DocumentTemplate, ApplicationNote
)
from .serializers import (
    SkillCategorySerializer, SkillSerializer, VolunteerOpportunityListSerializer,
    VolunteerOpportunityDetailSerializer, VolunteerProfileSerializer,
    VolunteerApplicationSerializer, VolunteerAssignmentSerializer,
    VolunteerTimeLogSerializer, VolunteerStatsSerializer,
    ApplicationDocumentSerializer, DocumentTemplateSerializer, ApplicationNoteSerializer
)


class SkillCategoryListView(generics.ListCreateAPIView):
    """
    List all skill categories or create a new category.
    """
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]


class SkillListView(generics.ListCreateAPIView):
    """
    List all skills or create a new skill.
    """
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Search skills
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset.order_by('category__name', 'name')


class VolunteerOpportunityListView(generics.ListCreateAPIView):
    """
    List all volunteer opportunities or create a new opportunity.
    """
    serializer_class = VolunteerOpportunityListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VolunteerOpportunityDetailSerializer
        return VolunteerOpportunityListSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = VolunteerOpportunity.objects.all()
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter active opportunities
        active_only = self.request.query_params.get('active_only')
        if active_only == 'true':
            from django.db import models as django_models
            queryset = queryset.filter(
                status='active',
                start_date__lte=timezone.now().date()
            ).exclude(
                positions_filled__gte=django_models.F('positions_available')
            )
        
        # Filter by commitment type
        commitment_type = self.request.query_params.get('commitment_type')
        if commitment_type:
            queryset = queryset.filter(commitment_type=commitment_type)
        
        # Filter by location type
        is_remote = self.request.query_params.get('is_remote')
        if is_remote == 'true':
            queryset = queryset.filter(is_remote=True)
        elif is_remote == 'false':
            queryset = queryset.filter(is_remote=False)
        
        # Filter by required skills
        skills = self.request.query_params.getlist('skills')
        if skills:
            queryset = queryset.filter(required_skills__id__in=skills).distinct()
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(location__icontains=search)
            )
        
        return queryset.order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(contact_person=self.request.user)


class VolunteerOpportunityDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a volunteer opportunity.
    """
    queryset = VolunteerOpportunity.objects.all()
    serializer_class = VolunteerOpportunityDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def retrieve(self, request, *args, **kwargs):
        """Increment view count when retrieving opportunity details."""
        instance = self.get_object()
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        return super().retrieve(request, *args, **kwargs)


class VolunteerProfileView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update volunteer profile.
    """
    serializer_class = VolunteerProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_object(self):
        """Get or create volunteer profile for the current user."""
        profile, created = VolunteerProfile.objects.get_or_create(
            user=self.request.user
        )
        return profile


class VolunteerApplicationListView(generics.ListCreateAPIView):
    """
    List volunteer applications or create a new application.
    """
    serializer_class = VolunteerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = VolunteerApplication.objects.all()
        
        # Users can only see their own applications unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(volunteer=self.request.user)
        
        # Filter by opportunity
        opportunity = self.request.query_params.get('opportunity')
        if opportunity:
            queryset = queryset.filter(opportunity__slug=opportunity)
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-created_at')


class VolunteerApplicationDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a volunteer application.
    """
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Users can only see their own applications unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(volunteer=self.request.user)
        
        return queryset


class VolunteerAssignmentListView(generics.ListAPIView):
    """
    List volunteer assignments.
    """
    serializer_class = VolunteerAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = VolunteerAssignment.objects.all()
        
        # Users can only see their own assignments unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(volunteer=self.request.user)
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-start_date')


class VolunteerTimeLogListView(generics.ListCreateAPIView):
    """
    List volunteer time logs or create a new log entry.
    """
    serializer_class = VolunteerTimeLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = VolunteerTimeLog.objects.all()
        
        # Users can only see their own time logs unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(volunteer=self.request.user)
        
        # Filter by assignment
        assignment = self.request.query_params.get('assignment')
        if assignment:
            queryset = queryset.filter(assignment__id=assignment)
        
        # Filter by approval status
        approved = self.request.query_params.get('approved')
        if approved == 'true':
            queryset = queryset.filter(approved=True)
        elif approved == 'false':
            queryset = queryset.filter(approved=False)
        
        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        return queryset.order_by('-date', '-start_time')


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def approve_application(request, pk):
    """
    Approve a volunteer application and create assignment.
    """
    try:
        application = VolunteerApplication.objects.get(pk=pk)
        
        if application.status != 'submitted':
            return Response(
                {'error': 'Application is not in submitted status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update application status
        application.status = 'approved'
        application.reviewed_by = request.user
        application.reviewed_at = timezone.now()
        application.decision_date = timezone.now()
        application.save()
        
        # Create volunteer assignment
        assignment = VolunteerAssignment.objects.create(
            volunteer=application.volunteer,
            opportunity=application.opportunity,
            application=application,
            start_date=application.opportunity.start_date,
            end_date=application.opportunity.end_date,
            supervisor=request.user
        )
        
        # Update opportunity positions filled
        application.opportunity.positions_filled += 1
        application.opportunity.save(update_fields=['positions_filled'])
        
        return Response({
            'status': 'success',
            'assignment_id': assignment.id
        })
    
    except VolunteerApplication.DoesNotExist:
        return Response(
            {'error': 'Application not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def reject_application(request, pk):
    """
    Reject a volunteer application.
    """
    try:
        application = VolunteerApplication.objects.get(pk=pk)
        
        if application.status != 'submitted':
            return Response(
                {'error': 'Application is not in submitted status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update application status
        application.status = 'rejected'
        application.reviewed_by = request.user
        application.reviewed_at = timezone.now()
        application.decision_date = timezone.now()
        application.decision_reason = request.data.get('reason', '')
        application.save()
        
        return Response({'status': 'success'})
    
    except VolunteerApplication.DoesNotExist:
        return Response(
            {'error': 'Application not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def approve_time_log(request, pk):
    """
    Approve a volunteer time log entry.
    """
    try:
        time_log = VolunteerTimeLog.objects.get(pk=pk)
        
        if time_log.approved:
            return Response(
                {'error': 'Time log already approved'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Approve time log
        time_log.approved = True
        time_log.approved_by = request.user
        time_log.approved_at = timezone.now()
        time_log.save()
        
        # Update assignment hours
        assignment = time_log.assignment
        assignment.hours_completed += time_log.hours
        assignment.save(update_fields=['hours_completed'])
        
        # Update volunteer profile total hours
        profile = time_log.volunteer.volunteer_profile
        profile.total_hours_volunteered += time_log.hours
        profile.save(update_fields=['total_hours_volunteered'])
        
        return Response({'status': 'success'})
    
    except VolunteerTimeLog.DoesNotExist:
        return Response(
            {'error': 'Time log not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def volunteer_stats(request):
    """
    Get volunteer statistics and analytics.
    """
    # Calculate date ranges
    now = timezone.now()
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    # Basic stats
    total_volunteers = VolunteerProfile.objects.filter(is_active=True).count()
    active_volunteers = VolunteerAssignment.objects.filter(status='active').values('volunteer').distinct().count()
    
    total_hours = VolunteerTimeLog.objects.filter(approved=True).aggregate(
        total=Sum('hours')
    )['total'] or 0
    
    active_opportunities = VolunteerOpportunity.objects.filter(status='active').count()
    pending_applications = VolunteerApplication.objects.filter(status='submitted').count()
    
    monthly_hours = VolunteerTimeLog.objects.filter(
        approved=True,
        date__gte=month_start.date()
    ).aggregate(total=Sum('hours'))['total'] or 0
    
    # Top skills
    top_skills = list(Skill.objects.annotate(
        volunteer_count=Count('volunteers')
    ).order_by('-volunteer_count')[:10].values('name', 'volunteer_count'))
    
    # Recent applications
    recent_applications = list(VolunteerApplication.objects.filter(
        status='submitted'
    ).order_by('-created_at')[:10].values(
        'volunteer__first_name', 'volunteer__last_name',
        'opportunity__title', 'created_at'
    ))
    
    stats_data = {
        'total_volunteers': total_volunteers,
        'active_volunteers': active_volunteers,
        'total_hours': total_hours,
        'active_opportunities': active_opportunities,
        'pending_applications': pending_applications,
        'monthly_hours': monthly_hours,
        'top_skills': top_skills,
        'recent_applications': recent_applications
    }
    
    serializer = VolunteerStatsSerializer(stats_data)
    return Response(serializer.data)


# Document Management Views

class ApplicationDocumentListView(generics.ListCreateAPIView):
    """
    List application documents or upload a new document.
    """
    serializer_class = ApplicationDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = ApplicationDocument.objects.all()
        
        # Users can only see documents for their own applications unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(application__volunteer=self.request.user)
        
        # Filter by application
        application = self.request.query_params.get('application')
        if application:
            queryset = queryset.filter(application__id=application)
        
        # Filter by document type
        document_type = self.request.query_params.get('document_type')
        if document_type:
            queryset = queryset.filter(document_type=document_type)
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-created_at')


class ApplicationDocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete an application document.
    """
    queryset = ApplicationDocument.objects.all()
    serializer_class = ApplicationDocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Users can only access documents for their own applications unless they're staff/admin
        if not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(application__volunteer=self.request.user)
        
        return queryset


class DocumentTemplateListView(generics.ListCreateAPIView):
    """
    List document templates or create a new template.
    """
    serializer_class = DocumentTemplateSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = DocumentTemplate.objects.filter(is_active=True)
        
        # Filter by document type
        document_type = self.request.query_params.get('document_type')
        if document_type:
            queryset = queryset.filter(document_type=document_type)
        
        # Filter required templates only
        required_only = self.request.query_params.get('required_only')
        if required_only == 'true':
            queryset = queryset.filter(is_required=True)
        
        return queryset.order_by('name')


class ApplicationNoteListView(generics.ListCreateAPIView):
    """
    List application notes or create a new note.
    """
    serializer_class = ApplicationNoteSerializer
    permission_classes = [HasRolePermission(['admin', 'staff'])]
    
    def get_queryset(self):
        queryset = ApplicationNote.objects.all()
        
        # Filter by application
        application = self.request.query_params.get('application')
        if application:
            queryset = queryset.filter(application__id=application)
        
        # Filter by note type
        note_type = self.request.query_params.get('note_type')
        if note_type:
            queryset = queryset.filter(note_type=note_type)
        
        # Filter important notes
        important_only = self.request.query_params.get('important_only')
        if important_only == 'true':
            queryset = queryset.filter(is_important=True)
        
        return queryset.order_by('-created_at')


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def approve_document(request, pk):
    """
    Approve an application document.
    """
    try:
        document = ApplicationDocument.objects.get(pk=pk)
        notes = request.data.get('notes', '')
        
        document.approve_document(request.user, notes)
        
        return Response({'status': 'success', 'message': 'Document approved'})
    
    except ApplicationDocument.DoesNotExist:
        return Response(
            {'error': 'Document not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def reject_document(request, pk):
    """
    Reject an application document.
    """
    try:
        document = ApplicationDocument.objects.get(pk=pk)
        reason = request.data.get('reason', '')
        
        document.reject_document(request.user, reason)
        
        return Response({'status': 'success', 'message': 'Document rejected'})
    
    except ApplicationDocument.DoesNotExist:
        return Response(
            {'error': 'Document not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def submit_application(request, pk):
    """
    Submit a volunteer application.
    """
    try:
        application = VolunteerApplication.objects.get(pk=pk)
        
        # Check if user owns this application
        if application.volunteer != request.user and not request.user.has_role(['admin', 'staff']):
            return Response(
                {'error': 'You can only submit your own applications'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if application.submit_application():
            return Response({'status': 'success', 'message': 'Application submitted successfully'})
        else:
            return Response(
                {'error': 'Application cannot be submitted. Please ensure all required documents are uploaded.'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    except VolunteerApplication.DoesNotExist:
        return Response(
            {'error': 'Application not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def document_stats(request):
    """
    Get document statistics for admin dashboard.
    """
    # Document status breakdown
    document_stats = ApplicationDocument.objects.values('status').annotate(
        count=Count('id')
    ).order_by('status')
    
    # Documents by type
    document_types = ApplicationDocument.objects.values('document_type').annotate(
        count=Count('id')
    ).order_by('-count')
    
    # Expired documents
    expired_documents = ApplicationDocument.objects.filter(
        expires_at__lt=timezone.now()
    ).count()
    
    # Documents pending review
    pending_review = ApplicationDocument.objects.filter(status='pending').count()
    
    # Recent uploads
    recent_uploads = list(ApplicationDocument.objects.order_by('-created_at')[:10].values(
        'title', 'document_type', 'uploaded_by__first_name', 'uploaded_by__last_name',
        'created_at', 'application__volunteer__first_name', 'application__volunteer__last_name'
    ))
    
    stats_data = {
        'document_stats': list(document_stats),
        'document_types': list(document_types),
        'expired_documents': expired_documents,
        'pending_review': pending_review,
        'recent_uploads': recent_uploads
    }
    
    return Response(stats_data)