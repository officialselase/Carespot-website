import Input from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with label, error states, helper text, and accessibility features.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display below input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the input',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled'],
      description: 'Visual variant of the input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// Default story
export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
};

// With label
export const WithLabel = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

// Required field
export const Required = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
};

// With helper text
export const WithHelperText = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters long',
  },
};

// Error state
export const WithError = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

// Disabled state
export const Disabled = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
};

// Size variants
export const Small = {
  args: {
    label: 'Small Input',
    size: 'small',
    placeholder: 'Small size',
  },
};

export const Medium = {
  args: {
    label: 'Medium Input',
    size: 'medium',
    placeholder: 'Medium size',
  },
};

export const Large = {
  args: {
    label: 'Large Input',
    size: 'large',
    placeholder: 'Large size',
  },
};

// Variant styles
export const DefaultVariant = {
  args: {
    label: 'Default Variant',
    variant: 'default',
    placeholder: 'Default styling',
  },
};

export const FilledVariant = {
  args: {
    label: 'Filled Variant',
    variant: 'filled',
    placeholder: 'Filled styling',
  },
};

// Input types showcase
export const InputTypes = {
  render: () => (
    <div className="space-y-4">
      <Input label="Text Input" type="text" placeholder="Enter text" />
      <Input label="Email Input" type="email" placeholder="Enter email" />
      <Input label="Password Input" type="password" placeholder="Enter password" />
      <Input label="Number Input" type="number" placeholder="Enter number" />
      <Input label="Phone Input" type="tel" placeholder="Enter phone number" />
      <Input label="URL Input" type="url" placeholder="Enter URL" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types supported by the component.',
      },
    },
  },
};

// Form example
export const FormExample = {
  render: () => (
    <form className="space-y-4">
      <Input 
        label="First Name" 
        placeholder="Enter your first name" 
        required 
      />
      <Input 
        label="Email Address" 
        type="email" 
        placeholder="Enter your email" 
        required 
        helperText="We'll never share your email with anyone else."
      />
      <Input 
        label="Phone Number" 
        type="tel" 
        placeholder="Enter your phone number" 
      />
      <Input 
        label="Website" 
        type="url" 
        placeholder="https://example.com" 
        helperText="Optional: Your personal or company website"
      />
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of inputs used in a form context.',
      },
    },
  },
};