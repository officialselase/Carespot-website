# Security-First Development Guidelines

## Authentication & Authorization
- **Django Backend**: Custom user authentication with JWT tokens
- **Password Security**: Bcrypt hashing, minimum 8 characters with complexity requirements
- **Session Management**: Secure session handling with CSRF protection
- **Role-Based Access**: Admin, Volunteer, Donor, and Public user roles
- **API Security**: Rate limiting, input validation, and sanitization

## Data Protection
- **Database Security**: SQLite with proper permissions, prepared statements
- **Input Validation**: Server-side validation for all user inputs
- **XSS Prevention**: Content Security Policy (CSP) headers
- **SQL Injection**: Parameterized queries and ORM usage
- **File Upload Security**: Type validation, size limits, virus scanning

## Frontend Security
- **Environment Variables**: Secure API key management
- **HTTPS Only**: Force SSL in production
- **Secure Headers**: HSTS, X-Frame-Options, X-Content-Type-Options
- **Token Storage**: Secure JWT storage in httpOnly cookies
- **Form Validation**: Client and server-side validation

## Payment Security
- **PCI Compliance**: Use Stripe/PayPal for payment processing
- **No Card Storage**: Never store payment information locally
- **Webhook Security**: Verify payment webhook signatures
- **Donation Tracking**: Secure audit trail for all transactions

## Privacy & Compliance
- **GDPR Ready**: Data consent mechanisms and right to deletion
- **Data Minimization**: Collect only necessary information
- **Audit Logging**: Track all sensitive operations
- **Regular Updates**: Keep dependencies updated for security patches