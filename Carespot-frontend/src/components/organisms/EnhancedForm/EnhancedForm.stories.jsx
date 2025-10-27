import EnhancedForm from './EnhancedForm';

export default {
  title: 'Organisms/EnhancedForm',
  component: EnhancedForm,
  parameters: {
    layout: 'padded',
  },
};

const contactFormFields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    validation: {
      required: true,
      minLength: 2,
    },
    defaultValue: '',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    validation: {
      required: true,
      minLength: 2,
    },
    defaultValue: '',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    validation: {
      required: true,
      email: true,
    },
    defaultValue: '',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    validation: {
      phone: true,
    },
    defaultValue: '',
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    suggestions: [
      'Google',
      'Microsoft',
      'Apple',
      'Amazon',
      'Meta',
      'Netflix',
      'Tesla',
      'Spotify',
      'Uber',
      'Airbnb',
    ],
    autoComplete: true,
    defaultValue: '',
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    validation: {
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    defaultValue: '',
  },
];

export const ContactForm = {
  args: {
    fields: contactFormFields,
    onSubmit: async (data) => {
      console.log('Contact form submitted:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Thank you for your message!');
    },
    autoSave: true,
    autoSaveInterval: 3000,
    showToasts: true,
  },
};

const jobApplicationFields = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    validation: {
      required: true,
      minLength: 3,
    },
    defaultValue: '',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    validation: {
      required: true,
      email: true,
    },
    defaultValue: '',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    validation: {
      required: true,
      phone: true,
    },
    defaultValue: '',
  },
  {
    name: 'position',
    label: 'Position Applied For',
    type: 'text',
    suggestions: [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'UI/UX Designer',
      'Product Manager',
      'Data Scientist',
      'DevOps Engineer',
      'QA Engineer',
    ],
    autoComplete: true,
    validation: {
      required: true,
    },
    defaultValue: '',
  },
  {
    name: 'experience',
    label: 'Years of Experience',
    type: 'number',
    validation: {
      required: true,
      custom: (value) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 0 || num > 50) {
          return 'Please enter a valid number of years (0-50)';
        }
        return true;
      }
    },
    defaultValue: '',
  },
  {
    name: 'resume',
    label: 'Resume',
    type: 'file',
    accept: '.pdf,.doc,.docx',
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    validation: {
      required: true,
    },
  },
  {
    name: 'coverLetter',
    label: 'Cover Letter',
    type: 'textarea',
    validation: {
      required: true,
      minLength: 50,
      maxLength: 2000,
    },
    defaultValue: '',
  },
  {
    name: 'portfolio',
    label: 'Portfolio Files (Optional)',
    type: 'file',
    accept: '.pdf,.jpg,.jpeg,.png,.zip',
    multiple: true,
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB per file
  },
];

export const JobApplicationForm = {
  args: {
    fields: jobApplicationFields,
    onSubmit: async (data) => {
      console.log('Job application submitted:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Your application has been submitted successfully!');
    },
    autoSave: true,
    autoSaveInterval: 5000,
    showToasts: true,
  },
};

const surveyFields = [
  {
    name: 'name',
    label: 'Your Name (Optional)',
    type: 'text',
    defaultValue: '',
  },
  {
    name: 'email',
    label: 'Email (Optional)',
    type: 'email',
    validation: {
      email: true,
    },
    defaultValue: '',
  },
  {
    name: 'rating',
    label: 'Overall Satisfaction',
    type: 'number',
    validation: {
      required: true,
      custom: (value) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 1 || num > 10) {
          return 'Please rate from 1 to 10';
        }
        return true;
      }
    },
    defaultValue: '',
  },
  {
    name: 'feedback',
    label: 'Your Feedback',
    type: 'textarea',
    validation: {
      required: true,
      minLength: 10,
    },
    defaultValue: '',
  },
  {
    name: 'improvements',
    label: 'Suggested Improvements',
    type: 'textarea',
    defaultValue: '',
  },
];

export const SurveyForm = {
  args: {
    fields: surveyFields,
    onSubmit: async (data) => {
      console.log('Survey submitted:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Thank you for your feedback!');
    },
    autoSave: false,
    showToasts: true,
  },
};

export const WithoutAutoSave = {
  args: {
    ...ContactForm.args,
    autoSave: false,
  },
};

export const WithoutToasts = {
  args: {
    ...ContactForm.args,
    showToasts: false,
  },
};

export const FastAutoSave = {
  args: {
    ...ContactForm.args,
    autoSaveInterval: 1000,
  },
};