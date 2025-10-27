"""
Volunteer management models for CareSpot platform.
Handles volunteer applications, opportunities, and management.
"""

import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from authentication.models import BaseAuditModel

User = get_user_model()


class SkillCategory(BaseAuditModel):
    """
    Categories for volunteer skills.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    
    class Meta:
        verbose_name_plural = "Skill Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Skill(BaseAuditModel):
    """
    Individual skills for volunteers.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['category__name', 'name']
    
    def __str__(self):
        return f"{self.category.name} - {self.name}"


class VolunteerOpportunity(BaseAuditModel):
    """
    Volunteer opportunities and positions.
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('filled', 'Filled'),
        ('closed', 'Closed'),
    ]
    
    COMMITMENT_TYPE_CHOICES = [
        ('one_time', 'One-time'),
        ('short_term', 'Short-term (< 3 months)'),
        ('long_term', 'Long-term (3+ months)'),
        ('ongoing', 'Ongoing'),
    ]
    
    TIME_COMMITMENT_CHOICES = [
        ('flexible', 'Flexible'),
        ('part_time', 'Part-time (< 20 hours/week)'),
        ('full_time', 'Full-time (40+ hours/week)'),
        ('weekend', 'Weekends only'),
        ('evening', 'Evenings only'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Basic information
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500)
    
    # Requirements
    required_skills = models.ManyToManyField(Skill, blank=True, related_name='required_for_opportunities')
    preferred_skills = models.ManyToManyField(Skill, blank=True, related_name='preferred_for_opportunities')
    minimum_age = models.PositiveIntegerField(default=18)
    background_check_required = models.BooleanField(default=False)
    
    # Commitment details
    commitment_type = models.CharField(max_length=20, choices=COMMITMENT_TYPE_CHOICES)
    time_commitment = models.CharField(max_length=20, choices=TIME_COMMITMENT_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    
    # Location
    location = models.CharField(max_length=200)
    is_remote = models.BooleanField(default=False)
    
    # Capacity
    positions_available = models.PositiveIntegerField(default=1)
    positions_filled = models.PositiveIntegerField(default=0)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Contact
    contact_person = models.ForeignKey(User, on_delete=models.CASCADE, related_name='managed_opportunities')
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20, blank=True)
    
    # Media
    featured_image = models.ImageField(upload_to='opportunities/', blank=True, null=True)
    
    # Tracking
    view_count = models.PositiveIntegerField(default=0)
    application_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        verbose_name_plural = "Volunteer Opportunities"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'start_date']),
            models.Index(fields=['slug']),
            models.Index(fields=['is_remote']),
        ]
    
    def __str__(self):
        return self.title
    
    @property
    def is_active(self):
        """Check if opportunity is currently active and accepting applications."""
        return (
            self.status == 'active' and
            self.positions_filled < self.positions_available and
            (not self.end_date or self.end_date >= timezone.now().date())
        )
    
    @property
    def positions_remaining(self):
        """Calculate remaining positions."""
        return max(0, self.positions_available - self.positions_filled)


class VolunteerProfile(BaseAuditModel):
    """
    Extended profile for volunteers.
    """
    AVAILABILITY_CHOICES = [
        ('weekdays', 'Weekdays'),
        ('weekends', 'Weekends'),
        ('evenings', 'Evenings'),
        ('flexible', 'Flexible'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='volunteer_profile')
    
    # Personal information
    phone = models.CharField(max_length=20)
    date_of_birth = models.DateField()
    address = models.TextField()
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_phone = models.CharField(max_length=20)
    emergency_contact_relationship = models.CharField(max_length=50)
    
    # Professional information
    occupation = models.CharField(max_length=100, blank=True)
    employer = models.CharField(max_length=100, blank=True)
    education_level = models.CharField(max_length=100, blank=True)
    
    # Volunteer information
    skills = models.ManyToManyField(Skill, blank=True, related_name='volunteers')
    interests = models.TextField(blank=True)
    previous_volunteer_experience = models.TextField(blank=True)
    motivation = models.TextField(blank=True)
    
    # Availability
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES)
    hours_per_week = models.PositiveIntegerField(default=0)
    preferred_location = models.CharField(max_length=200, blank=True)
    can_travel = models.BooleanField(default=False)
    has_transportation = models.BooleanField(default=False)
    
    # Background check
    background_check_completed = models.BooleanField(default=False)
    background_check_date = models.DateField(null=True, blank=True)
    background_check_expiry = models.DateField(null=True, blank=True)
    
    # References
    reference1_name = models.CharField(max_length=100, blank=True)
    reference1_phone = models.CharField(max_length=20, blank=True)
    reference1_email = models.EmailField(blank=True)
    reference1_relationship = models.CharField(max_length=50, blank=True)
    
    reference2_name = models.CharField(max_length=100, blank=True)
    reference2_phone = models.CharField(max_length=20, blank=True)
    reference2_email = models.EmailField(blank=True)
    reference2_relationship = models.CharField(max_length=50, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    total_hours_volunteered = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['is_active']),
            models.Index(fields=['availability']),
        ]
    
    def __str__(self):
        return f"{self.user.get_full_name()} - Volunteer Profile"
    
    @property
    def age(self):
        """Calculate volunteer's age."""
        today = timezone.now().date()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )


