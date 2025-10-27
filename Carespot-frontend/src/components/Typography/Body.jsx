import { forwardRef } from 'react';

/**
 * Body Component - Body text with optimized readability
 * 
 * @param {Object} props
 * @param {string} props.as - HTML tag (p, div, span)
 * @param {string} props.size - Typography size (xs, sm, base, lg, xl)
 * @param {string} props.weight - Font weight (light, normal, medium, semibold, bold)
 * @param {string} props.color - Text color class
 * @param {boolean} props.responsive - Enable responsive sizing
 * @param {boolean} props.dyslexic - Use dyslexic-friendly font
 * @param {string} props.align - Text alignment (left, center, right, justify)
 * @param {string} props.lineHeight - Line height (tight, snug, normal, relaxed, loose)
 * @param {boolean} props.lead - Make text larger for lead paragraphs
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content
 */
const Body = forwardRef(({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'text-color-text-primary',
  responsive = false,
  dyslexic = false,
  align = 'left',
  lineHeight = 'relaxed',
  lead = false,
  className = '',
  children,
  ...props
}, ref) => {
  // Size mapping
  const sizeClasses = {
    xs: responsive ? 'text-responsive-xs' : 'text-xs',
    sm: responsive ? 'text-responsive-sm' : 'text-sm',
    base: responsive ? 'text-responsive-base' : 'text-base',
    lg: responsive ? 'text-responsive-lg' : 'text-lg',
    xl: responsive ? 'text-responsive-xl' : 'text-xl',
  };

  // Weight mapping
  const weightClasses = {
    light: 'font-light',
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
    justify: 'text-justify',
  };

  // Line height mapping
  const lineHeightClasses = {
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  };

  const classes = [
    'typography-body',
    'text-optimized',
    lead ? 'text-lg font-light leading-relaxed' : sizeClasses[size] || sizeClasses.base,
    !lead ? (weightClasses[weight] || weightClasses.normal) : '',
    alignClasses[align] || alignClasses.left,
    !lead ? (lineHeightClasses[lineHeight] || lineHeightClasses.relaxed) : '',
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

Body.displayName = 'Body';

export default Body;