// src/components/organisms/MobileNavigation/MobileNavigation.jsx
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTouch } from '../../../hooks/useTouch';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';

const MobileNavigation = ({
  navigation = [],
  isOpen,
  onToggle,
  className = '',
  swipeToClose = true,
  position = 'left',
  overlay = true,
  ...props
}) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navigationRef = useRef(null);
  const startPositionRef = useRef(0);

  // Default navigation items
  const defaultNavigation = [
    { 
      id: 'home',
      label: 'Home', 
      href: '/', 
      icon: 'home',
      description: 'Return to homepage'
    },
    { 
      id: 'about',
      label: 'About Us', 
      href: '/about', 
      icon: 'users',
      description: 'Learn about our mission'
    },
    { 
      id: 'projects',
      label: 'Projects', 
      href: '/projects', 
      icon: 'folder',
      description: 'Explore our initiatives',
      children: [
        { id: 'rxcare', label: 'RxCare Research', href: '/projects/rxcare', icon: 'heart' },
        { id: 'health', label: 'Health Screenings', href: '/projects/health', icon: 'shield' },
        { id: 'community', label: 'Community Outreach', href: '/projects/community', icon: 'users' }
      ]
    },
    { 
      id: 'volunteer',
      label: 'Get Involved', 
      href: '/get-involved', 
      icon: 'hand',
      description: 'Join our cause',
      children: [
        { id: 'volunteer-opp', label: 'Volunteer', href: '/volunteer', icon: 'heart' },
        { id: 'donate', label: 'Donate', href: '/donate', icon: 'gift', highlight: true },
        { id: 'partner', label: 'Partner with Us', href: '/partner', icon: 'handshake' }
      ]
    },
    { 
      id: 'contact',
      label: 'Contact', 
      href: '/contact', 
      icon: 'mail',
      description: 'Get in touch with us'
    }
  ];

  const allNavigation = navigation.length > 0 ? navigation : defaultNavigation;

  // Touch gesture handlers for swipe-to-close
  const { touchRef } = useTouch({
    onSwipeLeft: (e, { deltaX, distance }) => {
      if (swipeToClose && position === 'left' && distance > 100) {
        onToggle(false);
      }
    },
    onSwipeRight: (e, { deltaX, distance }) => {
      if (swipeToClose && position === 'right' && distance > 100) {
        onToggle(false);
      }
    },
    enabled: isOpen && swipeToClose,
    swipeThreshold: 50
  });

  // Handle drag gestures for smooth closing
  const handleTouchStart = (e) => {
    if (!swipeToClose || !isOpen) return;
    
    const touch = e.touches[0];
    startPositionRef.current = position === 'left' ? touch.clientX : window.innerWidth - touch.clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !swipeToClose) return;
    
    const touch = e.touches[0];
    const currentPosition = position === 'left' ? touch.clientX : window.innerWidth - touch.clientX;
    const offset = startPositionRef.current - currentPosition;
    
    // Only allow dragging in the closing direction
    if ((position === 'left' && offset > 0) || (position === 'right' && offset > 0)) {
      setDragOffset(Math.min(offset, 300)); // Max drag distance
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Close if dragged more than 30% of the way
    if (dragOffset > 100) {
      onToggle(false);
    }
    
    setDragOffset(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onToggle(false);
          break;
        case 'Tab':
          // Trap focus within navigation
          const focusableElements = navigationRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements?.length) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus first interactive element
      const firstButton = navigationRef.current?.querySelector('button, [href]');
      firstButton?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick(item);
    }
    // Close navigation after selection
    onToggle(false);
  };

  if (!isOpen) return null;

  const translateX = position === 'left' 
    ? `translateX(-${dragOffset}px)` 
    : `translateX(${dragOffset}px)`;

  return (
    <div className={`fixed inset-0 z-50 ${className}`} {...props}>
      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => onToggle(false)}
          style={{ opacity: Math.max(0.5 - dragOffset / 600, 0) }}
        />
      )}

      {/* Navigation Panel */}
      <div
        ref={navigationRef}
        className={`absolute top-0 ${position}-0 h-full w-80 max-w-[85vw] bg-color-bg-primary shadow-2xl transform transition-transform duration-300 ease-out ${
          isDragging ? '' : 'transition-transform'
        }`}
        style={{ transform: translateX }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Touch indicator */}
        {swipeToClose && (
          <div className={`absolute top-4 ${position === 'left' ? 'right-4' : 'left-4'} w-1 h-12 bg-color-border-primary rounded-full opacity-30`} />
        )}

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
            className="p-2 rounded-full hover:bg-color-bg-secondary"
            aria-label="Close navigation"
          >
            <Icon name="x" size="medium" />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav 
          ref={touchRef}
          className="flex-1 overflow-y-auto py-4" 
          role="menu"
        >
          <ul className="space-y-1 px-4">
            {allNavigation.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                onItemClick={handleItemClick}
                level={0}
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

const NavigationItem = ({ item, onItemClick, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = level * 16;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick(item);
    }
  };

  return (
    <li style={{ paddingLeft: `${paddingLeft}px` }}>
      <button
        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 hover:bg-color-bg-secondary focus:bg-color-bg-secondary focus:outline-none focus:ring-2 focus:ring-color-interactive-primary group ${
          item.highlight ? 'bg-gradient-to-r from-red-50 to-blue-50 border border-red-200' : ''
        }`}
        onClick={handleClick}
        role="menuitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-haspopup={hasChildren ? 'menu' : undefined}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {item.icon && (
            <Icon 
              name={item.icon} 
              size="small" 
              className={`flex-shrink-0 ${
                item.highlight 
                  ? 'text-red-600' 
                  : 'text-color-text-tertiary group-hover:text-color-interactive-primary'
              } transition-colors duration-200`}
            />
          )}
          
          <div className="flex-1 min-w-0">
            <div className={`font-medium truncate ${
              item.highlight 
                ? 'text-red-700' 
                : 'text-color-text-primary group-hover:text-color-interactive-primary'
            } transition-colors duration-200`}>
              {item.label}
            </div>
            {item.description && level === 0 && (
              <div className="text-xs text-color-text-tertiary mt-1 truncate">
                {item.description}
              </div>
            )}
          </div>
        </div>

        {hasChildren && (
          <Icon
            name="chevron-down"
            size="small"
            className={`flex-shrink-0 text-color-text-tertiary transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </button>

      {/* Submenu */}
      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="mt-2 space-y-1">
            {item.children.map((child) => (
              <NavigationItem
                key={child.id}
                item={child}
                onItemClick={onItemClick}
                level={level + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

MobileNavigation.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.string,
      description: PropTypes.string,
      highlight: PropTypes.bool,
      onClick: PropTypes.func,
      children: PropTypes.array
    })
  ),
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  swipeToClose: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  overlay: PropTypes.bool
};

NavigationItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  level: PropTypes.number
};

export default MobileNavigation;