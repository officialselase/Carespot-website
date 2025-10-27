import PropTypes from 'prop-types';

const SkipLink = ({
  href = '#main-content',
  children = 'Skip to main content',
  className = '',
  ...props
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Find the target element
    const target = document.querySelector(href);
    if (target) {
      // Set focus to the target element
      target.focus();
      
      // If the target doesn't have a tabindex, add one temporarily
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
        // Remove the tabindex after a short delay to avoid affecting normal tab flow
        setTimeout(() => {
          target.removeAttribute('tabindex');
        }, 100);
      }
      
      // Smooth scroll to the target
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`
        absolute top-0 left-0 z-[9999] px-4 py-2 
        bg-color-interactive-primary text-white font-medium rounded-br-lg
        transform -translate-y-full focus:translate-y-0
        transition-transform duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-color-interactive-primary
        ${className}
      `}
      {...props}
    >
      {children}
    </a>
  );
};

SkipLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

export default SkipLink;