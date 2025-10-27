// Clear browser cache and service worker cache
// This script helps resolve manifest and cache issues

(function() {
  'use strict';

  // Clear service worker caches
  if ('serviceWorker' in navigator && 'caches' in window) {
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      console.log('All caches cleared');
      
      // Unregister service worker
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
          console.log('Service worker unregistered');
        }
      });
      
      // Reload page after clearing
      setTimeout(function() {
        window.location.reload(true);
      }, 1000);
    });
  }

  // Clear localStorage and sessionStorage
  if (typeof Storage !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
    console.log('Storage cleared');
  }

  console.log('Cache clearing initiated. Page will reload in 1 second.');
})();