# Project Structure

## Root Level
- `Carespot-frontend/` - Main React application
- `README.md` - Project overview

## Frontend Application Structure (`Carespot-frontend/`)

### Configuration Files
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite build configuration with React and Tailwind plugins
- `eslint.config.js` - ESLint flat config with React rules
- `index.html` - Entry HTML file

### Source Code (`src/`)
```
src/
├── components/          # Reusable React components
│   ├── AnimatedNumber.jsx
│   └── Menu.jsx
├── pages/              # Page-level components
│   ├── Homepage.jsx
│   ├── AboutPage.jsx
│   ├── ProjectsPage.jsx
│   ├── ContactPage.jsx
│   └── CareSpotGhanaPage.jsx
├── assets/             # Static assets
│   └── react.svg
├── App.jsx             # Main app component
├── App.css             # App-specific styles
├── main.jsx            # React entry point
└── index.css           # Global styles
```

## Naming Conventions
- **Components**: PascalCase with `.jsx` extension
- **Pages**: PascalCase ending with "Page.jsx"
- **Files**: camelCase for utilities, PascalCase for components

## Architecture Patterns
- Component-based architecture with clear separation between reusable components and pages
- Single-page application structure
- Vite-based build system for fast development