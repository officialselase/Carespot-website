

const Section = ({ 
  id,
  title, 
  subtitle, 
  description,
  backgroundImage,
  backgroundColor = 'bg-color-bg-primary',
  textColor = 'text-color-text-primary',
  overlay,
  children,
  className = '',
  titleAlign = 'center'
}) => {
  const sectionStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <section 
      id={id}
      className={`relative section-padding ${backgroundImage ? 'bg-cover bg-center' : backgroundColor} ${className}`}
      style={sectionStyle}
    >
      {/* Overlay */}
      {overlay && <div className={overlay}></div>}
      
      <div className={`relative z-10 container-custom ${backgroundImage ? 'text-color-text-inverse' : textColor}`}>
        {/* Section Header */}
        {(title || subtitle || description) && (
          <div className={`mb-12 ${titleAlign === 'center' ? 'text-center' : titleAlign === 'left' ? 'text-left' : 'text-right'}`}>
            {subtitle && (
              <p className={`text-lg font-semibold uppercase tracking-wide mb-4 ${
                backgroundImage ? 'text-color-primary-200' : 'text-color-interactive-primary'
              }`}>
                {subtitle}
              </p>
            )}
            
            {title && (
              <h2 className="text-responsive-4xl font-bold mb-6 typography-heading text-optimized">
                {title}
              </h2>
            )}
            
            {description && (
              <p className={`text-lg md:text-xl leading-relaxed max-w-3xl ${
                titleAlign === 'center' ? 'mx-auto' : ''
              } ${backgroundImage ? 'text-color-text-inverse opacity-90' : 'text-color-text-secondary'}`}>
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Section Content */}
        {children}
      </div>
    </section>
  );
};

export default Section;