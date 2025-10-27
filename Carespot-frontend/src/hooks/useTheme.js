/**
 * CareSpot Theme Hook
 * React hook for theme management and automatic dark/light mode detection
 */

import { useState, useEffect } from 'react';
import themeManager, { THEMES } from '../utils/themeManager';

/**
 * Custom hook for theme management
 */
export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(themeManager.getCurrentTheme());
  const [effectiveTheme, setEffectiveTheme] = useState(themeManager.getEffectiveTheme());
  const [isDark, setIsDark] = useState(themeManager.isDarkMode());
  const [isHighContrast, setIsHighContrast] = useState(themeManager.isHighContrast());

  useEffect(() => {
    const handleThemeChange = (event) => {
      setCurrentTheme(themeManager.getCurrentTheme());
      setEffectiveTheme(event.detail.theme);
      setIsDark(event.detail.isDark);
      setIsHighContrast(event.detail.isHighContrast);
    };

    // Listen for theme changes
    document.addEventListener('themechange', handleThemeChange);

    // Cleanup
    return () => {
      document.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  const setTheme = (theme) => {
    themeManager.setTheme(theme);
  };

  const toggleTheme = () => {
    themeManager.toggleTheme();
  };

  return {
    // Current theme state
    theme: currentTheme,
    effectiveTheme,
    isDark,
    isHighContrast,
    
    // Theme actions
    setTheme,
    toggleTheme,
    
    // Available themes
    themes: THEMES,
    availableThemes: themeManager.getAvailableThemes(),
    
    // Utility functions
    isTheme: (theme) => effectiveTheme === theme,
    isAutoTheme: () => currentTheme === THEMES.AUTO
  };
}

/**
 * Hook for system preferences
 */
export function useSystemPreferences() {
  const [preferences, setPreferences] = useState({
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    contrast: window.matchMedia('(prefers-contrast: high)').matches ? 'high' : 'normal',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });

  useEffect(() => {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreferences = () => {
      setPreferences({
        colorScheme: colorSchemeQuery.matches ? 'dark' : 'light',
        contrast: contrastQuery.matches ? 'high' : 'normal',
        reducedMotion: reducedMotionQuery.matches
      });
    };

    // Add listeners
    colorSchemeQuery.addEventListener('change', updatePreferences);
    contrastQuery.addEventListener('change', updatePreferences);
    reducedMotionQuery.addEventListener('change', updatePreferences);

    // Cleanup
    return () => {
      colorSchemeQuery.removeEventListener('change', updatePreferences);
      contrastQuery.removeEventListener('change', updatePreferences);
      reducedMotionQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  return preferences;
}

/**
 * Hook for color accessibility validation
 */
export function useColorValidation() {
  const [validationResults, setValidationResults] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateColors = async () => {
    setIsValidating(true);
    
    try {
      // Dynamic import to avoid loading color utils unless needed
      const { validateColorSystem } = await import('../utils/colorUtils');
      const results = validateColorSystem();
      setValidationResults(results);
    } catch (error) {
      console.error('Color validation failed:', error);
      setValidationResults(null);
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    // Validate colors when theme changes
    const handleThemeChange = () => {
      // Delay validation to allow CSS variables to update
      setTimeout(validateColors, 100);
    };

    document.addEventListener('themechange', handleThemeChange);

    // Initial validation
    validateColors();

    return () => {
      document.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  return {
    validationResults,
    isValidating,
    validateColors
  };
}

export default useTheme;