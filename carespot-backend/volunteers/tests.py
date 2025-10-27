"""
Tests for volunteer application and document handling functionality.
"""

import tempfile
import os
from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework import status
# Role is handled as a field on CustomUser, not a separate model
from .models import (
    SkillCategory, Skill, VolunteerOpportunity, VolunteerProfile,
    VolunteerApplication, ApplicationDocument, DocumentTemplate, ApplicationNote
)

User = get_user_model()


class VolunteerApplicationModelTest(TestCase):
    """Test volunteer application model functionality."""
    
    def setUp(self):
        """Set up test data."""
        # Create users
        self.volunteer_user = User.objects.create_user(
            username='volunteer@test.com',
            email='volunteer@test.com',
            password='testpass123',
            first_name='John',
            last_name='Volunteer'
        )
        
        self.staff_user = User.objects.create_user(
            username='staff@test.com',
            email='staff@test.com',
            password='testpass123',
            first_name='Jane',
            last_name='Staff'
        )
        
        # Set user roles
        self.volunteer_user.role = 'volunteer'
        self.volunteer_user.save()
        
        self.staff_user.role = 'staff'
        self.staff_user.save()
        
        # Create skill category and skill
        self.skill_category = SkillCategory.objects.create(
            name='Healthcare',
            description='Healthcare related skills'
        )
        
        self.skill = Skill.objects.create(
            name='First Aid',
            category=self.skill_category,
            description='Basic first aid skills'
        )
        
        # Create volunteer opportunity
        self.opportunity = VolunteerOpportunity.objects.create(
            title='Community Health Screening',
            slug='community-health-screening',
            description='Help with community health screening events',
            short_description='Community health screening volunteer',
            commitment_type='short_term',
            time_commitment='part_time',
            start_date=timezone.now().date(),
            location='Accra, Ghana',
            positions_available=5,
            contact_person=self.staff_user,
            contact_email='contact@carespot.org'
        )
        
        # Create volunteer application
        self.application = VolunteerApplication.objects.create(
            volunteer=self.volunteer_user,
            opportunity=self.opportunity,
            cover_letter='I am interested in volunteering for this opportunity.',
            why_interested='I want to help my community.',
            relevant_experience='I have experience in healthcare.',
            resume_required=True,
            references_required=True
        )
    
    def test_application_creation(self):
        """Test volunteer application creation."""
        self.assertEqual(self.application.volunteer, self.volunteer_user)
        self.assertEqual(self.application.opportunity, self.opportunity)
        self.assertEqual(self.application.status, 'draft')
        self.assertFalse(self.application.documents_complete)
        self.assertFalse(self.application.can_be_submitted)
    
    def test_documents_complete_property(self):
        """Test documents_complete property."""
        # Initially no documents, so not complete
        self.assertFalse(self.application.documents_complete)
        
        # Add required documents
        ApplicationDocument.objects.create(
            application=self.application,
            document_type='resume',
            title='My Resume',
            file=SimpleUploadedFile('resume.pdf', b'fake pdf content'),
            file_size=1024,
            file_type='pdf',
            original_filename='resume.pdf',
            uploaded_by=self.volunteer_user
        )
        
        ApplicationDocument.objects.create(
            application=self.application,
            document_type='references',
            title='My References',
            file=SimpleUploadedFile('references.pdf', b'fake pdf content'),
            file_size=1024,
            file_type='pdf',
            original_filename='references.pdf',
            uploaded_by=self.volunteer_user
        )
        
        # Now documents should be complete
        self.assertTrue(self.application.documents_complete)
        self.assertTrue(self.application.can_be_submitted)
    
    def test_submit_application(self):
        """Test application submission."""
        # Cannot submit without documents
        self.assertFalse(self.application.submit_application())
        self.assertEqual(self.application.status, 'draft')
        
        # Add required documents
        ApplicationDocument.objects.create(
            application=self.application,
            document_type='resume',
            title='My Resume',
            file=SimpleUploadedFile('resume.pdf', b'fake pdf content'),
            file_size=1024,
            file_type='pdf',
            original_filename='resume.pdf',
            uploaded_by=self.volunteer_user
        )
        
        ApplicationDocument.objects.create(
            application=self.application,
            document_type='references',
            title='My References',
            file=SimpleUploadedFile('references.pdf', b'fake pdf content'),
            file_size=1024,
            file_type='pdf',
            original_filename='references.pdf',
            uploaded_by=self.volunteer_user
        )
        
        # Now should be able to submit
        self.assertTrue(self.application.submit_application())
        self.assertEqual(self.application.status, 'submitted')


