// Image optimization utilities

/**
 * Generate responsive image sources for different screen sizes
 * @param {string} baseSrc - Base image source
 * @param {Object} options - Configuration options
 * @returns {Object} Responsive image sources
 */
export const generateResponsiveImages = (baseSrc, options = {}) => {
  const {
    sizes = [320, 640, 768, 1024, 1280, 1920],
    formats = ['webp', 'jpg'],
    quality = 80
  } = options;

  const sources = {};
  
  formats.forEach(format => {
    sources[format] = sizes.map(size => ({
      src: `${baseSrc}?w=${size}&q=${quality}&f=${format}`,
      width: size,
      media: `(max-width: ${size}px)`
    }));
  });

  return sources;
};

/**
 * Create optimized image URL with parameters
 * @param {string} src - Original image source
 * @param {Object} options - Optimization options
 * @returns {string} Optimized image URL
 */
export const optimizeImageUrl = (src, options = {}) => {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'cover'
  } = options;

  if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  const params = new URLSearchParams();
  
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  params.append('q', quality);
  params.append('f', format);
  params.append('fit', fit);

  return `${src}${src.includes('?') ? '&' : '?'}${params.toString()}`;
};

/**
 * Preload critical images
 * @param {Array} imageSources - Array of image sources to preload
 */
export const preloadImages = (imageSources) => {
  imageSources.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Convert image to WebP format if supported
 * @param {string} src - Original image source
 * @returns {string} WebP image source or original if not supported
 */
export const getWebPImage = (src) => {
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  if (!supportsWebP || !src) return src;
  
  // Convert to WebP if it's not already
  if (src.includes('.webp')) return src;
  
  return optimizeImageUrl(src, { format: 'webp' });
};

/**
 * Calculate optimal image dimensions based on container and device pixel ratio
 * @param {Object} container - Container dimensions
 * @param {number} devicePixelRatio - Device pixel ratio
 * @returns {Object} Optimal dimensions
 */
export const calculateOptimalDimensions = (container, devicePixelRatio = window.devicePixelRatio || 1) => {
  const { width, height } = container;
  
  return {
    width: Math.ceil(width * devicePixelRatio),
    height: Math.ceil(height * devicePixelRatio)
  };
};

/**
 * Image compression utility for client-side optimization
 * @param {File} file - Image file to compress
 * @param {Object} options - Compression options
 * @returns {Promise<Blob>} Compressed image blob
 */
export const compressImage = (file, options = {}) => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    format = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, format, quality);
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Lazy loading observer for images
 * @param {Function} callback - Callback when image enters viewport
 * @param {Object} options - Intersection observer options
 * @returns {IntersectionObserver} Observer instance
 */
export const createImageObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

/**
 * Progressive image loading with blur effect
 * @param {HTMLImageElement} img - Image element
 * @param {string} lowQualitySrc - Low quality placeholder
 * @param {string} highQualitySrc - High quality source
 */
export const loadProgressiveImage = (img, lowQualitySrc, highQualitySrc) => {
  // Load low quality first
  img.src = lowQualitySrc;
  img.style.filter = 'blur(5px)';
  img.style.transition = 'filter 0.3s';

  // Preload high quality
  const highQualityImg = new Image();
  highQualityImg.onload = () => {
    img.src = highQualitySrc;
    img.style.filter = 'blur(0)';
  };
  highQualityImg.src = highQualitySrc;
};