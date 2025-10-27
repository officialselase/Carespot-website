"""
Signals for donation app.
"""

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Donation


@receiver(post_save, sender=Donation)
def update_campaign_amount_on_save(sender, instance, created, **kwargs):
    """Update campaign current amount when donation is saved."""
    if instance.status == 'completed':
        instance.campaign.update_current_amount()


@receiver(post_delete, sender=Donation)
def update_campaign_amount_on_delete(sender, instance, **kwargs):
    """Update campaign current amount when donation is deleted."""
    instance.campaign.update_current_amount()