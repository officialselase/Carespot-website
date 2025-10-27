# CareSpot Backend

A security-first Django backend for the CareSpot NGO platform, implementing comprehensive security measures, rate limiting, and monitoring capabilities.

## 🔒 Security Features

### Core Security Implementation
- **Environment-based Configuration**: Secure settings management with python-decouple
- **Secret Key Management**: Automatic generation with rotation capability
- **Rate Limiting**: IP-based rate limiting (100 requests/minute by default)
- **Security Headers**: XSS protection, content type sniffing prevention, frame options
- **CORS Configuration**: Secure cross-origin resource sharing for frontend integration
- **Comprehensive Logging**: Security event logging and monitoring
- **Input Validation**: SQL injection and XSS attempt detection

### Authentication & Authorization
- JWT token authentication with refresh mechanism
- Session security with secure cookies
- CSRF protection enabled
- Password validation with enhanced security requirements

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd carespot-backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Run migrations**
   ```bash
   python manage.py migrate
   ```

7. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

8. **Run development server**
   ```bash
   python manage.py runserver
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
DJANGO_ENVIRONMENT=development

# Database (for production)
DB_ENGINE=django.db.backends.postgresql
DB_NAME=carespot_db
DB_USER=carespot_user
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432

# Security
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com

# Email (for production)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=CareSpot <noreply@carespot.org>
```

### Security Settings

The application includes several security configurations:

- **Rate Limiting**: 100 requests per minute per IP address
- **Session Security**: 1-hour session timeout, secure cookies
- **CORS**: Configured for frontend integration
- **Security Headers**: XSS protection, content type sniffing prevention
- **Logging**: Comprehensive security event logging

## 🛠️ Management Commands

### Secret Key Rotation
```bash
python manage.py rotate_secret_key
```

### Security Verification
```bash
python test_security_setup.py
```

## 📊 API Endpoints

### Health Check
```
GET /api/health/
```
Returns API health status.

### Rate Limit Test
```
GET /api/test-rate-limit/
```
Test endpoint for rate limiting functionality.

### Security Monitoring Test
```
POST /api/test-security/
```
Test endpoint for security monitoring features.

## 🔍 Monitoring & Logging

### Log Files
- `logs/django.log` - General application logs
- `logs/security.log` - Security-specific events

### Security Events Tracked
- Failed login attempts
- Rate limit violations
- Suspicious request patterns (SQL injection, XSS attempts)
- Path traversal attempts

### Performance Monitoring
- Request response time tracking
- Slow request detection (>2 seconds)
- Performance statistics caching

## 🏗️ Project Structure

```
carespot-backend/
├── carespot/                 # Main Django project
│   ├── settings/            # Environment-based settings
│   │   ├── base.py         # Base settings
│   │   ├── development.py  # Development settings
│   │   └── production.py   # Production settings
│   ├── middleware/          # Custom middleware
│   │   ├── ratelimit.py    # Rate limiting middleware
│   │   └── monitoring.py   # Security monitoring middleware
│   └── utils/              # Utility modules
│       ├── security.py     # Security utilities
│       └── monitoring.py   # Monitoring utilities
├── core/                    # Core application
│   ├── management/         # Management commands
│   │   └── commands/
│   │       └── rotate_secret_key.py
│   ├── views.py           # API views
│   └── urls.py            # URL configuration
├── logs/                   # Log files directory
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
└── README.md              # This file
```

## 🔐 Security Best Practices

1. **Never commit sensitive data** to version control
2. **Use environment variables** for all configuration
3. **Rotate secret keys** regularly in production
4. **Monitor security logs** for suspicious activity
5. **Keep dependencies updated** for security patches
6. **Use HTTPS** in production environments
7. **Implement proper backup** strategies for production data

## 🚀 Production Deployment

For production deployment:

1. Set `DEBUG=False` in environment variables
2. Configure PostgreSQL database
3. Set up Redis for caching
4. Configure email backend for notifications
5. Set up SSL/TLS certificates
6. Configure web server (nginx/Apache) with security headers
7. Set up monitoring and alerting
8. Implement automated backups

## 📝 Development

### Adding New Apps
```bash
python manage.py startapp your_app_name
```

### Running Tests
```bash
python manage.py test
```

### Code Quality
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Write comprehensive docstrings
- Implement proper error handling

## 🤝 Contributing

1. Follow security-first development principles
2. Write tests for new features
3. Update documentation for changes
4. Follow the existing code style
5. Test security features thoroughly

## 📄 License

This project is part of the CareSpot NGO platform and follows the organization's licensing terms.