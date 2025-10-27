// CDN utilities for static asset optimization

// CDN configuration
const CDN_CONFIG = {
  // Primary CDN (can be configured via environment variables)
  primary: import.meta.env.VITE_CDN_URL || '',
  
  // Fallback CDNs
  fallbacks: [
    import.meta.env.VITE_CDN_FALLBACK_1 || '',
    import.meta.env.VITE_CDN_FALLBACK_2 || ''
  ].filter(Boolean),
  
  // Asset types that should use CDN
  assetTypes: ['images', 'fonts', 'videos', 'documents'],
  
  // Cache settings
  cache: {
    images: '31536000', // 1 year
    fonts: '31536000',  // 1 year
    videos: '2592000',  // 30 days
    documents: '86400'  // 1 day
  }
};

/**
 * Get CDN URL for an asset
 * @param {string} assetPath - Relative path to the asset
 * @param {string} assetType - Type of asset (images, fonts, videos, documents)
 * @returns {string} CDN URL or original path if CDN not configured
 */
export const getCDNUrl = (assetPath, assetType = 'images') => {
  if (!CDN_CONFIG.primary || !assetPath) {
    return assetPath;
  }

  // Remove leading slash if present
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  
  // Construct CDN URL
  const cdnUrl = `${CDN_CONFIG.primary}/${cleanPath}`;
  
  return cdnUrl;
};

/**
 * Get multiple CDN URLs with fallbacks
 * @param {string} assetPath - Relative path to the asset
 * @param {string} assetType - Type of asset
 * @returns {Array} Array of CDN URLs including fallbacks
 */
export const getCDNUrlsWithFallbacks = (assetPath, assetType = 'images') => {
  const urls = [getCDNUrl(assetPath, assetType)];
  
  // Add fallback CDNs
  CDN_CONFIG.fallbacks.forEach(fallbackCdn => {
    if (fallbackCdn) {
      const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
      urls.push(`${fallbackCdn}/${cleanPath}`);
    }
  });
  
  // Add original path as final fallback
  urls.push(assetPath);
  
  return urls;
};

/**
 * Preload critical assets from CDN
 * @param {Array} assets - Array of asset objects with path and type
 */
export const preloadCriticalAssets = (assets) => {
  assets.forEach(({ path, type = 'images', as = 'image' }) => {
    const cdnUrl = getCDNUrl(path, type);
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = cdnUrl;
    
    // Add crossorigin for fonts
    if (as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Create resource hints for CDN domains
 */
export const addCDNResourceHints = () => {
  const domains = [CDN_CONFIG.primary, ...CDN_CONFIG.fallbacks]
    .filter(Boolean)
    .map(url => new URL(url).hostname);
  
  domains.forEach(domain => {
    // DNS prefetch
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = `//${domain}`;
    document.head.appendChild(dnsPrefetch);
    
    // Preconnect for primary CDN
    if (domain === new URL(CDN_CONFIG.primary || '').hostname) {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = `//${domain}`;
      preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
    }
  });
};

/**
 * Image CDN with transformation parameters
 * @param {string} imagePath - Path to the image
 * @param {Object} transformations - Image transformation options
 * @returns {string} CDN URL with transformations
 */
export const getImageCDNUrl = (imagePath, transformations = {}) => {
  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    fit = 'cover',
    blur,
    brightness,
    contrast,
    saturation
  } = transformations;

  let cdnUrl = getCDNUrl(imagePath, 'images');
  
  // Add transformation parameters
  const params = new URLSearchParams();
  
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  if (quality !== 80) params.append('q', quality);
  if (format !== 'auto') params.append('f', format);
  if (fit !== 'cover') params.append('fit', fit);
  if (blur) params.append('blur', blur);
  if (brightness) params.append('brightness', brightness);
  if (contrast) params.append('contrast', contrast);
  if (saturation) params.append('saturation', saturation);
  
  if (params.toString()) {
    cdnUrl += `${cdnUrl.includes('?') ? '&' : '?'}${params.toString()}`;
  }
  
  return cdnUrl;
};

/**
 * Font CDN utilities
 */
export const getFontCDNUrl = (fontPath) => {
  return getCDNUrl(fontPath, 'fonts');
};

/**
 * Video CDN utilities
 */
export const getVideoCDNUrl = (videoPath, options = {}) => {
  const { quality = 'auto', format = 'auto' } = options;
  
  let cdnUrl = getCDNUrl(videoPath, 'videos');
  
  const params = new URLSearchParams();
  if (quality !== 'auto') params.append('q', quality);
  if (format !== 'auto') params.append('f', format);
  
  if (params.toString()) {
    cdnUrl += `${cdnUrl.includes('?') ? '&' : '?'}${params.toString()}`;
  }
  
  return cdnUrl;
};

/**
 * Check if CDN is available
 * @param {string} cdnUrl - CDN URL to check
 * @returns {Promise<boolean>} Whether CDN is available
 */
export const checkCDNAvailability = async (cdnUrl) => {
  try {
    const response = await fetch(`${cdnUrl}/health-check`, {
      method: 'HEAD',
      mode: 'no-cors'
    });
    return true;
  } catch (error) {
    console.warn(`CDN ${cdnUrl} is not available:`, error);
    return false;
  }
};

/**
 * Initialize CDN optimizations
 */
export const initializeCDN = () => {
  // Add resource hints
  addCDNResourceHints();
  
  // Preload critical assets
  const criticalAssets = [
    { path: '/images/hero-bg.jpg', type: 'images' },
    { path: '/images/logo.svg', type: 'images' },
    { path: '/fonts/inter-var.woff2', type: 'fonts', as: 'font' }
  ];
  
  preloadCriticalAssets(criticalAssets);
  
  console.log('CDN optimization initialized');
};

export default {
  getCDNUrl,
  getCDNUrlsWithFallbacks,
  getImageCDNUrl,
  getFontCDNUrl,
  getVideoCDNUrl,
  preloadCriticalAssets,
  addCDNResourceHints,
  checkCDNAvailability,
  initializeCDN
};