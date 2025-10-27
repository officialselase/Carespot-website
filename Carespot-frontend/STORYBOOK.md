# Storybook Integration

This project includes a comprehensive Storybook setup for component testing and documentation.

## Getting Started

### Running Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Building Storybook

```bash
npm run build-storybook
```

This creates a static build in the `storybook-static` directory.

## Component Coverage

### Atoms
- **Button** - All variants, sizes, and states
- **Input** - Form inputs with validation and accessibility
- **Avatar** - User avatars with initials fallback
- **Badge** - Status and category badges
- **Icon** - Curated SVG icon set for NGO websites

### Molecules
- **StatCard** - Statistics display with trends and variants
- **UserProfile** - User information with avatar and badges
- **SearchBox** - Search input with button combination

### Organisms
- **Header** - Navigation header with mobile menu
- **StatsGrid** - Responsive grid of statistics cards

### Typography
- **Heading** - Semantic headings with responsive sizing
- **Body** - Body text with accessibility features
- **Caption** - Caption and small text
- **Label** - Form labels and UI labels

## Features

### Accessibility Testing
- Built-in accessibility addon (`@storybook/addon-a11y`)
- Automated a11y checks for all components
- WCAG compliance validation

### Design System Integration
- Complete design system showcase
- Color system integration
- Typography scale demonstration
- Component interaction examples

### Testing Integration
- Vitest addon for component testing
- Test coverage for component functionality
- Visual regression testing capabilities

### Documentation
- Comprehensive component documentation
- Usage examples and best practices
- Real-world implementation scenarios
- NGO-specific use cases

## Story Organization

Stories are organized by atomic design principles:

```
├── Atoms/
│   ├── Button
│   ├── Input
│   ├── Avatar
│   ├── Badge
│   └── Icon
├── Molecules/
│   ├── StatCard
│   ├── UserProfile
│   └── SearchBox
├── Organisms/
│   ├── Header
│   └── StatsGrid
├── Typography/
│   └── Overview
└── Design System/
    └── Overview
```

## Configuration

### Storybook Configuration
- **Main Config**: `.storybook/main.js`
- **Preview Config**: `.storybook/preview.js`
- **Vitest Setup**: `.storybook/vitest.setup.js`

### Addons Included
- `@chromatic-com/storybook` - Visual testing
- `@storybook/addon-docs` - Documentation
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-vitest` - Testing integration

### Viewport Configuration
- Mobile (375px)
- Tablet (768px)
- Desktop (1024px)

### Background Options
- Light theme
- Dark theme
- CareSpot primary color

## Best Practices

### Writing Stories
1. Include comprehensive prop controls
2. Add accessibility descriptions
3. Provide real-world usage examples
4. Document component behavior
5. Include interactive examples

### Component Testing
1. Test all component variants
2. Verify accessibility compliance
3. Check responsive behavior
4. Validate prop combinations
5. Test edge cases

### Documentation
1. Clear component descriptions
2. Usage guidelines
3. Accessibility notes
4. Design system integration
5. NGO-specific examples

## NGO-Specific Features

### Healthcare Context
- Medical icons and terminology
- Healthcare program examples
- Patient and volunteer profiles
- Medical statistics displays

### Community Focus
- Community member profiles
- Volunteer management components
- Donation and fundraising elements
- Impact measurement displays

### Accessibility First
- Screen reader compatibility
- Keyboard navigation support
- High contrast color options
- Dyslexic-friendly typography

## Development Workflow

1. **Component Development**: Create components with comprehensive prop types
2. **Story Creation**: Write stories covering all use cases
3. **Accessibility Testing**: Verify a11y compliance
4. **Documentation**: Add usage examples and guidelines
5. **Testing**: Implement component tests
6. **Review**: Validate design system consistency

## Deployment

Storybook can be deployed as a static site for team collaboration:

```bash
npm run build-storybook
# Deploy storybook-static directory to your hosting platform
```

## Contributing

When adding new components:

1. Create the component with proper prop types
2. Write comprehensive stories
3. Include accessibility testing
4. Add documentation and examples
5. Test across different viewports
6. Verify design system consistency

This Storybook setup provides a comprehensive testing and documentation environment for the CareSpot design system, ensuring components are accessible, well-documented, and ready for production use.