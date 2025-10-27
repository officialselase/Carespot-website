import { useState } from 'react';
import Breadcrumb from '../components/molecules/Breadcrumb/Breadcrumb';
import GlobalSearch from '../components/molecules/GlobalSearch/GlobalSearch';
import MobileMenu from '../components/molecules/MobileMenu/MobileMenu';
import SkipLink from '../components/atoms/SkipLink/SkipLink';
import Button from '../components/atoms/Button/Button';

const NavigationDemoPage = () => {
  const [currentDemo, setCurrentDemo] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const demoSections = [
    { id: 'overview', label: 'Overview', icon: 'home' },
    { id: 'breadcrumbs', label: 'Breadcrumbs', icon: 'arrow-right' },
    { id: 'search', label: 'Global Search', icon: 'search' },
    { id: 'mobile-menu', label: 'Mobile Menu', icon: 'menu' },
    { id: 'skip-links', label: 'Skip Links', icon: 'zap' },
    { id: 'keyboard', label: 'Keyboard Navigation', icon: 'keyboard' }
  ];

  const breadcrumbExamples = [
    {
      title: 'Simple Breadcrumb',
      items: [
        { label: 'Projects', href: '/projects' },
        { label: 'Health Initiatives', href: '/projects/health' }
      ]
    },
    {
      title: 'Deep Navigation',
      items: [
        { label: 'About', href: '/about' },
        { label: 'Our Team', href: '/about/team' },
        { label: 'Leadership', href: '/about/team/leadership' },
        { label: 'Board of Directors', href: '/about/team/leadership/board' }
      ]
    }
  ];

  const handleNavigation = (item) => {
    console.log('Navigating to:', item);
    // In a real app, this would handle routing
  };

  const handleSearch = (term, filter, suggestion) => {
    console.log('Search performed:', { term, filter, suggestion });
    alert(`Search: "${term}" with filter: "${filter}"`);
  };

  const renderDemo = () => {
    switch (currentDemo) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Navigation & Search Features</h2>
              <p className="text-gray-600 mb-6">
                This demo showcases the comprehensive navigation and search system implemented for CareSpot.
                All features are built with accessibility, mobile optimization, and user experience in mind.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-3 text-blue-600">✨ Key Features</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Breadcrumb navigation with schema markup</li>
                    <li>• Global search with autocomplete & filters</li>
                    <li>• Mobile-optimized hamburger menu with animations</li>
                    <li>• Keyboard navigation support throughout</li>
                    <li>• Skip-to-content links for accessibility</li>
                    <li>• ARIA labels and semantic HTML</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-3 text-green-600">🎯 Accessibility</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• WCAG 2.1 AA compliant</li>
                    <li>• Screen reader optimized</li>
                    <li>• High contrast mode support</li>
                    <li>• Reduced motion preferences</li>
                    <li>• Focus management</li>
                    <li>• Keyboard-only navigation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Try the Features</h3>
              <p className="text-gray-600 mb-4">
                Use the navigation above to explore each feature in detail. Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Tab</kbd> to see skip links.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {demoSections.slice(1).map((section) => (
                  <Button
                    key={section.id}
                    variant="outline"
                    size="small"
                    onClick={() => setCurrentDemo(section.id)}
                    className="flex items-center gap-2"
                  >
                    <span>{section.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'breadcrumbs':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Breadcrumb Navigation</h2>
              <p className="text-gray-600 mb-6">
                Breadcrumbs help users understand their location within the site hierarchy and provide
                an easy way to navigate back to parent pages. Our implementation includes schema markup
                for better SEO.
              </p>

              <div className="space-y-6">
                {breadcrumbExamples.map((example, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">{example.title}</h3>
                    <Breadcrumb
                      items={example.items}
                      onNavigate={handleNavigation}
                      className="mb-3"
                    />
                    <div className="text-sm text-gray-500">
                      Schema markup included for SEO optimization
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Features:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Automatic schema.org structured data</li>
                  <li>• Customizable separators</li>
                  <li>• Optional home link</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Global Search</h2>
              <p className="text-gray-600 mb-6">
                Advanced search functionality with autocomplete suggestions, filters, and keyboard navigation.
                Try typing to see suggestions appear.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Default Search</h3>
                  <GlobalSearch
                    onSearch={handleSearch}
                    placeholder="Search projects, articles, team members..."
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Compact Search (No Filters)</h3>
                  <GlobalSearch
                    onSearch={handleSearch}
                    placeholder="Quick search..."
                    showFilters={false}
                    size="small"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Large Search</h3>
                  <GlobalSearch
                    onSearch={handleSearch}
                    placeholder="Search our entire platform..."
                    size="large"
                    maxSuggestions={8}
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Features:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Real-time autocomplete suggestions</li>
                  <li>• Category-based filtering</li>
                  <li>• Keyboard navigation (↑↓ arrows, Enter, Escape)</li>
                  <li>• Clear search functionality</li>
                  <li>• Mobile-optimized interface</li>
                  <li>• Customizable suggestion limits</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'mobile-menu':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Mobile Menu</h2>
              <p className="text-gray-600 mb-6">
                Responsive mobile navigation with smooth animations, nested menus, and touch-friendly interface.
                Click the button below to see the mobile menu in action.
              </p>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex items-center gap-2"
                >
                  Open Mobile Menu
                </Button>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Features:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Smooth slide-in animations</li>
                    <li>• Nested menu support</li>
                    <li>• Touch-friendly interface</li>
                    <li>• Keyboard navigation</li>
                    <li>• Focus management</li>
                    <li>• Overlay with backdrop blur</li>
                    <li>• Escape key to close</li>
                    <li>• Body scroll prevention</li>
                  </ul>
                </div>
              </div>
            </div>

            <MobileMenu
              isOpen={isMobileMenuOpen}
              onToggle={setIsMobileMenuOpen}
            />
          </div>
        );

      case 'skip-links':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Skip Links</h2>
              <p className="text-gray-600 mb-6">
                Skip links allow keyboard users to quickly jump to important page sections,
                improving accessibility for screen reader users and keyboard navigation.
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Try Skip Links</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Tab</kbd> to focus the skip links at the top of the page.
                    They will become visible when focused.
                  </p>
                  
                  <div className="relative bg-gray-50 p-4 rounded">
                    <SkipLink href="#demo-content" />
                    <SkipLink 
                      href="#demo-navigation" 
                      className="top-0 left-32"
                      children="Skip to demo navigation"
                    />
                    
                    <div className="space-y-4">
                      <div id="demo-navigation" className="p-3 bg-blue-100 rounded">
                        <h4 className="font-medium">Demo Navigation Section</h4>
                        <p className="text-sm text-gray-600">This is where navigation would be.</p>
                      </div>
                      
                      <div id="demo-content" className="p-3 bg-green-100 rounded">
                        <h4 className="font-medium">Demo Main Content</h4>
                        <p className="text-sm text-gray-600">This is the main content area.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Features:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Hidden until focused</li>
                    <li>• Smooth focus transitions</li>
                    <li>• Automatic target focusing</li>
                    <li>• Multiple skip link support</li>
                    <li>• Customizable positioning</li>
                    <li>• Screen reader optimized</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'keyboard':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Keyboard Navigation</h2>
              <p className="text-gray-600 mb-6">
                Complete keyboard navigation support throughout the application.
                All interactive elements are accessible via keyboard.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Navigation Keys</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">Tab</kbd>
                      <span>Next element</span>
                    </div>
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">Shift + Tab</kbd>
                      <span>Previous element</span>
                    </div>
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd>
                      <span>Activate element</span>
                    </div>
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">Space</kbd>
                      <span>Activate button</span>
                    </div>
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">Escape</kbd>
                      <span>Close modal/menu</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Arrow Key Navigation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">↑ ↓</kbd>
                      <span>Menu items</span>
                    </div>
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">← →</kbd>
                      <span>Horizontal navigation</span>
                    </div>
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">Home</kbd>
                      <span>First item</span>
                    </div>
                    <div className="flex justify-between">
                      <kbd className="px-2 py-1 bg-gray-200 rounded">End</kbd>
                      <span>Last item</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Implementation Features:</h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Focus management and trapping</li>
                  <li>• Roving tabindex pattern</li>
                  <li>• ARIA attributes for screen readers</li>
                  <li>• Visual focus indicators</li>
                  <li>• Logical tab order</li>
                  <li>• Custom keyboard shortcuts</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Navigation & Search Demo</h1>
            <Button
              variant="outline"
              size="small"
              onClick={() => window.history.back()}
            >
              ← Back to App
            </Button>
          </div>
          
          <nav className="flex flex-wrap gap-2">
            {demoSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentDemo(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentDemo === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Demo Content */}
      <main className="container-custom py-8">
        {renderDemo()}
      </main>
    </div>
  );
};

export default NavigationDemoPage;