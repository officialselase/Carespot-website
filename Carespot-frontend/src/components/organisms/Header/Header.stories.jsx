import Header from './Header';

export default {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Header component with logo, navigation, user profile, and mobile menu functionality.',
      },
    },
  },
  argTypes: {
    logo: {
      control: { type: 'object' },
      description: 'Logo object with src and alt properties',
    },
    navigation: {
      control: { type: 'object' },
      description: 'Array of navigation items with label and href',
    },
    user: {
      control: { type: 'object' },
      description: 'User object for authenticated state',
    },
    onMenuToggle: {
      action: 'menu toggled',
      description: 'Callback for mobile menu toggle',
    },
  },
};

// Sample navigation data
const sampleNavigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Get Involved', href: '/volunteer' },
  { label: 'Contact', href: '/contact' },
];

const sampleUser = {
  name: 'Sarah Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'Volunteer Coordinator',
  email: 'sarah@carespot.org'
};

const sampleLogo = {
  src: 'https://via.placeholder.com/120x32/2563eb/ffffff?text=CareSpot',
  alt: 'CareSpot Logo'
};

// Default story (guest user)
export const Default = {
  args: {
    navigation: sampleNavigation,
  },
};

// With logo
export const WithLogo = {
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation,
  },
};

// Authenticated user
export const AuthenticatedUser = {
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation,
    user: sampleUser,
  },
};

// Minimal navigation
export const MinimalNavigation = {
  args: {
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Donate', href: '/donate' },
    ],
  },
};

// Extended navigation
export const ExtendedNavigation = {
  args: {
    logo: sampleLogo,
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Our Work', href: '/work' },
      { label: 'Projects', href: '/projects' },
      { label: 'Health Programs', href: '/health' },
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Donate', href: '/donate' },
      { label: 'News', href: '/news' },
      { label: 'Contact', href: '/contact' },
    ],
  },
};

// Different user types
export const VolunteerUser = {
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation,
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      role: 'Community Volunteer',
      email: 'michael@volunteer.org'
    },
  },
};

export const StaffUser = {
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation,
    user: {
      name: 'Dr. Amara Osei',
      role: 'Medical Director',
      email: 'dr.osei@carespot.org'
    },
  },
};

// Mobile menu demo
export const MobileMenuDemo = {
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Header component shown in mobile viewport to demonstrate mobile menu functionality.',
      },
    },
  },
};

// Different header styles
export const NGOHeaderVariations = {
  render: () => (
    <div className="space-y-8">
      {/* Standard NGO Header */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Standard NGO Header</h3>
        <Header
          logo={sampleLogo}
          navigation={[
            { label: 'Home', href: '/' },
            { label: 'Our Mission', href: '/mission' },
            { label: 'Programs', href: '/programs' },
            { label: 'Get Involved', href: '/volunteer' },
            { label: 'Donate', href: '/donate' },
          ]}
        />
      </div>

      {/* Healthcare Focus */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Healthcare Focused</h3>
        <Header
          navigation={[
            { label: 'Home', href: '/' },
            { label: 'Health Services', href: '/health' },
            { label: 'Medical Programs', href: '/medical' },
            { label: 'Community Health', href: '/community' },
            { label: 'Support Us', href: '/support' },
          ]}
        />
      </div>

      {/* With Authenticated Medical Staff */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Medical Staff Portal</h3>
        <Header
          logo={sampleLogo}
          navigation={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Patients', href: '/patients' },
            { label: 'Programs', href: '/programs' },
            { label: 'Reports', href: '/reports' },
          ]}
          user={{
            name: 'Dr. Kwame Asante',
            avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            role: 'Chief Medical Officer',
            email: 'dr.asante@carespot.org'
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different header configurations for various NGO website contexts.',
      },
    },
  },
};

// Responsive behavior showcase
export const ResponsiveBehavior = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Desktop View</h3>
        <div className="border rounded-lg overflow-hidden">
          <Header
            logo={sampleLogo}
            navigation={sampleNavigation}
            user={sampleUser}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Tablet View</h3>
        <div className="max-w-2xl border rounded-lg overflow-hidden">
          <Header
            logo={sampleLogo}
            navigation={sampleNavigation}
            user={sampleUser}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Mobile View</h3>
        <div className="max-w-sm border rounded-lg overflow-hidden">
          <Header
            logo={sampleLogo}
            navigation={sampleNavigation}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header component behavior across different screen sizes.',
      },
    },
  },
};

// Interactive demo
export const InteractiveDemo = {
  render: () => {
    const handleMenuToggle = (isOpen) => {
      console.log('Mobile menu toggled:', isOpen);
    };

    return (
      <div className="space-y-4">
        <Header
          logo={sampleLogo}
          navigation={sampleNavigation}
          onMenuToggle={handleMenuToggle}
        />
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Try resizing your browser window or using mobile view to see the responsive menu behavior.
            Check the console for menu toggle events.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive header with menu toggle functionality and event handling.',
      },
    },
  },
};