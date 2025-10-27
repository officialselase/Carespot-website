import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({
  src,
  alt,
  name,
  size = 'medium',
  variant = 'circular',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium text-white transition-all duration-200';
  
  const sizeClasses = {
    small: 'h-8 w-8 text-sm',
    medium: 'h-10 w-10 text-base',
    large: 'h-12 w-12 text-lg',
    xlarge: 'h-16 w-16 text-xl'
  };
  
  const variantClasses = {
    circular: 'rounded-full',
    rounded: 'rounded-lg',
    square: 'rounded-none'
  };
  
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const getBackgroundColor = (name) => {
    if (!name) return 'bg-gray-500';
    const colors = [
      'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500',
      'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-gray-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={classes}
        {...props}
      />
    );
  }
  
  return (
    <div
      className={`${classes} ${getBackgroundColor(name)}`}
      {...props}
    >
      {getInitials(name)}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['circular', 'rounded', 'square']),
  className: PropTypes.string
};

export default Avatar;