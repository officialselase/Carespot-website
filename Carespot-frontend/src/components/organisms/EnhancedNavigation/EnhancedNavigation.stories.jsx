import { useState } from 'react';
import EnhancedNavigation from './EnhancedNavigation';

export default {
  title: 'Organisms/EnhancedNavigation',
  component: EnhancedNavigation,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => {
  const [currentPage, setCurrentPage] = useState('Home');

  const handleNavigate = (item) => {
    console.log('Navigating to:', item);
    setCurrentPage(item.label);
  };

  const handleSearch = (term, filter, suggestion) => {
    console.log('Search:', { term, filter, suggestion });
    alert(`Searching for: "${term}" with filter: "${filter}"`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedNavigation
        {...args}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      />
      
      {/* Main Content */}
      <main id="main-content" className="pt-24 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Enhanced Navigation Demo</h1>
          <p className="text-gray-600 mb-4">Current page: <strong>{currentPage}</strong></p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-4">Features Demonstrated</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Skip Links:</strong> Press Tab to see accessibility skip links</li>
              <li>• <strong>Keyboard Navigation:</strong> Use Tab, Arrow keys, Enter, and Escape</li>
              <li>• <strong>Global Search:</strong> Click search icon or use keyboard shortcuts</li>
              <li>• <strong>Mobile Menu:</strong> Resize window or use mobile view</li>
              <li>• <strong>Breadcrumbs:</strong> Navigate to see breadcrumb trail</li>
              <li>• <strong>Dropdown Menus:</strong> Hover or click navigation items with children</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-3">Accessibility Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• ARIA labels and roles</li>
                <li>• Focus management</li>
                <li>• Screen reader support</li>
                <li>• High contrast support</li>
                <li>• Keyboard-only navigation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-3">Mobile Optimizations</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Touch-friendly interface</li>
                <li>• Smooth animations</li>
                <li>• Responsive design</li>
                <li>• Gesture support</li>
                <li>• Optimized performance</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithBreadcrumbs = Template.bind({});
WithBreadcrumbs.args = {
  breadcrumbs: [
    { label: 'Projects', href: '/projects' },
    { label: 'Health Initiatives', href: '/projects/health' },
    { label: 'Community Screenings', href: '/projects/health/screenings' }
  ]
};

export const WithUser = Template.bind({});
WithUser.args = {
  user: {
    name: 'Dr. Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    role: 'Volunteer Coordinator'
  },
  breadcrumbs: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Volunteer Management', href: '/dashboard/volunteers' }
  ]
};

export const CustomNavigation = Template.bind({});
CustomNavigation.args = {
  navigation: [
    { 
      label: 'Dashboard', 
      href: '/dashboard', 
      icon: 'home'
    },
    { 
      label: 'Health Programs', 
      href: '/programs', 
      icon: 'heart',
      children: [
        { label: 'Maternal Health', href: '/programs/maternal' },
        { label: 'Child Nutrition', href: '/programs/nutrition' },
        { label: 'Mental Health Support', href: '/programs/mental' },
        { label: 'Preventive Care', href: '/programs/preventive' }
      ]
    },
    { 
      label: 'Research', 
      href: '/research', 
      icon: 'search',
      children: [
        { label: 'Clinical Studies', href: '/research/clinical' },
        { label: 'Publications', href: '/research/publications' },
        { label: 'Data Analytics', href: '/research/analytics' }
      ]
    },
    { 
      label: 'Community', 
      href: '/community', 
      icon: 'users',
      children: [
        { label: 'Volunteer Portal', href: '/community/volunteers' },
        { label: 'Partner Network', href: '/community/partners' },
        { label: 'Success Stories', href: '/community/stories' }
      ]
    },
    { 
      label: 'Resources', 
      href: '/resources', 
      icon: 'book'
    }
  ],
  breadcrumbs: [
    { label: 'Health Programs', href: '/programs' },
    { label: 'Maternal Health', href: '/programs/maternal' },
    { label: 'Prenatal Care Initiative', href: '/programs/maternal/prenatal' }
  ]
};

export const WithCustomLogo = Template.bind({});
WithCustomLogo.args = {
  logo: {
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&h=150&fit=crop&crop=center',
    alt: 'CareSpot Logo'
  }
};

export const MinimalFeatures = Template.bind({});
MinimalFeatures.args = {
  showSearch: false,
  showBreadcrumbs: false,
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]
};

export const MobileFirst = Template.bind({});
MobileFirst.args = {
  showMobileMenu: true,
  breadcrumbs: [
    { label: 'Mobile', href: '/mobile' },
    { label: 'Navigation', href: '/mobile/nav' }
  ]
};

MobileFirst.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};