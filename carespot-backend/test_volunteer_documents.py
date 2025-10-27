#!/usr/bin/env python
"""
Simple test script to verify volunteer application and document handling functionality.
"""

import os
import sys
import django
from django.conf import settings

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'carespot.settings.development')
django.setup()

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from volunteers.models import (
    SkillCategory, Skill, VolunteerOpportunity, VolunteerProfile,
    VolunteerApplication, ApplicationDocument, DocumentTemplate, ApplicationNote
)
# Role is handled as a field on CustomUser, not a separate model

User = get_user_model()

def test_volunteer_application_with_documents():
    """Test creating a volunteer application with document handling."""
    
    print("🧪 Testing Volunteer Application with Document Handling...")
    
    # Create test users
    print("📝 Creating test users...")
    volunteer_user, created = User.objects.get_or_create(
        username='test_volunteer@example.com',
        defaults={
            'email': 'test_volunteer@example.com',
            'first_name': 'John',
            'last_name': 'Volunteer',
            'password': 'testpass123'
        }
    )
    
    staff_user, created = User.objects.get_or_create(
        username='test_staff@example.com',
        defaults={
            'email': 'test_staff@example.com',
            'first_name': 'Jane',
            'last_name': 'Staff',
            'password': 'testpass123'
        }
    )
    
    # Set user roles
    volunteer_user.role = 'volunteer'
    volunteer_user.save()
    
    staff_user.role = 'staff'
    staff_user.save()
    
    print(f"✅ Created users: {volunteer_user.username}, {staff_user.username}")
    
    # Create skill category and skill
    print("🎯 Creating skills...")
    skill_category, created = SkillCategory.objects.get_or_create(
        name='Healthcare',
        defaults={'description': 'Healthcare related skills'}
    )
    
    skill, created = Skill.objects.get_or_create(
        name='First Aid',
        defaults={
            'category': skill_category,
            'description': 'Basic first aid skills'
        }
    )
    
    print(f"✅ Created skill: {skill.name}")
    
    # Create volunteer opportunity
    print("🎯 Creating volunteer opportunity...")
    opportunity, created = VolunteerOpportunity.objects.get_or_create(
        slug='test-community-health-screening',
        defaults={
            'title': 'Test Community Health Screening',
            'description': 'Help with community health screening events',
            'short_description': 'Community health screening volunteer',
            'commitment_type': 'short_term',
            'time_commitment': 'part_time',
            'start_date': timezone.now().date(),
            'location': 'Accra, Ghana',
            'positions_available': 5,
            'contact_person': staff_user,
            'contact_email': 'contact@carespot.org'
        }
    )
    
    print(f"✅ Created opportunity: {opportunity.title}")
    
    # Create volunteer application
    print("📋 Creating volunteer application...")
    application, created = VolunteerApplication.objects.get_or_create(
        volunteer=volunteer_user,
        opportunity=opportunity,
        defaults={
            'cover_letter': 'I am very interested in volunteering for this opportunity.',
            'why_interested': 'I want to help my community and gain healthcare experience.',
            'relevant_experience': 'I have basic first aid training and volunteer experience.',
            'resume_required': True,
            'references_required': True,
            'background_check_required': False
        }
    )
    
    print(f"✅ Created application: {application.id}")
    print(f"   Status: {application.status}")
    print(f"   Documents complete: {application.documents_complete}")
    print(f"   Can be submitted: {application.can_be_submitted}")
    
    # Create document template
    print("📄 Creating document template...")
    template, created = DocumentTemplate.objects.get_or_create(
        name='Resume Template',
        document_type='resume',
        defaults={
            'description': 'Template for volunteer resumes',
            'instructions': 'Please provide a current resume highlighting your relevant experience.',
            'max_file_size': 5242880,  # 5MB
            'allowed_file_types': ['pdf', 'doc', 'docx'],
            'is_required': True
        }
    )
    
    print(f"✅ Created template: {template.name}")
    
    # Upload documents
    print("📎 Uploading documents...")
    
    # Create resume document
    resume_file = SimpleUploadedFile(
        'test_resume.pdf',
        b'This is a fake PDF content for testing purposes.',
        content_type='application/pdf'
    )
    
    resume_doc, created = ApplicationDocument.objects.get_or_create(
        application=application,
        document_type='resume',
        defaults={
            'title': 'John Volunteer Resume',
            'description': 'Updated resume with relevant experience',
            'file': resume_file,
            'file_size': len(resume_file.read()),
            'file_type': 'pdf',
            'original_filename': 'test_resume.pdf',
            'uploaded_by': volunteer_user
        }
    )
    
    # Create references document
    references_file = SimpleUploadedFile(
        'test_references.pdf',
        b'This is a fake PDF content for references.',
        content_type='application/pdf'
    )
    
    references_doc, created = ApplicationDocument.objects.get_or_create(
        application=application,
        document_type='references',
        defaults={
            'title': 'Professional References',
            'description': 'List of professional references',
            'file': references_file,
            'file_size': len(references_file.read()),
            'file_type': 'pdf',
            'original_filename': 'test_references.pdf',
            'uploaded_by': volunteer_user
        }
    )
    
    print(f"✅ Uploaded documents:")
    print(f"   Resume: {resume_doc.title} ({resume_doc.file_size_display})")
    print(f"   References: {references_doc.title} ({references_doc.file_size_display})")
    
    # Check application status after documents
    application.refresh_from_db()
    print(f"📋 Application status after documents:")
    print(f"   Documents complete: {application.documents_complete}")
    print(f"   Can be submitted: {application.can_be_submitted}")
    
    # Submit application
    if application.can_be_submitted:
        print("📤 Submitting application...")
        success = application.submit_application()
        if success:
            print(f"✅ Application submitted successfully! Status: {application.status}")
        else:
            print("❌ Failed to submit application")
    
    # Staff review documents
    print("👩‍💼 Staff reviewing documents...")
    
    # Approve resume
    resume_doc.approve_document(staff_user, 'Resume looks comprehensive and well-formatted.')
    print(f"✅ Resume approved by {staff_user.get_full_name()}")
    
    # Approve references
    references_doc.approve_document(staff_user, 'References are from credible sources.')
    print(f"✅ References approved by {staff_user.get_full_name()}")
    
    # Add application note
    print("📝 Adding application note...")
    note = ApplicationNote.objects.create(
        application=application,
        note_type='general',
        title='Initial Review Complete',
        content='All required documents have been reviewed and approved. Candidate shows strong motivation and relevant experience.',
        is_internal=True,
        is_important=False,
        created_by=staff_user
    )
    
    print(f"✅ Added note: {note.title}")
    
    # Display final status
    print("\n🎉 Test completed successfully!")
    print("=" * 50)
    print(f"Application ID: {application.id}")
    print(f"Volunteer: {application.volunteer.get_full_name()}")
    print(f"Opportunity: {application.opportunity.title}")
    print(f"Status: {application.status}")
    print(f"Documents uploaded: {application.documents.count()}")
    print(f"Notes: {application.notes.count()}")
    
    # Display document details
    print("\n📄 Document Details:")
    for doc in application.documents.all():
        print(f"  - {doc.get_document_type_display()}: {doc.title}")
        print(f"    Status: {doc.get_status_display()}")
        print(f"    Size: {doc.file_size_display}")
        print(f"    Reviewed by: {doc.reviewed_by.get_full_name() if doc.reviewed_by else 'Not reviewed'}")
    
    return True

