/**
 * CareSpot Color Utilities
 * Provides color contrast validation and accessibility helpers
 */

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 guidelines
 */
export function getRelativeLuminance(rgb) {
  const { r, g, b } = rgb;
  
  // Convert to sRGB
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;
  
  // Apply gamma correction
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
  
  // Calculate relative luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 * Based on WCAG 2.1 guidelines
 */
export function getContrastRatio(color1, color2) {
  const rgb1 = typeof color1 === 'string' ? hexToRgb(color1) : color1;
  const rgb2 = typeof color2 === 'string' ? hexToRgb(color2) : color2;
  
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format');
  }
  
  const luminance1 = getRelativeLuminance(rgb1);
  const luminance2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG contrast requirements
 */
export function checkContrastCompliance(foreground, background, level = 'AA', size = 'normal') {
  const contrastRatio = getContrastRatio(foreground, background);
  
  // WCAG 2.1 contrast requirements
  const requirements = {
    'AA': {
      normal: 4.5,
      large: 3.0
    },
    'AAA': {
      normal: 7.0,
      large: 4.5
    }
  };
  
  const requiredRatio = requirements[level][size];
  
  return {
    ratio: contrastRatio,
    required: requiredRatio,
    passes: contrastRatio >= requiredRatio,
    level,
    size
  };
}

/**
 * Get accessible color variant
 */
export function getAccessibleColor(foreground, background, level = 'AA', size = 'normal') {
  const compliance = checkContrastCompliance(foreground, background, level, size);
  
  if (compliance.passes) {
    return foreground;
  }
  
  // Try to adjust the foreground color
  const fgRgb = typeof foreground === 'string' ? hexToRgb(foreground) : foreground;
  const bgRgb = typeof background === 'string' ? hexToRgb(background) : background;
  
  if (!fgRgb || !bgRgb) {
    throw new Error('Invalid color format');
  }
  
  const bgLuminance = getRelativeLuminance(bgRgb);
  const requiredRatio = compliance.required;
  
  // Calculate target luminance for foreground
  let targetLuminance;
  if (bgLuminance > 0.5) {
    // Light background, make foreground darker
    targetLuminance = (bgLuminance + 0.05) / requiredRatio - 0.05;
  } else {
    // Dark background, make foreground lighter
    targetLuminance = (bgLuminance + 0.05) * requiredRatio - 0.05;
  }
  
  // Clamp luminance values
  targetLuminance = Math.max(0, Math.min(1, targetLuminance));
  
  // Adjust color to meet target luminance
  const adjustedColor = adjustColorLuminance(fgRgb, targetLuminance);
  
  return rgbToHex(adjustedColor.r, adjustedColor.g, adjustedColor.b);
}

/**
 * Adjust color luminance to target value
 */
function adjustColorLuminance(rgb, targetLuminance) {
  const currentLuminance = getRelativeLuminance(rgb);
  const ratio = targetLuminance / currentLuminance;
  
  // Simple approach: scale RGB values
  const factor = Math.pow(ratio, 1/2.4); // Approximate inverse gamma correction
  
  return {
    r: Math.round(Math.min(255, Math.max(0, rgb.r * factor))),
    g: Math.round(Math.min(255, Math.max(0, rgb.g * factor))),
    b: Math.round(Math.min(255, Math.max(0, rgb.b * factor)))
  };
}

/**
 * Generate color palette with accessibility compliance
 */
export function generateAccessiblePalette(baseColor, background = '#ffffff') {
  const baseRgb = typeof baseColor === 'string' ? hexToRgb(baseColor) : baseColor;
  
  if (!baseRgb) {
    throw new Error('Invalid base color format');
  }
  
  const palette = {
    base: rgbToHex(baseRgb.r, baseRgb.g, baseRgb.b),
    accessible: {
      AA: {
        normal: getAccessibleColor(baseColor, background, 'AA', 'normal'),
        large: getAccessibleColor(baseColor, background, 'AA', 'large')
      },
      AAA: {
        normal: getAccessibleColor(baseColor, background, 'AAA', 'normal'),
        large: getAccessibleColor(baseColor, background, 'AAA', 'large')
      }
    },
    variants: {}
  };
  
  // Generate tints and shades
  const steps = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  
  // Tints (lighter)
  palette.variants.tints = steps.map(step => {
    const tint = {
      r: Math.round(baseRgb.r + (255 - baseRgb.r) * step),
      g: Math.round(baseRgb.g + (255 - baseRgb.g) * step),
      b: Math.round(baseRgb.b + (255 - baseRgb.b) * step)
    };
    return rgbToHex(tint.r, tint.g, tint.b);
  });
  
  // Shades (darker)
  palette.variants.shades = steps.map(step => {
    const shade = {
      r: Math.round(baseRgb.r * (1 - step)),
      g: Math.round(baseRgb.g * (1 - step)),
      b: Math.round(baseRgb.b * (1 - step))
    };
    return rgbToHex(shade.r, shade.g, shade.b);
  });
  
  return palette;
}

/**
 * Color blindness simulation
 */
export function simulateColorBlindness(rgb, type = 'protanopia') {
  const { r, g, b } = rgb;
  
  // Transformation matrices for different types of color blindness
  const matrices = {
    protanopia: [ // Red-blind
      [0.567, 0.433, 0],
      [0.558, 0.442, 0],
      [0, 0.242, 0.758]
    ],
    deuteranopia: [ // Green-blind
      [0.625, 0.375, 0],
      [0.7, 0.3, 0],
      [0, 0.3, 0.7]
    ],
    tritanopia: [ // Blue-blind
      [0.95, 0.05, 0],
      [0, 0.433, 0.567],
      [0, 0.475, 0.525]
    ]
  };
  
  const matrix = matrices[type];
  if (!matrix) {
    throw new Error(`Unknown color blindness type: ${type}`);
  }
  
  const newR = Math.round(r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2]);
  const newG = Math.round(r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2]);
  const newB = Math.round(r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2]);
  
  return {
    r: Math.min(255, Math.max(0, newR)),
    g: Math.min(255, Math.max(0, newG)),
    b: Math.min(255, Math.max(0, newB))
  };
}

