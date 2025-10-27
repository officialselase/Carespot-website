# CareSpot Initiative - World-Class NGO Website

A modern, professional website for CareSpot Initiative, a community-driven health NGO focused on improving healthcare access, promoting health literacy, and supporting nutrition for underserved populations in Ghana and beyond.

## 🌟 Features

### Modern Design System
- **Red Cross-inspired design** with professional aesthetics
- **Responsive design** optimized for all devices
- **Accessibility-first** approach with WCAG compliance
- **Performance optimized** with modern web technologies

### Key Sections
- **Hero Section** with compelling call-to-action
- **Services Showcase** highlighting healthcare programs
- **Research & Innovation** featuring RxCare neonatal seizure detection
- **Impact Statistics** with animated counters
- **Leadership Team** profiles and testimonials
- **Partner Organizations** showcase
- **Donation Integration** ready for fundraising

### Technical Excellence
- **React 19** with modern hooks and patterns
- **Tailwind CSS 4** with custom design system
- **Vite 6** for lightning-fast development
- **Component-based architecture** for maintainability
- **TypeScript-ready** structure for future enhancement

## 🚀 Quick Start

```bash
# Navigate to frontend directory
cd Carespot-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

The website uses a comprehensive design system inspired by leading NGO websites:

### Color Palette
- **Primary Red**: #dc2626 (Brand color, CTAs)
- **Secondary Blue**: #2563eb (Trust, healthcare)
- **Accent Colors**: Green (#059669), Orange (#ea580c), Purple (#7c3aed)
- **Neutral Grays**: Complete scale from 50-900

### Typography
- **Headings**: Poppins (Professional, modern)
- **Body**: Inter (Readable, accessible)

### Components
- **Hero**: Reusable hero sections with overlays
- **Section**: Consistent section layouts
- **Card**: Flexible card components for content
- **Statistics**: Animated counter components

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interactions
- **Optimized images** for all screen sizes

## 🔧 Development

### Project Structure
```
Carespot-frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Hero.jsx        # Hero section component
│   │   ├── Section.jsx     # Section wrapper component
│   │   ├── Card.jsx        # Card component variants
│   │   ├── Statistics.jsx  # Animated statistics
│   │   └── Menu.jsx        # Navigation component
│   ├── pages/              # Page components
│   │   ├── Homepage.jsx    # Main landing page
│   │   ├── AboutPage.jsx   # About us page
│   │   └── ProjectsPage.jsx # Projects showcase
│   ├── styles/             # Design system
│   │   └── design-system.css # CSS variables and utilities
│   └── App.jsx             # Main app component
├── .kiro/steering/         # AI assistant guidance
│   ├── product.md          # Product overview
│   ├── tech.md            # Technical stack
│   └── structure.md       # Project structure
└── package.json
```

### Key Components

#### Hero Component
```jsx
<Hero
  title="Your Title"
  subtitle="Subtitle"
  description="Description"
  backgroundImage="image-url"
  primaryAction={{ text: "CTA", onClick: handler }}
  secondaryAction={{ text: "Secondary", onClick: handler }}
/>
```

#### Section Component
```jsx
<Section
  title="Section Title"
  subtitle="Subtitle"
  description="Description"
  backgroundColor="bg-white"
  backgroundImage="optional-image"
>
  {/* Content */}
</Section>
```

## 🎯 NGO-Specific Features

### Healthcare Focus
- **Health screenings** and outreach programs
- **Nutritional support** and counseling
- **Health literacy** campaigns
- **Medical referral** coordination
- **Community clinics** and awareness campaigns

### Research Innovation
- **RxCare**: Neonatal seizure wearable device research
- **Community health analytics**
- **Maternal health innovation**

### Impact Metrics
- **$11,880+** raised
- **10 communities** reached
- **2,050+ children** helped

## 🌍 Mission & Vision

### Mission
To bridge gaps in healthcare access, education, and support for underserved communities by promoting preventive care, nutrition, and patient empowerment.

### Vision
A world where every individual has access to the basic tools, knowledge, and support they need to live a healthy, nourished, and dignified life.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

- **Email**: carespotinitiative@gmail.com
- **Phone**: +1 (814) 417-1575 | +233 53 457 5833
- **Address**: Oak Villa Estate, House 41, Abokobi-Accra, Ghana

## 📄 License

© 2024 CareSpot Initiative. All rights reserved.

---

**Compassion in Action** - Transforming lives through healthcare access and community empowerment.