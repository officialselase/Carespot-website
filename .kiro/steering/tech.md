# Technology Stack

## Frontend Framework
- **React 19.1.0** - Modern React with latest features
- **Vite 6.0.0** - Fast build tool and dev server
- **JavaScript (JSX)** - No TypeScript currently used

## Styling
- **Tailwind CSS 4.1.10** - Utility-first CSS framework with Vite plugin integration

## Code Quality
- **ESLint 9.29.0** - Linting with React-specific rules
- **React Hooks ESLint Plugin** - Enforces hooks rules
- **React Refresh ESLint Plugin** - Fast refresh support

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint checks
```

### ESLint Configuration
- Uses flat config format (eslint.config.js)
- Ignores `dist` folder
- Custom rule: unused vars allowed if they start with uppercase or underscore
- Supports JSX and modern JavaScript features