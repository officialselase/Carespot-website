# CareSpot Color System Guidelines

## Overview

The CareSpot color system is designed with accessibility, usability, and brand consistency at its core. This comprehensive guide outlines how to use colors effectively across the platform while maintaining WCAG 2.1 AA compliance and supporting users with various visual needs.

## Color Philosophy

### Core Principles
1. **Accessibility First**: All color combinations meet WCAG 2.1 AA standards (4.5:1 contrast ratio for normal text, 3:1 for large text)
2. **Inclusive Design**: Support for color-blind users through patterns and high contrast alternatives
3. **Semantic Meaning**: Colors convey consistent meaning across the platform
4. **Brand Consistency**: Maintain CareSpot's visual identity while ensuring usability
5. **Adaptive Design**: Seamless support for light, dark, and high contrast themes

## Color Tokens

### Primary Brand Colors

#### Red (Primary)
- **Purpose**: Primary brand color, call-to-action buttons, important alerts
- **Usage**: Donation buttons, emergency information, primary navigation
- **Accessibility**: Meets AA standards on white backgrounds
- **Tokens**: `--color-primary-50` through `--color-primary-950`

```css
/* Examples */
.btn-primary { background-color: var(--color-primary-600); }
.text-primary { color: var(--color-primary-600); }
.border-primary { border-color: var(--color-primary-600); }
```

#### Blue (Secondary)
- **Purpose**: Trust, healthcare, secondary actions
- **Usage**: Information sections, healthcare content, secondary buttons
- **Accessibility**: Excellent contrast on light backgrounds
- **Tokens**: `--color-secondary-50` through `--color-secondary-950`

### Status Colors

#### Success (Green)
- **Purpose**: Positive outcomes, health, growth
- **Usage**: Success messages, health improvements, completed actions
- **Accessibility**: High contrast variant available
- **Tokens**: `--color-success-50` through `--color-success-950`

#### Warning (Orange)
- **Purpose**: Caution, attention needed
- **Usage**: Important notices, pending actions
- **Accessibility**: Enhanced contrast for readability
- **Tokens**: `--color-warning-50` through `--color-warning-950`

#### Error (Red)
- **Purpose**: Errors, critical issues
- **Usage**: Error messages, failed validations
- **Accessibility**: High contrast for critical information
- **Tokens**: `--color-error-50` through `--color-error-950`

### Neutral Colors

#### Grayscale
- **Purpose**: Text, backgrounds, borders
- **Usage**: Body text, subtle backgrounds, dividers
- **Range**: Pure white (`--color-neutral-0`) to near black (`--color-neutral-950`)

## Semantic Tokens

### Text Colors
```css
--color-text-primary      /* Main body text */
--color-text-secondary    /* Supporting text */
--color-text-tertiary     /* Subtle text */
--color-text-disabled     /* Disabled states */
--color-text-inverse      /* Text on dark backgrounds */
--color-text-link         /* Links */
--color-text-link-hover   /* Link hover states */
```

### Background Colors
```css
--color-bg-primary        /* Main background */
--color-bg-secondary      /* Card backgrounds */
--color-bg-tertiary       /* Subtle backgrounds */
--color-bg-inverse        /* Dark backgrounds */
--color-bg-overlay        /* Modal overlays */
```

### Interactive Colors
```css
--color-interactive-primary         /* Primary buttons */
--color-interactive-primary-hover   /* Primary button hover */
--color-interactive-primary-active  /* Primary button active */
--color-interactive-secondary       /* Secondary buttons */
--color-interactive-secondary-hover /* Secondary button hover */
--color-interactive-secondary-active/* Secondary button active */
```

## Theme Support

### Light Theme (Default)
- High contrast text on light backgrounds
- Warm, welcoming color palette
- Optimized for daytime use

### Dark Theme
- Inverted color relationships
- Reduced eye strain for low-light environments
- Maintains brand recognition

### High Contrast Theme
- Maximum contrast ratios
- Black text on white backgrounds
- Simplified color palette for accessibility

### Auto Theme
- Automatically switches based on system preference
- Respects user's `prefers-color-scheme` setting
- Seamless transitions between themes

## Accessibility Features

### WCAG 2.1 Compliance
- **AA Level**: 4.5:1 contrast ratio for normal text
- **AA Level**: 3:1 contrast ratio for large text (18pt+ or 14pt+ bold)
- **AAA Level**: 7:1 contrast ratio for enhanced accessibility

### Color Blindness Support
- **Protanopia** (Red-blind): Alternative patterns and enhanced contrast
- **Deuteranopia** (Green-blind): Distinct color combinations
- **Tritanopia** (Blue-blind): High contrast alternatives

### Pattern-Based Alternatives
```css
--pattern-primary    /* Diagonal stripes for primary */
--pattern-secondary  /* Horizontal lines for secondary */
--pattern-success    /* Dots for success */
--pattern-warning    /* Horizontal stripes for warning */
--pattern-error      /* Diagonal stripes for error */
```

