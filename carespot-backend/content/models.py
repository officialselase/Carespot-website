"""
Content management models for CareSpot platform.
Handles blog posts, projects, team members, events, and documents.
"""

import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.urls import reverse
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from authentication.models import BaseAuditModel

User = get_user_model()


class Category(BaseAuditModel):
    """
    Content categories for organization.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default='#3B82F6')  # Hex color
    icon = models.CharField(max_length=50, blank=True)  # Icon class name
    
    # Hierarchy support
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    
    # SEO
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Tag(BaseAuditModel):
    """
    Tags for content organization and filtering.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class BlogPost(BaseAuditModel):
    """
    Blog posts and news articles with approval workflow.
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted for Review'),
        ('review', 'Under Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Content
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(max_length=500)
    content = models.TextField()
    
    # Media
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    featured_image_alt = models.CharField(max_length=200, blank=True)
    
    # Organization
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='blog_posts')
    tags = models.ManyToManyField(Tag, blank=True, related_name='blog_posts')
    
    # Publishing
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    published_at = models.DateTimeField(null=True, blank=True)
    
    # Approval workflow
    submitted_at = models.DateTimeField(null=True, blank=True)
    submitted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='submitted_blog_posts')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_blog_posts')
    approval_notes = models.TextField(blank=True, help_text="Notes from reviewer about approval/rejection")
    rejection_reason = models.TextField(blank=True, help_text="Reason for rejection if applicable")
    
    # Engagement
    view_count = models.PositiveIntegerField(default=0)
    like_count = models.PositiveIntegerField(default=0)
    share_count = models.PositiveIntegerField(default=0)
    
    # SEO
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    
    # Features
    is_featured = models.BooleanField(default=False)
    allow_comments = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-published_at', '-created_at']
        indexes = [
            models.Index(fields=['status', 'published_at']),
            models.Index(fields=['slug']),
            models.Index(fields=['is_featured']),
        ]
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('blog:detail', kwargs={'slug': self.slug})
    
    @property
    def is_published(self):
        return self.status == 'published' and self.published_at <= timezone.now()
    
    @property
    def can_be_submitted(self):
        """Check if post can be submitted for review."""
        return self.status == 'draft'
    
    @property
    def can_be_approved(self):
        """Check if post can be approved."""
        return self.status in ['submitted', 'review']
    
    @property
    def can_be_published(self):
        """Check if post can be published."""
        return self.status == 'approved'
    
    def submit_for_review(self, user, request=None):
        """Submit post for review."""
        if self.can_be_submitted:
            self.status = 'submitted'
            self.submitted_at = timezone.now()
            self.submitted_by = user
            self.save(update_fields=['status', 'submitted_at', 'submitted_by'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'submitted', user, request=request)
            
            # Create revision
            ContentRevision.create_revision(self, user, 'Submitted for review')
            
            return True
        return False
    
    def start_review(self, reviewer, request=None):
        """Start reviewing the post."""
        if self.status == 'submitted':
            self.status = 'review'
            self.reviewed_by = reviewer
            self.save(update_fields=['status', 'reviewed_by'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'review_started', reviewer, request=request)
            
            return True
        return False
    
    def approve(self, reviewer, notes='', request=None):
        """Approve the post."""
        if self.can_be_approved:
            self.status = 'approved'
            self.reviewed_at = timezone.now()
            self.reviewed_by = reviewer
            self.approval_notes = notes
            self.save(update_fields=['status', 'reviewed_at', 'reviewed_by', 'approval_notes'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'approved', reviewer, notes, request)
            
            return True
        return False
    
    def reject(self, reviewer, reason='', request=None):
        """Reject the post."""
        if self.can_be_approved:
            self.status = 'rejected'
            self.reviewed_at = timezone.now()
            self.reviewed_by = reviewer
            self.rejection_reason = reason
            self.save(update_fields=['status', 'reviewed_at', 'reviewed_by', 'rejection_reason'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'rejected', reviewer, reason, request)
            
            return True
        return False
    
    def publish(self, publisher=None, request=None):
        """Publish the approved post."""
        if self.can_be_published:
            self.status = 'published'
            self.published_at = timezone.now()
            if publisher:
                self.reviewed_by = publisher
            self.save(update_fields=['status', 'published_at', 'reviewed_by'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'published', publisher or self.reviewed_by, request=request)
            
            return True
        return False


class Project(BaseAuditModel):
    """
    CareSpot projects and initiatives with approval workflow.
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted for Review'),
        ('review', 'Under Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('planning', 'Planning'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
        ('cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Basic information
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500)
    
    # Project details
    location = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    
    # Media
    featured_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    gallery_images = models.JSONField(default=list, blank=True)  # Store image URLs
    
    # Impact metrics
    beneficiaries_target = models.PositiveIntegerField(default=0)
    beneficiaries_reached = models.PositiveIntegerField(default=0)
    budget = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    funds_raised = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    # Organization
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='projects')
    tags = models.ManyToManyField(Tag, blank=True, related_name='projects')
    project_manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='managed_projects')
    
    # Approval workflow
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_projects')
    submitted_at = models.DateTimeField(null=True, blank=True)
    submitted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='submitted_projects')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_projects')
    approval_notes = models.TextField(blank=True, help_text="Notes from reviewer about approval/rejection")
    rejection_reason = models.TextField(blank=True, help_text="Reason for rejection if applicable")
    
    # SEO
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    
    # Features
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-start_date']
        indexes = [
            models.Index(fields=['status', 'start_date']),
            models.Index(fields=['slug']),
            models.Index(fields=['is_featured']),
        ]
    
    def __str__(self):
        return self.title
    
    @property
    def progress_percentage(self):
        """Calculate project progress based on beneficiaries reached."""
        if self.beneficiaries_target > 0:
            return min(100, (self.beneficiaries_reached / self.beneficiaries_target) * 100)
        return 0
    
    @property
    def funding_percentage(self):
        """Calculate funding progress."""
        if self.budget and self.budget > 0:
            return min(100, (self.funds_raised / self.budget) * 100)
        return 0
    
    @property
    def can_be_submitted(self):
        """Check if project can be submitted for review."""
        return self.status == 'draft'
    
    @property
    def can_be_approved(self):
        """Check if project can be approved."""
        return self.status in ['submitted', 'review']
    
    @property
    def can_be_activated(self):
        """Check if project can be activated."""
        return self.status in ['approved', 'planning']
    
    def submit_for_review(self, user, request=None):
        """Submit project for review."""
        if self.can_be_submitted:
            self.status = 'submitted'
            self.submitted_at = timezone.now()
            self.submitted_by = user
            self.save(update_fields=['status', 'submitted_at', 'submitted_by'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'submitted', user, request=request)
            
            # Create revision
            ContentRevision.create_revision(self, user, 'Submitted for review')
            
            return True
        return False
    
    def start_review(self, reviewer, request=None):
        """Start reviewing the project."""
        if self.status == 'submitted':
            self.status = 'review'
            self.reviewed_by = reviewer
            self.save(update_fields=['status', 'reviewed_by'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'review_started', reviewer, request=request)
            
            return True
        return False
    
    def approve(self, reviewer, notes='', request=None):
        """Approve the project."""
        if self.can_be_approved:
            self.status = 'approved'
            self.reviewed_at = timezone.now()
            self.reviewed_by = reviewer
            self.approval_notes = notes
            self.save(update_fields=['status', 'reviewed_at', 'reviewed_by', 'approval_notes'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'approved', reviewer, notes, request)
            
            return True
        return False
    
    def reject(self, reviewer, reason='', request=None):
        """Reject the project."""
        if self.can_be_approved:
            self.status = 'rejected'
            self.reviewed_at = timezone.now()
            self.reviewed_by = reviewer
            self.rejection_reason = reason
            self.save(update_fields=['status', 'reviewed_at', 'reviewed_by', 'rejection_reason'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'rejected', reviewer, reason, request)
            
            return True
        return False
    
    def activate(self, activator=None, request=None):
        """Activate the approved project."""
        if self.can_be_activated:
            self.status = 'active'
            if activator:
                self.reviewed_by = activator
            self.save(update_fields=['status', 'reviewed_by'])
            
            # Log workflow action
            ApprovalWorkflow.log_action(self, 'activated', activator or self.reviewed_by, request=request)
            
            return True
        return False


class TeamMember(BaseAuditModel):
    """
    Team member profiles.
    """
    ROLE_CHOICES = [
        ('founder', 'Founder'),
        ('director', 'Director'),
        ('manager', 'Manager'),
        ('coordinator', 'Coordinator'),
        ('volunteer', 'Volunteer'),
        ('advisor', 'Advisor'),
        ('board_member', 'Board Member'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Personal information
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='team_profile')
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    
    # Professional information
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    title = models.CharField(max_length=100)
    department = models.CharField(max_length=100, blank=True)
    bio = models.TextField()
    
    # Media
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    
    # Social links
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    facebook_url = models.URLField(blank=True)
    
    # Display settings
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    show_on_website = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['display_order', 'name']
        indexes = [
            models.Index(fields=['is_active', 'show_on_website']),
            models.Index(fields=['role']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.title}"


class Event(BaseAuditModel):
    """
    Events and activities.
    """
    EVENT_TYPE_CHOICES = [
        ('workshop', 'Workshop'),
        ('seminar', 'Seminar'),
        ('fundraiser', 'Fundraiser'),
        ('community_outreach', 'Community Outreach'),
        ('health_screening', 'Health Screening'),
        ('training', 'Training'),
        ('meeting', 'Meeting'),
        ('conference', 'Conference'),
    ]
    
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('postponed', 'Postponed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Event details
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500)
    
    # Scheduling
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    timezone = models.CharField(max_length=50, default='UTC')
    
    # Location
    location_name = models.CharField(max_length=200)
    location_address = models.TextField()
    location_coordinates = models.JSONField(null=True, blank=True)  # {"lat": 0.0, "lng": 0.0}
    is_virtual = models.BooleanField(default=False)
    virtual_link = models.URLField(blank=True)
    
    # Event details
    event_type = models.CharField(max_length=30, choices=EVENT_TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    max_attendees = models.PositiveIntegerField(null=True, blank=True)
    current_attendees = models.PositiveIntegerField(default=0)
    
    # Media
    featured_image = models.ImageField(upload_to='events/', blank=True, null=True)
    
    # Organization
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='events')
    tags = models.ManyToManyField(Tag, blank=True, related_name='events')
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organized_events')
    
    # Registration
    requires_registration = models.BooleanField(default=True)
    registration_deadline = models.DateTimeField(null=True, blank=True)
    registration_fee = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    # SEO
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    
    class Meta:
        ordering = ['start_datetime']
        indexes = [
            models.Index(fields=['status', 'start_datetime']),
            models.Index(fields=['slug']),
            models.Index(fields=['event_type']),
        ]
    
    def __str__(self):
        return self.title
    
    @property
    def is_full(self):
        """Check if event is at capacity."""
        if self.max_attendees:
            return self.current_attendees >= self.max_attendees
        return False
    
    @property
    def registration_open(self):
        """Check if registration is still open."""
        if not self.requires_registration:
            return False
        
        now = timezone.now()
        if self.registration_deadline and now > self.registration_deadline:
            return False
        
        return not self.is_full and self.status == 'upcoming'


class Document(BaseAuditModel):
    """
    Document library for reports, policies, etc.
    """
    DOCUMENT_TYPE_CHOICES = [
        ('report', 'Report'),
        ('policy', 'Policy'),
        ('guideline', 'Guideline'),
        ('form', 'Form'),
        ('presentation', 'Presentation'),
        ('brochure', 'Brochure'),
        ('manual', 'Manual'),
        ('other', 'Other'),
    ]
    
    ACCESS_LEVEL_CHOICES = [
        ('public', 'Public'),
        ('members', 'Members Only'),
        ('staff', 'Staff Only'),
        ('admin', 'Admin Only'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Document details
    title = models.CharField(max_length=200)
    description = models.TextField()
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPE_CHOICES)
    
    # File information
    file = models.FileField(upload_to='documents/')
    file_size = models.PositiveIntegerField()  # in bytes
    file_type = models.CharField(max_length=10)  # pdf, doc, etc.
    
    # Access control
    access_level = models.CharField(max_length=20, choices=ACCESS_LEVEL_CHOICES, default='public')
    
    # Organization
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='documents')
    tags = models.ManyToManyField(Tag, blank=True, related_name='documents')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_documents')
    
    # Tracking
    download_count = models.PositiveIntegerField(default=0)
    
    # Versioning
    version = models.CharField(max_length=20, default='1.0')
    previous_version = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='newer_versions')
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['document_type', 'access_level']),
            models.Index(fields=['category']),
        ]
    
    def __str__(self):
        return self.title


class ApprovalWorkflow(BaseAuditModel):
    """
    Track approval workflow history for content items.
    """
    ACTION_CHOICES = [
        ('submitted', 'Submitted for Review'),
        ('review_started', 'Review Started'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('published', 'Published'),
        ('activated', 'Activated'),
        ('revision_requested', 'Revision Requested'),
    ]
    
    # Generic foreign key to link to any content model
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Workflow details
    action = models.CharField(max_length=30, choices=ACTION_CHOICES)
    actor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workflow_actions')
    notes = models.TextField(blank=True)
    
    # Metadata
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
            models.Index(fields=['action', 'created_at']),
            models.Index(fields=['actor', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.actor.email} - {self.get_action_display()} - {self.content_object}"
    
    @classmethod
    def log_action(cls, content_object, action, actor, notes='', request=None):
        """Log a workflow action."""
        workflow = cls.objects.create(
            content_object=content_object,
            action=action,
            actor=actor,
            notes=notes
        )
        
        if request:
            workflow.ip_address = request.META.get('REMOTE_ADDR')
            workflow.user_agent = request.META.get('HTTP_USER_AGENT', '')
            workflow.save(update_fields=['ip_address', 'user_agent'])
        
        return workflow


class ContentRevision(BaseAuditModel):
    """
    Store content revisions for version control and rollback.
    """
    # Generic foreign key to link to any content model
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Revision details
    revision_number = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    content_data = models.JSONField()  # Store the full content as JSON
    
    # Metadata
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='content_revisions')
    change_summary = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-revision_number']
        unique_together = ['content_type', 'object_id', 'revision_number']
        indexes = [
            models.Index(fields=['content_type', 'object_id', 'revision_number']),
        ]
    
    def __str__(self):
        return f"{self.content_object} - Revision {self.revision_number}"
    
    @classmethod
    def create_revision(cls, content_object, user, change_summary=''):
        """Create a new revision for content."""
        # Get the latest revision number
        latest = cls.objects.filter(
            content_type=ContentType.objects.get_for_model(content_object),
            object_id=content_object.id
        ).first()
        
        revision_number = (latest.revision_number + 1) if latest else 1
        
        # Serialize the content object
        content_data = {}
        for field in content_object._meta.fields:
            if not field.name in ['id', 'created_at', 'updated_at']:
                value = getattr(content_object, field.name)
                if hasattr(value, 'isoformat'):  # DateTime fields
                    content_data[field.name] = value.isoformat()
                elif hasattr(value, 'id'):  # Foreign key fields
                    content_data[field.name] = str(value.id)
                else:
                    content_data[field.name] = str(value) if value is not None else None
        
        return cls.objects.create(
            content_object=content_object,
            revision_number=revision_number,
            title=getattr(content_object, 'title', str(content_object)),
            content_data=content_data,
            created_by=user,
            change_summary=change_summary
        )