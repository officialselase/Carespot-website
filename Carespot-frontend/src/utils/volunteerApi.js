// src/utils/volunteerApi.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

class VolunteerAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method for making API requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Volunteer Profile
  async getVolunteerProfile() {
    return this.request('/volunteers/profile/');
  }

  async updateVolunteerProfile(profileData) {
    return this.request('/volunteers/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Skills
  async getSkills() {
    return this.request('/volunteers/skills/');
  }

  async getSkillCategories() {
    return this.request('/volunteers/skill-categories/');
  }

  // Opportunities
  async getOpportunities(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/volunteers/opportunities/${queryParams ? `?${queryParams}` : ''}`);
  }

  async getOpportunity(slug) {
    return this.request(`/volunteers/opportunities/${slug}/`);
  }

  // Applications
  async getApplications() {
    return this.request('/volunteers/applications/');
  }

  async getApplication(applicationId) {
    return this.request(`/volunteers/applications/${applicationId}/`);
  }

  async createApplication(applicationData) {
    return this.request('/volunteers/applications/', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async updateApplication(applicationId, applicationData) {
    return this.request(`/volunteers/applications/${applicationId}/`, {
      method: 'PUT',
      body: JSON.stringify(applicationData),
    });
  }

  async submitApplication(applicationId) {
    return this.request(`/volunteers/applications/${applicationId}/submit/`, {
      method: 'POST',
    });
  }

  async withdrawApplication(applicationId) {
    return this.request(`/volunteers/applications/${applicationId}/`, {
      method: 'DELETE',
    });
  }

  // Documents
  async uploadDocument(applicationId, documentType, file) {
    const formData = new FormData();
    formData.append('application', applicationId);
    formData.append('document_type', documentType);
    formData.append('file', file);
    formData.append('title', file.name);

    return this.request('/volunteers/documents/', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
      body: formData,
    });
  }

  async getDocuments(applicationId) {
    return this.request(`/volunteers/documents/?application=${applicationId}`);
  }

  async deleteDocument(documentId) {
    return this.request(`/volunteers/documents/${documentId}/`, {
      method: 'DELETE',
    });
  }

  // Document Templates
  async getDocumentTemplates() {
    return this.request('/volunteers/document-templates/');
  }

  // Assignments
  async getAssignments() {
    return this.request('/volunteers/assignments/');
  }

  async getAssignment(assignmentId) {
    return this.request(`/volunteers/assignments/${assignmentId}/`);
  }

  // Time Logs
  async getTimeLogs(assignmentId = null) {
    const params = assignmentId ? `?assignment=${assignmentId}` : '';
    return this.request(`/volunteers/time-logs/${params}`);
  }

  async createTimeLog(timeLogData) {
    return this.request('/volunteers/time-logs/', {
      method: 'POST',
      body: JSON.stringify(timeLogData),
    });
  }

  async updateTimeLog(timeLogId, timeLogData) {
    return this.request(`/volunteers/time-logs/${timeLogId}/`, {
      method: 'PUT',
      body: JSON.stringify(timeLogData),
    });
  }

  // Statistics
  async getVolunteerStats() {
    return this.request('/volunteers/stats/');
  }

  async getDocumentStats() {
    return this.request('/volunteers/document-stats/');
  }

  // Notifications (if implemented)
  async getNotifications() {
    return this.request('/notifications/');
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read/`, {
      method: 'POST',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/mark-all-read/', {
      method: 'POST',
    });
  }

  // Background Check Integration
  async getBackgroundCheckStatus(applicationId) {
    return this.request(`/volunteers/applications/${applicationId}/background-check/`);
  }

  async uploadBackgroundCheckDocument(applicationId, file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', 'background_check');

    return this.request(`/volunteers/applications/${applicationId}/background-check/upload/`, {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  async initiateBackgroundCheck(applicationId) {
    return this.request(`/volunteers/applications/${applicationId}/background-check/initiate/`, {
      method: 'POST',
    });
  }

  // Opportunity Matching
  async getMatchedOpportunities(profileData = null) {
    const body = profileData ? JSON.stringify(profileData) : null;
    return this.request('/volunteers/opportunities/matched/', {
      method: body ? 'POST' : 'GET',
      body,
    });
  }

  // Search
  async searchOpportunities(query, filters = {}) {
    const params = new URLSearchParams({
      search: query,
      ...filters,
    }).toString();
    return this.request(`/volunteers/opportunities/?${params}`);
  }

  // File Upload Helper
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    return this.request(endpoint, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }
}

// Create and export a singleton instance
const volunteerAPI = new VolunteerAPI();

export default volunteerAPI;

// Export individual methods for convenience
export const {
  getVolunteerProfile,
  updateVolunteerProfile,
  getSkills,
  getSkillCategories,
  getOpportunities,
  getOpportunity,
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  submitApplication,
  withdrawApplication,
  uploadDocument,
  getDocuments,
  deleteDocument,
  getDocumentTemplates,
  getAssignments,
  getAssignment,
  getTimeLogs,
  createTimeLog,
  updateTimeLog,
  getVolunteerStats,
  getDocumentStats,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getBackgroundCheckStatus,
  uploadBackgroundCheckDocument,
  initiateBackgroundCheck,
  getMatchedOpportunities,
  searchOpportunities,
  uploadFile,
} = volunteerAPI;