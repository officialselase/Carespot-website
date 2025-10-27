"""
Authentication Signals
"""

from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import RefreshToken
from .jwt_utils import JWTTokenManager

User = get_user_model()


@receiver(post_save, sender=User)
def user_post_save(sender, instance, created, **kwargs):
    """
    Handle user post-save actions
    """
    if created:
        # Log user creation
        print(f"New user created: {instance.email}")


@receiver(pre_delete, sender=User)
def user_pre_delete(sender, instance, **kwargs):
    """
    Handle user deletion - revoke all tokens
    """
    JWTTokenManager.revoke_all_user_tokens(instance)