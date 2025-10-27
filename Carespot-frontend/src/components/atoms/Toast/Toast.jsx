import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const Toast = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  dismissible = true,
  onDismiss,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const typeConfig = {
    success: {
      icon: 'check-circle',
      bgColor: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      titleColor: 'text-green-800',
      messageColor: 'text-green-700',
      ariaLabel: 'Success notification'
    },
    error: {
      icon: 'x-circle',
      bgColor: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700',
      ariaLabel: 'Error notification'
    },
    warning: {
      icon: 'exclamation-triangle',
      bgColor: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-800',
      messageColor: 'text-yellow-700',
      ariaLabel: 'Warning notification'
    },
    info: {
      icon: 'information-circle',
      bgColor: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      messageColor: 'text-blue-700',
      ariaLabel: 'Information notification'
    }
  };

  const config = typeConfig[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.(id);
    }, 300); // Match animation duration
  };

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-label={config.ariaLabel}
      className={`
        relative flex items-start p-4 border rounded-lg shadow-lg max-w-md w-full
        ${config.bgColor}
        ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}
        ${className}
      `}
      {...props}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${config.iconColor}`}>
        <Icon name={config.icon} size="medium" />
      </div>

      {/* Content */}
      <div className="ml-3 flex-1">
        {title && (
          <h4 className={`text-sm font-semibold ${config.titleColor} mb-1`}>
            {title}
          </h4>
        )}
        {message && (
          <p className={`text-sm ${config.messageColor}`}>
            {message}
          </p>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className={`
            ml-4 flex-shrink-0 rounded-md p-1.5 inline-flex
            ${config.iconColor} hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-current
          `}
          aria-label="Dismiss notification"
        >
          <Icon name="x" size="small" />
        </button>
      )}

      {/* Progress bar for timed dismissal */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-current opacity-30 animate-progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  className: PropTypes.string
};

export default Toast;