# CareSpot Volunteer Management System

A comprehensive volunteer management system built for CareSpot's NGO platform, featuring multi-step applications, document management, background checks, and intelligent opportunity matching.

## 🌟 Features

### 1. Multi-Step Volunteer Application
- **Progressive Form Design**: 6-step application process with validation
- **Document Upload**: Secure file upload with virus scanning
- **Auto-Save**: Draft applications are automatically saved
- **Real-time Validation**: Immediate feedback on form inputs
- **Mobile Responsive**: Optimized for all device sizes

### 2. Application Status Tracking
- **Real-time Updates**: Live status tracking with notifications
- **Timeline View**: Visual progress through application stages
- **Document Status**: Track document review and approval
- **Communication History**: All interactions logged and visible

### 3. Background Check Integration
- **Multiple Options**: Upload existing documents or initiate online checks
- **Third-party Integration**: Seamless integration with verification services
- **Expiry Management**: Automatic tracking of document expiration
- **Compliance Ready**: Meets regulatory requirements for volunteer screening

### 4. Volunteer Dashboard
- **Personal Metrics**: Hours volunteered, assignments, achievements
- **Active Assignments**: Current volunteer commitments with progress tracking
- **Skill Management**: Add and update volunteer skills
- **Profile Completion**: Visual indicators for profile completeness

### 5. Opportunity Matching
- **AI-Powered Matching**: Intelligent matching based on skills, availability, and preferences
- **Match Scoring**: Percentage-based compatibility scoring
- **Advanced Filters**: Filter by location, commitment type, skills, and more
- **Personalized Recommendations**: Tailored opportunity suggestions

### 6. Notification System
- **Real-time Alerts**: Instant notifications for status changes
- **Multiple Channels**: In-app, email, and push notifications
- **Priority Levels**: High, medium, and low priority notifications
- **Notification History**: Complete audit trail of all communications

## 🏗️ Architecture

### Frontend Components

```
src/components/volunteer/
├── VolunteerDashboard.jsx          # Main dashboard with metrics and overview
├── MultiStepApplication.jsx        # Progressive application form
├── ApplicationStatusTracker.jsx    # Status tracking and timeline
├── OpportunityMatcher.jsx         # Intelligent opportunity matching
├── BackgroundCheckIntegration.jsx # Background verification system
├── NotificationSystem.jsx         # Real-time notifications
└── index.js                       # Component exports
```

### Backend Integration

```
carespot-backend/volunteers/
├── models.py          # Data models for volunteers, applications, documents
├── views.py           # API endpoints and business logic
├── serializers.py     # Data serialization and validation
├── urls.py           # URL routing configuration
├── admin.py          # Django admin interface
└── tests.py          # Comprehensive test suite
```

### Key Models

1. **VolunteerProfile**: Extended user profile with volunteer-specific information
2. **VolunteerOpportunity**: Available volunteer positions with requirements
3. **VolunteerApplication**: Application submissions with status tracking
4. **ApplicationDocument**: Document management with security features
5. **VolunteerAssignment**: Active volunteer assignments
6. **VolunteerTimeLog**: Time tracking and hour logging

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ and Django 4.2+
- PostgreSQL (production) or SQLite (development)

### Frontend Setup

```bash
cd Carespot-frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd carespot-backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_ENVIRONMENT=development
```

