import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../atoms/Icon';
import Badge from '../../atoms/Badge';

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-primary-50 border border-primary-200',
    success: 'bg-green-50 border border-green-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    danger: 'bg-red-50 border border-red-200'
  };
  
  const iconColors = {
    default: 'text-gray-600',
    primary: 'text-primary-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  };
  
  const getTrendBadgeVariant = (trend) => {
    if (trend === 'up') return 'success';
    if (trend === 'down') return 'danger';
    return 'default';
  };
  
  return (
    <div
      className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {value}
          </p>
          
          {subtitle && (
            <p className="text-sm text-gray-500">
              {subtitle}
            </p>
          )}
          
          {trend && trendValue && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getTrendBadgeVariant(trend)} size="small">
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
              </Badge>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-lg bg-white shadow-sm ${iconColors[variant]}`}>
            <Icon name={icon} size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  trendValue: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
  className: PropTypes.string
};

export default StatCard;