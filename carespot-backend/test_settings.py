#!/usr/bin/env python
import os
import sys
import django
from pathlib import Path

# Add the project directory to Python path
sys.path.insert(0, str(Path(__file__).resolve().parent))

# Set the settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'carespot.settings')

try:
    django.setup()
    from django.conf import settings
    print("Settings loaded successfully!")
    print(f"DEBUG: {settings.DEBUG}")
    print(f"DATABASES: {getattr(settings, 'DATABASES', 'NOT FOUND')}")
    print(f"SECRET_KEY length: {len(settings.SECRET_KEY)}")
    print(f"Settings module: {settings.SETTINGS_MODULE}")
except Exception as e:
    print(f"Error loading settings: {e}")
    import traceback
    traceback.print_exc()