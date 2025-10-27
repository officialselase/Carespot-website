import MultiStepForm from './MultiStepForm';
import FormField from '../FormField/FormField';
import FileUpload from '../FileUpload/FileUpload';

export default {
  title: 'Molecules/MultiStepForm',
  component: MultiStepForm,
  parameters: {
    layout: 'padded',
  },
};

// Step components for the demo
const PersonalInfoStep = ({ data, onChange, validation }) => (
  <div className="space-y-4">
    <FormField
      name="firstName"
      label="First Name"
      value={data.firstName || ''}
      onChange={(e) => onChange({ firstName: e.target.value })}
      validation={{ required: true, minLength: 2 }}
    />
    <FormField
      name="lastName"
      label="Last Name"
      value={data.lastName || ''}
      onChange={(e) => onChange({ lastName: e.target.value })}
      validation={{ required: true, minLength: 2 }}
    />
    <FormField
      name="email"
      label="Email"
      type="email"
      value={data.email || ''}
      onChange={(e) => onChange({ email: e.target.value })}
      validation={{ required: true, email: true }}
    />
  </div>
);

const ContactInfoStep = ({ data, onChange, validation }) => (
  <div className="space-y-4">
    <FormField
      name="phone"
      label="Phone Number"
      type="tel"
      value={data.phone || ''}
      onChange={(e) => onChange({ phone: e.target.value })}
      validation={{ required: true, phone: true }}
    />
    <FormField
      name="address"
      label="Address"
      value={data.address || ''}
      onChange={(e) => onChange({ address: e.target.value })}
      validation={{ required: true, minLength: 10 }}
    />
    <FormField
      name="city"
      label="City"
      value={data.city || ''}
      onChange={(e) => onChange({ city: e.target.value })}
      validation={{ required: true }}
    />
  </div>
);

const DocumentsStep = ({ data, onChange, validation }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Documents
      </label>
      <FileUpload
        accept=".pdf,.doc,.docx"
        multiple={true}
        maxFiles={3}
        onFilesChange={(files) => onChange({ documents: files })}
      />
    </div>
    <FormField
      name="notes"
      label="Additional Notes"
      type="textarea"
      value={data.notes || ''}
      onChange={(e) => onChange({ notes: e.target.value })}
      placeholder="Any additional information..."
    />
  </div>
);

const steps = [
  {
    title: 'Personal Information',
    description: 'Please provide your basic personal information',
    component: PersonalInfoStep,
    validate: (data) => {
      const errors = [];
      if (!data.firstName || data.firstName.length < 2) errors.push('First name required');
      if (!data.lastName || data.lastName.length < 2) errors.push('Last name required');
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Valid email required');
      return { isValid: errors.length === 0, errors };
    }
  },
  {
    title: 'Contact Details',
    description: 'How can we reach you?',
    component: ContactInfoStep,
    validate: (data) => {
      const errors = [];
      if (!data.phone) errors.push('Phone number required');
      if (!data.address || data.address.length < 10) errors.push('Complete address required');
      if (!data.city) errors.push('City required');
      return { isValid: errors.length === 0, errors };
    }
  },
  {
    title: 'Documents & Notes',
    description: 'Upload any supporting documents',
    component: DocumentsStep,
    validate: (data) => {
      return { isValid: true, errors: [] };
    }
  }
];

export const Default = {
  args: {
    steps,
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Form submitted successfully!');
    },
    onStepChange: (stepIndex, step) => {
      console.log('Step changed:', stepIndex, step.title);
    },
    autoSave: true,
    autoSaveInterval: 3000,
  },
};

export const WithoutAutoSave = {
  args: {
    ...Default.args,
    autoSave: false,
  },
};

export const FastAutoSave = {
  args: {
    ...Default.args,
    autoSaveInterval: 1000,
  },
};

// Simple steps without validation
const simpleSteps = [
  {
    title: 'Step 1',
    description: 'This is the first step',
    component: ({ data, onChange }) => (
      <FormField
        name="step1Field"
        label="Step 1 Field"
        value={data.step1Field || ''}
        onChange={(e) => onChange({ step1Field: e.target.value })}
      />
    )
  },
  {
    title: 'Step 2',
    description: 'This is the second step',
    component: ({ data, onChange }) => (
      <FormField
        name="step2Field"
        label="Step 2 Field"
        value={data.step2Field || ''}
        onChange={(e) => onChange({ step2Field: e.target.value })}
      />
    )
  }
];

export const SimpleSteps = {
  args: {
    steps: simpleSteps,
    onSubmit: async (data) => {
      console.log('Simple form submitted:', data);
      alert('Simple form submitted!');
    },
    autoSave: false,
  },
};