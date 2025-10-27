"""
Admin configuration for content app.
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Tag, BlogPost, Project, TeamMember, Event, Document, ApprovalWorkflow, ContentRevision


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'color_display']
    list_filter = ['parent', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    
    def color_display(self, obj):
        return format_html(
            '<div style="width: 20px; height: 20px; background-color: {}; border: 1px solid #ccc;"></div>',
            obj.color
        )
    color_display.short_description = 'Color'


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'author', 'category', 'status', 'published_at',
        'view_count', 'is_featured', 'workflow_status'
    ]
    list_filter = [
        'status', 'is_featured', 'category', 'published_at', 'created_at'
    ]
    search_fields = ['title', 'content', 'author__username']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    readonly_fields = [
        'view_count', 'like_count', 'share_count', 'submitted_at', 
        'reviewed_at', 'workflow_status'
    ]
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content')
        }),
        ('Media', {
            'fields': ('featured_image', 'featured_image_alt')
        }),
        ('Organization', {
            'fields': ('author', 'category', 'tags')
        }),
        ('Publishing', {
            'fields': ('status', 'published_at', 'is_featured', 'allow_comments')
        }),
        ('Approval Workflow', {
            'fields': (
                'submitted_at', 'submitted_by', 'reviewed_at', 'reviewed_by',
                'approval_notes', 'rejection_reason'
            ),
            'classes': ('collapse',)
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Statistics', {
            'fields': ('view_count', 'like_count', 'share_count'),
            'classes': ('collapse',)
        })
    )
    
    def workflow_status(self, obj):
        """Display workflow status with color coding."""
        status_colors = {
            'draft': 'gray',
            'submitted': 'orange',
            'review': 'blue',
            'approved': 'green',
            'rejected': 'red',
            'published': 'darkgreen',
            'archived': 'gray'
        }
        color = status_colors.get(obj.status, 'black')
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color, obj.get_status_display()
        )
    workflow_status.short_description = 'Workflow Status'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'status', 'location', 'start_date', 'end_date',
        'progress_display', 'is_featured', 'workflow_status'
    ]
    list_filter = ['status', 'start_date', 'is_featured', 'category']
    search_fields = ['title', 'description', 'location']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    readonly_fields = [
        'progress_display', 'funding_display', 'submitted_at', 
        'reviewed_at', 'workflow_status'
    ]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'short_description')
        }),
        ('Project Details', {
            'fields': ('location', 'start_date', 'end_date', 'status')
        }),
        ('Impact & Budget', {
            'fields': (
                'beneficiaries_target', 'beneficiaries_reached', 'progress_display',
                'budget', 'funds_raised', 'funding_display'
            )
        }),
        ('Organization', {
            'fields': ('category', 'tags', 'project_manager', 'created_by')
        }),
        ('Approval Workflow', {
            'fields': (
                'submitted_at', 'submitted_by', 'reviewed_at', 'reviewed_by',
                'approval_notes', 'rejection_reason'
            ),
            'classes': ('collapse',)
        }),
        ('Media & SEO', {
            'fields': ('featured_image', 'gallery_images', 'meta_title', 'meta_description', 'is_featured'),
            'classes': ('collapse',)
        })
    )
    
    def progress_display(self, obj):
        percentage = obj.progress_percentage
        return f"{percentage:.1f}% ({obj.beneficiaries_reached}/{obj.beneficiaries_target})"
    progress_display.short_description = 'Progress'
    
    def funding_display(self, obj):
        if obj.budget:
            percentage = obj.funding_percentage
            return f"{percentage:.1f}% (${obj.funds_raised}/${obj.budget})"
        return "No budget set"
    funding_display.short_description = 'Funding'
    
    def workflow_status(self, obj):
        """Display workflow status with color coding."""
        status_colors = {
            'draft': 'gray',
            'submitted': 'orange',
            'review': 'blue',
            'approved': 'green',
            'rejected': 'red',
            'planning': 'purple',
            'active': 'darkgreen',
            'completed': 'navy',
            'on_hold': 'orange',
            'cancelled': 'red'
        }
        color = status_colors.get(obj.status, 'black')
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color, obj.get_status_display()
        )
    workflow_status.short_description = 'Workflow Status'


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'title', 'role', 'department', 'is_active',
        'show_on_website', 'display_order'
    ]
    list_filter = ['role', 'is_active', 'show_on_website', 'department']
    search_fields = ['name', 'title', 'bio']
    ordering = ['display_order', 'name']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'event_type', 'start_datetime', 'location_name',
        'status', 'current_attendees', 'max_attendees', 'is_virtual'
    ]
    list_filter = [
        'event_type', 'status', 'is_virtual', 'requires_registration',
        'start_datetime'
    ]
    search_fields = ['title', 'description', 'location_name']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'document_type', 'access_level', 'file_type',
        'file_size_display', 'download_count', 'uploaded_by'
    ]
    list_filter = ['document_type', 'access_level', 'file_type', 'created_at']
    search_fields = ['title', 'description']
    filter_horizontal = ['tags']
    readonly_fields = ['file_size', 'file_type', 'download_count']
    
    def file_size_display(self, obj):
        size = obj.file_size
        if size < 1024:
            return f"{size} B"
        elif size < 1024 * 1024:
            return f"{size / 1024:.1f} KB"
        else:
            return f"{size / (1024 * 1024):.1f} MB"
    file_size_display.short_description = 'File Size'


@admin.register(ApprovalWorkflow)
class ApprovalWorkflowAdmin(admin.ModelAdmin):
    list_display = [
        'content_object', 'action', 'actor', 'created_at', 'ip_address'
    ]
    list_filter = ['action', 'created_at', 'content_type']
    search_fields = ['actor__email', 'notes']
    readonly_fields = ['content_object', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Workflow Action', {
            'fields': ('content_object', 'action', 'actor', 'notes')
        }),
        ('Metadata', {
            'fields': ('ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def has_add_permission(self, request):
        return False  # Workflow entries are created automatically
    
    def has_change_permission(self, request, obj=None):
        return False  # Workflow entries should not be modified


@admin.register(ContentRevision)
class ContentRevisionAdmin(admin.ModelAdmin):
    list_display = [
        'content_object', 'revision_number', 'title', 'created_by', 'created_at'
    ]
    list_filter = ['created_at', 'content_type']
    search_fields = ['title', 'change_summary', 'created_by__email']
    readonly_fields = ['content_object', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Revision Info', {
            'fields': ('content_object', 'revision_number', 'title', 'change_summary')
        }),
        ('Content Data', {
            'fields': ('content_data',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def has_add_permission(self, request):
        return False  # Revisions are created automatically
    
    def has_change_permission(self, request, obj=None):
        return False  # Revisions should not be modified