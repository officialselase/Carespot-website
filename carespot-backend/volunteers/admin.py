"""
Admin configuration for volunteers app.
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import (
    SkillCategory, Skill, VolunteerOpportunity, VolunteerProfile,
    VolunteerApplication, VolunteerAssignment, VolunteerTimeLog,
    ApplicationDocument, DocumentTemplate, ApplicationNote
)


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon']
    search_fields = ['name', 'description']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    list_filter = ['category']
    search_fields = ['name', 'description']


@admin.register(VolunteerOpportunity)
class VolunteerOpportunityAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'status', 'commitment_type', 'location', 'start_date',
        'positions_display', 'view_count', 'application_count'
    ]
    list_filter = [
        'status', 'commitment_type', 'time_commitment', 'is_remote',
        'background_check_required', 'start_date'
    ]
    search_fields = ['title', 'description', 'location']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['required_skills', 'preferred_skills']
    readonly_fields = ['view_count', 'application_count', 'positions_remaining']
    
    def positions_display(self, obj):
        return f"{obj.positions_filled}/{obj.positions_available}"
    positions_display.short_description = 'Positions (Filled/Available)'


@admin.register(VolunteerProfile)
class VolunteerProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'phone', 'age_display', 'availability', 'hours_per_week',
        'is_active', 'total_hours_volunteered'
    ]
    list_filter = [
        'availability', 'is_active', 'background_check_completed',
        'can_travel', 'has_transportation'
    ]
    search_fields = ['user__username', 'user__email', 'phone']
    filter_horizontal = ['skills']
    readonly_fields = ['age_display', 'total_hours_volunteered']
    
    def age_display(self, obj):
        return obj.age
    age_display.short_description = 'Age'


@admin.register(VolunteerApplication)
class VolunteerApplicationAdmin(admin.ModelAdmin):
    list_display = [
        'volunteer', 'opportunity', 'status', 'documents_complete',
        'created_at', 'reviewed_by', 'reviewed_at'
    ]
    list_filter = ['status', 'created_at', 'reviewed_at', 'resume_required', 'references_required']
    search_fields = [
        'volunteer__username', 'volunteer__email',
        'opportunity__title'
    ]
    readonly_fields = ['created_at', 'updated_at', 'documents_complete', 'can_be_submitted']
    
    fieldsets = (
        ('Application Details', {
            'fields': ('volunteer', 'opportunity', 'status')
        }),
        ('Document Requirements', {
            'fields': (
                'resume_required', 'references_required', 'background_check_required',
                'additional_documents_required', 'documents_complete', 'can_be_submitted'
            )
        }),
        ('Application Content', {
            'fields': ('cover_letter', 'why_interested', 'relevant_experience', 'additional_comments')
        }),
        ('Review', {
            'fields': ('reviewed_by', 'reviewed_at', 'review_notes')
        }),
        ('Interview', {
            'fields': ('interview_scheduled_at', 'interview_location', 'interview_notes')
        }),
        ('Decision', {
            'fields': ('decision_date', 'decision_reason')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def documents_complete(self, obj):
        """Display document completion status."""
        return format_html(
            '<span style="color: {};">{}</span>',
            'green' if obj.documents_complete else 'red',
            'Complete' if obj.documents_complete else 'Incomplete'
        )
    documents_complete.short_description = 'Documents'


@admin.register(VolunteerAssignment)
class VolunteerAssignmentAdmin(admin.ModelAdmin):
    list_display = [
        'volunteer', 'opportunity', 'status', 'start_date', 'end_date',
        'completion_display', 'supervisor'
    ]
    list_filter = ['status', 'start_date']
    search_fields = [
        'volunteer__username', 'volunteer__email',
        'opportunity__title'
    ]
    readonly_fields = ['completion_percentage']
    
    def completion_display(self, obj):
        percentage = obj.completion_percentage
        return f"{percentage:.1f}% ({obj.hours_completed}/{obj.hours_committed}h)"
    completion_display.short_description = 'Completion'


@admin.register(VolunteerTimeLog)
class VolunteerTimeLogAdmin(admin.ModelAdmin):
    list_display = [
        'volunteer', 'assignment', 'date', 'hours', 'approved',
        'approved_by', 'approved_at'
    ]
    list_filter = ['approved', 'date', 'approved_at']
    search_fields = [
        'volunteer__username', 'volunteer__email',
        'assignment__opportunity__title'
    ]
    readonly_fields = ['approved_at']


@admin.register(ApplicationDocument)
class ApplicationDocumentAdmin(admin.ModelAdmin):
    list_display = [
        'application', 'document_type', 'title', 'status',
        'file_size_display', 'uploaded_by', 'created_at'
    ]
    list_filter = [
        'document_type', 'status', 'virus_scan_status',
        'created_at', 'expires_at'
    ]
    search_fields = [
        'title', 'application__volunteer__username',
        'application__volunteer__email', 'original_filename'
    ]
    readonly_fields = [
        'file_size', 'file_type', 'original_filename',
        'virus_scan_status', 'virus_scan_date', 'file_size_display',
        'is_expired', 'created_at', 'updated_at'
    ]
    
    fieldsets = (
        ('Document Details', {
            'fields': ('application', 'document_type', 'title', 'description')
        }),
        ('File Information', {
            'fields': (
                'file', 'file_size', 'file_size_display', 'file_type',
                'original_filename'
            )
        }),
        ('Security', {
            'fields': ('virus_scan_status', 'virus_scan_date')
        }),
        ('Review', {
            'fields': ('status', 'reviewed_by', 'reviewed_at', 'review_notes')
        }),
        ('Expiry', {
            'fields': ('expires_at', 'is_expired')
        }),
        ('Metadata', {
            'fields': ('uploaded_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def file_size_display(self, obj):
        return obj.file_size_display
    file_size_display.short_description = 'File Size'


@admin.register(DocumentTemplate)
class DocumentTemplateAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'document_type', 'is_required', 'max_file_size_display',
        'expires_after_days', 'is_active'
    ]
    list_filter = ['document_type', 'is_required', 'is_active']
    search_fields = ['name', 'description']
    
    fieldsets = (
        ('Template Details', {
            'fields': ('name', 'document_type', 'description', 'instructions')
        }),
        ('Requirements', {
            'fields': ('is_required', 'max_file_size', 'allowed_file_types')
        }),
        ('Template File', {
            'fields': ('template_file',)
        }),
        ('Expiry Settings', {
            'fields': ('expires_after_days',)
        }),
        ('Status', {
            'fields': ('is_active',)
        })
    )
    
    def max_file_size_display(self, obj):
        size = obj.max_file_size
        if size < 1024 * 1024:
            return f"{size / 1024:.0f} KB"
        else:
            return f"{size / (1024 * 1024):.1f} MB"
    max_file_size_display.short_description = 'Max File Size'


@admin.register(ApplicationNote)
class ApplicationNoteAdmin(admin.ModelAdmin):
    list_display = [
        'application', 'note_type', 'title', 'is_internal',
        'is_important', 'created_by', 'created_at'
    ]
    list_filter = ['note_type', 'is_internal', 'is_important', 'created_at']
    search_fields = [
        'title', 'content', 'application__volunteer__username',
        'application__volunteer__email'
    ]
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Note Details', {
            'fields': ('application', 'note_type', 'title', 'content')
        }),
        ('Settings', {
            'fields': ('is_internal', 'is_important')
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )