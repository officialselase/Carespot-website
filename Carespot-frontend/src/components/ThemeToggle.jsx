/**
 * CareSpot Theme Toggle Component
 * Provides UI for switching between light, dark, and auto themes
 */

import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = ({ 
  variant = 'button', // 'button', 'dropdown', 'switch'
  showLabels = true,
  className = '',
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const { theme, effectiveTheme, isDark, setTheme, toggleTheme, themes, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: 'text-sm p-2',
    md: 'text-base p-3',
    lg: 'text-lg p-4'
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Theme icons
  const ThemeIcon = ({ themeName, className: iconClassName = '' }) => {
    const baseClasses = `${iconSize[size]} ${iconClassName}`;
    
    switch (themeName) {
      case themes.LIGHT:
        return (
          <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case themes.DARK:
        return (
          <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case themes.HIGH_CONTRAST:
        return (
          <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case themes.AUTO:
      default:
        return (
          <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Theme labels
  const getThemeLabel = (themeName) => {
    const labels = {
      [themes.LIGHT]: 'Light',
      [themes.DARK]: 'Dark',
      [themes.HIGH_CONTRAST]: 'High Contrast',
      [themes.AUTO]: 'Auto'
    };
    return labels[themeName] || themeName;
  };

  // Simple toggle button (light/dark only)
  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={`
          inline-flex items-center justify-center rounded-lg
          bg-color-bg-secondary hover:bg-color-bg-tertiary
          border border-color-border-primary
          text-color-text-primary
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-color-border-focus focus:ring-offset-2
          ${sizeClasses[size]}
          ${className}
        `}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        title={`Current theme: ${getThemeLabel(effectiveTheme)}`}
      >
        <ThemeIcon themeName={effectiveTheme} />
        {showLabels && (
          <span className="ml-2">
            {getThemeLabel(effectiveTheme)}
          </span>
        )}
      </button>
    );
  }

  // Switch toggle
  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabels && (
          <span className="text-color-text-secondary text-sm">
            <ThemeIcon themeName={themes.LIGHT} className="inline mr-1" />
            Light
          </span>
        )}
        <button
          onClick={toggleTheme}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-color-border-focus focus:ring-offset-2
            ${isDark 
              ? 'bg-color-interactive-primary' 
              : 'bg-color-neutral-300'
            }
          `}
          role="switch"
          aria-checked={isDark}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full
              bg-white shadow-lg ring-0 transition duration-200 ease-in-out
              ${isDark ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
        {showLabels && (
          <span className="text-color-text-secondary text-sm">
            <ThemeIcon themeName={themes.DARK} className="inline mr-1" />
            Dark
          </span>
        )}
      </div>
    );
  }

  // Dropdown with all theme options
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            inline-flex items-center justify-between w-full rounded-lg
            bg-color-bg-secondary hover:bg-color-bg-tertiary
            border border-color-border-primary
            text-color-text-primary
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-color-border-focus focus:ring-offset-2
            ${sizeClasses[size]}
          `}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Theme selector"
        >
          <div className="flex items-center">
            <ThemeIcon themeName={effectiveTheme} />
            {showLabels && (
              <span className="ml-2">{getThemeLabel(theme)}</span>
            )}
          </div>
          <svg 
            className={`${iconSize[size]} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Dropdown menu */}
            <div className="
              absolute right-0 z-20 mt-2 w-48 origin-top-right
              rounded-lg bg-color-bg-primary shadow-lg ring-1 ring-color-border-primary
              focus:outline-none
            ">
              <div className="py-1" role="listbox">
                {availableThemes.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => {
                      setTheme(themeName);
                      setIsOpen(false);
                    }}
                    className={`
                      flex items-center w-full px-4 py-2 text-left
                      hover:bg-color-bg-secondary
                      transition-colors duration-150
                      ${theme === themeName 
                        ? 'bg-color-bg-tertiary text-color-interactive-primary' 
                        : 'text-color-text-primary'
                      }
                    `}
                    role="option"
                    aria-selected={theme === themeName}
                  >
                    <ThemeIcon themeName={themeName} />
                    <span className="ml-3">{getThemeLabel(themeName)}</span>
                    {theme === themeName && (
                      <svg className={`ml-auto ${iconSize[size]}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default ThemeToggle;