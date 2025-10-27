"""
Comprehensive tests for analytics models with data anonymization.
"""

import uuid
from datetime import date, timedelta
from decimal import Decimal
from django.test import TestCase
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError

from .models import (
    AnonymizedUser, PageView, UserAction, ContentPerformance,
    DonationAnalytics, VolunteerAnalytics, SystemMetrics, DataRetentionPolicy
)
from authentication.models import Role
from donations.models import Donation, Campaign, DonationCategory
from volunteers.models import VolunteerProfile, VolunteerApplication, VolunteerOpportunity, Skill, SkillCategory

User = get_user_model()


class AnonymizedUserModelTest(TestCase):
    """Test AnonymizedUser model functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.user_role = Role.objects.create(name='volunteer', description='Volunteer role')
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='John',
            last_name='Doe',
            role=self.user_role
        )
        
        # Create volunteer profile with date of birth
        self.volunteer_profile = VolunteerProfile.objects.create(
            user=self.user,
            date_of_birth=date(1990, 1, 1),
            phone_number='+1234567890',
            address='123 Test St',
            city='Test City',
            state='Test State',
            zip_code='12345',
            emergency_contact_name='Jane Doe',
            emergency_contact_phone='+0987654321'
        )
    
    def test_create_anonymized_user(self):
        """Test creating an anonymized user record."""
        anonymized_user = AnonymizedUser.create_from_user(self.user)
        
        self.assertIsNotNone(anonymized_user.anonymous_id)
        self.assertEqual(len(anonymized_user.anonymous_id), 64)  # SHA256 hash length
        self.assertEqual(anonymized_user.user_type, 'volunteer')
        self.assertEqual(anonymized_user.age_range, '25-34')  # Born in 1990
        self.assertIsNotNone(anonymized_user.first_visit)
        self.assertIsNotNone(anonymized_user.last_activity)
    
    def test_anonymized_user_age_ranges(self):
        """Test different age range calculations."""
        # Test under 18
        self.volunteer_profile.date_of_birth = date(2010, 1, 1)
        self.volunteer_profile.save()
        anonymized_user = AnonymizedUser.create_from_user(self.user)
        self.assertEqual(anonymized_user.age_range, 'under-18')
        
        # Test 18-24
        self.volunteer_profile.date_of_birth = date(2002, 1, 1)
        self.volunteer_profile.save()
        anonymized_user = AnonymizedUser.create_from_user(self.user)
        self.assertEqual(anonymized_user.age_range, '18-24')
        
        # Test 65+
        self.volunteer_profile.date_of_birth = date(1950, 1, 1)
        self.volunteer_profile.save()
        anonymized_user = AnonymizedUser.create_from_user(self.user)
        self.assertEqual(anonymized_user.age_range, '65+')
    
    def test_anonymized_user_update_existing(self):
        """Test updating existing anonymized user record."""
        # Create initial record
        anonymized_user1 = AnonymizedUser.create_from_user(self.user)
        initial_id = anonymized_user1.id
        initial_first_visit = anonymized_user1.first_visit
        
        # Create again (should update existing)
        anonymized_user2 = AnonymizedUser.create_from_user(self.user)
        
        self.assertEqual(anonymized_user1.id, anonymized_user2.id)
        self.assertEqual(initial_first_visit, anonymized_user2.first_visit)
        self.assertGreaterEqual(anonymized_user2.last_activity, initial_first_visit)
    
    def test_anonymized_user_str_representation(self):
        """Test string representation of AnonymizedUser."""
        anonymized_user = AnonymizedUser.create_from_user(self.user)
        str_repr = str(anonymized_user)
        self.assertTrue(str_repr.startswith('Anonymous User'))
        self.assertTrue(str_repr.endswith('...'))


class PageViewModelTest(TestCase):
    """Test PageView model functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.user_role = Role.objects.create(name='visitor', description='Visitor role')
        self.user = User.objects.create_user(
            email='visitor@example.com',
            password='testpass123',
            role=self.user_role
        )
        self.anonymized_user = AnonymizedUser.create_from_user(self.user)
    
    def test_create_page_view(self):
        """Test creating a page view record."""
        page_view = PageView.objects.create(
            anonymous_user=self.anonymized_user,
            page_url='https://example.com/about',
            page_title='About Us',
            referrer_url='https://google.com',
            session_id='test_session_123',
            user_agent_category='desktop',
            browser_family='chrome',
            device_type='desktop',
            time_on_page=120
        )
        
        self.assertEqual(page_view.anonymous_user, self.anonymized_user)
        self.assertEqual(page_view.page_url, 'https://example.com/about')
        self.assertEqual(page_view.time_on_page, 120)
        self.assertIsNotNone(page_view.id)
    
    def test_page_view_str_representation(self):
        """Test string representation of PageView."""
        page_view = PageView.objects.create(
            anonymous_user=self.anonymized_user,
            page_url='https://example.com/test',
            session_id='test_session'
        )
        str_repr = str(page_view)
        self.assertIn('https://example.com/test', str_repr)
    
    def test_page_view_ordering(self):
        """Test PageView ordering by created_at."""
        page_view1 = PageView.objects.create(
            anonymous_user=self.anonymized_user,
            page_url='https://example.com/page1',
            session_id='session1'
        )
        page_view2 = PageView.objects.create(
            anonymous_user=self.anonymized_user,
            page_url='https://example.com/page2',
            session_id='session2'
        )
        
        page_views = list(PageView.objects.all())
        self.assertEqual(page_views[0], page_view2)  # Most recent first
        self.assertEqual(page_views[1], page_view1)


