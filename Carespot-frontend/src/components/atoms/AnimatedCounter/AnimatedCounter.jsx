import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const AnimatedCounter = ({
  target,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  className = '',
  size = 'medium',
  color = 'primary',
  ...props
}) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl md:text-5xl',
    large: 'text-5xl md:text-6xl',
    xlarge: 'text-6xl md:text-7xl'
  };

  const colorClasses = {
    primary: 'text-color-text-primary',
    secondary: 'text-color-text-secondary',
    accent: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    white: 'text-white'
  };

  // Parse target value to handle strings with numbers
  const numericTarget = typeof target === 'string' 
    ? parseFloat(target.replace(/[^0-9.-]/g, '')) 
    : target;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setTimeout(() => {
            setIsVisible(true);
            hasAnimated.current = true;
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (numericTarget - startValue) * easeOutQuart;
      
      setCurrent(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(numericTarget);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, numericTarget, duration]);

  const formatNumber = (num) => {
    const rounded = decimals > 0 ? num.toFixed(decimals) : Math.floor(num);
    const parts = rounded.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  const displayValue = `${prefix}${formatNumber(current)}${suffix}`;

  return (
    <span
      ref={counterRef}
      className={`font-extrabold ${sizeClasses[size]} ${colorClasses[color]} ${className} inline-block transition-all duration-300`}
      {...props}
    >
      {displayValue}
    </span>
  );
};

AnimatedCounter.propTypes = {
  target: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  separator: PropTypes.string,
  decimals: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success', 'warning', 'white'])
};

export default AnimatedCounter;