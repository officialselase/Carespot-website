/**
 * CareSpot Theme Manager
 * Handles automatic dark/light mode detection and theme switching
 */

class ThemeManager {
  constructor() {
    this.themes = {
      LIGHT: 'light',
      DARK: 'dark',
      HIGH_CONTRAST: 'high-contrast',
      AUTO: 'auto'
    };
    
    this.currentTheme = this.getStoredTheme() || this.themes.AUTO;
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.contrastQuery = window.matchMedia('(prefers-contrast: high)');
    this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    // Set initial theme
    this.applyTheme(this.currentTheme);
    
    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    this.contrastQuery.addEventListener('change', this.handleContrastChange.bind(this));
    this.reducedMotionQuery.addEventListener('change', this.handleReducedMotionChange.bind(this));
    
    // Listen for storage changes (for cross-tab synchronization)
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    
    // Apply initial accessibility preferences
    this.applyAccessibilityPreferences();
  }

  /**
   * Get stored theme preference
   */
  getStoredTheme() {
    try {
      return localStorage.getItem('carespot-theme');
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
      return null;
    }
  }

  /**
   * Store theme preference
   */
  setStoredTheme(theme) {
    try {
      localStorage.setItem('carespot-theme', theme);
    } catch (error) {
      console.warn('Failed to store theme in localStorage:', error);
    }
  }

  /**
   * Get system theme preference
   */
  getSystemTheme() {
    if (this.contrastQuery.matches) {
      return this.themes.HIGH_CONTRAST;
    }
    return this.mediaQuery.matches ? this.themes.DARK : this.themes.LIGHT;
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    const root = document.documentElement;
    
    // Remove existing theme attributes
    root.removeAttribute('data-theme');
    root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
    
    let effectiveTheme = theme;
    
    // Handle auto theme
    if (theme === this.themes.AUTO) {
      effectiveTheme = this.getSystemTheme();
    }
    
    // Apply theme
    if (effectiveTheme !== this.themes.LIGHT) {
      root.setAttribute('data-theme', effectiveTheme);
      root.classList.add(`theme-${effectiveTheme}`);
    } else {
      root.classList.add('theme-light');
    }
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(effectiveTheme);
    
    // Dispatch theme change event
    this.dispatchThemeChangeEvent(effectiveTheme);
    
    this.currentTheme = theme;
  }

  /**
   * Update meta theme-color for mobile browsers
   */
  updateMetaThemeColor(theme) {
    let themeColor;
    
    switch (theme) {
      case this.themes.DARK:
        themeColor = '#111827'; // neutral-900 dark
        break;
      case this.themes.HIGH_CONTRAST:
        themeColor = '#000000';
        break;
      default:
        themeColor = '#dc2626'; // primary-600
    }
    
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = themeColor;
  }

  /**
   * Apply accessibility preferences
   */
  applyAccessibilityPreferences() {
    const root = document.documentElement;
    
    // Handle reduced motion preference
    if (this.reducedMotionQuery.matches) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Handle high contrast preference
    if (this.contrastQuery.matches && this.currentTheme === this.themes.AUTO) {
      this.applyTheme(this.themes.HIGH_CONTRAST);
    }
  }

  /**
   * Set theme
   */
  setTheme(theme) {
    if (!Object.values(this.themes).includes(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }
    
    this.applyTheme(theme);
    this.setStoredTheme(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const currentEffectiveTheme = this.currentTheme === this.themes.AUTO 
      ? this.getSystemTheme() 
      : this.currentTheme;
    
    const newTheme = currentEffectiveTheme === this.themes.DARK 
      ? this.themes.LIGHT 
      : this.themes.DARK;
    
    this.setTheme(newTheme);
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Get effective theme (resolves AUTO to actual theme)
   */
  getEffectiveTheme() {
    return this.currentTheme === this.themes.AUTO 
      ? this.getSystemTheme() 
      : this.currentTheme;
  }

  /**
   * Check if dark mode is active
   */
  isDarkMode() {
    return this.getEffectiveTheme() === this.themes.DARK;
  }

  /**
   * Check if high contrast mode is active
   */
  isHighContrast() {
    return this.getEffectiveTheme() === this.themes.HIGH_CONTRAST;
  }

  /**
   * Handle system theme change
   */
  handleSystemThemeChange() {
    if (this.currentTheme === this.themes.AUTO) {
      this.applyTheme(this.themes.AUTO);
    }
  }

  /**
   * Handle contrast preference change
   */
  handleContrastChange() {
    this.applyAccessibilityPreferences();
    if (this.currentTheme === this.themes.AUTO) {
      this.applyTheme(this.themes.AUTO);
    }
  }

  /**
   * Handle reduced motion preference change
   */
  handleReducedMotionChange() {
    this.applyAccessibilityPreferences();
  }

  /**
   * Handle storage change (cross-tab synchronization)
   */
  handleStorageChange(event) {
    if (event.key === 'carespot-theme' && event.newValue !== this.currentTheme) {
      this.currentTheme = event.newValue || this.themes.AUTO;
      this.applyTheme(this.currentTheme);
    }
  }

  /**
   * Dispatch theme change event
   */
  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themechange', {
      detail: {
        theme,
        isDark: theme === this.themes.DARK,
        isHighContrast: theme === this.themes.HIGH_CONTRAST
      }
    });
    document.dispatchEvent(event);
  }

  /**
   * Get available themes
   */
  getAvailableThemes() {
    return Object.values(this.themes);
  }

  /**
   * Destroy theme manager (cleanup)
   */
  destroy() {
    this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
    this.contrastQuery.removeEventListener('change', this.handleContrastChange.bind(this));
    this.reducedMotionQuery.removeEventListener('change', this.handleReducedMotionChange.bind(this));
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }
}

// Create singleton instance
const themeManager = new ThemeManager();

// Export for use in React components
export default themeManager;

// Export theme constants for convenience
export const THEMES = themeManager.themes;