/**
 * Check if colors are distinguishable for color-blind users
 */
export function checkColorBlindAccessibility(color1, color2) {
  const rgb1 = typeof color1 === 'string' ? hexToRgb(color1) : color1;
  const rgb2 = typeof color2 === 'string' ? hexToRgb(color2) : color2;
  
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format');
  }
  
  const types = ['protanopia', 'deuteranopia', 'tritanopia'];
  const results = {};
  
  types.forEach(type => {
    const sim1 = simulateColorBlindness(rgb1, type);
    const sim2 = simulateColorBlindness(rgb2, type);
    
    const originalContrast = getContrastRatio(rgb1, rgb2);
    const simulatedContrast = getContrastRatio(sim1, sim2);
    
    results[type] = {
      originalContrast,
      simulatedContrast,
      accessible: simulatedContrast >= 3.0, // Minimum for distinguishability
      difference: Math.abs(originalContrast - simulatedContrast)
    };
  });
  
  return results;
}

/**
 * Get CSS custom property value
 */
export function getCSSCustomProperty(property) {
  return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
}

/**
 * Set CSS custom property value
 */
export function setCSSCustomProperty(property, value) {
  document.documentElement.style.setProperty(property, value);
}

/**
 * Validate color system compliance
 */
export function validateColorSystem() {
  const colorTokens = {
    primary: getCSSCustomProperty('--color-primary-600'),
    secondary: getCSSCustomProperty('--color-secondary-600'),
    success: getCSSCustomProperty('--color-success-600'),
    warning: getCSSCustomProperty('--color-warning-600'),
    error: getCSSCustomProperty('--color-error-600'),
    textPrimary: getCSSCustomProperty('--color-text-primary'),
    textSecondary: getCSSCustomProperty('--color-text-secondary'),
    bgPrimary: getCSSCustomProperty('--color-bg-primary'),
    bgSecondary: getCSSCustomProperty('--color-bg-secondary')
  };
  
  const validationResults = {};
  
  // Check text contrast ratios
  const textCombinations = [
    ['textPrimary', 'bgPrimary'],
    ['textSecondary', 'bgPrimary'],
    ['textPrimary', 'bgSecondary'],
    ['textSecondary', 'bgSecondary']
  ];
  
  textCombinations.forEach(([text, bg]) => {
    const key = `${text}-on-${bg}`;
    validationResults[key] = checkContrastCompliance(
      colorTokens[text],
      colorTokens[bg],
      'AA',
      'normal'
    );
  });
  
  // Check interactive element contrast
  const interactiveCombinations = [
    ['primary', 'bgPrimary'],
    ['secondary', 'bgPrimary'],
    ['success', 'bgPrimary'],
    ['warning', 'bgPrimary'],
    ['error', 'bgPrimary']
  ];
  
  interactiveCombinations.forEach(([color, bg]) => {
    const key = `${color}-on-${bg}`;
    validationResults[key] = checkContrastCompliance(
      colorTokens[color],
      colorTokens[bg],
      'AA',
      'normal'
    );
  });
  
  // Check color blindness accessibility
  const colorPairs = [
    ['primary', 'secondary'],
    ['success', 'error'],
    ['warning', 'error']
  ];
  
  colorPairs.forEach(([color1, color2]) => {
    const key = `${color1}-vs-${color2}-colorblind`;
    validationResults[key] = checkColorBlindAccessibility(
      colorTokens[color1],
      colorTokens[color2]
    );
  });
  
  return validationResults;
}

/**
 * Export color constants for easy access
 */
export const COLOR_BLIND_TYPES = {
  PROTANOPIA: 'protanopia',
  DEUTERANOPIA: 'deuteranopia',
  TRITANOPIA: 'tritanopia'
};

export const WCAG_LEVELS = {
  AA: 'AA',
  AAA: 'AAA'
};

export const TEXT_SIZES = {
  NORMAL: 'normal',
  LARGE: 'large'
};