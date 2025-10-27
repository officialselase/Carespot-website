// src/hooks/useTouch.js
import { useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for handling touch interactions and gestures
 * Provides touch event handling, swipe detection, and mobile-optimized interactions
 */
export const useTouch = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onDoubleTap,
  onLongPress,
  onPinch,
  swipeThreshold = 50,
  longPressDelay = 500,
  doubleTapDelay = 300,
  preventScroll = false,
  enabled = true
} = {}) => {
  const touchRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const lastTapRef = useRef(null);
  const pinchStartRef = useRef(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (!enabled) return;

    const touch = e.touches[0];
    const now = Date.now();

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: now
    };

    // Handle multi-touch for pinch
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      pinchStartRef.current = {
        distance,
        centerX: (touch1.clientX + touch2.clientX) / 2,
        centerY: (touch1.clientY + touch2.clientY) / 2
      };
    }

    // Start long press timer
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        onLongPress(e, { x: touch.clientX, y: touch.clientY });
      }, longPressDelay);
    }

    // Prevent scroll if needed
    if (preventScroll) {
      e.preventDefault();
    }
  }, [enabled, onLongPress, longPressDelay, preventScroll]);

  const handleTouchMove = useCallback((e) => {
    if (!enabled || !touchStartRef.current) return;

    // Cancel long press on move
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Handle pinch gesture
    if (e.touches.length === 2 && pinchStartRef.current && onPinch) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const scale = distance / pinchStartRef.current.distance;
      const centerX = (touch1.clientX + touch2.clientX) / 2;
      const centerY = (touch1.clientY + touch2.clientY) / 2;

      onPinch(e, {
        scale,
        centerX,
        centerY,
        deltaX: centerX - pinchStartRef.current.centerX,
        deltaY: centerY - pinchStartRef.current.centerY
      });
    }

    if (preventScroll) {
      e.preventDefault();
    }
  }, [enabled, onPinch, preventScroll]);

  const handleTouchEnd = useCallback((e) => {
    if (!enabled || !touchStartRef.current) return;

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    const touch = e.changedTouches[0];
    const now = Date.now();

    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: now
    };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Detect swipe gestures
    if (distance > swipeThreshold && deltaTime < 1000) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight(e, { deltaX, deltaY, distance, deltaTime });
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft(e, { deltaX, deltaY, distance, deltaTime });
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown(e, { deltaX, deltaY, distance, deltaTime });
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp(e, { deltaX, deltaY, distance, deltaTime });
        }
      }
    } 
    // Detect tap gestures
    else if (distance < 10 && deltaTime < 500) {
      // Check for double tap
      if (lastTapRef.current && now - lastTapRef.current < doubleTapDelay && onDoubleTap) {
        onDoubleTap(e, { x: touch.clientX, y: touch.clientY });
        lastTapRef.current = null;
      } else {
        lastTapRef.current = now;
        // Delay single tap to check for double tap
        setTimeout(() => {
          if (lastTapRef.current === now && onTap) {
            onTap(e, { x: touch.clientX, y: touch.clientY });
          }
        }, doubleTapDelay);
      }
    }

    // Reset touch data
    touchStartRef.current = null;
    touchEndRef.current = null;
    pinchStartRef.current = null;
  }, [enabled, swipeThreshold, doubleTapDelay, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, onDoubleTap]);

  // Attach event listeners
  useEffect(() => {
    const element = touchRef.current;
    if (!element || !enabled) return;

    // Use passive listeners for better performance
    const options = { passive: !preventScroll };

    element.addEventListener('touchstart', handleTouchStart, options);
    element.addEventListener('touchmove', handleTouchMove, options);
    element.addEventListener('touchend', handleTouchEnd, options);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd, preventScroll]);

  return {
    touchRef,
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0
  };
};

/**
 * Hook for pull-to-refresh functionality
 */
export const usePullToRefresh = ({
  onRefresh,
  threshold = 80,
  enabled = true,
  refreshingText = 'Refreshing...',
  pullText = 'Pull to refresh',
  releaseText = 'Release to refresh'
} = {}) => {
  const containerRef = useRef(null);
  const pullIndicatorRef = useRef(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const isRefreshingRef = useRef(false);
  const isPullingRef = useRef(false);

  const updatePullIndicator = useCallback((pullDistance, status) => {
    if (!pullIndicatorRef.current) return;

    const indicator = pullIndicatorRef.current;
    const progress = Math.min(pullDistance / threshold, 1);
    
    indicator.style.transform = `translateY(${pullDistance}px)`;
    indicator.style.opacity = progress;
    
    // Update text based on status
    const textElement = indicator.querySelector('.pull-text');
    if (textElement) {
      if (status === 'refreshing') {
        textElement.textContent = refreshingText;
      } else if (pullDistance >= threshold) {
        textElement.textContent = releaseText;
      } else {
        textElement.textContent = pullText;
      }
    }

    // Rotate refresh icon
    const iconElement = indicator.querySelector('.refresh-icon');
    if (iconElement && status !== 'refreshing') {
      iconElement.style.transform = `rotate(${progress * 180}deg)`;
    }
  }, [threshold, refreshingText, pullText, releaseText]);

  const handleTouchStart = useCallback((e) => {
    if (!enabled || isRefreshingRef.current) return;
    
    const container = containerRef.current;
    if (!container || container.scrollTop > 0) return;

    startYRef.current = e.touches[0].clientY;
    isPullingRef.current = true;
  }, [enabled]);

  const handleTouchMove = useCallback((e) => {
    if (!enabled || !isPullingRef.current || isRefreshingRef.current) return;

    const container = containerRef.current;
    if (!container || container.scrollTop > 0) {
      isPullingRef.current = false;
      return;
    }

    currentYRef.current = e.touches[0].clientY;
    const pullDistance = Math.max(0, currentYRef.current - startYRef.current);

    if (pullDistance > 0) {
      e.preventDefault();
      updatePullIndicator(pullDistance, 'pulling');
    }
  }, [enabled, updatePullIndicator]);

  const handleTouchEnd = useCallback(async () => {
    if (!enabled || !isPullingRef.current || isRefreshingRef.current) return;

    const pullDistance = Math.max(0, currentYRef.current - startYRef.current);
    isPullingRef.current = false;

    if (pullDistance >= threshold && onRefresh) {
      isRefreshingRef.current = true;
      updatePullIndicator(threshold, 'refreshing');
      
      try {
        await onRefresh();
      } finally {
        isRefreshingRef.current = false;
        updatePullIndicator(0, 'idle');
      }
    } else {
      updatePullIndicator(0, 'idle');
    }
  }, [enabled, threshold, onRefresh, updatePullIndicator]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    containerRef,
    pullIndicatorRef,
    isRefreshing: isRefreshingRef.current
  };
};

export default useTouch;