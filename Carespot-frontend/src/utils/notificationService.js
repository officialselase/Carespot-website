class NotificationService {
  constructor() {
    this.registration = null;
    this.subscription = null;
    this.vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9f53NXYkGkFI-WqJgO6XRdQVcE0G2dLxVA7Y6V6ksaAoRcKdHiF8'; // Replace with your VAPID key
  }

  async initialize() {
    try {
      // Check if service workers are supported
      if (!('serviceWorker' in navigator)) {
        console.warn('Service workers not supported');
        return false;
      }

      // Skip service worker registration in development to avoid conflicts
      if (import.meta.env.DEV) {
        console.log('Skipping Service Worker registration in development mode');
        return false;
      }

      // Check if push messaging is supported
      if (!('PushManager' in window)) {
        console.warn('Push messaging not supported');
        return false;
      }

      // Register service worker
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', this.registration);

      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;

      return true;
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
      return false;
    }
  }

  async requestPermission() {
    try {
      // Check current permission status
      if (Notification.permission === 'granted') {
        return true;
      }

      if (Notification.permission === 'denied') {
        console.warn('Notification permission denied');
        return false;
      }

      // Request permission
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }

  async subscribeToPush() {
    try {
      if (!this.registration) {
        throw new Error('Service worker not registered');
      }

      // Check if already subscribed
      const existingSubscription = await this.registration.pushManager.getSubscription();
      if (existingSubscription) {
        this.subscription = existingSubscription;
        return existingSubscription;
      }

      // Create new subscription
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      });

      this.subscription = subscription;

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);

      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  async unsubscribeFromPush() {
    try {
      if (!this.subscription) {
        return true;
      }

      // Unsubscribe from push notifications
      const success = await this.subscription.unsubscribe();
      
      if (success) {
        // Remove subscription from server
        await this.removeSubscriptionFromServer(this.subscription);
        this.subscription = null;
      }

      return success;
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      return false;
    }
  }

  async sendSubscriptionToServer(subscription) {
    try {
      const response = await fetch('/api/notifications/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Subscription sent to server successfully');
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
      throw error;
    }
  }

  async removeSubscriptionFromServer(subscription) {
    try {
      const response = await fetch('/api/notifications/unsubscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Subscription removed from server successfully');
    } catch (error) {
      console.error('Failed to remove subscription from server:', error);
      throw error;
    }
  }

  async showLocalNotification(title, options = {}) {
    try {
      if (Notification.permission !== 'granted') {
        console.warn('Notification permission not granted');
        return false;
      }

      const defaultOptions = {
        icon: '/icons/carespot-icon.svg',
        badge: '/icons/carespot-icon.svg',
        vibrate: [200, 100, 200],
        data: {
          timestamp: Date.now()
        }
      };

      const notification = new Notification(title, { ...defaultOptions, ...options });

      // Auto-close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return true;
    } catch (error) {
      console.error('Failed to show local notification:', error);
      return false;
    }
  }

  async getSubscriptionStatus() {
    try {
      if (!this.registration) {
        return { subscribed: false, supported: false };
      }

      const subscription = await this.registration.pushManager.getSubscription();
      return {
        subscribed: !!subscription,
        supported: true,
        permission: Notification.permission
      };
    } catch (error) {
      console.error('Failed to get subscription status:', error);
      return { subscribed: false, supported: false, error: error.message };
    }
  }

  // Utility function to convert VAPID key
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Predefined notification types for CareSpot
  async notifyDonationReceived(amount, donor = 'Anonymous') {
    return this.showLocalNotification('New Donation Received! 🎉', {
      body: `${donor} just donated $${amount}. Thank you for supporting our cause!`,
      tag: 'donation',
      actions: [
        { action: 'view', title: 'View Details' },
        { action: 'thank', title: 'Send Thanks' }
      ]
    });
  }

  async notifyVolunteerUpdate(message) {
    return this.showLocalNotification('Volunteer Update', {
      body: message,
      tag: 'volunteer',
      actions: [
        { action: 'view', title: 'View Update' }
      ]
    });
  }

  async notifyProjectUpdate(projectName, update) {
    return this.showLocalNotification(`${projectName} Update`, {
      body: update,
      tag: 'project',
      actions: [
        { action: 'view', title: 'Learn More' }
      ]
    });
  }

  async notifyEmergencyAlert(message) {
    return this.showLocalNotification('Emergency Alert 🚨', {
      body: message,
      tag: 'emergency',
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 200],
      actions: [
        { action: 'view', title: 'View Details' },
        { action: 'help', title: 'How to Help' }
      ]
    });
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;