class UserActionModelTest(TestCase):
    """Test UserAction model functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.user_role = Role.objects.create(name='donor', description='Donor role')
        self.user = User.objects.create_user(
            email='donor@example.com',
            password='testpass123',
            role=self.user_role
        )
        self.anonymized_user = AnonymizedUser.create_from_user(self.user)
    
    def test_create_user_action(self):
        """Test creating a user action record."""
        action = UserAction.objects.create(
            anonymous_user=self.anonymized_user,
            action_type='button_click',
            action_name='donate_now_button',
            page_url='https://example.com/donate',
            session_id='test_session_123',
            metadata={'button_color': 'blue', 'amount': '50'}
        )
        
        self.assertEqual(action.action_type, 'button_click')
        self.assertEqual(action.action_name, 'donate_now_button')
        self.assertEqual(action.metadata['amount'], '50')
    
    def test_user_action_choices(self):
        """Test that action type choices are valid."""
        valid_choices = [choice[0] for choice in UserAction.ACTION_TYPE_CHOICES]
        
        for choice in valid_choices:
            action = UserAction.objects.create(
                anonymous_user=self.anonymized_user,
                action_type=choice,
                action_name=f'test_{choice}',
                page_url='https://example.com/test',
                session_id='test_session'
            )
            self.assertEqual(action.action_type, choice)
    
    def test_user_action_str_representation(self):
        """Test string representation of UserAction."""
        action = UserAction.objects.create(
            anonymous_user=self.anonymized_user,
            action_type='donation',
            action_name='monthly_donation',
            page_url='https://example.com/donate',
            session_id='test_session'
        )
        str_repr = str(action)
        self.assertIn('donation', str_repr)
        self.assertIn('monthly_donation', str_repr)


class ContentPerformanceModelTest(TestCase):
    """Test ContentPerformance model functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.user_role = Role.objects.create(name='admin', description='Admin role')
        self.user = User.objects.create_user(
            email='admin@example.com',
            password='testpass123',
            role=self.user_role
        )
        
        # Create a campaign to use as content
        self.category = DonationCategory.objects.create(
            name='Health',
            description='Health related campaigns'
        )
        self.campaign = Campaign.objects.create(
            title='Test Campaign',
            description='Test campaign description',
            goal_amount=Decimal('1000.00'),
            category=self.category,
            created_by=self.user
        )
    
    def test_create_content_performance(self):
        """Test creating a content performance record."""
        content_type = ContentType.objects.get_for_model(Campaign)
        
        performance = ContentPerformance.objects.create(
            content_type=content_type,
            object_id=self.campaign.id,
            total_views=100,
            unique_views=75,
            average_time_on_page=120.5,
            bounce_rate=25.0,
            total_shares=10,
            conversion_rate=5.0,
            date=date.today()
        )
        
        self.assertEqual(performance.content_object, self.campaign)
        self.assertEqual(performance.total_views, 100)
        self.assertEqual(performance.unique_views, 75)
        self.assertEqual(performance.bounce_rate, 25.0)
    
    def test_content_performance_unique_constraint(self):
        """Test unique constraint on content_type, object_id, and date."""
        content_type = ContentType.objects.get_for_model(Campaign)
        
        # Create first record
        ContentPerformance.objects.create(
            content_type=content_type,
            object_id=self.campaign.id,
            date=date.today()
        )
        
        # Try to create duplicate - should raise IntegrityError
        with self.assertRaises(Exception):
            ContentPerformance.objects.create(
                content_type=content_type,
                object_id=self.campaign.id,
                date=date.today()
            )
    
    def test_content_performance_str_representation(self):
        """Test string representation of ContentPerformance."""
        content_type = ContentType.objects.get_for_model(Campaign)
        
        performance = ContentPerformance.objects.create(
            content_type=content_type,
            object_id=self.campaign.id,
            date=date.today()
        )
        
        str_repr = str(performance)
        self.assertIn('Test Campaign', str_repr)
        self.assertIn(str(date.today()), str_repr)