class VolunteerApplication(BaseAuditModel):
    """
    Applications for volunteer opportunities with document handling.
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('under_review', 'Under Review'),
        ('documents_requested', 'Documents Requested'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('background_check', 'Background Check'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('withdrawn', 'Withdrawn'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Application details
    volunteer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='volunteer_applications')
    opportunity = models.ForeignKey(VolunteerOpportunity, on_delete=models.CASCADE, related_name='applications')
    
    # Application content
    cover_letter = models.TextField()
    why_interested = models.TextField()
    relevant_experience = models.TextField(blank=True)
    additional_comments = models.TextField(blank=True)
    
    # Document requirements
    resume_required = models.BooleanField(default=True)
    references_required = models.BooleanField(default=True)
    background_check_required = models.BooleanField(default=False)
    additional_documents_required = models.TextField(blank=True, help_text="List any additional documents required")
    
    # Status tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_applications')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    review_notes = models.TextField(blank=True)
    
    # Interview details
    interview_scheduled_at = models.DateTimeField(null=True, blank=True)
    interview_location = models.CharField(max_length=200, blank=True)
    interview_notes = models.TextField(blank=True)
    
    # Decision
    decision_date = models.DateTimeField(null=True, blank=True)
    decision_reason = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['volunteer', 'opportunity']
        indexes = [
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['opportunity', 'status']),
        ]
    
    def __str__(self):
        return f"{self.volunteer.get_full_name()} - {self.opportunity.title}"
    
    @property
    def documents_complete(self):
        """Check if all required documents are uploaded."""
        required_docs = []
        
        if self.resume_required:
            required_docs.append('resume')
        if self.references_required:
            required_docs.append('references')
        if self.background_check_required:
            required_docs.append('background_check')
        
        uploaded_docs = self.documents.values_list('document_type', flat=True)
        
        return all(doc_type in uploaded_docs for doc_type in required_docs)
    
    @property
    def can_be_submitted(self):
        """Check if application can be submitted."""
        return self.status == 'draft' and self.documents_complete
    
    def submit_application(self):
        """Submit the application if all requirements are met."""
        if self.can_be_submitted:
            self.status = 'submitted'
            self.save(update_fields=['status'])
            return True
        return False


class ApplicationDocument(BaseAuditModel):
    """
    Documents uploaded for volunteer applications.
    """
    DOCUMENT_TYPE_CHOICES = [
        ('resume', 'Resume/CV'),
        ('cover_letter', 'Cover Letter'),
        ('references', 'References'),
        ('background_check', 'Background Check'),
        ('identification', 'Identification'),
        ('certifications', 'Certifications'),
        ('portfolio', 'Portfolio'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('expired', 'Expired'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Document details
    application = models.ForeignKey(VolunteerApplication, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    # File information
    file = models.FileField(upload_to='volunteer_documents/')
    file_size = models.PositiveIntegerField()  # in bytes
    file_type = models.CharField(max_length=10)  # pdf, doc, jpg, etc.
    original_filename = models.CharField(max_length=255)
    
    # Security and validation
    virus_scan_status = models.CharField(max_length=20, default='pending')
    virus_scan_date = models.DateTimeField(null=True, blank=True)
    
    # Document status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_documents')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    review_notes = models.TextField(blank=True)
    
    # Expiry (for documents like background checks)
    expires_at = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_volunteer_documents')
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['application', 'document_type']  # One document per type per application
        indexes = [
            models.Index(fields=['application', 'document_type']),
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['expires_at']),
        ]
    
    def __str__(self):
        return f"{self.application.volunteer.get_full_name()} - {self.get_document_type_display()}"
    
    @property
    def is_expired(self):
        """Check if document is expired."""
        if self.expires_at:
            return timezone.now() > self.expires_at
        return False
    
    @property
    def file_size_display(self):
        """Display file size in human readable format."""
        size = self.file_size
        if size < 1024:
            return f"{size} B"
        elif size < 1024 * 1024:
            return f"{size / 1024:.1f} KB"
        else:
            return f"{size / (1024 * 1024):.1f} MB"
    
    def approve_document(self, reviewer, notes=''):
        """Approve the document."""
        self.status = 'approved'
        self.reviewed_by = reviewer
        self.reviewed_at = timezone.now()
        self.review_notes = notes
        self.save(update_fields=['status', 'reviewed_by', 'reviewed_at', 'review_notes'])
    
    def reject_document(self, reviewer, reason=''):
        """Reject the document."""
        self.status = 'rejected'
        self.reviewed_by = reviewer
        self.reviewed_at = timezone.now()
        self.review_notes = reason
        self.save(update_fields=['status', 'reviewed_by', 'reviewed_at', 'review_notes'])


class DocumentTemplate(BaseAuditModel):
    """
    Templates for required documents with instructions.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Template details
    name = models.CharField(max_length=200)
    document_type = models.CharField(max_length=20, choices=ApplicationDocument.DOCUMENT_TYPE_CHOICES)
    description = models.TextField()
    instructions = models.TextField(help_text="Instructions for volunteers on how to complete this document")
    
    # Requirements
    is_required = models.BooleanField(default=True)
    max_file_size = models.PositiveIntegerField(default=5242880)  # 5MB default
    allowed_file_types = models.JSONField(default=list)  # ['pdf', 'doc', 'docx', 'jpg', 'png']
    
    # Template file (optional)
    template_file = models.FileField(upload_to='document_templates/', blank=True, null=True)
    
    # Expiry settings
    expires_after_days = models.PositiveIntegerField(null=True, blank=True, help_text="Days after which document expires")
    
    # Usage
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['document_type', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.get_document_type_display()})"


