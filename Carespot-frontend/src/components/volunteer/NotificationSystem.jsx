// src/components/volunteer/NotificationSystem.jsx

import { useState, useEffect } from 'react';
import { Badge } from '../atoms/Badge/Badge';
import { Button } from '../atoms/Button/Button';
import { Toast } from '../atoms/Toast/Toast';

const NotificationSystem = ({ userId, onNotificationClick }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
    
    // Set up real-time notifications (WebSocket or polling)
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    
    return () => clearInterval(interval);
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Mock API call - replace with actual notification service
      const mockNotifications = [
        {
          id: 'notif_1',
          type: 'application_status',
          title: 'Application Status Update',
          message: 'Your application for Health Screening Assistant has been approved!',
          data: {
            applicationId: 'app_1',
            opportunityTitle: 'Health Screening Assistant',
            status: 'approved'
          },
          isRead: false,
          createdAt: '2024-10-26T10:30:00Z',
          priority: 'high'
        },
        {
          id: 'notif_2',
          type: 'document_request',
          title: 'Document Required',
          message: 'Additional documents are needed for your Mobile Clinic Assistant application.',
          data: {
            applicationId: 'app_2',
            opportunityTitle: 'Mobile Clinic Assistant',
            documentsNeeded: ['background_check', 'references']
          },
          isRead: false,
          createdAt: '2024-10-26T09:15:00Z',
          priority: 'medium'
        },
        {
          id: 'notif_3',
          type: 'interview_scheduled',
          title: 'Interview Scheduled',
          message: 'Your interview for Community Health Educator has been scheduled for October 30th at 2:00 PM.',
          data: {
            applicationId: 'app_3',
            opportunityTitle: 'Community Health Educator',
            interviewDate: '2024-10-30T14:00:00Z',
            location: 'CareSpot Office, Accra'
          },
          isRead: true,
          createdAt: '2024-10-25T16:45:00Z',
          priority: 'high'
        },
        {
          id: 'notif_4',
          type: 'opportunity_match',
          title: 'New Opportunity Match',
          message: 'We found a new volunteer opportunity that matches your skills: Digital Health Content Creator.',
          data: {
            opportunityId: 'opp_4',
            opportunityTitle: 'Digital Health Content Creator',
            matchScore: 92
          },
          isRead: true,
          createdAt: '2024-10-25T11:20:00Z',
          priority: 'low'
        },
        {
          id: 'notif_5',
          type: 'background_check',
          title: 'Background Check Complete',
          message: 'Your background check has been completed successfully.',
          data: {
            backgroundCheckId: 'bg_1',
            status: 'completed',
            expiresAt: '2025-10-25T00:00:00Z'
          },
          isRead: true,
          createdAt: '2024-10-24T14:30:00Z',
          priority: 'medium'
        },
        {
          id: 'notif_6',
          type: 'assignment_update',
          title: 'Assignment Update',
          message: 'Your volunteer hours for Health Screening Assistant have been approved.',
          data: {
            assignmentId: 'assign_1',
            opportunityTitle: 'Health Screening Assistant',
            hoursApproved: 8,
            totalHours: 28
          },
          isRead: true,
          createdAt: '2024-10-23T17:00:00Z',
          priority: 'low'
        }
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.isRead).length);

    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      // API call to mark notification as read
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, isRead: true }
            : notif
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // API call to mark all notifications as read
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
      
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      // API call to delete notification
      setNotifications(prev => 
        prev.filter(notif => notif.id !== notificationId)
      );
      
      const deletedNotif = notifications.find(n => n.id === notificationId);
      if (deletedNotif && !deletedNotif.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    setShowDropdown(false);
    
    // Navigate based on notification type
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      'application_status': '📋',
      'document_request': '📄',
      'interview_scheduled': '📅',
      'opportunity_match': '🎯',
      'background_check': '✅',
      'assignment_update': '⏰'
    };
    return icons[type] || '📢';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'red',
      'medium': 'yellow',
      'low': 'blue'
    };
    return colors[priority] || 'gray';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return time.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : notifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">
                          {getNotificationIcon(notification.type)}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className={`text-sm font-medium ${
                            !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          
                          <div className="flex items-center space-x-2 ml-2">
                            <Badge 
                              variant={getPriorityColor(notification.priority)}
                              className="text-xs"
                            >
                              {notification.priority}
                            </Badge>
                            
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-xs text-gray-400 hover:text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="text-gray-400 text-4xl mb-4">🔔</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notifications
                </h3>
                <p className="text-gray-600">
                  You're all caught up! New notifications will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full text-sm"
                onClick={() => {
                  setShowDropdown(false);
                  // Navigate to full notifications page
                }}
              >
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

// Real-time notification component for displaying toast notifications
export const RealTimeNotifications = ({ userId }) => {
  const [activeToasts, setActiveToasts] = useState([]);

  useEffect(() => {
    // Set up WebSocket or Server-Sent Events for real-time notifications
    const connectToNotificationStream = () => {
      // Mock real-time notification - replace with actual WebSocket/SSE
      const mockRealTimeNotification = () => {
        const notifications = [
          {
            id: Date.now(),
            type: 'success',
            title: 'Application Approved!',
            message: 'Your application for Health Screening Assistant has been approved.',
            duration: 5000
          },
          {
            id: Date.now() + 1,
            type: 'info',
            title: 'New Opportunity',
            message: 'A new volunteer opportunity matching your skills is available.',
            duration: 4000
          },
          {
            id: Date.now() + 2,
            type: 'warning',
            title: 'Document Required',
            message: 'Please upload your background check document.',
            duration: 6000
          }
        ];

        // Randomly show a notification every 30 seconds (for demo)
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        showToast(randomNotification);
      };

      // Simulate real-time notifications for demo
      const interval = setInterval(mockRealTimeNotification, 30000);
      
      return () => clearInterval(interval);
    };

    const cleanup = connectToNotificationStream();
    return cleanup;
  }, [userId]);

  const showToast = (notification) => {
    setActiveToasts(prev => [...prev, notification]);
    
    // Auto-remove toast after duration
    setTimeout(() => {
      setActiveToasts(prev => prev.filter(toast => toast.id !== notification.id));
    }, notification.duration || 5000);
  };

  const removeToast = (toastId) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== toastId));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {activeToasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          title={toast.title}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};

export default NotificationSystem;