// Analytics API utility functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class AnalyticsAPI {
  constructor() {
    this.baseURL = `${API_BASE_URL}/analytics`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Analytics API request failed:', error);
      throw error;
    }
  }

  // Dashboard data
  async getDashboardData() {
    return this.request('/dashboard/');
  }

  // Real-time statistics
  async getRealTimeStats() {
    return this.request('/dashboard/');
  }

  // Geographic impact data
  async getGeographicData() {
    return this.request('/dashboard/');
  }

  // Donation analytics
  async getDonationAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/donations/?${queryString}`);
  }

  // Volunteer metrics
  async getVolunteerMetrics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/volunteers/?${queryString}`);
  }

  // Content analytics
  async getContentAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/content/?${queryString}`);
  }

  // User behavior analytics
  async getUserBehaviorAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/user-behavior/?${queryString}`);
  }

  // System metrics
  async getSystemMetrics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/system-metrics/?${queryString}`);
  }

  // Track page view
  async trackPageView(data) {
    return this.request('/track-page-view/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Track user action
  async trackUserAction(data) {
    return this.request('/track-user-action/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Generate custom report
  async generateCustomReport(config) {
    return this.request('/reports/generate/', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  // Get generated reports
  async getGeneratedReports() {
    return this.request('/reports/');
  }

  // Download report
  async downloadReport(reportId) {
    const response = await fetch(`${this.baseURL}/reports/${reportId}/download/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.blob();
  }
}

// Create and export a singleton instance
const analyticsAPI = new AnalyticsAPI();

// Utility functions for common analytics tasks
export const trackPageView = (pageData) => {
  const data = {
    page_url: window.location.href,
    page_title: document.title,
    referrer_url: document.referrer,
    session_id: getSessionId(),
    device_type: getDeviceType(),
    browser: getBrowserInfo(),
    ...pageData,
  };
  
  return analyticsAPI.trackPageView(data);
};

export const trackUserAction = (actionData) => {
  const data = {
    page_url: window.location.href,
    session_id: getSessionId(),
    ...actionData,
  };
  
  return analyticsAPI.trackUserAction(data);
};

// Helper functions
function getSessionId() {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

function getDeviceType() {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'chrome';
  if (userAgent.includes('Firefox')) return 'firefox';
  if (userAgent.includes('Safari')) return 'safari';
  if (userAgent.includes('Edge')) return 'edge';
  return 'other';
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default analyticsAPI;