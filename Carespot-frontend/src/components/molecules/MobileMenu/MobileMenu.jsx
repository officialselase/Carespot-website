import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

const MobileMenu = ({
  isOpen,
  onToggle,
  navigation = [],
  className = '',
  animationDuration = 300,
  overlay = true,
  position = 'right',
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  // Default navigation items
  const defaultNavigation = [
    { 
      label: 'Home', 
      href: '/', 
      icon: 'home',
      description: 'Return to homepage'
    },
    { 
      label: 'About Us', 
      href: '/about', 
      icon: 'users',
      description: 'Learn about our mission'
    },
    { 
      label: 'Projects', 
      href: '/projects', 
      icon: 'folder',
      description: 'Explore our initiatives',
      children: [
        { label: 'RxCare Research', href: '/projects/rxcare', icon: 'heart' },
        { label: 'Health Screenings', href: '/projects/health', icon: 'shield' },
        { label: 'Community Outreach', href: '/projects/community', icon: 'users' }
      ]
    },
    { 
      label: 'Get Involved', 
      href: '/get-involved', 
      icon: 'hand',
      description: 'Join our cause',
      children: [
        { label: 'Volunteer', href: '/volunteer', icon: 'heart' },
        { label: 'Donate', href: '/donate', icon: 'gift', highlight: true },
        { label: 'Partner with Us', href: '/partner', icon: 'handshake' }
      ]
    },
    { 
      label: 'Contact', 
      href: '/contact', 
      icon: 'mail',
      description: 'Get in touch with us'
    }
  ];

  const allNavigation = navigation.length > 0 ? navigation : defaultNavigation;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimating(true);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Restore body scroll
      document.body.style.overflow = '';
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, animationDuration]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus the first menu item for accessibility
      const firstMenuItem = menuRef.current?.querySelector('[role="menuitem"]');
      if (firstMenuItem) {
        firstMenuItem.focus();
      }
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  // Handle keyboard navigation
  const handleKeyDown = (e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(item);
    }
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick(item);
    }
    // Close menu after navigation
    onToggle(false);
  };

  const handleOverlayClick = (e) => {
    if (overlay && e.target === overlayRef.current) {
      onToggle(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${className}`}
      {...props}
    >
      {/* Overlay */}
      {overlay && (
        <div
          ref={overlayRef}
          className={`absolute inset-0 bg-black transition-opacity duration-${animationDuration} ${
            isAnimating ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className={`absolute top-0 ${position === 'left' ? 'left-0' : 'right-0'} h-full w-80 max-w-sm bg-color-bg-primary shadow-2xl transform transition-transform duration-${animationDuration} ease-in-out ${
          isAnimating 
            ? 'translate-x-0' 
            : position === 'left' 
              ? '-translate-x-full' 
              : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-color-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              CareSpot
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="small"
            onClick={() => onToggle(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <Icon name="x" size="medium" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6" role="menu">
          <ul className="space-y-2 px-6">
            {allNavigation.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                onItemClick={handleItemClick}
                onKeyDown={handleKeyDown}
                animationDelay={index * 50}
                isAnimating={isAnimating}
              />
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-color-border-primary bg-color-bg-secondary">
          <div className="text-center">
            <p className="text-sm text-color-text-secondary mb-3">
              Join our mission to transform lives
            </p>
            <Button
              variant="primary"
              size="medium"
              className="w-full"
              onClick={() => handleItemClick({ href: '/donate' })}
            >
              <Icon name="heart" size="small" />
              Donate Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ 
  item, 
  onItemClick, 
  onKeyDown, 
  animationDelay = 0, 
  isAnimating = false,
  level = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = level * 16;

  return (
    <li
      className={`transform transition-all duration-300 ease-out ${
        isAnimating 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-8 opacity-0'
      }`}
      style={{ 
        transitionDelay: `${animationDelay}ms`,
        paddingLeft: `${paddingLeft}px`
      }}
    >
      <div
        className={`flex items-center justify-between p-3 rounded-lg hover:bg-color-bg-secondary transition-colors duration-200 cursor-pointer group ${
          item.highlight ? 'bg-gradient-to-r from-red-50 to-blue-50 border border-red-200' : ''
        }`}
        onClick={() => hasChildren ? setIsExpanded(!isExpanded) : onItemClick(item)}
        onKeyDown={(e) => onKeyDown(e, item)}
        role="menuitem"
        tabIndex={0}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-haspopup={hasChildren ? 'menu' : undefined}
      >
        <div className="flex items-center gap-3 flex-1">
          {item.icon && (
            <Icon 
              name={item.icon} 
              size="small" 
              className={`${
                item.highlight 
                  ? 'text-red-600' 
                  : 'text-color-text-tertiary group-hover:text-color-interactive-primary'
              } transition-colors duration-200`}
            />
          )}
          
          <div className="flex-1">
            <div className={`font-medium ${
              item.highlight 
                ? 'text-red-700' 
                : 'text-color-text-primary group-hover:text-color-interactive-primary'
            } transition-colors duration-200`}>
              {item.label}
            </div>
            {item.description && (
              <div className="text-xs text-color-text-tertiary mt-1">
                {item.description}
              </div>
            )}
          </div>
        </div>

        {hasChildren && (
          <Icon
            name="chevron-down"
            size="small"
            className={`text-color-text-tertiary transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </div>

      {/* Submenu */}
      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="mt-2 space-y-1">
            {item.children.map((child, childIndex) => (
              <MenuItem
                key={childIndex}
                item={child}
                onItemClick={onItemClick}
                onKeyDown={onKeyDown}
                animationDelay={animationDelay + (childIndex + 1) * 25}
                isAnimating={isAnimating && isExpanded}
                level={level + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.string,
      description: PropTypes.string,
      highlight: PropTypes.bool,
      onClick: PropTypes.func,
      children: PropTypes.array
    })
  ),
  className: PropTypes.string,
  animationDuration: PropTypes.number,
  overlay: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right'])
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  animationDelay: PropTypes.number,
  isAnimating: PropTypes.bool,
  level: PropTypes.number
};

export default MobileMenu;