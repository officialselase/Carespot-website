import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Custom hook for keyboard navigation support
 * Provides utilities for managing focus, keyboard shortcuts, and navigation patterns
 */
export const useKeyboardNavigation = ({
  onEscape,
  onEnter,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
  onShiftTab,
  trapFocus = false,
  autoFocus = false,
  focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  disabled = false
} = {}) => {
  const containerRef = useRef(null);
  const focusableElementsRef = useRef([]);

  // Get all focusable elements within the container
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const elements = Array.from(
      containerRef.current.querySelectorAll(focusableSelector)
    ).filter(element => {
      // Filter out disabled elements and hidden elements
      return !element.disabled && 
             element.offsetParent !== null && 
             !element.hasAttribute('aria-hidden');
    });
    
    focusableElementsRef.current = elements;
    return elements;
  }, [focusableSelector]);

  // Focus the first focusable element
  const focusFirst = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
    }
  }, [getFocusableElements]);

  // Focus the last focusable element
  const focusLast = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[elements.length - 1].focus();
    }
  }, [getFocusableElements]);

  // Focus the next focusable element
  const focusNext = useCallback(() => {
    const elements = getFocusableElements();
    const currentIndex = elements.indexOf(document.activeElement);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < elements.length) {
      elements[nextIndex].focus();
    } else if (trapFocus) {
      elements[0]?.focus();
    }
  }, [getFocusableElements, trapFocus]);

  // Focus the previous focusable element
  const focusPrevious = useCallback(() => {
    const elements = getFocusableElements();
    const currentIndex = elements.indexOf(document.activeElement);
    const previousIndex = currentIndex - 1;
    
    if (previousIndex >= 0) {
      elements[previousIndex].focus();
    } else if (trapFocus) {
      elements[elements.length - 1]?.focus();
    }
  }, [getFocusableElements, trapFocus]);

  // Handle keyboard events
  const handleKeyDown = useCallback((event) => {
    if (disabled) return;

    const { key, shiftKey, ctrlKey, metaKey } = event;

    // Handle specific key combinations
    switch (key) {
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape(event);
        }
        break;

      case 'Enter':
        if (onEnter) {
          onEnter(event);
        }
        break;

      case 'ArrowUp':
        if (onArrowUp) {
          event.preventDefault();
          onArrowUp(event);
        }
        break;

      case 'ArrowDown':
        if (onArrowDown) {
          event.preventDefault();
          onArrowDown(event);
        }
        break;

      case 'ArrowLeft':
        if (onArrowLeft) {
          event.preventDefault();
          onArrowLeft(event);
        }
        break;

      case 'ArrowRight':
        if (onArrowRight) {
          event.preventDefault();
          onArrowRight(event);
        }
        break;

      case 'Tab':
        if (trapFocus) {
          event.preventDefault();
          if (shiftKey) {
            focusPrevious();
          } else {
            focusNext();
          }
        }
        
        if (shiftKey && onShiftTab) {
          onShiftTab(event);
        } else if (!shiftKey && onTab) {
          onTab(event);
        }
        break;

      case 'Home':
        if (ctrlKey || metaKey) {
          event.preventDefault();
          focusFirst();
        }
        break;

      case 'End':
        if (ctrlKey || metaKey) {
          event.preventDefault();
          focusLast();
        }
        break;
    }
  }, [
    disabled,
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    onShiftTab,
    trapFocus,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast
  ]);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Auto focus on mount
  useEffect(() => {
    if (autoFocus && !disabled) {
      focusFirst();
    }
  }, [autoFocus, disabled, focusFirst]);

  // Update focusable elements when container content changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      getFocusableElements();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'tabindex', 'aria-hidden']
    });

    return () => observer.disconnect();
  }, [getFocusableElements]);

  return {
    containerRef,
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious,
    getFocusableElements: () => focusableElementsRef.current
  };
};

/**
 * Hook for managing roving tabindex pattern
 * Useful for components like menus, toolbars, and grids
 */
export const useRovingTabIndex = ({
  orientation = 'horizontal',
  loop = true,
  defaultIndex = 0
} = {}) => {
  const [currentIndex, setCurrentIndexState] = useState(defaultIndex);
  const itemsRef = useRef([]);

  const registerItem = useCallback((element, index) => {
    if (element) {
      itemsRef.current[index] = element;
      // Set tabindex based on current selection
      element.tabIndex = index === currentIndex ? 0 : -1;
    }
  }, [currentIndex]);

  const setCurrentIndex = useCallback((index) => {
    const items = itemsRef.current.filter(Boolean);
    if (index >= 0 && index < items.length) {
      // Update tabindex for all items
      items.forEach((item, i) => {
        item.tabIndex = i === index ? 0 : -1;
      });
      
      // Focus the new current item
      items[index].focus();
      setCurrentIndexState(index);
    }
  }, []);

  const moveNext = useCallback(() => {
    const items = itemsRef.current.filter(Boolean);
    let nextIndex = currentIndex + 1;
    
    if (nextIndex >= items.length) {
      nextIndex = loop ? 0 : items.length - 1;
    }
    
    setCurrentIndex(nextIndex);
  }, [currentIndex, loop, setCurrentIndex]);

  const movePrevious = useCallback(() => {
    const items = itemsRef.current.filter(Boolean);
    let prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      prevIndex = loop ? items.length - 1 : 0;
    }
    
    setCurrentIndex(prevIndex);
  }, [currentIndex, loop, setCurrentIndex]);

  const handleKeyDown = useCallback((event) => {
    const { key } = event;
    
    if (orientation === 'horizontal') {
      if (key === 'ArrowLeft') {
        event.preventDefault();
        movePrevious();
      } else if (key === 'ArrowRight') {
        event.preventDefault();
        moveNext();
      }
    } else if (orientation === 'vertical') {
      if (key === 'ArrowUp') {
        event.preventDefault();
        movePrevious();
      } else if (key === 'ArrowDown') {
        event.preventDefault();
        moveNext();
      }
    } else if (orientation === 'both') {
      if (key === 'ArrowLeft' || key === 'ArrowUp') {
        event.preventDefault();
        movePrevious();
      } else if (key === 'ArrowRight' || key === 'ArrowDown') {
        event.preventDefault();
        moveNext();
      }
    }
    
    if (key === 'Home') {
      event.preventDefault();
      setCurrentIndex(0);
    } else if (key === 'End') {
      event.preventDefault();
      const items = itemsRef.current.filter(Boolean);
      setCurrentIndex(items.length - 1);
    }
  }, [orientation, moveNext, movePrevious, setCurrentIndex]);

  return {
    currentIndex,
    registerItem,
    setCurrentIndex,
    handleKeyDown,
    moveNext,
    movePrevious
  };
};

export default useKeyboardNavigation;