class ApplicationDocumentModelTest(TestCase):
    """Test application document model functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.volunteer_user = User.objects.create_user(
            username='volunteer@test.com',
            email='volunteer@test.com',
            password='testpass123'
        )
        
        self.staff_user = User.objects.create_user(
            username='staff@test.com',
            email='staff@test.com',
            password='testpass123'
        )
        
        self.opportunity = VolunteerOpportunity.objects.create(
            title='Test Opportunity',
            slug='test-opportunity',
            description='Test description',
            short_description='Test short description',
            commitment_type='short_term',
            time_commitment='part_time',
            start_date=timezone.now().date(),
            location='Test Location',
            contact_person=self.staff_user,
            contact_email='test@example.com'
        )
        
        self.application = VolunteerApplication.objects.create(
            volunteer=self.volunteer_user,
            opportunity=self.opportunity,
            cover_letter='Test cover letter',
            why_interested='Test interest'
        )
        
        self.document = ApplicationDocument.objects.create(
            application=self.application,
            document_type='resume',
            title='Test Resume',
            file=SimpleUploadedFile('test_resume.pdf', b'fake pdf content'),
            file_size=1024,
            file_type='pdf',
            original_filename='test_resume.pdf',
            uploaded_by=self.volunteer_user
        )
    
    def test_document_creation(self):
        """Test document creation."""
        self.assertEqual(self.document.application, self.application)
        self.assertEqual(self.document.document_type, 'resume')
        self.assertEqual(self.document.status, 'pending')
        self.assertEqual(self.document.uploaded_by, self.volunteer_user)
        self.assertFalse(self.document.is_expired)
    
    def test_file_size_display(self):
        """Test file size display formatting."""
        # Test bytes
        self.document.file_size = 512
        self.assertEqual(self.document.file_size_display, '512 B')
        
        # Test KB
        self.document.file_size = 1536  # 1.5 KB
        self.assertEqual(self.document.file_size_display, '1.5 KB')
        
        # Test MB
        self.document.file_size = 2097152  # 2 MB
        self.assertEqual(self.document.file_size_display, '2.0 MB')
    
    def test_approve_document(self):
        """Test document approval."""
        self.document.approve_document(self.staff_user, 'Looks good')
        
        self.assertEqual(self.document.status, 'approved')
        self.assertEqual(self.document.reviewed_by, self.staff_user)
        self.assertEqual(self.document.review_notes, 'Looks good')
        self.assertIsNotNone(self.document.reviewed_at)
    
    def test_reject_document(self):
        """Test document rejection."""
        self.document.reject_document(self.staff_user, 'Needs improvement')
        
        self.assertEqual(self.document.status, 'rejected')
        self.assertEqual(self.document.reviewed_by, self.staff_user)
        self.assertEqual(self.document.review_notes, 'Needs improvement')
        self.assertIsNotNone(self.document.reviewed_at)
    
    def test_document_expiry(self):
        """Test document expiry functionality."""
        # Set expiry date in the past
        past_date = timezone.now() - timezone.timedelta(days=1)
        self.document.expires_at = past_date
        self.document.save()
        
        self.assertTrue(self.document.is_expired)
        
        # Set expiry date in the future
        future_date = timezone.now() + timezone.timedelta(days=30)
        self.document.expires_at = future_date
        self.document.save()
        
        self.assertFalse(self.document.is_expired)


class DocumentTemplateModelTest(TestCase):
    """Test document template model functionality."""
    
    def test_template_creation(self):
        """Test document template creation."""
        template = DocumentTemplate.objects.create(
            name='Resume Template',
            document_type='resume',
            description='Template for volunteer resumes',
            instructions='Please fill out all sections completely',
            max_file_size=5242880,  # 5MB
            allowed_file_types=['pdf', 'doc', 'docx'],
            expires_after_days=365
        )
        
        self.assertEqual(template.name, 'Resume Template')
        self.assertEqual(template.document_type, 'resume')
        self.assertTrue(template.is_required)
        self.assertTrue(template.is_active)
        self.assertEqual(template.max_file_size, 5242880)
        self.assertEqual(template.allowed_file_types, ['pdf', 'doc', 'docx'])


class ApplicationNoteModelTest(TestCase):
    """Test application note model functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.volunteer_user = User.objects.create_user(
            username='volunteer@test.com',
            email='volunteer@test.com',
            password='testpass123'
        )
        
        self.staff_user = User.objects.create_user(
            username='staff@test.com',
            email='staff@test.com',
            password='testpass123'
        )
        
        self.opportunity = VolunteerOpportunity.objects.create(
            title='Test Opportunity',
            slug='test-opportunity',
            description='Test description',
            short_description='Test short description',
            commitment_type='short_term',
            time_commitment='part_time',
            start_date=timezone.now().date(),
            location='Test Location',
            contact_person=self.staff_user,
            contact_email='test@example.com'
        )
        
        self.application = VolunteerApplication.objects.create(
            volunteer=self.volunteer_user,
            opportunity=self.opportunity,
            cover_letter='Test cover letter',
            why_interested='Test interest'
        )
    
    def test_note_creation(self):
        """Test application note creation."""
        note = ApplicationNote.objects.create(
            application=self.application,
            note_type='interview',
            title='Interview Feedback',
            content='Candidate showed great enthusiasm',
            is_internal=True,
            is_important=True,
            created_by=self.staff_user
        )
        
        self.assertEqual(note.application, self.application)
        self.assertEqual(note.note_type, 'interview')
        self.assertEqual(note.title, 'Interview Feedback')
        self.assertTrue(note.is_internal)
        self.assertTrue(note.is_important)
        self.assertEqual(note.created_by, self.staff_user)


