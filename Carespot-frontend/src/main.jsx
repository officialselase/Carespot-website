import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import notificationService from './utils/notificationService.js'
import { initializeCDN } from './utils/cdnUtils.js'
import performanceMonitor from './utils/performanceMonitor.js'

// Initialize performance optimizations
initializeCDN();

// Register service worker for PWA functionality (production only)
if ('serviceWorker' in navigator && !import.meta.env.DEV) {
  window.addEventListener('load', async () => {
    try {
      await notificationService.initialize();
      console.log('PWA: Service worker registered successfully');
    } catch (error) {
      console.error('PWA: Service worker registration failed:', error);
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
