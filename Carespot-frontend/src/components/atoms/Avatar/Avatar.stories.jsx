import Avatar from './Avatar';

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component that displays user profile pictures or initials with various sizes and shapes.',
      },
    },
  },
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the image',
    },
    name: {
      control: { type: 'text' },
      description: 'Name used for generating initials and alt text',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Size of the avatar',
    },
    variant: {
      control: { type: 'select' },
      options: ['circular', 'rounded', 'square'],
      description: 'Shape variant of the avatar',
    },
  },
};

// Default story with initials
export const Default = {
  args: {
    name: 'John Doe',
  },
};

// With image
export const WithImage = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    alt: 'Profile picture',
    name: 'John Doe',
  },
};

// Size variants
export const Small = {
  args: {
    name: 'John Doe',
    size: 'small',
  },
};

export const Medium = {
  args: {
    name: 'John Doe',
    size: 'medium',
  },
};

export const Large = {
  args: {
    name: 'John Doe',
    size: 'large',
  },
};

export const XLarge = {
  args: {
    name: 'John Doe',
    size: 'xlarge',
  },
};

// Shape variants
export const Circular = {
  args: {
    name: 'John Doe',
    variant: 'circular',
  },
};

export const Rounded = {
  args: {
    name: 'John Doe',
    variant: 'rounded',
  },
};

export const Square = {
  args: {
    name: 'John Doe',
    variant: 'square',
  },
};

// Different names for color variety
export const ColorVariations = {
  render: () => (
    <div className="flex gap-4">
      <Avatar name="Alice Johnson" />
      <Avatar name="Bob Smith" />
      <Avatar name="Carol Williams" />
      <Avatar name="David Brown" />
      <Avatar name="Emma Davis" />
      <Avatar name="Frank Miller" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different names generate different background colors automatically.',
      },
    },
  },
};

// All sizes comparison
export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" size="small" />
      <Avatar name="John Doe" size="medium" />
      <Avatar name="John Doe" size="large" />
      <Avatar name="John Doe" size="xlarge" />
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

// All shapes comparison
export const AllShapes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" variant="circular" />
      <Avatar name="John Doe" variant="rounded" />
      <Avatar name="John Doe" variant="square" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available shape variants displayed together.',
      },
    },
  },
};

// With images in different shapes
export const ImagesWithShapes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        name="John Doe" 
        variant="circular" 
      />
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        name="John Doe" 
        variant="rounded" 
      />
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        name="John Doe" 
        variant="square" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile images displayed in different shape variants.',
      },
    },
  },
};

// Team showcase
export const TeamShowcase = {
  render: () => (
    <div className="space-y-4">
      <div className="flex -space-x-2">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name="John Doe" 
          className="ring-2 ring-white"
        />
        <Avatar 
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name="Jane Smith" 
          className="ring-2 ring-white"
        />
        <Avatar 
          name="Bob Johnson" 
          className="ring-2 ring-white"
        />
        <Avatar 
          name="Alice Brown" 
          className="ring-2 ring-white"
        />
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 ring-2 ring-white text-sm font-medium text-gray-500">
          +3
        </div>
      </div>
      <p className="text-sm text-gray-600">Overlapping avatars for team display</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of overlapping avatars commonly used for team or group displays.',
      },
    },
  },
};