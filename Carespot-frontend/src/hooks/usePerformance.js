import { useState, useEffect, useCallback } from 'react';
import performanceMonitor from '../utils/performanceMonitor.js';

/**
 * Custom hook for performance monitoring and optimization
 */
export const usePerformance = () => {
  const [metrics, setMetrics] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [score, setScore] = useState(100);
  const [status, setStatus] = useState('excellent');

  // Update performance data
  const updatePerformanceData = useCallback(() => {
    const report = performanceMonitor.getReport();
    setMetrics(report.metrics);
    setAlerts(report.alerts);
    setScore(report.summary.score);
    setStatus(report.summary.status);
  }, []);

  useEffect(() => {
    // Initial update
    updatePerformanceData();

    // Set up periodic updates
    const interval = setInterval(updatePerformanceData, 5000);

    return () => clearInterval(interval);
  }, [updatePerformanceData]);

  // Measure custom performance metrics
  const measurePerformance = useCallback((name, fn) => {
    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    performanceMonitor.recordMetric(`custom_${name}`, duration);
    
    return { result, duration };
  }, []);

  // Measure async performance
  const measureAsyncPerformance = useCallback(async (name, asyncFn) => {
    const startTime = performance.now();
    const result = await asyncFn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    performanceMonitor.recordMetric(`async_${name}`, duration);
    
    return { result, duration };
  }, []);

  // Track user interactions
  const trackInteraction = useCallback((action, element) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      performanceMonitor.recordMetric(`interaction_${action}`, duration);
    };
  }, []);

  // Get performance recommendations
  const getRecommendations = useCallback(() => {
    const report = performanceMonitor.getReport();
    return report.summary.recommendations;
  }, []);

  return {
    metrics,
    alerts,
    score,
    status,
    measurePerformance,
    measureAsyncPerformance,
    trackInteraction,
    getRecommendations,
    updatePerformanceData
  };
};

/**
 * Hook for image performance optimization
 */
export const useImagePerformance = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());

  const trackImageLoad = useCallback((src, loadTime) => {
    setLoadedImages(prev => new Set([...prev, src]));
    performanceMonitor.recordMetric('image_load_time', loadTime);
  }, []);

  const trackImageError = useCallback((src, error) => {
    setFailedImages(prev => new Set([...prev, src]));
    performanceMonitor.addAlert('warning', `Failed to load image: ${src}`);
  }, []);

  const getImageStats = useCallback(() => {
    return {
      loaded: loadedImages.size,
      failed: failedImages.size,
      total: loadedImages.size + failedImages.size,
      successRate: loadedImages.size / (loadedImages.size + failedImages.size) * 100
    };
  }, [loadedImages, failedImages]);

  return {
    trackImageLoad,
    trackImageError,
    getImageStats,
    loadedImages,
    failedImages
  };
};

/**
 * Hook for bundle size monitoring
 */
export const useBundlePerformance = () => {
  const [bundleInfo, setBundleInfo] = useState(null);

  useEffect(() => {
    // Get bundle information from build
    if (import.meta.env.PROD) {
      // In production, we can estimate bundle size from loaded resources
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter(r => r.name.includes('.js'));
      const cssResources = resources.filter(r => r.name.includes('.css'));
      
      const totalJSSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const totalCSSSize = cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      
      setBundleInfo({
        js: totalJSSize,
        css: totalCSSSize,
        total: totalJSSize + totalCSSSize,
        chunks: jsResources.length
      });
    }
  }, []);

  return bundleInfo;
};

export default usePerformance;