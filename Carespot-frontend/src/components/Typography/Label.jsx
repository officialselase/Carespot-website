import { forwardRef } from 'react';

/**
 * Label Component - Form labels and UI labels with accessibility features
 * 
 * @param {Object} props
 * @param {string} props.as - HTML tag (label, span, div)
 * @param {string} props.size - Typography size (xs, sm, base, lg)
 * @param {string} props.weight - Font weight (normal, medium, semibold, bold)
 * @param {string} props.color - Text color class
 * @param {boolean} props.required - Show required indicator
 * @param {boolean} props.disabled - Disabled state styling
 * @param {boolean} props.dyslexic - Use dyslexic-friendly font
 * @param {string} props.align - Text alignment (left, center, right)
 * @param {string} props.htmlFor - Associated form control ID
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content
 */
const Label = forwardRef(({
  as: Component = 'label',
  size = 'sm',
  weight = 'medium',
  color = 'text-color-text-primary',
  required = false,
  disabled = false,
  dyslexic = false,
  align = 'left',
  htmlFor,
  className = '',
  children,
  ...props
}, ref) => {
  // Size mapping
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  // Weight mapping
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  // Alignment mapping
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // State-based color adjustments
  const getColorClass = () => {
    if (disabled) return 'text-color-text-disabled';
    return color;
  };

  const classes = [
    'typography-label',
    'text-optimized',
    sizeClasses[size] || sizeClasses.sm,
    weightClasses[weight] || weightClasses.medium,
    alignClasses[align] || alignClasses.left,
    getColorClass(),
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    dyslexic ? 'font-dyslexic' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      htmlFor={Component === 'label' ? htmlFor : undefined}
      {...props}
    >
      {children}
      {required && (
        <span 
          className="text-color-error-600 ml-1" 
          aria-label="required"
          title="This field is required"
        >
          *
        </span>
      )}
    </Component>
  );
});

Label.displayName = 'Label';

export default Label;