"""
Serializers for volunteer management models.
"""

from rest_framework import serializers
from django.utils import timezone
from .models import (
    SkillCategory, Skill, VolunteerOpportunity, VolunteerProfile,
    VolunteerApplication, VolunteerAssignment, VolunteerTimeLog,
    ApplicationDocument, DocumentTemplate, ApplicationNote
)


class SkillCategorySerializer(serializers.ModelSerializer):
    """Serializer for skill categories."""
    
    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'description', 'icon']
        read_only_fields = ['id']


class SkillSerializer(serializers.ModelSerializer):
    """Serializer for skills."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'category_name', 'description']
        read_only_fields = ['id']


class VolunteerOpportunityListSerializer(serializers.ModelSerializer):
    """Serializer for volunteer opportunity list view."""
    required_skills = SkillSerializer(many=True, read_only=True)
    contact_person_name = serializers.CharField(source='contact_person.get_full_name', read_only=True)
    is_active = serializers.ReadOnlyField()
    positions_remaining = serializers.ReadOnlyField()
    
    class Meta:
        model = VolunteerOpportunity
        fields = [
            'id', 'title', 'slug', 'short_description', 'featured_image',
            'commitment_type', 'time_commitment', 'start_date', 'end_date',
            'location', 'is_remote', 'positions_available', 'positions_filled',
            'positions_remaining', 'status', 'is_active', 'required_skills',
            'contact_person_name', 'minimum_age', 'background_check_required'
        ]


class VolunteerOpportunityDetailSerializer(serializers.ModelSerializer):
    """Serializer for volunteer opportunity detail view."""
    required_skills = SkillSerializer(many=True, read_only=True)
    preferred_skills = SkillSerializer(many=True, read_only=True)
    contact_person_name = serializers.CharField(source='contact_person.get_full_name', read_only=True)
    is_active = serializers.ReadOnlyField()
    positions_remaining = serializers.ReadOnlyField()
    
    class Meta:
        model = VolunteerOpportunity
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'featured_image', 'required_skills', 'preferred_skills',
            'minimum_age', 'background_check_required', 'commitment_type',
            'time_commitment', 'start_date', 'end_date', 'location',
            'is_remote', 'positions_available', 'positions_filled',
            'positions_remaining', 'status', 'is_active', 'contact_person',
            'contact_person_name', 'contact_email', 'contact_phone',
            'view_count', 'application_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'view_count', 'application_count', 'created_at', 'updated_at']


class VolunteerProfileSerializer(serializers.ModelSerializer):
    """Serializer for volunteer profiles."""
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    age = serializers.ReadOnlyField()
    
    class Meta:
        model = VolunteerProfile
        fields = [
            'id', 'user', 'user_name', 'user_email', 'phone', 'date_of_birth',
            'age', 'address', 'emergency_contact_name', 'emergency_contact_phone',
            'emergency_contact_relationship', 'occupation', 'employer',
            'education_level', 'skills', 'interests', 'previous_volunteer_experience',
            'motivation', 'availability', 'hours_per_week', 'preferred_location',
            'can_travel', 'has_transportation', 'background_check_completed',
            'background_check_date', 'background_check_expiry', 'is_active',
            'total_hours_volunteered', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'total_hours_volunteered', 'created_at', 'updated_at']


class ApplicationDocumentSerializer(serializers.ModelSerializer):
    """Serializer for application documents."""
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    reviewed_by_name = serializers.CharField(source='reviewed_by.get_full_name', read_only=True)
    file_size_display = serializers.ReadOnlyField()
    is_expired = serializers.ReadOnlyField()
    
    class Meta:
        model = ApplicationDocument
        fields = [
            'id', 'application', 'document_type', 'title', 'description',
            'file', 'file_size', 'file_size_display', 'file_type',
            'original_filename', 'virus_scan_status', 'virus_scan_date',
            'status', 'reviewed_by', 'reviewed_by_name', 'reviewed_at',
            'review_notes', 'expires_at', 'is_expired', 'uploaded_by',
            'uploaded_by_name', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'file_size', 'file_type', 'original_filename',
            'virus_scan_status', 'virus_scan_date', 'reviewed_by',
            'reviewed_at', 'review_notes', 'created_at', 'updated_at'
        ]
    
    def create(self, validated_data):
        """Create document with proper metadata."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['uploaded_by'] = request.user
        
        # Extract file metadata
        file = validated_data.get('file')
        if file:
            validated_data['file_size'] = file.size
            validated_data['original_filename'] = file.name
            validated_data['file_type'] = file.name.split('.')[-1].lower() if '.' in file.name else ''
        
        return super().create(validated_data)