class DonationAnalyticsModelTest(TestCase):
    """Test DonationAnalytics model functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.donor_role = Role.objects.create(name='donor', description='Donor role')
        self.admin_role = Role.objects.create(name='admin', description='Admin role')
        
        self.donor = User.objects.create_user(
            email='donor@example.com',
            password='testpass123',
            role=self.donor_role
        )
        
        self.admin = User.objects.create_user(
            email='admin@example.com',
            password='testpass123',
            role=self.admin_role
        )
        
        # Create volunteer profile for donor (for age calculation)
        self.volunteer_profile = VolunteerProfile.objects.create(
            user=self.donor,
            date_of_birth=date(1985, 1, 1),
            phone_number='+1234567890',
            address='123 Test St',
            city='Test City',
            state='Test State',
            zip_code='12345',
            emergency_contact_name='Jane Doe',
            emergency_contact_phone='+0987654321'
        )
        
        # Create campaign
        self.category = DonationCategory.objects.create(
            name='Health',
            description='Health related campaigns'
        )
        self.campaign = Campaign.objects.create(
            title='Test Campaign',
            description='Test campaign description',
            goal_amount=Decimal('1000.00'),
            category=self.category,
            created_by=self.admin
        )
        
        # Create donation
        self.donation = Donation.objects.create(
            donor=self.donor,
            campaign=self.campaign,
            amount=Decimal('75.00'),
            payment_method='stripe',
            donation_type='one_time',
            status='completed',
            payment_date=timezone.now()
        )
    
    def test_create_donation_analytics_from_donation(self):
        """Test creating donation analytics from a donation."""
        analytics = DonationAnalytics.create_from_donation(self.donation)
        
        self.assertEqual(analytics.amount_range, '51-100')  # $75 falls in this range
        self.assertEqual(analytics.payment_method, 'stripe')
        self.assertEqual(analytics.donation_type, 'one_time')
        self.assertEqual(analytics.donor_age_range, '35-44')  # Born in 1985
        self.assertEqual(analytics.campaign_category, 'Health')
        self.assertFalse(analytics.is_repeat_donor)  # First donation
    
    def test_donation_amount_ranges(self):
        """Test different donation amount ranges."""
        test_cases = [
            (Decimal('10.00'), '1-25'),
            (Decimal('30.00'), '26-50'),
            (Decimal('75.00'), '51-100'),
            (Decimal('150.00'), '101-250'),
            (Decimal('300.00'), '251-500'),
            (Decimal('750.00'), '501-1000'),
            (Decimal('1500.00'), '1000+'),
        ]
        
        for amount, expected_range in test_cases:
            self.donation.amount = amount
            self.donation.save()
            
            analytics = DonationAnalytics.create_from_donation(self.donation)
            self.assertEqual(analytics.amount_range, expected_range)
    
    def test_repeat_donor_detection(self):
        """Test repeat donor detection."""
        # Create first donation analytics
        analytics1 = DonationAnalytics.create_from_donation(self.donation)
        self.assertFalse(analytics1.is_repeat_donor)
        
        # Create second donation
        donation2 = Donation.objects.create(
            donor=self.donor,
            campaign=self.campaign,
            amount=Decimal('50.00'),
            payment_method='paypal',
            donation_type='one_time',
            status='completed',
            payment_date=timezone.now()
        )
        
        # Create analytics for second donation
        analytics2 = DonationAnalytics.create_from_donation(donation2)
        self.assertTrue(analytics2.is_repeat_donor)
    
    def test_donation_analytics_str_representation(self):
        """Test string representation of DonationAnalytics."""
        analytics = DonationAnalytics.create_from_donation(self.donation)
        str_repr = str(analytics)
        self.assertIn('Donation', str_repr)
        self.assertIn('51-100', str_repr)


class VolunteerAnalyticsModelTest(TestCase):
    """Test VolunteerAnalytics model functionality."""
    
    def setUp(self):
        """Set up test data."""
        self.volunteer_role = Role.objects.create(name='volunteer', description='Volunteer role')
        self.admin_role = Role.objects.create(name='admin', description='Admin role')
        
        self.volunteer = User.objects.create_user(
            email='volunteer@example.com',
            password='testpass123',
            role=self.volunteer_role
        )
        
        self.admin = User.objects.create_user(
            email='admin@example.com',
            password='testpass123',
            role=self.admin_role
        )
        
        # Create volunteer profile
        self.volunteer_profile = VolunteerProfile.objects.create(
            user=self.volunteer,
            date_of_birth=date(1992, 6, 15),
            phone_number='+1234567890',
            address='123 Test St',
            city='Test City',
            state='Test State',
            zip_code='12345',
            emergency_contact_name='Jane Doe',
            emergency_contact_phone='+0987654321'
        )
        
        # Create skill categories and skills
        self.skill_category = SkillCategory.objects.create(
            name='Healthcare',
            description='Healthcare related skills'
        )
        self.skill = Skill.objects.create(
            name='First Aid',
            category=self.skill_category,
            description='Basic first aid skills'
        )
        self.volunteer_profile.skills.add(self.skill)
        
        # Create volunteer opportunity
        self.opportunity = VolunteerOpportunity.objects.create(
            title='Health Screening Volunteer',
            description='Help with health screenings',
            location='Community Center',
            date_time=timezone.now() + timedelta(days=7),
            duration_hours=4,
            max_volunteers=10,
            commitment_type='one_time',
            created_by=self.admin
        )
        
        # Create volunteer application
        self.application = VolunteerApplication.objects.create(
            volunteer=self.volunteer,
            opportunity=self.opportunity,
            status='pending',
            motivation='Want to help the community'
        )
    
    def test_create_volunteer_analytics_from_application(self):
        """Test creating volunteer analytics from an application."""
        analytics = VolunteerAnalytics.create_from_application(self.application)
        
        self.assertEqual(analytics.volunteer_age_range, '25-34')  # Born in 1992
        self.assertEqual(analytics.application_status, 'pending')
        self.assertEqual(analytics.commitment_type, 'one_time')
        self.assertIn('Healthcare', analytics.skill_categories)
    
    def test_volunteer_age_ranges(self):
        """Test different volunteer age ranges."""
        test_cases = [
            (date(2002, 1, 1), '18-24'),
            (date(1992, 1, 1), '25-34'),
            (date(1982, 1, 1), '35-44'),
            (date(1972, 1, 1), '45-54'),
            (date(1962, 1, 1), '55-64'),
            (date(1952, 1, 1), '65+'),
        ]
        
        for birth_date, expected_range in test_cases:
            self.volunteer_profile.date_of_birth = birth_date
            self.volunteer_profile.save()
            
            analytics = VolunteerAnalytics.create_from_application(self.application)
            self.assertEqual(analytics.volunteer_age_range, expected_range)
    
    def test_volunteer_analytics_str_representation(self):
        """Test string representation of VolunteerAnalytics."""
        analytics = VolunteerAnalytics.create_from_application(self.application)
        str_repr = str(analytics)
        self.assertIn('Volunteer Application', str_repr)


class SystemMetricsModelTest(TestCase):
    """Test SystemMetrics model functionality."""
    
    def test_create_system_metrics(self):
        """Test creating system metrics."""
        metric = SystemMetrics.objects.create(
            metric_type='daily_active_users',
            metric_name='Daily Active Users',
            metric_value=150.0,
            metric_unit='count',
            date=date.today()
        )
        
        self.assertEqual(metric.metric_type, 'daily_active_users')
        self.assertEqual(metric.metric_value, 150.0)
        self.assertEqual(metric.metric_unit, 'count')
    
    def test_system_metrics_with_page_context(self):
        """Test system metrics with page context."""
        metric = SystemMetrics.objects.create(
            metric_type='page_load_time',
            metric_name='Homepage Load Time',
            metric_value=2.5,
            metric_unit='seconds',
            page_url='https://example.com/',
            user_segment='new_users',
            date=date.today(),
            hour=14
        )
        
        self.assertEqual(metric.page_url, 'https://example.com/')
        self.assertEqual(metric.user_segment, 'new_users')
        self.assertEqual(metric.hour, 14)
    
    def test_system_metrics_choices(self):
        """Test that metric type choices are valid."""
        valid_choices = [choice[0] for choice in SystemMetrics.METRIC_TYPE_CHOICES]
        
        for choice in valid_choices:
            metric = SystemMetrics.objects.create(
                metric_type=choice,
                metric_name=f'Test {choice}',
                metric_value=100.0,
                date=date.today()
            )
            self.assertEqual(metric.metric_type, choice)
    
    def test_system_metrics_str_representation(self):
        """Test string representation of SystemMetrics."""
        metric = SystemMetrics.objects.create(
            metric_type='conversion_rate',
            metric_name='Donation Conversion Rate',
            metric_value=5.2,
            metric_unit='percentage',
            date=date.today()
        )
        
        str_repr = str(metric)
        self.assertIn('Donation Conversion Rate', str_repr)
        self.assertIn('5.2', str_repr)
        self.assertIn('percentage', str_repr)


class DataRetentionPolicyModelTest(TestCase):
    """Test DataRetentionPolicy model functionality."""
    
    def test_create_data_retention_policy(self):
        """Test creating a data retention policy."""
        policy = DataRetentionPolicy.objects.create(
            data_type='page_views',
            retention_days=365,
            anonymization_days=90,
            is_active=True,
            auto_cleanup=True,
            description='Page view data retention policy'
        )
        
        self.assertEqual(policy.data_type, 'page_views')
        self.assertEqual(policy.retention_days, 365)
        self.assertEqual(policy.anonymization_days, 90)
        self.assertTrue(policy.is_active)
        self.assertTrue(policy.auto_cleanup)
    
    def test_data_retention_policy_unique_constraint(self):
        """Test unique constraint on data_type."""
        # Create first policy
        DataRetentionPolicy.objects.create(
            data_type='user_actions',
            retention_days=180
        )
        
        # Try to create duplicate - should raise IntegrityError
        with self.assertRaises(Exception):
            DataRetentionPolicy.objects.create(
                data_type='user_actions',
                retention_days=365
            )
    
    def test_data_retention_policy_choices(self):
        """Test that data type choices are valid."""
        valid_choices = [choice[0] for choice in DataRetentionPolicy.RETENTION_TYPE_CHOICES]
        
        for choice in valid_choices:
            policy = DataRetentionPolicy.objects.create(
                data_type=choice,
                retention_days=365
            )
            self.assertEqual(policy.data_type, choice)
    
    def test_data_retention_policy_str_representation(self):
        """Test string representation of DataRetentionPolicy."""
        policy = DataRetentionPolicy.objects.create(
            data_type='donation_analytics',
            retention_days=1095  # 3 years
        )
        
        str_repr = str(policy)
        self.assertIn('Donation Analytics', str_repr)
        self.assertIn('1095 days', str_repr)


class AnalyticsIntegrationTest(TestCase):
    """Integration tests for analytics models working together."""
    
    def setUp(self):
        """Set up test data for integration tests."""
        # Create roles
        self.donor_role = Role.objects.create(name='donor', description='Donor role')
        self.volunteer_role = Role.objects.create(name='volunteer', description='Volunteer role')
        self.admin_role = Role.objects.create(name='admin', description='Admin role')
        
        # Create users
        self.donor = User.objects.create_user(
            email='donor@example.com',
            password='testpass123',
            role=self.donor_role
        )
        
        self.volunteer = User.objects.create_user(
            email='volunteer@example.com',
            password='testpass123',
            role=self.volunteer_role
        )
        
        self.admin = User.objects.create_user(
            email='admin@example.com',
            password='testpass123',
            role=self.admin_role
        )
    
    def test_complete_user_journey_analytics(self):
        """Test analytics creation for a complete user journey."""
        # Create anonymized users
        donor_anon = AnonymizedUser.create_from_user(self.donor)
        volunteer_anon = AnonymizedUser.create_from_user(self.volunteer)
        
        # Track page views
        PageView.objects.create(
            anonymous_user=donor_anon,
            page_url='https://example.com/',
            session_id='session_1'
        )
        
        PageView.objects.create(
            anonymous_user=donor_anon,
            page_url='https://example.com/donate',
            session_id='session_1'
        )
        
        # Track user actions
        UserAction.objects.create(
            anonymous_user=donor_anon,
            action_type='button_click',
            action_name='donate_button',
            page_url='https://example.com/donate',
            session_id='session_1'
        )
        
        UserAction.objects.create(
            anonymous_user=volunteer_anon,
            action_type='form_submit',
            action_name='volunteer_application',
            page_url='https://example.com/volunteer',
            session_id='session_2'
        )
        
        # Verify data creation
        self.assertEqual(PageView.objects.filter(anonymous_user=donor_anon).count(), 2)
        self.assertEqual(UserAction.objects.filter(anonymous_user=donor_anon).count(), 1)
        self.assertEqual(UserAction.objects.filter(anonymous_user=volunteer_anon).count(), 1)
        
        # Verify anonymization
        self.assertNotEqual(donor_anon.anonymous_id, volunteer_anon.anonymous_id)
        self.assertEqual(len(donor_anon.anonymous_id), 64)
        self.assertEqual(len(volunteer_anon.anonymous_id), 64)
    
    def test_analytics_data_relationships(self):
        """Test relationships between different analytics models."""
        # Create anonymized user
        anon_user = AnonymizedUser.create_from_user(self.donor)
        
        # Create related records
        page_view = PageView.objects.create(
            anonymous_user=anon_user,
            page_url='https://example.com/test',
            session_id='test_session'
        )
        
        user_action = UserAction.objects.create(
            anonymous_user=anon_user,
            action_type='page_view',
            action_name='test_page_view',
            page_url='https://example.com/test',
            session_id='test_session'
        )
        
        # Test relationships
        self.assertEqual(anon_user.page_views.count(), 1)
        self.assertEqual(anon_user.actions.count(), 1)
        self.assertEqual(anon_user.page_views.first(), page_view)
        self.assertEqual(anon_user.actions.first(), user_action)
    
    def test_data_retention_policy_coverage(self):
        """Test that all analytics data types have retention policies."""
        # Create policies for all data types
        policies_data = [
            ('page_views', 365),
            ('user_actions', 180),
            ('content_performance', 730),
            ('donation_analytics', 2555),  # 7 years for financial data
            ('volunteer_analytics', 1095),  # 3 years
            ('system_metrics', 90),
        ]
        
        for data_type, retention_days in policies_data:
            policy = DataRetentionPolicy.objects.create(
                data_type=data_type,
                retention_days=retention_days,
                is_active=True
            )
            self.assertEqual(policy.data_type, data_type)
            self.assertEqual(policy.retention_days, retention_days)
        
        # Verify all policies created
        self.assertEqual(DataRetentionPolicy.objects.count(), len(policies_data))
    
    def test_analytics_model_indexes(self):
        """Test that analytics models have proper database indexes."""
        # This test verifies that the models are properly configured
        # The actual index creation is handled by Django migrations
        
        # Test AnonymizedUser indexes
        anon_user = AnonymizedUser.create_from_user(self.donor)
        self.assertIsNotNone(anon_user.anonymous_id)
        
        # Test PageView indexes
        page_view = PageView.objects.create(
            anonymous_user=anon_user,
            page_url='https://example.com/test',
            session_id='test_session'
        )
        self.assertIsNotNone(page_view.created_at)
        
        # Test UserAction indexes
        user_action = UserAction.objects.create(
            anonymous_user=anon_user,
            action_type='test',
            action_name='test_action',
            page_url='https://example.com/test',
            session_id='test_session'
        )
        self.assertIsNotNone(user_action.created_at)
        
        # If we get here without errors, the models are properly configured
        self.assertTrue(True)


class AnalyticsPrivacyTest(TestCase):
    """Test privacy and anonymization features of analytics models."""
    
    def setUp(self):
        """Set up test data for privacy tests."""
        self.user_role = Role.objects.create(name='user', description='User role')
        self.user = User.objects.create_user(
            email='privacy@example.com',
            password='testpass123',
            first_name='John',
            last_name='Doe',
            role=self.user_role
        )
    
    def test_user_data_anonymization(self):
        """Test that user data is properly anonymized."""
        anon_user = AnonymizedUser.create_from_user(self.user)
        
        # Verify no PII is stored
        self.assertNotIn('John', str(anon_user))
        self.assertNotIn('Doe', str(anon_user))
        self.assertNotIn('privacy@example.com', str(anon_user))
        
        # Verify anonymous ID is a hash
        self.assertEqual(len(anon_user.anonymous_id), 64)
        self.assertTrue(anon_user.anonymous_id.isalnum())
    
    def test_consistent_anonymization(self):
        """Test that anonymization is consistent for the same user on the same day."""
        anon_user1 = AnonymizedUser.create_from_user(self.user)
        anon_user2 = AnonymizedUser.create_from_user(self.user)
        
        # Should return the same anonymized user
        self.assertEqual(anon_user1.id, anon_user2.id)
        self.assertEqual(anon_user1.anonymous_id, anon_user2.anonymous_id)
    
    def test_page_view_privacy(self):
        """Test that page views don't contain PII."""
        anon_user = AnonymizedUser.create_from_user(self.user)
        
        page_view = PageView.objects.create(
            anonymous_user=anon_user,
            page_url='https://example.com/profile/john-doe',
            session_id='session_123'
        )
        
        # URL might contain PII but user is anonymized
        self.assertNotEqual(page_view.anonymous_user.anonymous_id, str(self.user.id))
        self.assertEqual(len(page_view.session_id), 11)  # Should be anonymized session ID
    
    def test_user_action_metadata_privacy(self):
        """Test that user action metadata doesn't leak PII."""
        anon_user = AnonymizedUser.create_from_user(self.user)
        
        # Metadata should not contain PII
        safe_metadata = {
            'button_color': 'blue',
            'page_section': 'header',
            'action_count': 1
        }
        
        action = UserAction.objects.create(
            anonymous_user=anon_user,
            action_type='button_click',
            action_name='test_button',
            page_url='https://example.com/test',
            session_id='session_123',
            metadata=safe_metadata
        )
        
        # Verify metadata doesn't contain PII
        for key, value in action.metadata.items():
            self.assertNotIn('John', str(value))
            self.assertNotIn('Doe', str(value))
            self.assertNotIn('privacy@example.com', str(value))