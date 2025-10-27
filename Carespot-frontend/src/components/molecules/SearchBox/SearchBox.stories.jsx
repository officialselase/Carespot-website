import SearchBox from './SearchBox';

export default {
  title: 'Molecules/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'SearchBox component combining an input field with a search button for user search functionality.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the search input',
    },
    onSearch: {
      action: 'searched',
      description: 'Callback function called when search is submitted',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the search components',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// Default story
export const Default = {
  args: {
    placeholder: 'Search...',
  },
};

// Different placeholders
export const ProjectSearch = {
  args: {
    placeholder: 'Search projects...',
  },
};

export const VolunteerSearch = {
  args: {
    placeholder: 'Find volunteers...',
  },
};

export const LocationSearch = {
  args: {
    placeholder: 'Search locations...',
  },
};

// Size variants
export const Small = {
  args: {
    placeholder: 'Search...',
    size: 'small',
  },
};

export const Medium = {
  args: {
    placeholder: 'Search...',
    size: 'medium',
  },
};

export const Large = {
  args: {
    placeholder: 'Search...',
    size: 'large',
  },
};

// All sizes comparison
export const AllSizes = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <SearchBox placeholder="Small search..." size="small" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Medium</label>
        <SearchBox placeholder="Medium search..." size="medium" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <SearchBox placeholder="Large search..." size="large" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available sizes displayed together for comparison.',
      },
    },
  },
};

// NGO context examples
export const NGOSearchExamples = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Website Search</h3>
        <SearchBox placeholder="Search our programs, projects, and resources..." />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Volunteer Directory</h3>
        <SearchBox placeholder="Find volunteers by name, skills, or location..." />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Project Database</h3>
        <SearchBox placeholder="Search healthcare projects and initiatives..." />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Resource Library</h3>
        <SearchBox placeholder="Find documents, reports, and resources..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of SearchBox usage in different NGO website contexts.',
      },
    },
  },
};

// With search functionality demo
export const WithSearchFunctionality = {
  render: () => {
    const handleSearch = (searchTerm) => {
      alert(`Searching for: "${searchTerm}"`);
    };

    return (
      <div className="space-y-4">
        <SearchBox 
          placeholder="Try searching for something..." 
          onSearch={handleSearch}
        />
        <p className="text-sm text-gray-600">
          Type something and press Enter or click the search button to see the search functionality.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing the search functionality in action.',
      },
    },
  },
};

// In page layouts
export const InPageLayouts = {
  render: () => (
    <div className="space-y-8">
      {/* Header search */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Header Search</h3>
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">CareSpot</div>
          <SearchBox placeholder="Search..." size="small" className="max-w-xs" />
        </div>
      </div>

      {/* Hero section search */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-2">Find Healthcare Resources</h1>
        <p className="mb-6">Search our comprehensive database of health programs and services</p>
        <SearchBox 
          placeholder="Search programs, services, locations..." 
          size="large"
          className="max-w-md mx-auto"
        />
      </div>

      {/* Sidebar search */}
      <div className="flex gap-6">
        <div className="w-64 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Filter Resources</h3>
          <SearchBox placeholder="Search filters..." size="small" />
        </div>
        <div className="flex-1 p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">Main Content Area</h3>
          <p className="text-gray-600">Content would be displayed here...</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of SearchBox integrated into different page layouts and contexts.',
      },
    },
  },
};

// Mobile responsive
export const MobileResponsive = {
  render: () => (
    <div className="space-y-4">
      <div className="max-w-sm">
        <h3 className="text-sm font-medium mb-2">Mobile View</h3>
        <SearchBox placeholder="Search on mobile..." />
      </div>
      <div className="max-w-md">
        <h3 className="text-sm font-medium mb-2">Tablet View</h3>
        <SearchBox placeholder="Search on tablet..." />
      </div>
      <div className="max-w-lg">
        <h3 className="text-sm font-medium mb-2">Desktop View</h3>
        <SearchBox placeholder="Search on desktop..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SearchBox component shown at different screen sizes to demonstrate responsive behavior.',
      },
    },
  },
};