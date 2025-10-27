// src/components/atoms/SwipeableCarousel/SwipeableCarousel.jsx
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTouch } from '../../../hooks/useTouch';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const SwipeableCarousel = ({
  items = [],
  className = '',
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  infinite = true,
  itemsPerView = 1,
  gap = 16,
  onSlideChange,
  renderItem,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && totalItems > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          if (infinite) {
            return (prev + 1) % totalItems;
          }
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, totalItems, itemsPerView, infinite, maxIndex]);

  // Pause auto-play on hover/focus
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const resumeAutoPlay = () => {
    if (autoPlay && totalItems > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          if (infinite) {
            return (prev + 1) % totalItems;
          }
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoPlayInterval);
    }
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (infinite && currentIndex === 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
    onSlideChange?.(currentIndex);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (infinite && currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
    onSlideChange?.(currentIndex);
  };

  // Touch gesture handlers
  const { touchRef } = useTouch({
    onSwipeLeft: () => {
      pauseAutoPlay();
      goToNext();
      setTimeout(resumeAutoPlay, 1000);
    },
    onSwipeRight: () => {
      pauseAutoPlay();
      goToPrevious();
      setTimeout(resumeAutoPlay, 1000);
    },
    swipeThreshold: 50,
    enabled: true
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!carouselRef.current?.contains(document.activeElement)) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(maxIndex);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [maxIndex]);

  if (totalItems === 0) {
    return (
      <div className={`flex items-center justify-center p-8 text-color-text-secondary ${className}`}>
        <p>No items to display</p>
      </div>
    );
  }

  const itemWidth = `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})`;
  const translateX = -(currentIndex * (100 / itemsPerView));

  return (
    <div
      ref={carouselRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onFocus={pauseAutoPlay}
      onBlur={resumeAutoPlay}
      role="region"
      aria-label="Image carousel"
      {...props}
    >
      {/* Carousel track */}
      <div
        ref={touchRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${translateX}%)`,
          gap: `${gap}px`
        }}
        role="group"
        aria-live="polite"
        aria-atomic="false"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: itemWidth }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${totalItems}`}
          >
            {renderItem ? renderItem(item, index) : (
              <div className="w-full h-64 bg-color-bg-secondary rounded-lg flex items-center justify-center">
                {typeof item === 'string' ? (
                  <img
                    src={item}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-color-text-secondary">
                    {item.title || `Item ${index + 1}`}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && totalItems > itemsPerView && (
        <>
          <Button
            variant="ghost"
            size="small"
            onClick={goToPrevious}
            disabled={!infinite && currentIndex === 0}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm shadow-lg z-10 rounded-full p-2"
            aria-label="Previous slide"
          >
            <Icon name="chevron-left" size="medium" />
          </Button>
          
          <Button
            variant="ghost"
            size="small"
            onClick={goToNext}
            disabled={!infinite && currentIndex >= maxIndex}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm shadow-lg z-10 rounded-full p-2"
            aria-label="Next slide"
          >
            <Icon name="chevron-right" size="medium" />
          </Button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && totalItems > itemsPerView && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-color-interactive-primary focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-color-interactive-primary scale-110'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {totalItems}
      </div>
    </div>
  );
};

SwipeableCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
  infinite: PropTypes.bool,
  itemsPerView: PropTypes.number,
  gap: PropTypes.number,
  onSlideChange: PropTypes.func,
  renderItem: PropTypes.func
};

export default SwipeableCarousel;