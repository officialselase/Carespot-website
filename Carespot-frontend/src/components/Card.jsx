

const Card = ({ 
  image, 
  title, 
  description, 
  action, 
  variant = 'default',
  className = '',
  imageAlt = '',
  icon
}) => {
  const variants = {
    default: 'card-elevated p-6',
    service: 'card-elevated p-8 text-center hover:scale-105',
    project: 'card-elevated overflow-hidden',
    testimonial: 'card-elevated p-8 bg-gradient-to-br from-color-secondary-50 to-color-primary-50'
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {/* Icon for service cards */}
      {icon && variant === 'service' && (
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center">
          <div className="text-white text-2xl">
            {icon}
          </div>
        </div>
      )}
      
      {/* Image */}
      {image && (
        <div className={`${variant === 'project' ? 'h-48' : 'h-40'} overflow-hidden ${variant === 'project' ? '' : 'rounded-lg mb-4'}`}>
          <img 
            src={image} 
            alt={imageAlt || title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      )}
      
      {/* Content */}
      <div className={variant === 'project' ? 'p-6' : ''}>
        <h3 className="text-xl md:text-2xl font-bold text-color-text-primary mb-3">
          {title}
        </h3>
        
        <p className="text-color-text-secondary leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Action Button */}
        {action && (
          <button
            onClick={action.onClick}
            className={`${action.variant === 'primary' ? 'btn-primary' : 'btn-outline'} text-sm`}
          >
            {action.text}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;