/**
 * CareSpot Color Showcase Component
 * Demonstrates the color system and accessibility features
 */

import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

const ColorShowcase = () => {
  const { effectiveTheme, isDark } = useTheme();
  const [selectedPalette, setSelectedPalette] = useState('primary');

  const colorPalettes = {
    primary: {
      name: 'Primary (Red)',
      description: 'Brand primary color for main actions and emphasis',
      colors: [
        { name: '50', token: '--color-primary-50' },
        { name: '100', token: '--color-primary-100' },
        { name: '200', token: '--color-primary-200' },
        { name: '300', token: '--color-primary-300' },
        { name: '400', token: '--color-primary-400' },
        { name: '500', token: '--color-primary-500' },
        { name: '600', token: '--color-primary-600' },
        { name: '700', token: '--color-primary-700' },
        { name: '800', token: '--color-primary-800' },
        { name: '900', token: '--color-primary-900' },
        { name: '950', token: '--color-primary-950' }
      ]
    },
    secondary: {
      name: 'Secondary (Blue)',
      description: 'Healthcare and trust colors for secondary actions',
      colors: [
        { name: '50', token: '--color-secondary-50' },
        { name: '100', token: '--color-secondary-100' },
        { name: '200', token: '--color-secondary-200' },
        { name: '300', token: '--color-secondary-300' },
        { name: '400', token: '--color-secondary-400' },
        { name: '500', token: '--color-secondary-500' },
        { name: '600', token: '--color-secondary-600' },
        { name: '700', token: '--color-secondary-700' },
        { name: '800', token: '--color-secondary-800' },
        { name: '900', token: '--color-secondary-900' },
        { name: '950', token: '--color-secondary-950' }
      ]
    },
    success: {
      name: 'Success (Green)',
      description: 'Health, growth, and positive outcomes',
      colors: [
        { name: '50', token: '--color-success-50' },
        { name: '100', token: '--color-success-100' },
        { name: '200', token: '--color-success-200' },
        { name: '300', token: '--color-success-300' },
        { name: '400', token: '--color-success-400' },
        { name: '500', token: '--color-success-500' },
        { name: '600', token: '--color-success-600' },
        { name: '700', token: '--color-success-700' },
        { name: '800', token: '--color-success-800' },
        { name: '900', token: '--color-success-900' },
        { name: '950', token: '--color-success-950' }
      ]
    },
    warning: {
      name: 'Warning (Orange)',
      description: 'Attention and caution indicators',
      colors: [
        { name: '50', token: '--color-warning-50' },
        { name: '100', token: '--color-warning-100' },
        { name: '200', token: '--color-warning-200' },
        { name: '300', token: '--color-warning-300' },
        { name: '400', token: '--color-warning-400' },
        { name: '500', token: '--color-warning-500' },
        { name: '600', token: '--color-warning-600' },
        { name: '700', token: '--color-warning-700' },
        { name: '800', token: '--color-warning-800' },
        { name: '900', token: '--color-warning-900' },
        { name: '950', token: '--color-warning-950' }
      ]
    },
    error: {
      name: 'Error (Red)',
      description: 'Error states and critical information',
      colors: [
        { name: '50', token: '--color-error-50' },
        { name: '100', token: '--color-error-100' },
        { name: '200', token: '--color-error-200' },
        { name: '300', token: '--color-error-300' },
        { name: '400', token: '--color-error-400' },
        { name: '500', token: '--color-error-500' },
        { name: '600', token: '--color-error-600' },
        { name: '700', token: '--color-error-700' },
        { name: '800', token: '--color-error-800' },
        { name: '900', token: '--color-error-900' },
        { name: '950', token: '--color-error-950' }
      ]
    },
    neutral: {
      name: 'Neutral (Gray)',
      description: 'Text, backgrounds, and borders',
      colors: [
        { name: '0', token: '--color-neutral-0' },
        { name: '50', token: '--color-neutral-50' },
        { name: '100', token: '--color-neutral-100' },
        { name: '200', token: '--color-neutral-200' },
        { name: '300', token: '--color-neutral-300' },
        { name: '400', token: '--color-neutral-400' },
        { name: '500', token: '--color-neutral-500' },
        { name: '600', token: '--color-neutral-600' },
        { name: '700', token: '--color-neutral-700' },
        { name: '800', token: '--color-neutral-800' },
        { name: '900', token: '--color-neutral-900' },
        { name: '950', token: '--color-neutral-950' }
      ]
    }
  };

  const semanticTokens = [
    { name: 'Text Primary', token: '--color-text-primary', description: 'Main body text' },
    { name: 'Text Secondary', token: '--color-text-secondary', description: 'Supporting text' },
    { name: 'Text Tertiary', token: '--color-text-tertiary', description: 'Subtle text' },
    { name: 'Text Link', token: '--color-text-link', description: 'Link text' },
    { name: 'Background Primary', token: '--color-bg-primary', description: 'Main background' },
    { name: 'Background Secondary', token: '--color-bg-secondary', description: 'Card backgrounds' },
    { name: 'Background Tertiary', token: '--color-bg-tertiary', description: 'Subtle backgrounds' },
    { name: 'Border Primary', token: '--color-border-primary', description: 'Default borders' },
    { name: 'Border Focus', token: '--color-border-focus', description: 'Focus indicators' },
    { name: 'Interactive Primary', token: '--color-interactive-primary', description: 'Primary buttons' },
    { name: 'Interactive Secondary', token: '--color-interactive-secondary', description: 'Secondary buttons' },
    { name: 'Status Success', token: '--color-status-success', description: 'Success indicators' },
    { name: 'Status Warning', token: '--color-status-warning', description: 'Warning indicators' },
    { name: 'Status Error', token: '--color-status-error', description: 'Error indicators' }
  ];

  const ColorSwatch = ({ color, showToken = false }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
      navigator.clipboard.writeText(color.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div 
        className="group cursor-pointer"
        onClick={handleCopy}
        title={`Click to copy: ${color.token}`}
      >
        <div 
          className="w-full h-16 rounded-lg border border-color-border-primary shadow-sm group-hover:shadow-md transition-shadow"
          style={{ backgroundColor: `var(${color.token})` }}
        />
        <div className="mt-2 text-center">
          <div className="text-sm font-medium text-color-text-primary">
            {color.name}
          </div>
          {showToken && (
            <div className="text-xs text-color-text-tertiary font-mono mt-1">
              {color.token}
            </div>
          )}
          {copied && (
            <div className="text-xs text-color-status-success mt-1">
              Copied!
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-color-bg-primary">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-color-text-primary">
              CareSpot Color System
            </h1>
            <p className="text-color-text-secondary mt-2">
              Accessible, semantic color tokens for consistent design
            </p>
          </div>
          <ThemeToggle variant="dropdown" />
        </div>
        
        {/* Theme Info */}
        <div className="bg-color-bg-secondary rounded-lg p-4 border border-color-border-primary">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-sm text-color-text-secondary">Current Theme:</span>
              <span className="ml-2 font-semibold text-color-text-primary capitalize">
                {effectiveTheme}
              </span>
            </div>
            <div>
              <span className="text-sm text-color-text-secondary">Mode:</span>
              <span className="ml-2 font-semibold text-color-text-primary">
                {isDark ? 'Dark' : 'Light'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Palette Selector */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-color-text-primary mb-4">
          Color Palettes
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(colorPalettes).map(([key, palette]) => (
            <button
              key={key}
              onClick={() => setSelectedPalette(key)}
              className={`
                px-4 py-2 rounded-lg border transition-all
                ${selectedPalette === key
                  ? 'bg-color-interactive-primary text-white border-color-interactive-primary'
                  : 'bg-color-bg-secondary text-color-text-primary border-color-border-primary hover:bg-color-bg-tertiary'
                }
              `}
            >
              {palette.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Palette */}
      <div className="mb-12">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-color-text-primary">
            {colorPalettes[selectedPalette].name}
          </h3>
          <p className="text-color-text-secondary">
            {colorPalettes[selectedPalette].description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
          {colorPalettes[selectedPalette].colors.map((color) => (
            <ColorSwatch key={color.name} color={color} showToken />
          ))}
        </div>
      </div>

      {/* Semantic Tokens */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-color-text-primary mb-4">
          Semantic Tokens
        </h2>
        <p className="text-color-text-secondary mb-6">
          Use these semantic tokens instead of direct color values for consistent theming
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {semanticTokens.map((token) => (
            <div key={token.token} className="bg-color-bg-secondary rounded-lg p-4 border border-color-border-primary">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded border border-color-border-primary flex-shrink-0"
                  style={{ backgroundColor: `var(${token.token})` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-color-text-primary text-sm">
                    {token.name}
                  </div>
                  <div className="text-xs text-color-text-tertiary font-mono">
                    {token.token}
                  </div>
                  <div className="text-xs text-color-text-secondary mt-1">
                    {token.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-color-text-primary mb-4">
          Usage Examples
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons */}
          <div className="bg-color-bg-secondary rounded-lg p-6 border border-color-border-primary">
            <h3 className="font-semibold text-color-text-primary mb-4">Buttons</h3>
            <div className="space-y-3">
              <button className="bg-color-interactive-primary hover:bg-color-interactive-primary-hover text-white px-4 py-2 rounded-lg transition-colors">
                Primary Button
              </button>
              <button className="bg-color-interactive-secondary hover:bg-color-interactive-secondary-hover text-white px-4 py-2 rounded-lg transition-colors">
                Secondary Button
              </button>
              <button className="border-2 border-color-interactive-primary text-color-interactive-primary hover:bg-color-interactive-primary hover:text-white px-4 py-2 rounded-lg transition-all">
                Outline Button
              </button>
            </div>
          </div>

          {/* Status Messages */}
          <div className="bg-color-bg-secondary rounded-lg p-6 border border-color-border-primary">
            <h3 className="font-semibold text-color-text-primary mb-4">Status Messages</h3>
            <div className="space-y-3">
              <div className="bg-color-success-50 border border-color-success-200 text-color-success-800 p-3 rounded-lg text-sm">
                ✓ Success message
              </div>
              <div className="bg-color-warning-50 border border-color-warning-200 text-color-warning-800 p-3 rounded-lg text-sm">
                ⚠ Warning message
              </div>
              <div className="bg-color-error-50 border border-color-error-200 text-color-error-800 p-3 rounded-lg text-sm">
                ✕ Error message
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Info */}
      <div className="bg-color-bg-secondary rounded-lg p-6 border border-color-border-primary">
        <h2 className="text-xl font-semibold text-color-text-primary mb-4">
          Accessibility Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-color-text-primary mb-2">WCAG Compliance</h3>
            <ul className="text-color-text-secondary text-sm space-y-1">
              <li>• AA Level: 4.5:1 contrast ratio for normal text</li>
              <li>• AA Level: 3:1 contrast ratio for large text</li>
              <li>• AAA Level: 7:1 contrast ratio available</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-color-text-primary mb-2">Color Blindness Support</h3>
            <ul className="text-color-text-secondary text-sm space-y-1">
              <li>• Pattern-based alternatives</li>
              <li>• High contrast variants</li>
              <li>• Semantic meaning beyond color</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorShowcase;