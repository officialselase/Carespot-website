import { useState } from 'react';
import FormField from './FormField';

export default {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
  },
};

// Template for interactive stories
const Template = (args) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <div className="max-w-md">
      <FormField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'defaultField',
  label: 'Default Field',
  placeholder: 'Enter some text...',
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  name: 'validatedField',
  label: 'Email Address',
  type: 'email',
  placeholder: 'Enter your email...',
  validation: {
    required: true,
    email: true,
  },
  realTimeValidation: true,
};

export const WithSuggestions = Template.bind({});
WithSuggestions.args = {
  name: 'cityField',
  label: 'City',
  placeholder: 'Start typing a city name...',
  suggestions: [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'Jacksonville',
    'Fort Worth',
    'Columbus',
    'Charlotte',
  ],
  autoComplete: true,
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password...',
  validation: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    custom: (value) => {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      return true;
    }
  },
  realTimeValidation: true,
};

export const PhoneNumber = Template.bind({});
PhoneNumber.args = {
  name: 'phone',
  label: 'Phone Number',
  type: 'tel',
  placeholder: '+1 (555) 123-4567',
  validation: {
    required: true,
    phone: true,
  },
  realTimeValidation: true,
};

export const WithCustomValidation = Template.bind({});
WithCustomValidation.args = {
  name: 'username',
  label: 'Username',
  placeholder: 'Choose a username...',
  validation: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    custom: async (value) => {
      // Simulate API call to check username availability
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (value.toLowerCase() === 'admin' || value.toLowerCase() === 'root') {
        return 'This username is not available';
      }
      return true;
    }
  },
  realTimeValidation: true,
  debounceMs: 500,
};

export const NoRealTimeValidation = Template.bind({});
NoRealTimeValidation.args = {
  name: 'delayedField',
  label: 'Validated on Blur Only',
  placeholder: 'This field validates only when you leave it...',
  validation: {
    required: true,
    minLength: 5,
  },
  realTimeValidation: false,
};

export const CountryWithSuggestions = Template.bind({});
CountryWithSuggestions.args = {
  name: 'country',
  label: 'Country',
  placeholder: 'Start typing a country name...',
  suggestions: [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Netherlands',
    'Belgium',
    'Switzerland',
    'Austria',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Australia',
    'New Zealand',
    'Japan',
    'South Korea',
    'Singapore',
  ],
  autoComplete: true,
  validation: {
    required: true,
  },
};

export const TextArea = Template.bind({});
TextArea.args = {
  name: 'description',
  label: 'Description',
  type: 'textarea',
  placeholder: 'Enter a detailed description...',
  validation: {
    required: true,
    minLength: 20,
    maxLength: 500,
  },
  realTimeValidation: true,
};