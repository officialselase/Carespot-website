"""
URL configuration for volunteers app.
"""

from django.urls import path, include
from . import views

app_name = 'volunteers'

# API v1 URLs
v1_urlpatterns = [
    # Skills
    path('skill-categories/', views.SkillCategoryListView.as_view(), name='skill-category-list'),
    path('skills/', views.SkillListView.as_view(), name='skill-list'),
    
    # Volunteer Opportunities
    path('opportunities/', views.VolunteerOpportunityListView.as_view(), name='opportunity-list'),
    path('opportunities/<slug:slug>/', views.VolunteerOpportunityDetailView.as_view(), name='opportunity-detail'),
    
    # Volunteer Profile
    path('profile/', views.VolunteerProfileView.as_view(), name='volunteer-profile'),
    
    # Applications
    path('applications/', views.VolunteerApplicationListView.as_view(), name='application-list'),
    path('applications/<uuid:pk>/', views.VolunteerApplicationDetailView.as_view(), name='application-detail'),
    path('applications/<uuid:pk>/submit/', views.submit_application, name='application-submit'),
    path('applications/<uuid:pk>/approve/', views.approve_application, name='application-approve'),
    path('applications/<uuid:pk>/reject/', views.reject_application, name='application-reject'),
    
    # Application Documents
    path('documents/', views.ApplicationDocumentListView.as_view(), name='document-list'),
    path('documents/<uuid:pk>/', views.ApplicationDocumentDetailView.as_view(), name='document-detail'),
    path('documents/<uuid:pk>/approve/', views.approve_document, name='document-approve'),
    path('documents/<uuid:pk>/reject/', views.reject_document, name='document-reject'),
    
    # Document Templates
    path('document-templates/', views.DocumentTemplateListView.as_view(), name='document-template-list'),
    
    # Application Notes
    path('notes/', views.ApplicationNoteListView.as_view(), name='note-list'),
    
    # Assignments
    path('assignments/', views.VolunteerAssignmentListView.as_view(), name='assignment-list'),
    
    # Time Logs
    path('time-logs/', views.VolunteerTimeLogListView.as_view(), name='time-log-list'),
    path('time-logs/<uuid:pk>/approve/', views.approve_time_log, name='time-log-approve'),
    
    # Statistics
    path('stats/', views.volunteer_stats, name='volunteer-stats'),
    path('document-stats/', views.document_stats, name='document-stats'),
]

urlpatterns = [
    path('v1/', include(v1_urlpatterns)),
]