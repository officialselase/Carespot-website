import { useState, useRef, useEffect } from 'react';
import { optimizeImageUrl, getWebPImage, calculateOptimalDimensions } from '../utils/imageOptimization.js';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  quality = 80,
  format = 'webp',
  lazy = true,
  progressive = false,
  placeholder,
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Calculate optimal dimensions based on container
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Load optimized image when in view
  useEffect(() => {
    if (!isInView || !src) return;

    let optimizedSrc = src;

    // Apply optimizations
    if (width || height) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      const optimalDimensions = containerRect 
        ? calculateOptimalDimensions(containerRect)
        : { width, height };

      optimizedSrc = optimizeImageUrl(src, {
        width: width || optimalDimensions.width,
        height: height || optimalDimensions.height,
        quality,
        format
      });
    }

    // Use WebP if supported
    optimizedSrc = getWebPImage(optimizedSrc);

    if (progressive && placeholder) {
      // Progressive loading: show placeholder first, then high quality
      setCurrentSrc(placeholder);
      
      const highQualityImg = new Image();
      highQualityImg.onload = () => {
        setCurrentSrc(optimizedSrc);
        setIsLoaded(true);
        onLoad?.(highQualityImg);
      };
      highQualityImg.onerror = handleError;
      highQualityImg.src = optimizedSrc;
    } else {
      setCurrentSrc(optimizedSrc);
    }
  }, [isInView, src, width, height, quality, format, progressive, placeholder, onLoad]);

  const handleLoad = (e) => {
    if (!progressive) {
      setIsLoaded(true);
      onLoad?.(e);
    }
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      {...props}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Optimized image */}
      {isInView && currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${progressive && !isLoaded ? 'filter blur-sm' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedImage;