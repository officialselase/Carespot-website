import { forwardRef } from 'react';

/**
 * Caption Component - Small text for captions, labels, and metadata
 * 
 * @param {Object} props
 * @param {string} props.as - HTML tag (span, p, div, figcaption)
 * @param {string} props.size - Typography size (xs, sm, base)
 * @param {string} props.weight - Font weight (normal, medium, semibold, bold)
 * @param {string} props.color - Text color class
 * @param {boolean} props.uppercase - Transform text to uppercase
 * @param {boolean} props.dyslexic - Use dyslexic-friendly font
 * @param {string} props.align - Text alignment (left, center, right)
 * @param {string} props.spacing - Letter spacing (normal, wide, wider, widest)
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content
 */
const Caption = forwardRef(({
  as: Component = 'span',
  size = 'sm',
  weight = 'medium',
  color = 'text-color-text-secondary',
  uppercase = false,
  dyslexic = false,
  align = 'left',
  spacing = 'normal',
  className = '',
  children,
  ...props
}, ref) => {
  // Size mapping
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
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

  // Letter spacing mapping
  const spacingClasses = {
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest',
  };

  const classes = [
    'typography-caption',
    'text-optimized',
    sizeClasses[size] || sizeClasses.sm,
    weightClasses[weight] || weightClasses.medium,
    alignClasses[align] || alignClasses.left,
    spacingClasses[spacing] || spacingClasses.normal,
    uppercase ? 'uppercase' : '',
    color,
    dyslexic ? 'font-dyslexic' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
});

Caption.displayName = 'Caption';

export default Caption;