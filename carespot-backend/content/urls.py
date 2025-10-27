"""
URL configuration for content app.
"""

from django.urls import path, include
from . import views

app_name = 'content'

# API v1 URLs
v1_urlpatterns = [
    # Categories and Tags
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
    
    # Blog Posts
    path('blog/', views.BlogPostListView.as_view(), name='blog-list'),
    path('blog/<slug:slug>/', views.BlogPostDetailView.as_view(), name='blog-detail'),
    path('blog/<slug:slug>/share/', views.increment_blog_share, name='blog-share'),
    
    # Blog Post Approval Workflow
    path('blog/<slug:slug>/submit/', views.submit_blog_post_for_review, name='blog-submit'),
    path('blog/<slug:slug>/start-review/', views.start_blog_post_review, name='blog-start-review'),
    path('blog/<slug:slug>/approve/', views.approve_blog_post, name='blog-approve'),
    path('blog/<slug:slug>/reject/', views.reject_blog_post, name='blog-reject'),
    path('blog/<slug:slug>/publish/', views.publish_blog_post, name='blog-publish'),
    
    # Projects
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),
    
    # Project Approval Workflow
    path('projects/<slug:slug>/submit/', views.submit_project_for_review, name='project-submit'),
    path('projects/<slug:slug>/approve/', views.approve_project, name='project-approve'),
    path('projects/<slug:slug>/activate/', views.activate_project, name='project-activate'),
    
    # Team Members
    path('team/', views.TeamMemberListView.as_view(), name='team-list'),
    
    # Events
    path('events/', views.EventListView.as_view(), name='event-list'),
    path('events/<slug:slug>/', views.EventDetailView.as_view(), name='event-detail'),
    
    # Documents
    path('documents/', views.DocumentListView.as_view(), name='document-list'),
    path('documents/<uuid:pk>/download/', views.increment_document_download, name='document-download'),
    
    # Workflow Management
    path('workflow/pending/', views.get_pending_approvals, name='pending-approvals'),
    path('workflow/history/<str:content_type>/<uuid:object_id>/', views.get_content_workflow_history, name='workflow-history'),
]

urlpatterns = [
    path('v1/', include(v1_urlpatterns)),
]