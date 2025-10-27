"""
Production settings for CareSpot project.
Security-hardened configuration for production deployment.
"""

from .base import *

# Production security settings
DEBUG = False

# Production allowed hosts (must be configured via environment)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

# Production database configuration
DATABASES = {
    'default': {
        'ENGINE': config('DB_ENGINE', default='django.db.backends.postgresql'),
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
        'OPTIONS': {
            'sslmode': 'require',
        },
    }
}

# Production security headers
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Production CORS settings
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())

# Production email configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')

# Production cache configuration
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': config('REDIS_URL', default='redis://127.0.0.1:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Production logging with file rotation
LOGGING['handlers']['file']['class'] = 'logging.handlers.RotatingFileHandler'
LOGGING['handlers']['file']['maxBytes'] = 1024 * 1024 * 15  # 15MB
LOGGING['handlers']['file']['backupCount'] = 10

LOGGING['handlers']['security_file']['class'] = 'logging.handlers.RotatingFileHandler'
LOGGING['handlers']['security_file']['maxBytes'] = 1024 * 1024 * 15  # 15MB
LOGGING['handlers']['security_file']['backupCount'] = 10