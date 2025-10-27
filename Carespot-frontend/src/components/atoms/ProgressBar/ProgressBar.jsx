import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({
  current = 0,
  target = 100,
  label = '',
  showPercentage = true,
  showAmount = true,
  animated = true,
  color = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef(null);
  const hasAnimated = useRef(false);

  const percentage = Math.min((current / target) * 100, 100);

  const colorClasses = {
    primary: 'bg-gradient-to-r from-red-500 to-blue-500',
    success: 'bg-gradient-to-r from-green-400 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    danger: 'bg-gradient-to-r from-red-400 to-red-600',
    info: 'bg-gradient-to-r from-blue-400 to-blue-600'
  };

  const sizeClasses = {
    small: 'h-2',
    medium: 'h-4',
    large: 'h-6'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && animated) {
      const duration = 2000;
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (percentage - startValue) * easeOutCubic;
        
        setAnimatedValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else if (!animated) {
      setAnimatedValue(percentage);
    }
  }, [isVisible, animated, percentage]);

  const displayPercentage = animated ? animatedValue : percentage;
  const displayCurrent = animated ? (current * (animatedValue / percentage)) : current;

  return (
    <div ref={progressRef} className={`w-full ${className}`} {...props}>
      {/* Label and amounts */}
      <div className="flex justify-between items-center mb-2">
        {label && (
          <span className="text-sm font-medium text-color-text-primary">
            {label}
          </span>
        )}
        <div className="flex items-center gap-4 text-sm">
          {showAmount && (
            <span className="text-color-text-secondary">
              ${Math.round(displayCurrent).toLocaleString()} / ${target.toLocaleString()}
            </span>
          )}
          {showPercentage && (
            <span className="font-semibold text-color-text-primary">
              {Math.round(displayPercentage)}%
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
          <div
            className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out relative overflow-hidden`}
            style={{ width: `${displayPercentage}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Pulse effect for active progress */}
        {displayPercentage > 0 && displayPercentage < 100 && (
          <div
            className="absolute top-0 w-2 h-full bg-white/50 rounded-full animate-pulse"
            style={{ left: `${displayPercentage}%`, transform: 'translateX(-50%)' }}
          />
        )}
      </div>

      {/* Milestone markers */}
      <div className="flex justify-between mt-1 text-xs text-color-text-tertiary">
        <span>$0</span>
        <span>${(target * 0.25).toLocaleString()}</span>
        <span>${(target * 0.5).toLocaleString()}</span>
        <span>${(target * 0.75).toLocaleString()}</span>
        <span>${target.toLocaleString()}</span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  current: PropTypes.number,
  target: PropTypes.number,
  label: PropTypes.string,
  showPercentage: PropTypes.bool,
  showAmount: PropTypes.bool,
  animated: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default ProgressBar;