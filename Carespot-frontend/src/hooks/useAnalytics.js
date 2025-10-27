import { useState, useEffect, useCallback } from 'react';
import analyticsAPI, { trackPageView, trackUserAction } from '../utils/analyticsApi';

// Hook for dashboard analytics data
export const useAnalyticsDashboard = (refreshInterval = 30000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const dashboardData = await analyticsAPI.getDashboardData();
      setData(dashboardData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Set up auto-refresh if interval is provided
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for donation analytics
export const useDonationAnalytics = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const donationData = await analyticsAPI.getDonationAnalytics(params);
      setData(donationData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch donation analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for volunteer metrics
export const useVolunteerMetrics = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const volunteerData = await analyticsAPI.getVolunteerMetrics(params);
      setData(volunteerData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch volunteer metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for content analytics
export const useContentAnalytics = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const contentData = await analyticsAPI.getContentAnalytics(params);
      setData(contentData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch content analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for tracking page views automatically
export const usePageViewTracking = (pageData = {}) => {
  useEffect(() => {
    const trackView = async () => {
      try {
        await trackPageView(pageData);
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Track page view on mount
    trackView();

    // Track page view on visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackView();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pageData]);
};

// Hook for tracking user actions
export const useActionTracking = () => {
  const trackAction = useCallback(async (actionData) => {
    try {
      await trackUserAction(actionData);
    } catch (error) {
      console.error('Failed to track user action:', error);
    }
  }, []);

  return { trackAction };
};

// Hook for custom report generation
export const useCustomReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const reportsData = await analyticsAPI.getGeneratedReports();
      setReports(reportsData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateReport = useCallback(async (config) => {
    try {
      setError(null);
      setLoading(true);
      const newReport = await analyticsAPI.generateCustomReport(config);
      setReports(prev => [newReport, ...prev]);
      return newReport;
    } catch (err) {
      setError(err.message);
      console.error('Failed to generate report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadReport = useCallback(async (reportId) => {
    try {
      const blob = await analyticsAPI.downloadReport(reportId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download report:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reports,
    loading,
    error,
    generateReport,
    downloadReport,
    refetch: fetchReports
  };
};

// Hook for real-time metrics with WebSocket support (future enhancement)
export const useRealTimeMetrics = (metricTypes = []) => {
  const [metrics, setMetrics] = useState({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // For now, we'll use polling instead of WebSocket
    // In a real implementation, this would establish a WebSocket connection
    const fetchMetrics = async () => {
      try {
        const data = await analyticsAPI.getDashboardData();
        setMetrics(data);
        setConnected(true);
      } catch (error) {
        console.error('Failed to fetch real-time metrics:', error);
        setConnected(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [metricTypes]);

  return { metrics, connected };
};