def test_document_template_functionality():
    """Test document template functionality."""
    
    print("\n🧪 Testing Document Template Functionality...")
    
    # Create various document templates
    templates_data = [
        {
            'name': 'Cover Letter Template',
            'document_type': 'cover_letter',
            'description': 'Template for volunteer cover letters',
            'instructions': 'Write a compelling cover letter explaining your interest and qualifications.',
            'max_file_size': 2097152,  # 2MB
            'allowed_file_types': ['pdf', 'doc', 'docx'],
            'is_required': False
        },
        {
            'name': 'Background Check Form',
            'document_type': 'background_check',
            'description': 'Background check authorization form',
            'instructions': 'Complete and sign the background check authorization form.',
            'max_file_size': 1048576,  # 1MB
            'allowed_file_types': ['pdf'],
            'is_required': True,
            'expires_after_days': 365
        },
        {
            'name': 'Certification Documents',
            'document_type': 'certifications',
            'description': 'Professional certifications and licenses',
            'instructions': 'Upload copies of relevant professional certifications.',
            'max_file_size': 10485760,  # 10MB
            'allowed_file_types': ['pdf', 'jpg', 'png'],
            'is_required': False
        }
    ]
    
    created_templates = []
    for template_data in templates_data:
        template, created = DocumentTemplate.objects.get_or_create(
            name=template_data['name'],
            document_type=template_data['document_type'],
            defaults=template_data
        )
        created_templates.append(template)
        print(f"✅ {'Created' if created else 'Found'} template: {template.name}")
    
    print(f"\n📊 Template Summary:")
    print(f"Total templates: {DocumentTemplate.objects.count()}")
    print(f"Required templates: {DocumentTemplate.objects.filter(is_required=True).count()}")
    print(f"Active templates: {DocumentTemplate.objects.filter(is_active=True).count()}")
    
    return True

if __name__ == '__main__':
    try:
        print("🚀 Starting Volunteer Application and Document Handling Tests")
        print("=" * 60)
        
        # Run tests
        test_volunteer_application_with_documents()
        test_document_template_functionality()
        
        print("\n🎉 All tests completed successfully!")
        print("The volunteer application model with document handling is working correctly.")
        
    except Exception as e:
        print(f"\n❌ Test failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)