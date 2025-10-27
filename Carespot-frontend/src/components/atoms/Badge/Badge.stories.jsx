import Badge from './Badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component for displaying status, categories, or labels with various color variants and sizes.',
      },
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Badge content',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Color variant of the badge',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the badge',
    },
  },
};

// Default story
export const Default = {
  args: {
    children: 'Badge',
  },
};

// Variant stories
export const Primary = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Success = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Warning = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Danger = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

export const Info = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

// Size stories
export const Small = {
  args: {
    children: 'Small',
    size: 'small',
  },
};

export const Medium = {
  args: {
    children: 'Medium',
    size: 'medium',
  },
};

export const Large = {
  args: {
    children: 'Large',
    size: 'large',
  },
};

// All variants showcase
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge variants displayed together for comparison.',
      },
    },
  },
};

// All sizes showcase
export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="small" variant="primary">Small</Badge>
      <Badge size="medium" variant="primary">Medium</Badge>
      <Badge size="large" variant="primary">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge sizes displayed together for comparison.',
      },
    },
  },
};

// Status badges
export const StatusBadges = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="danger">Inactive</Badge>
        <Badge variant="info">Draft</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="success">Completed</Badge>
        <Badge variant="warning">In Progress</Badge>
        <Badge variant="danger">Failed</Badge>
        <Badge variant="default">Not Started</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common status badge usage examples.',
      },
    },
  },
};

// Category badges
export const CategoryBadges = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">Healthcare</Badge>
        <Badge variant="secondary">Education</Badge>
        <Badge variant="info">Technology</Badge>
        <Badge variant="success">Environment</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="warning" size="small">Urgent</Badge>
        <Badge variant="info" size="small">New</Badge>
        <Badge variant="success" size="small">Featured</Badge>
        <Badge variant="danger" size="small">Limited</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Category and tag badge usage examples.',
      },
    },
  },
};

// With numbers
export const WithNumbers = {
  render: () => (
    <div className="flex gap-4">
      <Badge variant="primary">12</Badge>
      <Badge variant="danger">99+</Badge>
      <Badge variant="success">5</Badge>
      <Badge variant="warning">0</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges displaying numbers, commonly used for notifications or counts.',
      },
    },
  },
};

// In context example
export const InContext = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h3 className="font-medium">Project Alpha</h3>
          <p className="text-sm text-gray-600">Healthcare initiative</p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>
      
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h3 className="font-medium">Project Beta</h3>
          <p className="text-sm text-gray-600">Education program</p>
        </div>
        <Badge variant="warning">Pending</Badge>
      </div>
      
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h3 className="font-medium">Project Gamma</h3>
          <p className="text-sm text-gray-600">Community outreach</p>
        </div>
        <Badge variant="danger">Inactive</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of badges used in a real-world context within cards or list items.',
      },
    },
  },
};