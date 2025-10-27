# CareSpot Management Commands

This document describes the custom Django management commands available in the CareSpot backend for token and security management.

## Token Management Commands

### 1. `token_stats`

Display comprehensive token and authentication statistics.

```bash
python manage.py token_stats [--detailed]
```

**Options:**
- `--detailed`: Show detailed breakdown by user role

**Output includes:**
- Refresh token statistics (total, active, expired, revoked)
- User authentication tokens (password reset, email verification)
- Account security status (locked accounts, 2FA usage)
- Login activity (today and last 7 days)
- Cleanup recommendations

**Example:**
```bash
python manage.py token_stats --detailed
```

### 2. `cleanup_expired_tokens`

Clean up expired tokens and authentication data.

```bash
python manage.py cleanup_expired_tokens [--dry-run] [--days DAYS] [--verbose]
```

**Options:**
- `--dry-run`: Show what would be deleted without actually deleting
- `--days DAYS`: Delete login attempts older than this many days (default: 30)
- `--verbose`: Show detailed output

**What it cleans:**
- Expired refresh tokens
- Old revoked refresh tokens (older than 7 days)
- Expired password reset tokens (older than 1 hour)
- Expired email verification tokens (older than 24 hours)
- Old login attempts (configurable, default 30 days)
- Expired account locks

**Example:**
```bash
# Dry run to see what would be cleaned
python manage.py cleanup_expired_tokens --dry-run --verbose

# Actually clean up with custom retention period
python manage.py cleanup_expired_tokens --days 60
```

### 3. `revoke_user_tokens`

Revoke all tokens for a specific user.

```bash
python manage.py revoke_user_tokens --email EMAIL [--force]
```

**Options:**
- `--email EMAIL`: Email of the user whose tokens should be revoked (required)
- `--force`: Force revocation without confirmation

**What it revokes:**
- All active refresh tokens for the user
- Password reset tokens
- Email verification tokens

**Example:**
```bash
# Revoke tokens with confirmation prompt
python manage.py revoke_user_tokens --email user@example.com

# Force revocation without confirmation
python manage.py revoke_user_tokens --email user@example.com --force
```

### 4. `revoke_all_tokens`

Revoke all tokens system-wide (emergency use).

```bash
python manage.py revoke_all_tokens [--force] [--reason REASON]
```

**Options:**
- `--force`: Force revocation without confirmation
- `--reason REASON`: Reason for mass token revocation (for logging)

**What it revokes:**
- All active refresh tokens system-wide
- All password reset tokens
- All email verification tokens

**Example:**
```bash
# Emergency revocation with reason
python manage.py revoke_all_tokens --reason "Security breach detected"

# Force revocation without confirmation
python manage.py revoke_all_tokens --force --reason "Scheduled maintenance"
```

## Security Management Commands

### 5. `rotate_secret_key`

Rotate the Django secret key for enhanced security.

```bash
python manage.py rotate_secret_key [--force]
```

**Options:**
- `--force`: Force rotation without confirmation

**Important Notes:**
- This will invalidate all existing sessions
- Update your environment variables with the new key
- Restart your application servers after rotation

**Example:**
```bash
# Rotate with confirmation prompt
python manage.py rotate_secret_key

# Force rotation without confirmation
python manage.py rotate_secret_key --force
```

## Usage Scenarios

### Regular Maintenance

Run these commands regularly for system maintenance:

```bash
# Weekly cleanup of expired tokens
python manage.py cleanup_expired_tokens --verbose

# Monthly statistics review
python manage.py token_stats --detailed
```

### Security Incidents

In case of security incidents:

```bash
# 1. Check current token status
python manage.py token_stats

# 2. Revoke specific user tokens if compromised
python manage.py revoke_user_tokens --email compromised@example.com --force

# 3. Emergency: revoke all tokens if needed
python manage.py revoke_all_tokens --reason "Security incident" --force

# 4. Rotate secret key
python manage.py rotate_secret_key --force
```

### User Account Management

For user account issues:

```bash
# Check if user has active tokens
python manage.py token_stats

# Revoke tokens for password reset
python manage.py revoke_user_tokens --email user@example.com
```

## Automation

These commands can be automated using cron jobs or task schedulers:

```bash
# Daily cleanup (add to crontab)
0 2 * * * cd /path/to/carespot-backend && python manage.py cleanup_expired_tokens

# Weekly statistics report
0 9 * * 1 cd /path/to/carespot-backend && python manage.py token_stats --detailed > /var/log/carespot/weekly_stats.log
```

## Security Considerations

1. **Access Control**: These commands should only be run by authorized administrators
2. **Logging**: All token operations are logged for audit purposes
3. **Backup**: Consider backing up the database before mass token operations
4. **Monitoring**: Monitor the output of these commands for unusual patterns
5. **Environment**: Use appropriate settings (development vs production)

## Troubleshooting

### Common Issues

1. **Command not found**: Ensure the `core` and `authentication` apps are in `INSTALLED_APPS`
2. **Database errors**: Run migrations first: `python manage.py migrate`
3. **Permission errors**: Ensure proper database permissions
4. **Import errors**: Install required dependencies: `pip install -r requirements.txt`

### Debug Mode

For debugging, you can run commands with increased verbosity:

```bash
python manage.py token_stats -v 3
python manage.py cleanup_expired_tokens --dry-run -v 2
```

## Integration with Monitoring

These commands integrate with the CareSpot monitoring system:

- Security events are logged to `logs/security.log`
- Statistics can be exported for monitoring dashboards
- Alerts can be configured based on token usage patterns