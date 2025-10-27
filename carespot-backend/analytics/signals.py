"""
Signals for automatic analytics data creation.
"""

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.apps import apps

from .models import DonationAnalytics, VolunteerAnalytics, AnonymizedUser


@receiver(post_save, sender='donations.Donation')
def create_donation_analytics(sender, instance, created, **kwargs):
    """Create anonymized donation analytics when a donation is completed."""
    if instance.status == 'completed' and not hasattr(instance, '_analytics_created'):
        try:
            DonationAnalytics.create_from_donation(instance)
            # Mark to prevent duplicate creation
            instance._analytics_created = True
        except Exception as e:
            # Log error but don't break the donation process
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Failed to create donation analytics: {e}")


@receiver(post_save, sender='volunteers.VolunteerApplication')
def create_volunteer_analytics(sender, instance, created, **kwargs):
    """Create anonymized volunteer analytics when an application is submitted."""
    if instance.status in ['submitted', 'approved', 'rejected'] and not hasattr(instance, '_analytics_created'):
        try:
            VolunteerAnalytics.create_from_application(instance)
            # Mark to prevent duplicate creation
            instance._analytics_created = True
        except Exception as e:
            # Log error but don't break the application process
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Failed to create volunteer analytics: {e}")


@receiver(post_save, sender='authentication.CustomUser')
def update_anonymized_user(sender, instance, created, **kwargs):
    """Update anonymized user data when user data changes."""
    try:
        AnonymizedUser.create_from_user(instance)
    except Exception as e:
        # Log error but don't break the user process
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Failed to update anonymized user: {e}")