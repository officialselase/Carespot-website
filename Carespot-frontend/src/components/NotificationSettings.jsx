import { useState, useEffect } from 'react';
import notificationService from '../utils/notificationService';

const NotificationSettings = () => {
  const [notificationStatus, setNotificationStatus] = useState({
    supported: false,
    subscribed: false,
    permission: 'default'
  });
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    donations: true,
    volunteers: true,
    projects: true,
    emergencies: true,
    newsletters: false
  });

  useEffect(() => {
    checkNotificationStatus();
    loadPreferences();
  }, []);

  const checkNotificationStatus = async () => {
    const status = await notificationService.getSubscriptionStatus();
    setNotificationStatus(status);
  };

  const loadPreferences = () => {
    const saved = localStorage.getItem('notification-preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  };

  const savePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('notification-preferences', JSON.stringify(newPreferences));
  };

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      // Initialize service
      const initialized = await notificationService.initialize();
      if (!initialized) {
        alert('Notifications are not supported on this device/browser.');
        return;
      }

      // Request permission
      const permitted = await notificationService.requestPermission();
      if (!permitted) {
        alert('Notification permission was denied. Please enable it in your browser settings.');
        return;
      }

      // Subscribe to push notifications
      const subscription = await notificationService.subscribeToPush();
      if (subscription) {
        await checkNotificationStatus();
        
        // Show welcome notification
        await notificationService.showLocalNotification(
          'Notifications Enabled! 🔔',
          {
            body: 'You\'ll now receive updates about our health initiatives and impact.',
            tag: 'welcome'
          }
        );
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
      alert('Failed to enable notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setLoading(true);
    try {
      const success = await notificationService.unsubscribeFromPush();
      if (success) {
        await checkNotificationStatus();
      }
    } catch (error) {
      console.error('Failed to disable notifications:', error);
      alert('Failed to disable notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    savePreferences(newPreferences);
  };

  const testNotification = async () => {
    if (notificationStatus.permission !== 'granted') {
      alert('Please enable notifications first.');
      return;
    }

    await notificationService.showLocalNotification(
      'Test Notification 🧪',
      {
        body: 'This is a test notification from CareSpot!',
        tag: 'test'
      }
    );
  };

  if (!notificationStatus.supported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-yellow-800">
            Push notifications are not supported on this device or browser.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
          <p className="text-sm text-gray-600 mt-1">
            Stay updated on our health initiatives and community impact
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            notificationStatus.subscribed ? 'bg-green-500' : 'bg-gray-300'
          }`}></div>
          <span className="text-sm text-gray-600">
            {notificationStatus.subscribed ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Enable/Disable Toggle */}
      <div className="mb-6">
        {!notificationStatus.subscribed ? (
          <button
            onClick={handleEnableNotifications}
            disabled={loading}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.5 4H9v1H5.5a3 3 0 00-2.121.879L4.828 4.828zM15 8V4.5A2.5 2.5 0 0012.5 2H8v1h4.5A1.5 1.5 0 0114 4.5V8h1z" />
              </svg>
            )}
            <span>{loading ? 'Enabling...' : 'Enable Notifications'}</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={testNotification}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              </svg>
              <span>Test Notification</span>
            </button>
            
            <button
              onClick={handleDisableNotifications}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                </svg>
              )}
              <span>{loading ? 'Disabling...' : 'Disable Notifications'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      {notificationStatus.subscribed && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Notification Types</h4>
          
          <div className="space-y-3">
            {[
              { key: 'donations', label: 'Donation Updates', description: 'New donations and fundraising milestones' },
              { key: 'volunteers', label: 'Volunteer Opportunities', description: 'New volunteer positions and updates' },
              { key: 'projects', label: 'Project Updates', description: 'Progress on health initiatives and programs' },
              { key: 'emergencies', label: 'Emergency Alerts', description: 'Urgent health alerts and emergency responses' },
              { key: 'newsletters', label: 'Newsletter', description: 'Monthly updates and impact reports' }
            ].map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-600">{description}</div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences[key]}
                    onChange={(e) => handlePreferenceChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;