## Usage Guidelines

### Do's ✅

1. **Use semantic tokens** instead of direct color values
   ```css
   /* Good */
   color: var(--color-text-primary);
   
   /* Avoid */
   color: #1f2937;
   ```

2. **Test color combinations** for accessibility
   ```javascript
   import { checkContrastCompliance } from '../utils/colorUtils';
   const isAccessible = checkContrastCompliance('#dc2626', '#ffffff');
   ```

3. **Provide alternative indicators** beyond color
   ```jsx
   // Good: Icon + color
   <div className="text-success">
     <CheckIcon /> Success message
   </div>
   ```

4. **Use consistent color meanings**
   - Red: Primary actions, errors, urgent
   - Blue: Information, trust, secondary actions
   - Green: Success, health, positive outcomes
   - Orange: Warnings, attention needed

### Don'ts ❌

1. **Don't rely solely on color** to convey information
2. **Don't use colors with insufficient contrast**
3. **Don't hardcode color values** in components
4. **Don't ignore user preferences** (dark mode, high contrast)

## Implementation Examples

### Button Components
```jsx
// Primary button
<button className="bg-color-interactive-primary hover:bg-color-interactive-primary-hover text-white">
  Donate Now
</button>

// Secondary button
<button className="bg-color-interactive-secondary hover:bg-color-interactive-secondary-hover text-white">
  Learn More
</button>

// Outline button
<button className="border-2 border-color-interactive-primary text-color-interactive-primary hover:bg-color-interactive-primary hover:text-white">
  Get Involved
</button>
```

### Status Messages
```jsx
// Success message
<div className="bg-color-success-50 border border-color-success-200 text-color-success-800 p-4 rounded-lg">
  <CheckCircleIcon className="text-color-success-600" />
  Your donation was successful!
</div>

// Error message
<div className="bg-color-error-50 border border-color-error-200 text-color-error-800 p-4 rounded-lg">
  <ExclamationCircleIcon className="text-color-error-600" />
  Please check your payment information.
</div>
```

### Text Hierarchy
```jsx
<div>
  <h1 className="text-color-text-primary text-3xl font-bold">Main Heading</h1>
  <h2 className="text-color-text-secondary text-xl font-semibold">Subheading</h2>
  <p className="text-color-text-primary">Body text content</p>
  <p className="text-color-text-tertiary text-sm">Supporting information</p>
</div>
```

## Testing and Validation

### Automated Testing
```javascript
import { validateColorSystem } from '../utils/colorUtils';

// Run validation
const results = validateColorSystem();
console.log('Color system validation:', results);
```

### Manual Testing Checklist
- [ ] Test with screen readers
- [ ] Verify in high contrast mode
- [ ] Check color blindness simulators
- [ ] Test in different lighting conditions
- [ ] Validate on various devices and screens

### Browser DevTools
1. Open DevTools → Rendering tab
2. Enable "Emulate vision deficiencies"
3. Test with different color blindness types
4. Use "Emulate CSS media" for dark mode testing

## Color Utilities

### JavaScript Utilities
```javascript
import { 
  checkContrastCompliance,
  getAccessibleColor,
  simulateColorBlindness,
  generateAccessiblePalette 
} from '../utils/colorUtils';

// Check if colors meet accessibility standards
const compliance = checkContrastCompliance('#dc2626', '#ffffff', 'AA', 'normal');

// Get accessible alternative
const accessibleColor = getAccessibleColor('#dc2626', '#ffffff', 'AA');

// Simulate color blindness
const protanopiaColor = simulateColorBlindness({ r: 220, g: 38, b: 38 }, 'protanopia');
```

### React Hooks
```javascript
import { useTheme, useColorValidation } from '../hooks/useTheme';

function MyComponent() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { validationResults } = useColorValidation();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Maintenance and Updates

### Regular Reviews
- **Monthly**: Check for new accessibility guidelines
- **Quarterly**: Review color usage across the platform
- **Annually**: Conduct comprehensive accessibility audit

### Version Control
- Document color changes in release notes
- Maintain backward compatibility when possible
- Provide migration guides for breaking changes

### Performance Considerations
- Use CSS custom properties for efficient theme switching
- Minimize color calculations in JavaScript
- Leverage browser caching for color assets

## Resources and Tools

### Design Tools
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Oracle](https://colororacle.org/) - Color blindness simulator
- [Stark](https://www.getstark.co/) - Accessibility plugin

### Development Tools
- Chrome DevTools Accessibility panel
- axe-core accessibility testing
- Lighthouse accessibility audits

### References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Universal Design](https://jfly.uni-koeln.de/color/)
- [Material Design Color System](https://material.io/design/color/)

---

*This document is maintained by the CareSpot development team. For questions or suggestions, please reach out to the design system team.*