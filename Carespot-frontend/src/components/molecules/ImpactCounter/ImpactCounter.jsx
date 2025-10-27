import PropTypes from 'prop-types';
import AnimatedCounter from '../../atoms/AnimatedCounter/AnimatedCounter';
import Icon from '../../atoms/Icon';

const ImpactCounter = ({
  value,
  label,
  description,
  icon,
  prefix = '',
  suffix = '',
  color = 'primary',
  size = 'medium',
  delay = 0,
  className = '',
  ...props
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-gradient-to-br from-red-50 to-blue-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      counter: 'primary',
      label: 'text-gray-800',
      description: 'text-gray-600'
    },
    success: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      counter: 'success',
      label: 'text-green-800',
      description: 'text-green-600'
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      counter: 'primary',
      label: 'text-blue-800',
      description: 'text-blue-600'
    },
    warning: {
      bg: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      counter: 'warning',
      label: 'text-yellow-800',
      description: 'text-yellow-600'
    }
  };

  const theme = colorClasses[color];

  return (
    <div
      className={`
        relative p-6 rounded-xl border-2 ${theme.bg} ${theme.border}
        hover:shadow-lg transition-all duration-300 hover:scale-105
        ${className}
      `}
      {...props}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 overflow-hidden rounded-xl">
        <div className={`w-full h-full ${theme.icon} transform rotate-12 scale-150`}>
          {icon && <Icon name={icon} size="xlarge" />}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        {icon && (
          <div className={`inline-flex p-3 rounded-lg bg-white shadow-sm mb-4 ${theme.icon}`}>
            <Icon name={icon} size="large" />
          </div>
        )}

        {/* Counter */}
        <div className="mb-2">
          <AnimatedCounter
            target={value}
            prefix={prefix}
            suffix={suffix}
            color={theme.counter}
            size={size}
            delay={delay}
            className="block"
          />
        </div>

        {/* Label */}
        <h3 className={`text-lg font-semibold ${theme.label} mb-1`}>
          {label}
        </h3>

        {/* Description */}
        {description && (
          <p className={`text-sm ${theme.description} leading-relaxed`}>
            {description}
          </p>
        )}
      </div>

      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

ImpactCounter.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'success', 'info', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  delay: PropTypes.number,
  className: PropTypes.string
};

export default ImpactCounter;