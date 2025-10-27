# Security Check Hook

## Hook Configuration
**Trigger**: On file save for Python files (*.py)
**Purpose**: Automatically run security checks when backend code is modified

## Hook Actions

### 1. Code Security Scan
- Run bandit security linter on Python files
- Check for common security vulnerabilities
- Validate input sanitization patterns
- Check for hardcoded secrets or credentials

### 2. Dependency Security Check
- Scan requirements.txt for known vulnerabilities
- Check for outdated packages with security issues
- Validate package integrity

### 3. Django Security Check
- Run Django's built-in security check command
- Validate settings configuration
- Check for insecure Django patterns

## Implementation
```python
# Hook script to run on Python file save
import subprocess
import os

def run_security_checks(file_path):
    # Run bandit security scan
    subprocess.run(['bandit', '-r', file_path])
    
    # Run Django security check if it's a Django project
    if 'manage.py' in os.listdir('.'):
        subprocess.run(['python', 'manage.py', 'check', '--deploy'])
    
    # Check for secrets
    subprocess.run(['detect-secrets', 'scan', file_path])
```

## Expected Outcomes
- Immediate feedback on security issues
- Prevention of common security vulnerabilities
- Consistent security standards across the codebase
- Early detection of potential security risks