import Icon from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon component with a curated set of SVG icons commonly used in NGO websites. All icons are optimized for accessibility and performance.',
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['heart', 'users', 'medical', 'globe', 'star', 'check', 'x', 'chevronDown', 'chevronRight', 'menu', 'search'],
      description: 'Icon name from the available icon set',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Size of the icon',
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the icon (CSS color value)',
    },
  },
};

// Default story
export const Default = {
  args: {
    name: 'heart',
  },
};

// All icons showcase
export const AllIcons = {
  render: () => (
    <div className="grid grid-cols-5 gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Icon name="heart" size="large" />
        <span className="text-sm">heart</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="users" size="large" />
        <span className="text-sm">users</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="medical" size="large" />
        <span className="text-sm">medical</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="globe" size="large" />
        <span className="text-sm">globe</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="star" size="large" />
        <span className="text-sm">star</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="check" size="large" />
        <span className="text-sm">check</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="x" size="large" />
        <span className="text-sm">x</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="chevronDown" size="large" />
        <span className="text-sm">chevronDown</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="chevronRight" size="large" />
        <span className="text-sm">chevronRight</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="menu" size="large" />
        <span className="text-sm">menu</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="search" size="large" />
        <span className="text-sm">search</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available icons in the icon set.',
      },
    },
  },
};

// Size variants
export const Small = {
  args: {
    name: 'heart',
    size: 'small',
  },
};

export const Medium = {
  args: {
    name: 'heart',
    size: 'medium',
  },
};

export const Large = {
  args: {
    name: 'heart',
    size: 'large',
  },
};

export const XLarge = {
  args: {
    name: 'heart',
    size: 'xlarge',
  },
};

// All sizes comparison
export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Icon name="heart" size="small" />
        <span className="text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="heart" size="medium" />
        <span className="text-xs">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="heart" size="large" />
        <span className="text-xs">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="heart" size="xlarge" />
        <span className="text-xs">XLarge</span>
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

// Color variants
export const ColorVariants = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="heart" color="#ef4444" size="large" />
      <Icon name="users" color="#3b82f6" size="large" />
      <Icon name="medical" color="#10b981" size="large" />
      <Icon name="globe" color="#f59e0b" size="large" />
      <Icon name="star" color="#8b5cf6" size="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons with different colors applied.',
      },
    },
  },
};

// NGO context usage
export const NGOContextUsage = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Icon name="heart" color="#ef4444" size="large" />
        <span className="text-lg">Donate to help communities</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Icon name="users" color="#3b82f6" size="large" />
        <span className="text-lg">Join our volunteer network</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Icon name="medical" color="#10b981" size="large" />
        <span className="text-lg">Healthcare initiatives</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Icon name="globe" color="#f59e0b" size="large" />
        <span className="text-lg">Global impact programs</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Icon name="star" color="#8b5cf6" size="large" />
        <span className="text-lg">Featured projects</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of how icons are used in NGO website context.',
      },
    },
  },
};

// Interactive elements
export const InteractiveElements = {
  render: () => (
    <div className="space-y-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <Icon name="heart" size="small" />
        Donate Now
      </button>
      
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <Icon name="users" size="small" />
        Volunteer
      </button>
      
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span>Healthcare Program</span>
        <Icon name="chevronRight" size="small" />
      </div>
      
      <div className="flex items-center gap-2 text-green-600">
        <Icon name="check" size="small" />
        <span>Project completed successfully</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons used in interactive elements like buttons and status indicators.',
      },
    },
  },
};