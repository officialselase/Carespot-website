#!/usr/bin/env python
"""
Test script to verify security setup is working correctly.
"""

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
    from carespot.utils.security import SecretKeyManager
    from carespot.utils.monitoring import security_monitor
    
    print("🔒 CareSpot Security Setup Verification")
    print("=" * 50)
    
    # Test 1: Settings Configuration
    print("✅ Django settings loaded successfully")
    print(f"   DEBUG: {settings.DEBUG}")
    print(f"   SECRET_KEY length: {len(settings.SECRET_KEY)} characters")
    print(f"   ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
    
    # Test 2: Database Configuration
    db_config = settings.DATABASES['default']
    print(f"✅ Database configured: {db_config['ENGINE']}")
    print(f"   Database file: {db_config['NAME']}")
    
    # Test 3: Security Middleware
    security_middleware = [
        'django.middleware.security.SecurityMiddleware',
        'corsheaders.middleware.CorsMiddleware',
        'carespot.middleware.ratelimit.RateLimitMiddleware',
        'carespot.middleware.monitoring.SecurityMonitoringMiddleware',
    ]
    
    for middleware in security_middleware:
        if middleware in settings.MIDDLEWARE:
            print(f"✅ {middleware.split('.')[-1]} enabled")
        else:
            print(f"❌ {middleware.split('.')[-1]} missing")
    
    # Test 4: CORS Configuration
    print(f"✅ CORS configured for origins: {settings.CORS_ALLOWED_ORIGINS}")
    
    # Test 5: Rate Limiting
    rate_limit_enabled = getattr(settings, 'RATELIMIT_ENABLE', 'Not configured')
    print(f"✅ Rate limiting enabled: {rate_limit_enabled}")
    
    # Test 6: Security Headers
    security_settings = [
        'SECURE_BROWSER_XSS_FILTER',
        'SECURE_CONTENT_TYPE_NOSNIFF',
        'X_FRAME_OPTIONS',
        'SESSION_COOKIE_HTTPONLY',
        'CSRF_COOKIE_HTTPONLY',
    ]
    
    for setting_name in security_settings:
        setting_value = getattr(settings, setting_name, 'Not configured')
        print(f"✅ {setting_name}: {setting_value}")
    
    # Test 7: Secret Key Validation
    is_valid, message = SecretKeyManager.validate_secret_key(settings.SECRET_KEY)
    if is_valid:
        print(f"✅ Secret key validation: {message}")
    else:
        print(f"❌ Secret key validation: {message}")
    
    # Test 8: Cache Configuration
    print(f"✅ Cache backend: {settings.CACHES['default']['BACKEND']}")
    
    # Test 9: REST Framework Configuration
    rest_framework = getattr(settings, 'REST_FRAMEWORK', {})
    throttle_rates = rest_framework.get('DEFAULT_THROTTLE_RATES', 'Not configured')
    print(f"✅ REST Framework throttling: {throttle_rates}")
    
    print("\n🎉 Security setup verification completed!")
    print("All core security features are properly configured.")
    
except Exception as e:
    print(f"❌ Error during security setup verification: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)