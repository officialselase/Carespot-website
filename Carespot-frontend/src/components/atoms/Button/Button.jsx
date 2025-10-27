import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isTouchDevice, addRippleEffect, triggerHapticFeedback } from '../../../utils/touchUtils';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ripple = true,
  haptic = false,
  touchOptimized = true,
  ...props
}) => {
  const buttonRef = useRef(null);
  const isTouch = isTouchDevice();

  // Touch optimization effect
  useEffect(() => {
    if (!touchOptimized || !buttonRef.current) return;

    const button = buttonRef.current;

    // Add touch-friendly classes
    if (isTouch) {
      button.classList.add('touch-manipulation', 'touch-target', 'touch-active');

      // Ensure minimum touch target size
      const currentHeight = button.offsetHeight;
      if (currentHeight < 44) {
        button.style.minHeight = '44px';
      }
    }
  }, [touchOptimized, isTouch]);

  const handleClick = (e) => {
    if (disabled || loading) return;

    // Add ripple effect on touch devices
    if (ripple && isTouch) {
      addRippleEffect(buttonRef.current, e);
    }

    // Trigger haptic feedback if enabled
    if (haptic && isTouch) {
      triggerHapticFeedback('light');
    }

    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 active:bg-secondary-800',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800'
  };

  // Touch-optimized size classes
  const sizeClasses = {
    small: isTouch ? 'px-4 py-2 text-sm min-h-[44px]' : 'px-3 py-1.5 text-sm',
    medium: isTouch ? 'px-6 py-3 text-base min-h-[48px]' : 'px-4 py-2 text-base',
    large: isTouch ? 'px-8 py-4 text-lg min-h-[52px]' : 'px-6 py-3 text-lg'
  };

  // Remove hover effects on touch devices for better performance
  const touchClasses = isTouch ? 'touch-manipulation' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${touchClasses} ${className}`;

  return (
    <button
      ref={buttonRef}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  ripple: PropTypes.bool,
  haptic: PropTypes.bool,
  touchOptimized: PropTypes.bool
};

export default Button;