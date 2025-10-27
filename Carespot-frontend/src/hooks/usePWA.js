import { useState, useEffect } from 'react';

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
      
      // Check for iOS Safari standalone mode
      if (window.navigator.standalone === true) {
        setIsInstalled(true);
      }
    };

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log('PWA: beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      console.log('PWA: App was installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial checks
    checkIfInstalled();

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      console.log('PWA: No deferred prompt available');
      return false;
    }

    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`PWA: User response to install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('PWA: Error during installation:', error);
      return false;
    }
  };

  const shareApp = async (shareData = {}) => {
    const defaultShareData = {
      title: 'CareSpot - Community Health Initiative',
      text: 'Join us in improving healthcare access for underserved communities',
      url: window.location.origin,
    };

    const dataToShare = { ...defaultShareData, ...shareData };

    if (navigator.share) {
      try {
        await navigator.share(dataToShare);
        return true;
      } catch (error) {
        console.error('PWA: Error sharing:', error);
        return false;
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(dataToShare.url);
          return true;
        } catch (error) {
          console.error('PWA: Error copying to clipboard:', error);
          return false;
        }
      }
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    shareApp,
    canShare: !!navigator.share,
  };
};