class DocumentTemplateSerializer(serializers.ModelSerializer):
    """Serializer for document templates."""
    
    class Meta:
        model = DocumentTemplate
        fields = [
            'id', 'name', 'document_type', 'description', 'instructions',
            'is_required', 'max_file_size', 'allowed_file_types',
            'template_file', 'expires_after_days', 'is_active'
        ]
        read_only_fields = ['id']


class ApplicationNoteSerializer(serializers.ModelSerializer):
    """Serializer for application notes."""
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    
    class Meta:
        model = ApplicationNote
        fields = [
            'id', 'application', 'note_type', 'title', 'content',
            'is_internal', 'is_important', 'created_by', 'created_by_name',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        """Create note with proper user association."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)


class VolunteerApplicationSerializer(serializers.ModelSerializer):
    """Serializer for volunteer applications."""
    volunteer_name = serializers.CharField(source='volunteer.get_full_name', read_only=True)
    opportunity_title = serializers.CharField(source='opportunity.title', read_only=True)
    reviewed_by_name = serializers.CharField(source='reviewed_by.get_full_name', read_only=True)
    documents = ApplicationDocumentSerializer(many=True, read_only=True)
    notes = ApplicationNoteSerializer(many=True, read_only=True)
    documents_complete = serializers.ReadOnlyField()
    can_be_submitted = serializers.ReadOnlyField()
    
    class Meta:
        model = VolunteerApplication
        fields = [
            'id', 'volunteer', 'volunteer_name', 'opportunity', 'opportunity_title',
            'cover_letter', 'why_interested', 'relevant_experience',
            'additional_comments', 'resume_required', 'references_required',
            'background_check_required', 'additional_documents_required',
            'status', 'reviewed_by', 'reviewed_by_name', 'reviewed_at',
            'review_notes', 'interview_scheduled_at', 'interview_location',
            'interview_notes', 'decision_date', 'decision_reason',
            'documents', 'notes', 'documents_complete', 'can_be_submitted',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'reviewed_by', 'reviewed_at', 'review_notes',
            'interview_notes', 'decision_date', 'decision_reason',
            'created_at', 'updated_at'
        ]
    
    def create(self, validated_data):
        """Create application with proper user association."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['volunteer'] = request.user
        return super().create(validated_data)


class VolunteerAssignmentSerializer(serializers.ModelSerializer):
    """Serializer for volunteer assignments."""
    volunteer_name = serializers.CharField(source='volunteer.get_full_name', read_only=True)
    opportunity_title = serializers.CharField(source='opportunity.title', read_only=True)
    supervisor_name = serializers.CharField(source='supervisor.get_full_name', read_only=True)
    completion_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = VolunteerAssignment
        fields = [
            'id', 'volunteer', 'volunteer_name', 'opportunity', 'opportunity_title',
            'application', 'start_date', 'end_date', 'status', 'hours_committed',
            'hours_completed', 'completion_percentage', 'supervisor',
            'supervisor_name', 'assignment_notes', 'completion_notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class VolunteerTimeLogSerializer(serializers.ModelSerializer):
    """Serializer for volunteer time logs."""
    volunteer_name = serializers.CharField(source='volunteer.get_full_name', read_only=True)
    opportunity_title = serializers.CharField(source='assignment.opportunity.title', read_only=True)
    approved_by_name = serializers.CharField(source='approved_by.get_full_name', read_only=True)
    
    class Meta:
        model = VolunteerTimeLog
        fields = [
            'id', 'assignment', 'volunteer', 'volunteer_name', 'opportunity_title',
            'date', 'start_time', 'end_time', 'hours', 'activity_description',
            'location', 'approved', 'approved_by', 'approved_by_name',
            'approved_at', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'approved', 'approved_by', 'approved_at',
            'created_at', 'updated_at'
        ]
    
    def create(self, validated_data):
        """Create time log with proper user association."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['volunteer'] = request.user
        return super().create(validated_data)


class VolunteerStatsSerializer(serializers.Serializer):
    """Serializer for volunteer statistics."""
    total_volunteers = serializers.IntegerField()
    active_volunteers = serializers.IntegerField()
    total_hours = serializers.DecimalField(max_digits=10, decimal_places=2)
    active_opportunities = serializers.IntegerField()
    pending_applications = serializers.IntegerField()
    monthly_hours = serializers.DecimalField(max_digits=10, decimal_places=2)
    top_skills = serializers.ListField(child=serializers.DictField())
    recent_applications = serializers.ListField(child=serializers.DictField())