**Backend (.env)**
```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 📱 Usage

### For Volunteers

1. **Registration**: Create account and complete volunteer profile
2. **Browse Opportunities**: View and filter available volunteer positions
3. **Apply**: Submit multi-step application with required documents
4. **Track Status**: Monitor application progress in real-time
5. **Manage Assignments**: Log hours and track volunteer activities

### For Administrators

1. **Review Applications**: Evaluate volunteer applications and documents
2. **Manage Opportunities**: Create and update volunteer positions
3. **Track Volunteers**: Monitor volunteer activities and performance
4. **Generate Reports**: Access analytics and volunteer statistics

## 🔒 Security Features

### Data Protection
- **Encryption**: All sensitive data encrypted at rest and in transit
- **Access Control**: Role-based permissions for different user types
- **Audit Logging**: Complete audit trail of all system activities
- **Data Validation**: Comprehensive input validation and sanitization

### Document Security
- **Virus Scanning**: All uploaded files scanned for malware
- **File Type Validation**: Restricted file types and size limits
- **Secure Storage**: Documents stored with encrypted filenames
- **Access Logging**: All document access logged and monitored

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Session Management**: Automatic session timeout and renewal
- **Two-Factor Authentication**: Optional 2FA for enhanced security
- **Password Policies**: Strong password requirements and rotation

## 🎯 API Endpoints

### Volunteer Management
```
GET    /api/v1/volunteers/profile/                    # Get volunteer profile
PUT    /api/v1/volunteers/profile/                    # Update volunteer profile
GET    /api/v1/volunteers/opportunities/              # List opportunities
GET    /api/v1/volunteers/opportunities/{slug}/       # Get opportunity details
POST   /api/v1/volunteers/applications/               # Create application
GET    /api/v1/volunteers/applications/{id}/          # Get application
POST   /api/v1/volunteers/applications/{id}/submit/   # Submit application
```

### Document Management
```
POST   /api/v1/volunteers/documents/                  # Upload document
GET    /api/v1/volunteers/documents/                  # List documents
DELETE /api/v1/volunteers/documents/{id}/             # Delete document
POST   /api/v1/volunteers/documents/{id}/approve/     # Approve document
POST   /api/v1/volunteers/documents/{id}/reject/      # Reject document
```

### Background Checks
```
GET    /api/v1/volunteers/background-check/{id}/      # Get status
POST   /api/v1/volunteers/background-check/{id}/      # Upload document
POST   /api/v1/volunteers/background-check/{id}/initiate/ # Start online check
```

## 📊 Analytics & Reporting

### Volunteer Metrics
- Total volunteers registered
- Active vs. inactive volunteers
- Hours volunteered (total and by period)
- Volunteer retention rates
- Geographic distribution

### Application Analytics
- Application conversion rates
- Average processing time
- Document completion rates
- Rejection reasons analysis
- Seasonal application trends

### Opportunity Insights
- Most popular volunteer roles
- Fill rates by opportunity type
- Skills demand analysis
- Location-based preferences
- Time commitment patterns

## 🧪 Testing

### Frontend Testing
```bash
npm run test              # Run unit tests
npm run test:coverage     # Run with coverage report
npm run test:e2e         # Run end-to-end tests
```

### Backend Testing
```bash
python manage.py test                    # Run all tests
python manage.py test volunteers         # Run volunteer app tests
coverage run --source='.' manage.py test # Run with coverage
coverage report                          # Generate coverage report
```

### Test Coverage Goals
- **Unit Tests**: 90%+ coverage for business logic
- **Integration Tests**: All API endpoints tested
- **E2E Tests**: Critical user journeys covered
- **Security Tests**: Authentication and authorization flows

## 🔧 Configuration

### Application Settings

**Multi-step Form Configuration**
```javascript
const FORM_STEPS = [
  { id: 'personal', title: 'Personal Information', required: true },
  { id: 'professional', title: 'Professional Background', required: true },
  { id: 'availability', title: 'Availability', required: true },
  { id: 'application', title: 'Application Details', required: true },
  { id: 'documents', title: 'Documents', required: true },
  { id: 'review', title: 'Review & Submit', required: true }
];
```

**Document Requirements**
```python
DOCUMENT_TYPES = [
    ('resume', 'Resume/CV'),
    ('references', 'References'),
    ('background_check', 'Background Check'),
    ('certifications', 'Certifications'),
    ('identification', 'Identification'),
]

DOCUMENT_SETTINGS = {
    'MAX_FILE_SIZE': 5 * 1024 * 1024,  # 5MB
    'ALLOWED_TYPES': ['pdf', 'doc', 'docx', 'jpg', 'png'],
    'VIRUS_SCAN_ENABLED': True,
    'ENCRYPTION_ENABLED': True,
}
```

### Notification Configuration
```python
NOTIFICATION_SETTINGS = {
    'REAL_TIME_ENABLED': True,
    'EMAIL_NOTIFICATIONS': True,
    'PUSH_NOTIFICATIONS': True,
    'NOTIFICATION_RETENTION_DAYS': 90,
    'BATCH_SIZE': 100,
}
```

## 🚀 Deployment

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Static files collected and served
- [ ] SSL certificates installed
- [ ] Backup procedures implemented
- [ ] Monitoring and logging configured
- [ ] Security headers enabled
- [ ] Performance optimization applied

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Scale services
docker-compose up -d --scale web=3
```

### Cloud Deployment
- **Frontend**: Deploy to Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Deploy to Heroku, AWS ECS, or Google Cloud Run
- **Database**: Use managed PostgreSQL (AWS RDS, Google Cloud SQL)
- **File Storage**: Use AWS S3 or Google Cloud Storage

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **Frontend**: ESLint + Prettier configuration
- **Backend**: Black + isort + flake8 configuration
- **Testing**: Minimum 80% code coverage required
- **Documentation**: All public APIs must be documented

### Review Process

- All PRs require at least one review
- Automated tests must pass
- Security scan must pass
- Performance impact assessed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/api.md)
- [User Guide](docs/user-guide.md)
- [Administrator Guide](docs/admin-guide.md)
- [Troubleshooting](docs/troubleshooting.md)

### Contact
- **Email**: volunteers@carespot.org
- **Slack**: #volunteer-management
- **Issues**: GitHub Issues for bug reports and feature requests

### FAQ

**Q: How do I reset a volunteer's application?**
A: Use the Django admin interface or the reset API endpoint with proper permissions.

**Q: Can volunteers apply to multiple opportunities simultaneously?**
A: Yes, volunteers can have multiple active applications, but only one per opportunity.

**Q: How are background checks verified?**
A: We integrate with certified background check providers and maintain audit trails.

**Q: What happens to volunteer data when they leave?**
A: Data is retained according to our retention policy and can be anonymized upon request.

---

**Built with ❤️ by the CareSpot Development Team**