// src/utils/touchUtils.js

/**
 * Utility functions for touch interactions and mobile optimizations
 */

/**
 * Check if the device supports touch
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

/**
 * Check if the device is mobile based on screen size and touch capability
 */
export const isMobileDevice = () => {
  return isTouchDevice() && window.innerWidth <= 768;
};

/**
 * Get optimal touch target size based on device
 */
export const getTouchTargetSize = () => {
  return isMobileDevice() ? 48 : 44; // Larger targets on mobile
};

/**
 * Add touch-friendly classes to an element
 */
export const addTouchClasses = (element, options = {}) => {
  if (!element || !isTouchDevice()) return;

  const {
    manipulation = true,
    highlight = true,
    active = true,
    target = true
  } = options;

  const classes = [];
  
  if (manipulation) classes.push('touch-manipulation');
  if (highlight) classes.push('touch-highlight');
  if (active) classes.push('touch-active');
  if (target) classes.push('touch-target');

  element.classList.add(...classes);
};

/**
 * Remove touch-unfriendly hover effects on touch devices
 */
export const optimizeForTouch = (element) => {
  if (!element || !isTouchDevice()) return;

  // Remove hover effects on touch devices
  element.style.setProperty('--hover-transform', 'none');
  element.style.setProperty('--hover-shadow', 'none');
};

/**
 * Debounce function for touch events
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for scroll and gesture events
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Calculate distance between two touch points
 */
export const getTouchDistance = (touch1, touch2) => {
  return Math.sqrt(
    Math.pow(touch2.clientX - touch1.clientX, 2) +
    Math.pow(touch2.clientY - touch1.clientY, 2)
  );
};

/**
 * Calculate angle between two touch points
 */
export const getTouchAngle = (touch1, touch2) => {
  return Math.atan2(
    touch2.clientY - touch1.clientY,
    touch2.clientX - touch1.clientX
  ) * 180 / Math.PI;
};

/**
 * Prevent default touch behaviors
 */
export const preventTouchDefaults = (element, options = {}) => {
  if (!element || !isTouchDevice()) return;

  const {
    scroll = false,
    zoom = true,
    selection = true
  } = options;

  if (!scroll) {
    element.style.touchAction = 'none';
  }
  
  if (!zoom) {
    element.style.touchAction = 'manipulation';
  }
  
  if (!selection) {
    element.style.userSelect = 'none';
    element.style.webkitUserSelect = 'none';
  }
};

/**
 * Add ripple effect to touch interactions
 */
export const addRippleEffect = (element, event) => {
  if (!element || !isTouchDevice()) return;

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = (event.clientX || event.touches?.[0]?.clientX || 0) - rect.left - size / 2;
  const y = (event.clientY || event.touches?.[0]?.clientY || 0) - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transform: scale(0);
    animation: touch-ripple 0.6s linear;
    pointer-events: none;
    z-index: 1;
  `;

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
};

/**
 * Optimize form inputs for mobile keyboards
 */
export const optimizeFormInput = (input, type = 'text') => {
  if (!input || !isMobileDevice()) return;

  // Prevent zoom on iOS
  input.style.fontSize = '16px';
  
  // Set appropriate input modes
  const inputModes = {
    email: 'email',
    tel: 'tel',
    number: 'numeric',
    url: 'url',
    search: 'search'
  };

  if (inputModes[type]) {
    input.setAttribute('inputmode', inputModes[type]);
  }

  // Set autocomplete attributes
  const autocompleteMap = {
    email: 'email',
    tel: 'tel',
    name: 'name',
    password: 'current-password'
  };

  if (autocompleteMap[type]) {
    input.setAttribute('autocomplete', autocompleteMap[type]);
  }

  // Add touch-friendly padding
  input.style.padding = '12px 16px';
  input.style.minHeight = '44px';
};

/**
 * Create touch-friendly button
 */
export const createTouchButton = (text, onClick, options = {}) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.onclick = onClick;

  const {
    variant = 'primary',
    size = 'medium',
    className = ''
  } = options;

  button.className = `btn-${variant} ${className}`;
  
  if (isMobileDevice()) {
    button.style.minHeight = '48px';
    button.style.padding = '12px 24px';
    button.style.fontSize = '16px';
  }

  addTouchClasses(button);
  
  return button;
};

/**
 * Handle safe area insets for devices with notches
 */
export const handleSafeAreaInsets = (element) => {
  if (!element) return;

  // Add safe area padding for iOS devices
  element.style.paddingTop = 'max(env(safe-area-inset-top), 0px)';
  element.style.paddingBottom = 'max(env(safe-area-inset-bottom), 0px)';
  element.style.paddingLeft = 'max(env(safe-area-inset-left), 0px)';
  element.style.paddingRight = 'max(env(safe-area-inset-right), 0px)';
};

/**
 * Detect swipe direction
 */
export const detectSwipeDirection = (startX, startY, endX, endY, threshold = 50) => {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  if (Math.max(absX, absY) < threshold) {
    return null; // Not a swipe
  }

  if (absX > absY) {
    return deltaX > 0 ? 'right' : 'left';
  } else {
    return deltaY > 0 ? 'down' : 'up';
  }
};

/**
 * Smooth scroll to element with touch-friendly behavior
 */
export const smoothScrollToElement = (element, options = {}) => {
  if (!element) return;

  const {
    behavior = 'smooth',
    block = 'center',
    inline = 'nearest',
    offset = 0
  } = options;

  // Calculate position with offset
  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const middle = absoluteElementTop - (window.innerHeight / 2) + offset;

  window.scrollTo({
    top: middle,
    behavior
  });
};

/**
 * Haptic feedback for supported devices
 */
export const triggerHapticFeedback = (type = 'light') => {
  if (!navigator.vibrate) return;

  const patterns = {
    light: [10],
    medium: [20],
    heavy: [30],
    success: [10, 50, 10],
    error: [50, 50, 50],
    warning: [20, 20, 20]
  };

  navigator.vibrate(patterns[type] || patterns.light);
};

export default {
  isTouchDevice,
  isMobileDevice,
  getTouchTargetSize,
  addTouchClasses,
  optimizeForTouch,
  debounce,
  throttle,
  getTouchDistance,
  getTouchAngle,
  preventTouchDefaults,
  addRippleEffect,
  optimizeFormInput,
  createTouchButton,
  handleSafeAreaInsets,
  detectSwipeDirection,
  smoothScrollToElement,
  triggerHapticFeedback
};