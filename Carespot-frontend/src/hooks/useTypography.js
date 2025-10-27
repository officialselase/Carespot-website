import { useState, useEffect } from 'react';

/**
 * Typography accessibility hook
 * Manages typography preferences and accessibility features
 */
export const useTypography = () => {
  const [preferences, setPreferences] = useState({
    dyslexicFont: false,
    highContrast: false,
    fontSize: 'normal', // small, normal, large
    reducedMotion: false
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('typography-preferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.warn('Failed to parse typography preferences:', error);
      }
    }

    // Check for system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

    setPreferences(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prev.highContrast || prefersHighContrast
    }));
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('typography-preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Apply preferences to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply dyslexic font
    if (preferences.dyslexicFont) {
      root.style.setProperty('--font-family-primary', 'var(--font-family-dyslexic)');
      root.style.setProperty('--font-family-heading', 'var(--font-family-dyslexic)');
    } else {
      root.style.removeProperty('--font-family-primary');
      root.style.removeProperty('--font-family-heading');
    }

    // Apply font size scaling
    const fontSizeMultipliers = {
      small: 0.875,
      normal: 1,
      large: 1.125
    };
    
    const multiplier = fontSizeMultipliers[preferences.fontSize] || 1;
    if (multiplier !== 1) {
      root.style.setProperty('--font-size-multiplier', multiplier.toString());
    } else {
      root.style.removeProperty('--font-size-multiplier');
    }

    // Apply high contrast
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetPreferences = () => {
    setPreferences({
      dyslexicFont: false,
      highContrast: false,
      fontSize: 'normal',
      reducedMotion: false
    });
  };

  return {
    preferences,
    updatePreference,
    resetPreferences,
    // Convenience methods
    toggleDyslexicFont: () => updatePreference('dyslexicFont', !preferences.dyslexicFont),
    toggleHighContrast: () => updatePreference('highContrast', !preferences.highContrast),
    setFontSize: (size) => updatePreference('fontSize', size)
  };
};