class ApplicationNote(BaseAuditModel):
    """
    Internal notes for volunteer applications.
    """
    NOTE_TYPE_CHOICES = [
        ('general', 'General Note'),
        ('interview', 'Interview Note'),
        ('reference_check', 'Reference Check'),
        ('background_check', 'Background Check'),
        ('follow_up', 'Follow-up Required'),
        ('concern', 'Concern/Issue'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Note details
    application = models.ForeignKey(VolunteerApplication, on_delete=models.CASCADE, related_name='notes')
    note_type = models.CharField(max_length=20, choices=NOTE_TYPE_CHOICES, default='general')
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    # Visibility
    is_internal = models.BooleanField(default=True, help_text="Internal notes are only visible to staff")
    is_important = models.BooleanField(default=False)
    
    # Author
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='application_notes')
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['application', 'note_type']),
            models.Index(fields=['is_important', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.application.volunteer.get_full_name()} - {self.title}"


class VolunteerAssignment(BaseAuditModel):
    """
    Active volunteer assignments.
    """
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
        ('terminated', 'Terminated'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Assignment details
    volunteer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='volunteer_assignments')
    opportunity = models.ForeignKey(VolunteerOpportunity, on_delete=models.CASCADE, related_name='assignments')
    application = models.OneToOneField(VolunteerApplication, on_delete=models.CASCADE, related_name='assignment')
    
    # Timeline
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    # Tracking
    hours_committed = models.PositiveIntegerField(default=0)
    hours_completed = models.PositiveIntegerField(default=0)
    
    # Supervision
    supervisor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='supervised_assignments')
    
    # Notes
    assignment_notes = models.TextField(blank=True)
    completion_notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-start_date']
        indexes = [
            models.Index(fields=['status', 'start_date']),
            models.Index(fields=['volunteer', 'status']),
        ]
    
    def __str__(self):
        return f"{self.volunteer.get_full_name()} - {self.opportunity.title}"
    
    @property
    def completion_percentage(self):
        """Calculate completion percentage based on hours."""
        if self.hours_committed > 0:
            return min(100, (self.hours_completed / self.hours_committed) * 100)
        return 0


class VolunteerTimeLog(BaseAuditModel):
    """
    Time tracking for volunteer activities.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Log details
    assignment = models.ForeignKey(VolunteerAssignment, on_delete=models.CASCADE, related_name='time_logs')
    volunteer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='volunteer_time_logs')
    
    # Time tracking
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    hours = models.DecimalField(max_digits=4, decimal_places=2)
    
    # Activity details
    activity_description = models.TextField()
    location = models.CharField(max_length=200, blank=True)
    
    # Approval
    approved = models.BooleanField(default=False)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_time_logs')
    approved_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-date', '-start_time']
        indexes = [
            models.Index(fields=['assignment', 'date']),
            models.Index(fields=['volunteer', 'approved']),
        ]
    
    def __str__(self):
        return f"{self.volunteer.get_full_name()} - {self.date} ({self.hours}h)"