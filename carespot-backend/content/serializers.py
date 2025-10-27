"""
Serializers for content management models.
"""

from rest_framework import serializers
from django.utils import timezone
from .models import Category, Tag, BlogPost, Project, TeamMember, Event, Document, ApprovalWorkflow, ContentRevision


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for categories."""
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'color', 'icon',
            'parent', 'children', 'meta_title', 'meta_description'
        ]
        read_only_fields = ['id']
    
    def get_children(self, obj):
        """Get child categories."""
        if obj.children.exists():
            return CategorySerializer(obj.children.all(), many=True).data
        return []


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tags."""
    
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'description']
        read_only_fields = ['id']


class BlogPostListSerializer(serializers.ModelSerializer):
    """Serializer for blog post list view."""
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image',
            'author_name', 'category_name', 'tags', 'status',
            'published_at', 'view_count', 'is_featured', 'created_at'
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Serializer for blog post detail view."""
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    submitted_by_name = serializers.CharField(source='submitted_by.get_full_name', read_only=True)
    reviewed_by_name = serializers.CharField(source='reviewed_by.get_full_name', read_only=True)
    can_be_submitted = serializers.ReadOnlyField()
    can_be_approved = serializers.ReadOnlyField()
    can_be_published = serializers.ReadOnlyField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'featured_image',
            'featured_image_alt', 'author', 'author_name', 'category', 'tags',
            'status', 'published_at', 'view_count', 'like_count', 'share_count',
            'meta_title', 'meta_description', 'is_featured', 'allow_comments',
            'submitted_at', 'submitted_by', 'submitted_by_name', 'reviewed_at',
            'reviewed_by', 'reviewed_by_name', 'approval_notes', 'rejection_reason',
            'can_be_submitted', 'can_be_approved', 'can_be_published',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'view_count', 'like_count', 'share_count', 'submitted_at',
            'reviewed_at', 'created_at', 'updated_at'
        ]


class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer for project list view."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    progress_percentage = serializers.ReadOnlyField()
    funding_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'featured_image',
            'location', 'start_date', 'end_date', 'status', 'category_name',
            'beneficiaries_target', 'beneficiaries_reached', 'progress_percentage',
            'budget', 'funds_raised', 'funding_percentage', 'is_featured'
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer for project detail view."""
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    project_manager_name = serializers.CharField(source='project_manager.get_full_name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    submitted_by_name = serializers.CharField(source='submitted_by.get_full_name', read_only=True)
    reviewed_by_name = serializers.CharField(source='reviewed_by.get_full_name', read_only=True)
    progress_percentage = serializers.ReadOnlyField()
    funding_percentage = serializers.ReadOnlyField()
    can_be_submitted = serializers.ReadOnlyField()
    can_be_approved = serializers.ReadOnlyField()
    can_be_activated = serializers.ReadOnlyField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'featured_image', 'gallery_images', 'location', 'start_date',
            'end_date', 'status', 'category', 'tags', 'project_manager',
            'project_manager_name', 'created_by', 'created_by_name',
            'beneficiaries_target', 'beneficiaries_reached', 'progress_percentage',
            'budget', 'funds_raised', 'funding_percentage', 'meta_title',
            'meta_description', 'is_featured', 'submitted_at', 'submitted_by',
            'submitted_by_name', 'reviewed_at', 'reviewed_by', 'reviewed_by_name',
            'approval_notes', 'rejection_reason', 'can_be_submitted',
            'can_be_approved', 'can_be_activated', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'submitted_at', 'reviewed_at', 'created_at', 'updated_at'
        ]


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for team members."""
    
    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'email', 'phone', 'role', 'title', 'department',
            'bio', 'photo', 'linkedin_url', 'twitter_url', 'facebook_url',
            'is_active', 'display_order', 'show_on_website'
        ]
        read_only_fields = ['id']


class EventListSerializer(serializers.ModelSerializer):
    """Serializer for event list view."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    organizer_name = serializers.CharField(source='organizer.get_full_name', read_only=True)
    is_full = serializers.ReadOnlyField()
    registration_open = serializers.ReadOnlyField()
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'short_description', 'featured_image',
            'start_datetime', 'end_datetime', 'location_name', 'is_virtual',
            'event_type', 'status', 'category_name', 'organizer_name',
            'max_attendees', 'current_attendees', 'is_full', 'registration_open',
            'requires_registration', 'registration_fee'
        ]


class EventDetailSerializer(serializers.ModelSerializer):
    """Serializer for event detail view."""
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    organizer_name = serializers.CharField(source='organizer.get_full_name', read_only=True)
    is_full = serializers.ReadOnlyField()
    registration_open = serializers.ReadOnlyField()
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'featured_image', 'start_datetime', 'end_datetime', 'timezone',
            'location_name', 'location_address', 'location_coordinates',
            'is_virtual', 'virtual_link', 'event_type', 'status',
            'category', 'tags', 'organizer', 'organizer_name',
            'max_attendees', 'current_attendees', 'is_full', 'registration_open',
            'requires_registration', 'registration_deadline', 'registration_fee',
            'meta_title', 'meta_description', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'current_attendees', 'created_at', 'updated_at']


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for documents."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    
    class Meta:
        model = Document
        fields = [
            'id', 'title', 'description', 'document_type', 'file',
            'file_size', 'file_type', 'access_level', 'category',
            'category_name', 'tags', 'uploaded_by', 'uploaded_by_name',
            'download_count', 'version', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'file_size', 'file_type', 'download_count', 'created_at', 'updated_at']


class ApprovalWorkflowSerializer(serializers.ModelSerializer):
    """Serializer for approval workflow history."""
    actor_name = serializers.CharField(source='actor.get_full_name', read_only=True)
    content_title = serializers.SerializerMethodField()
    
    class Meta:
        model = ApprovalWorkflow
        fields = [
            'id', 'action', 'actor', 'actor_name', 'content_title',
            'notes', 'ip_address', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_content_title(self, obj):
        """Get the title of the content object."""
        if hasattr(obj.content_object, 'title'):
            return obj.content_object.title
        return str(obj.content_object)


class ContentRevisionSerializer(serializers.ModelSerializer):
    """Serializer for content revisions."""
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    content_title = serializers.SerializerMethodField()
    
    class Meta:
        model = ContentRevision
        fields = [
            'id', 'revision_number', 'title', 'content_title',
            'created_by', 'created_by_name', 'change_summary',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_content_title(self, obj):
        """Get the title of the content object."""
        if hasattr(obj.content_object, 'title'):
            return obj.content_object.title
        return str(obj.content_object)