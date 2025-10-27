import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonCard, SkeletonStats } from '../Skeleton/Skeleton';

const PageTransition = ({
  children,
  isLoading = false,
  loadingType = 'default',
  duration = 300,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true);
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setShowContent(false);
    }
  }, [isLoading]);

  const LoadingContent = () => {
    switch (loadingType) {
      case 'homepage':
        return (
          <div className="space-y-8 p-6">
            {/* Hero skeleton */}
            <div className="text-center space-y-4">
              <Skeleton variant="heading" className="mx-auto" width="400px" />
              <Skeleton variant="text" className="mx-auto" width="600px" />
              <div className="flex justify-center gap-4 mt-6">
                <Skeleton variant="button" />
                <Skeleton variant="button" />
              </div>
            </div>
            
            {/* Stats skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <SkeletonStats />
              <SkeletonStats />
              <SkeletonStats />
            </div>
            
            {/* Cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        );
      
      case 'cards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        );
      
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <SkeletonStats />
            <SkeletonStats />
            <SkeletonStats />
          </div>
        );
      
      case 'spinner':
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-full animate-ping opacity-20"></div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 font-medium">Loading CareSpot...</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4 p-6">
            <Skeleton variant="title" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </div>
        );
    }
  };

  return (
    <div className={`transition-all duration-${duration} ${className}`} {...props}>
      {isLoading ? (
        <div className="animate-fade-in">
          <LoadingContent />
        </div>
      ) : (
        <div
          className={`transition-all duration-${duration} ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {showContent && children}
        </div>
      )}
    </div>
  );
};

// Hook for managing page transitions
export const usePageTransition = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  const startTransition = () => setIsLoading(true);
  const endTransition = () => setIsLoading(false);

  const withTransition = async (asyncFunction) => {
    startTransition();
    try {
      await asyncFunction();
    } finally {
      endTransition();
    }
  };

  return {
    isLoading,
    startTransition,
    endTransition,
    withTransition
  };
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  loadingType: PropTypes.oneOf(['default', 'homepage', 'cards', 'stats', 'spinner', 'pulse']),
  duration: PropTypes.number,
  className: PropTypes.string
};

export default PageTransition;