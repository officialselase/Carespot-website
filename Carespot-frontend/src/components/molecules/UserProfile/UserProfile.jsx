import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../atoms/Avatar';
import Badge from '../../atoms/Badge';

const UserProfile = ({
  user,
  showBadge = false,
  badgeVariant = 'primary',
  badgeText,
  size = 'medium',
  layout = 'horizontal',
  className = '',
  ...props
}) => {
  const layoutClasses = {
    horizontal: 'flex items-center gap-3',
    vertical: 'flex flex-col items-center gap-2 text-center'
  };
  
  return (
    <div className={`${layoutClasses[layout]} ${className}`} {...props}>
      <Avatar
        src={user.avatar}
        name={user.name}
        size={size}
        alt={`${user.name}'s avatar`}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium text-gray-900 truncate">
            {user.name}
          </h3>
          {showBadge && badgeText && (
            <Badge variant={badgeVariant} size="small">
              {badgeText}
            </Badge>
          )}
        </div>
        
        {user.role && (
          <p className="text-sm text-gray-500 truncate">
            {user.role}
          </p>
        )}
        
        {user.email && (
          <p className="text-sm text-gray-400 truncate">
            {user.email}
          </p>
        )}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  showBadge: PropTypes.bool,
  badgeVariant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  badgeText: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string
};

export default UserProfile;