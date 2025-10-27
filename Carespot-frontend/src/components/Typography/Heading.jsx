import { forwardRef } from 'react';

/**
 * Heading Component - Semantic heading with responsive typography
 * 
 * @param {Object} props
 * @param {string} props.as - HTML tag (h1, h2, h3, h4, h5, h6)
 * @param {string} props.size - Typography size (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl)
 * @param {string} props.weight - Font weight (light, normal, medium, semibold, bold, extrabold, black)
 * @param {string} props.color - Text color class
 * @param {boolean} props.responsive - Enable responsive sizing
 * @param {boolean} props.dyslexic - Use dyslexic-friendly font
 * @param {string} props.align - Text alignment (left, center, right)
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content
 */
const Heading = forwardRef(({
  as: Component = 'h2',
  size = 'xl',
  weight = 'semibold',
  color = 'text-color-text-primary',
  responsive = true,
  dyslexic = false,
  align = 'left',
  className = '',
  children,
  ...props
}, ref) => {
  // Size mapping for responsive and non-responsive
  const sizeClasses = {
    xs: responsive ? 'text-responsive-xs' : 'text-xs',
    sm: responsive ? 'text-responsive-sm' : 'text-sm',
    base: responsive ? 'text-responsive-base' : 'text-base',
    lg: responsive ? 'text-responsive-lg' : 'text-lg',
    xl: responsive ? 'text-responsive-xl' : 'text-xl',
    '2xl': responsive ? 'text-responsive-2xl' : 'text-2xl',
    '3xl': responsive ? 'text-responsive-3xl' : 'text-3xl',
    '4xl': responsive ? 'text-responsive-4xl' : 'text-4xl',
    '5xl': responsive ? 'text-responsive-5xl' : 'text-5xl',
  };

  // Weight mapping
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  // Alignment mapping
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const classes = [
    'typography-heading',
    'text-optimized',
    sizeClasses[size] || sizeClasses.xl,
    weightClasses[weight] || weightClasses.semibold,
    alignClasses[align] || alignClasses.left,
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

Heading.displayName = 'Heading';

export default Heading;