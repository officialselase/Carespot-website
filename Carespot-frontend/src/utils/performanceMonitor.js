// Performance monitoring and alerting utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.thresholds = {
      FCP: 1800, // First Contentful Paint
      LCP: 2500, // Largest Contentful Paint
      FID: 100,  // First Input Delay
      CLS: 0.1,  // Cumulative Layout Shift
      TTFB: 800, // Time to First Byte
      loadTime: 3000,
      bundleSize: 1000000 // 1MB
    };
    this.alerts = [];
    this.isMonitoring = false;
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.setupWebVitalsMonitoring();
    this.setupResourceMonitoring();
    this.setupNavigationMonitoring();
    this.setupMemoryMonitoring();
    this.setupErrorMonitoring();
    
    console.log('Performance monitoring initialized');
  }

  /**
   * Setup Web Vitals monitoring (Core Web Vitals)
   */
  setupWebVitalsMonitoring() {
    // First Contentful Paint
    this.observePerformanceEntry('paint', (entries) => {
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.recordMetric('FCP', entry.startTime);
          this.checkThreshold('FCP', entry.startTime);
        }
      });
    });

    // Largest Contentful Paint
    this.observePerformanceEntry('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('LCP', lastEntry.startTime);
      this.checkThreshold('LCP', lastEntry.startTime);
    });

    // First Input Delay
    this.observePerformanceEntry('first-input', (entries) => {
      entries.forEach(entry => {
        const fid = entry.processingStart - entry.startTime;
        this.recordMetric('FID', fid);
        this.checkThreshold('FID', fid);
      });
    });

    // Cumulative Layout Shift
    this.observePerformanceEntry('layout-shift', (entries) => {
      let clsValue = 0;
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.recordMetric('CLS', clsValue);
      this.checkThreshold('CLS', clsValue);
    });
  }

  /**
   * Setup resource loading monitoring
   */
  setupResourceMonitoring() {
    this.observePerformanceEntry('resource', (entries) => {
      entries.forEach(entry => {
        const resourceType = this.getResourceType(entry.name);
        const loadTime = entry.responseEnd - entry.startTime;
        
        this.recordMetric(`${resourceType}_load_time`, loadTime);
        
        // Monitor large resources
        if (entry.transferSize > 500000) { // 500KB
          this.addAlert('warning', `Large resource detected: ${entry.name} (${this.formatBytes(entry.transferSize)})`);
        }
        
        // Monitor slow resources
        if (loadTime > 2000) {
          this.addAlert('warning', `Slow resource: ${entry.name} (${loadTime.toFixed(0)}ms)`);
        }
      });
    });
  }

  /**
   * Setup navigation timing monitoring
   */
  setupNavigationMonitoring() {
    this.observePerformanceEntry('navigation', (entries) => {
      entries.forEach(entry => {
        const ttfb = entry.responseStart - entry.requestStart;
        const domLoad = entry.domContentLoadedEventEnd - entry.navigationStart;
        const pageLoad = entry.loadEventEnd - entry.navigationStart;
        
        this.recordMetric('TTFB', ttfb);
        this.recordMetric('DOM_load', domLoad);
        this.recordMetric('page_load', pageLoad);
        
        this.checkThreshold('TTFB', ttfb);
        this.checkThreshold('loadTime', pageLoad);
      });
    });
  }

  /**
   * Setup memory monitoring
   */
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        this.recordMetric('memory_used', memory.usedJSHeapSize);
        this.recordMetric('memory_total', memory.totalJSHeapSize);
        this.recordMetric('memory_limit', memory.jsHeapSizeLimit);
        
        // Alert if memory usage is high
        const memoryUsagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        if (memoryUsagePercent > 80) {
          this.addAlert('error', `High memory usage: ${memoryUsagePercent.toFixed(1)}%`);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  /**
   * Setup error monitoring
   */
  setupErrorMonitoring() {
    window.addEventListener('error', (event) => {
      this.addAlert('error', `JavaScript error: ${event.message} at ${event.filename}:${event.lineno}`);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.addAlert('error', `Unhandled promise rejection: ${event.reason}`);
    });
  }

  /**
   * Observe performance entries
   */
  observePerformanceEntry(type, callback) {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          callback(list.getEntries());
        });
        observer.observe({ type, buffered: true });
        this.observers.set(type, observer);
      } catch (error) {
        console.warn(`Failed to observe ${type}:`, error);
      }
    }
  }

  /**
   * Record a performance metric
   */
  recordMetric(name, value, timestamp = Date.now()) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    this.metrics.get(name).push({
      value,
      timestamp
    });
    
    // Keep only last 100 entries per metric
    const entries = this.metrics.get(name);
    if (entries.length > 100) {
      entries.splice(0, entries.length - 100);
    }
  }

  /**
   * Check if metric exceeds threshold
   */
  checkThreshold(metricName, value) {
    const threshold = this.thresholds[metricName];
    if (threshold && value > threshold) {
      this.addAlert('warning', `${metricName} threshold exceeded: ${value.toFixed(0)}ms (threshold: ${threshold}ms)`);
    }
  }

  /**
   * Add performance alert
   */
  addAlert(level, message) {
    const alert = {
      level,
      message,
      timestamp: Date.now()
    };
    
    this.alerts.push(alert);
    
    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts.splice(0, this.alerts.length - 50);
    }
    
    // Log to console
    console[level === 'error' ? 'error' : 'warn'](`Performance Alert [${level}]: ${message}`);
    
    // Send to analytics if configured
    this.sendToAnalytics(alert);
  }

  /**
   * Get resource type from URL
   */
  getResourceType(url) {
    if (url.match(/\.(js|mjs)$/)) return 'script';
    if (url.match(/\.css$/)) return 'stylesheet';
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'font';
    if (url.match(/\.(mp4|webm|ogg)$/)) return 'video';
    return 'other';
  }

  /**
   * Format bytes to human readable format
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get performance report
   */
  getReport() {
    const report = {
      timestamp: Date.now(),
      metrics: {},
      alerts: this.alerts.slice(-10), // Last 10 alerts
      summary: {}
    };

    // Calculate metric summaries
    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        const recentValues = values.slice(-10).map(entry => entry.value);
        report.metrics[name] = {
          current: recentValues[recentValues.length - 1],
          average: recentValues.reduce((a, b) => a + b, 0) / recentValues.length,
          min: Math.min(...recentValues),
          max: Math.max(...recentValues),
          count: values.length
        };
      }
    });

    // Performance summary
    report.summary = {
      score: this.calculatePerformanceScore(),
      status: this.getPerformanceStatus(),
      recommendations: this.getRecommendations()
    };

    return report;
  }

  /**
   * Calculate overall performance score (0-100)
   */
  calculatePerformanceScore() {
    let score = 100;
    const weights = {
      FCP: 0.15,
      LCP: 0.25,
      FID: 0.25,
      CLS: 0.25,
      TTFB: 0.10
    };

    Object.entries(weights).forEach(([metric, weight]) => {
      const values = this.metrics.get(metric);
      if (values && values.length > 0) {
        const currentValue = values[values.length - 1].value;
        const threshold = this.thresholds[metric];
        if (threshold && currentValue > threshold) {
          const penalty = Math.min(50, (currentValue / threshold - 1) * 100);
          score -= penalty * weight;
        }
      }
    });

    return Math.max(0, Math.round(score));
  }

  /**
   * Get performance status
   */
  getPerformanceStatus() {
    const score = this.calculatePerformanceScore();
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 50) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Get performance recommendations
   */
  getRecommendations() {
    const recommendations = [];
    
    // Check each metric and provide recommendations
    const lcpValues = this.metrics.get('LCP');
    if (lcpValues && lcpValues.length > 0) {
      const currentLCP = lcpValues[lcpValues.length - 1].value;
      if (currentLCP > this.thresholds.LCP) {
        recommendations.push('Optimize Largest Contentful Paint by compressing images and reducing server response times');
      }
    }

    const clsValues = this.metrics.get('CLS');
    if (clsValues && clsValues.length > 0) {
      const currentCLS = clsValues[clsValues.length - 1].value;
      if (currentCLS > this.thresholds.CLS) {
        recommendations.push('Reduce Cumulative Layout Shift by setting dimensions for images and ads');
      }
    }

    return recommendations;
  }

  /**
   * Send metrics to analytics service
   */
  sendToAnalytics(data) {
    // This would integrate with your analytics service
    // For now, we'll just store it locally
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_alert', {
        event_category: 'Performance',
        event_label: data.level,
        value: 1
      });
    }
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.isMonitoring = false;
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  // Initialize after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => performanceMonitor.init(), 1000);
    });
  } else {
    setTimeout(() => performanceMonitor.init(), 1000);
  }
}

export default performanceMonitor;