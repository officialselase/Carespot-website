// src/components/molecules/TouchOptimizedForm/TouchOptimizedForm.stories.jsx
import TouchOptimizedForm from './TouchOptimizedForm';

export default {
  title: 'Molecules/TouchOptimizedForm',
  component: TouchOptimizedForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A form component optimized for touch devices with mobile-friendly inputs, keyboard handling, and validation.'
      }
    }
  },
  argTypes: {
    fields: {
      description: 'Array of field configurations',
      control: { type: 'object' }
    },
    onSubmit: {
      description: 'Function called when form is submitted',
      action: 'submit'
    },
    touchOptimizations: {
      description: 'Enable touch-specific optimizations',
      control: { type: 'boolean' }
    },
    autoFocus: {
      description: 'Auto-focus first field on mobile',
      control: { type: 'boolean' }
    },
    validateOnBlur: {
      description: 'Validate fields when they lose focus',
      control: { type: 'boolean' }
    },
    showReset: {
      description: 'Show reset button',
      control: { type: 'boolean' }
    }
  }
};

// Contact form example
const contactFields = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    autoComplete: 'name',
    autoCapitalize: 'words',
    placeholder: 'Enter your full name'
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    autoComplete: 'email',
    placeholder: 'your.email@example.com'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    autoComplete: 'tel',
    placeholder: '+1 (555) 123-4567',
    helpText: 'Include country code for international numbers'
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'select',
    required: true,
    placeholder: 'Select a subject',
    options: [
      { value: 'general', label: 'General Inquiry' },
      { value: 'volunteer', label: 'Volunteer Opportunity' },
      { value: 'donation', label: 'Donation Question' },
      { value: 'partnership', label: 'Partnership' },
      { value: 'support', label: 'Technical Support' }
    ]
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    rows: 5,
    minLength: 10,
    maxLength: 1000,
    placeholder: 'Tell us how we can help you...',
    helpText: 'Please provide as much detail as possible'
  }
];

export const Default = {
  args: {
    fields: contactFields,
    submitText: 'Send Message',
    resetText: 'Clear Form',
    showReset: true,
    autoFocus: true,
    validateOnBlur: true,
    touchOptimizations: true,
    className: 'max-w-lg mx-auto'
  }
};

// Volunteer application form
const volunteerFields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    autoComplete: 'given-name',
    autoCapitalize: 'words'
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    autoComplete: 'family-name',
    autoCapitalize: 'words'
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    autoComplete: 'email'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    autoComplete: 'tel'
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    required: true,
    validate: (value) => {
      const age = parseInt(value);
      if (age < 16) return 'Must be at least 16 years old';
      if (age > 100) return 'Please enter a valid age';
      return null;
    }
  },
  {
    name: 'experience',
    label: 'Relevant Experience',
    type: 'select',
    required: true,
    options: [
      { value: 'none', label: 'No prior experience' },
      { value: 'some', label: 'Some volunteer experience' },
      { value: 'healthcare', label: 'Healthcare experience' },
      { value: 'education', label: 'Education/Teaching experience' },
      { value: 'nonprofit', label: 'Nonprofit sector experience' }
    ]
  },
  {
    name: 'availability',
    label: 'Availability',
    type: 'textarea',
    required: true,
    rows: 3,
    placeholder: 'Please describe your availability (days, times, frequency)',
    helpText: 'Help us match you with suitable opportunities'
  },
  {
    name: 'motivation',
    label: 'Why do you want to volunteer with CareSpot?',
    type: 'textarea',
    required: true,
    rows: 4,
    minLength: 50,
    placeholder: 'Share your motivation and what you hope to contribute...'
  }
];

export const VolunteerApplication = {
  args: {
    fields: volunteerFields,
    submitText: 'Submit Application',
    resetText: 'Start Over',
    showReset: true,
    autoFocus: true,
    validateOnBlur: true,
    touchOptimizations: true,
    className: 'max-w-2xl mx-auto'
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive volunteer application form with validation and mobile optimizations.'
      }
    }
  }
};

// Donation form
const donationFields = [
  {
    name: 'amount',
    label: 'Donation Amount',
    type: 'number',
    required: true,
    placeholder: '25.00',
    validate: (value) => {
      const amount = parseFloat(value);
      if (amount < 1) return 'Minimum donation is $1';
      if (amount > 10000) return 'Please contact us for donations over $10,000';
      return null;
    },
    helpText: 'Enter amount in USD'
  },
  {
    name: 'frequency',
    label: 'Donation Frequency',
    type: 'select',
    required: true,
    defaultValue: 'once',
    options: [
      { value: 'once', label: 'One-time donation' },
      { value: 'monthly', label: 'Monthly recurring' },
      { value: 'quarterly', label: 'Quarterly recurring' },
      { value: 'annually', label: 'Annual recurring' }
    ]
  },
  {
    name: 'donorName',
    label: 'Full Name',
    type: 'text',
    required: true,
    autoComplete: 'name',
    autoCapitalize: 'words'
  },
  {
    name: 'donorEmail',
    label: 'Email Address',
    type: 'email',
    required: true,
    autoComplete: 'email',
    helpText: 'For donation receipt and updates'
  },
  {
    name: 'anonymous',
    label: 'Make this donation anonymous',
    type: 'checkbox',
    helpText: 'Your name will not be displayed publicly'
  },
  {
    name: 'dedication',
    label: 'Dedication (Optional)',
    type: 'textarea',
    rows: 3,
    placeholder: 'In honor of... or In memory of...',
    helpText: 'Dedicate this donation to someone special'
  }
];

export const DonationForm = {
  args: {
    fields: donationFields,
    submitText: 'Proceed to Payment',
    resetText: 'Reset',
    showReset: true,
    autoFocus: false,
    validateOnBlur: true,
    touchOptimizations: true,
    className: 'max-w-lg mx-auto'
  },
  parameters: {
    docs: {
      description: {
        story: 'A donation form with amount validation and recurring options.'
      }
    }
  }
};

// Mobile-first form (no touch optimizations for comparison)
export const StandardForm = {
  args: {
    fields: contactFields.slice(0, 3), // Simplified for comparison
    submitText: 'Submit',
    showReset: false,
    autoFocus: false,
    validateOnBlur: true,
    touchOptimizations: false,
    className: 'max-w-lg mx-auto'
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard form without touch optimizations for comparison.'
      }
    }
  }
};

// Form with custom validation
const customValidationFields = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: '^[a-zA-Z0-9_]+$',
    patternMessage: 'Username can only contain letters, numbers, and underscores',
    autoComplete: 'username',
    helpText: '3-20 characters, letters, numbers, and underscores only'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    minLength: 8,
    autoComplete: 'new-password',
    validate: (value) => {
      if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
      if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
      if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
      if (!/(?=.*[@$!%*?&])/.test(value)) return 'Password must contain at least one special character';
      return null;
    },
    helpText: 'At least 8 characters with uppercase, lowercase, number, and special character'
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    required: true,
    autoComplete: 'new-password',
    validate: (value, formData) => {
      if (value !== formData.password) return 'Passwords do not match';
      return null;
    }
  }
];

export const CustomValidation = {
  args: {
    fields: customValidationFields,
    submitText: 'Create Account',
    showReset: true,
    autoFocus: true,
    validateOnBlur: true,
    touchOptimizations: true,
    className: 'max-w-lg mx-auto'
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with complex custom validation rules and password requirements.'
      }
    }
  }
};