@override_settings(MEDIA_ROOT=tempfile.mkdtemp())
class VolunteerApplicationAPITest(APITestCase):
    """Test volunteer application API endpoints."""
    
    def setUp(self):
        """Set up test data."""
        # Create users
        self.volunteer_user = User.objects.create_user(
            username='volunteer@test.com',
            email='volunteer@test.com',
            password='testpass123'
        )
        
        self.staff_user = User.objects.create_user(
            username='staff@test.com',
            email='staff@test.com',
            password='testpass123'
        )
        
        # Set user roles
        self.volunteer_user.role = 'volunteer'
        self.volunteer_user.save()
        
        self.staff_user.role = 'staff'
        self.staff_user.save()
        
        # Create opportunity
        self.opportunity = VolunteerOpportunity.objects.create(
            title='Test Opportunity',
            slug='test-opportunity',
            description='Test description',
            short_description='Test short description',
            commitment_type='short_term',
            time_commitment='part_time',
            start_date=timezone.now().date(),
            location='Test Location',
            contact_person=self.staff_user,
            contact_email='test@example.com'
        )
        
        # Create application
        self.application = VolunteerApplication.objects.create(
            volunteer=self.volunteer_user,
            opportunity=self.opportunity,
            cover_letter='Test cover letter',
            why_interested='Test interest'
        )
    
    def test_create_application(self):
        """Test creating a volunteer application via API."""
        self.client.force_authenticate(user=self.volunteer_user)
        
        data = {
            'opportunity': self.opportunity.id,
            'cover_letter': 'I am very interested in this opportunity',
            'why_interested': 'I want to help the community',
            'relevant_experience': 'I have healthcare experience'
        }
        
        response = self.client.post('/api/volunteers/v1/applications/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Check that application was created
        application = VolunteerApplication.objects.get(id=response.data['id'])
        self.assertEqual(application.volunteer, self.volunteer_user)
        self.assertEqual(application.opportunity, self.opportunity)
    
    def test_upload_document(self):
        """Test uploading a document via API."""
        self.client.force_authenticate(user=self.volunteer_user)
        
        # Create a test file
        test_file = SimpleUploadedFile(
            'test_resume.pdf',
            b'fake pdf content',
            content_type='application/pdf'
        )
        
        data = {
            'application': self.application.id,
            'document_type': 'resume',
            'title': 'My Resume',
            'description': 'Updated resume',
            'file': test_file
        }
        
        response = self.client.post('/api/volunteers/v1/documents/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Check that document was created
        document = ApplicationDocument.objects.get(id=response.data['id'])
        self.assertEqual(document.application, self.application)
        self.assertEqual(document.document_type, 'resume')
        self.assertEqual(document.uploaded_by, self.volunteer_user)
    
    def test_approve_document_as_staff(self):
        """Test approving a document as staff."""
        # Create a document
        document = ApplicationDocument.objects.create(
            application=self.application,
            document_type='resume',
            title='Test Resume',
            file=SimpleUploadedFile('test.pdf', b'content'),
            file_size=1024,
            file_type='pdf',
            original_filename='test.pdf',
            uploaded_by=self.volunteer_user
        )
        
        self.client.force_authenticate(user=self.staff_user)
        
        data = {'notes': 'Document looks good'}
        response = self.client.post(f'/api/volunteers/v1/documents/{document.id}/approve/', data)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that document was approved
        document.refresh_from_db()
        self.assertEqual(document.status, 'approved')
        self.assertEqual(document.reviewed_by, self.staff_user)
    
    def test_submit_application(self):
        """Test submitting an application via API."""
        # Add required documents
        ApplicationDocument.objects.create(
            application=self.application,
            document_type='resume',
            title='Resume',
            file=SimpleUploadedFile('resume.pdf', b'content'),
            file_size=1024,
            file_type='pdf',
            original_filename='resume.pdf',
            uploaded_by=self.volunteer_user
        )
        
        ApplicationDocument.objects.create(
            application=self.application,
            document_type='references',
            title='References',
            file=SimpleUploadedFile('references.pdf', b'content'),
            file_size=1024,
            file_type='pdf',
            original_filename='references.pdf',
            uploaded_by=self.volunteer_user
        )
        
        self.client.force_authenticate(user=self.volunteer_user)
        
        response = self.client.post(f'/api/volunteers/v1/applications/{self.application.id}/submit/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that application status changed
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, 'submitted')
    
    def test_volunteer_can_only_see_own_applications(self):
        """Test that volunteers can only see their own applications."""
        # Create another volunteer and application
        other_volunteer = User.objects.create_user(
            username='other@test.com',
            email='other@test.com',
            password='testpass123'
        )
        
        other_application = VolunteerApplication.objects.create(
            volunteer=other_volunteer,
            opportunity=self.opportunity,
            cover_letter='Other cover letter',
            why_interested='Other interest'
        )
        
        self.client.force_authenticate(user=self.volunteer_user)
        
        response = self.client.get('/api/volunteers/v1/applications/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Should only see own application
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], str(self.application.id))
    
    def test_staff_can_see_all_applications(self):
        """Test that staff can see all applications."""
        # Create another volunteer and application
        other_volunteer = User.objects.create_user(
            username='other@test.com',
            email='other@test.com',
            password='testpass123'
        )
        
        other_application = VolunteerApplication.objects.create(
            volunteer=other_volunteer,
            opportunity=self.opportunity,
            cover_letter='Other cover letter',
            why_interested='Other interest'
        )
        
        self.client.force_authenticate(user=self.staff_user)
        
        response = self.client.get('/api/volunteers/v1/applications/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Should see both applications
        self.assertEqual(len(response.data), 2)
    
    def tearDown(self):
        """Clean up uploaded files."""
        # Clean up any uploaded files
        for document in ApplicationDocument.objects.all():
            if document.file and os.path.exists(document.file.path):
                os.remove(document.file.path)
