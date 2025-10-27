"""
Django management command to rotate the secret key.
Usage: python manage.py rotate_secret_key
"""

from django.core.management.base import BaseCommand
from carespot.utils.security import SecretKeyManager


class Command(BaseCommand):
    help = 'Rotate the Django secret key for enhanced security'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force rotation without confirmation',
        )

    def handle(self, *args, **options):
        if not options['force']:
            confirm = input('Are you sure you want to rotate the secret key? (y/N): ')
            if confirm.lower() != 'y':
                self.stdout.write('Secret key rotation cancelled.')
                return

        try:
            new_key = SecretKeyManager.rotate_secret_key()
            
            self.stdout.write(
                self.style.SUCCESS('Secret key rotated successfully!')
            )
            self.stdout.write(
                self.style.WARNING(
                    'IMPORTANT: Update your environment variables with the new key '
                    'and restart your application servers.'
                )
            )
            self.stdout.write(f'New key length: {len(new_key)} characters')
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Failed to rotate secret key: {str(e)}')
            )