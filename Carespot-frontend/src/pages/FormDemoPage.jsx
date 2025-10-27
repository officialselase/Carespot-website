import { useState } from 'react';
import { Heading } from '../components/Typography';
import Button from '../components/atoms/Button/Button';
import MultiStepForm from '../components/molecules/MultiStepForm/MultiStepForm';
import EnhancedForm from '../components/organisms/EnhancedForm/EnhancedForm';
import FormField from '../components/molecules/FormField/FormField';
import FileUpload from '../components/molecules/FileUpload/FileUpload';

const FormDemoPage = () => {
  const [activeDemo, setActiveDemo] = useState('enhanced');

  // Enhanced Form Demo
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
      name: 'organization',
      label: 'Organization',
      type: 'text',
      suggestions: [
        'Red Cross',
        'UNICEF',
        'Doctors Without Borders',
        'Oxfam',
        'Save the Children',
        'World Vision',
        'Habitat for Humanity',
        'Amnesty International',
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
    {
      name: 'attachments',
      label: 'Attachments (Optional)',
      type: 'file',
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      multiple: true,
      maxFiles: 3,
      maxSize: 5 * 1024 * 1024, // 5MB
    },
  ];

  // Multi-Step Form Demo
  const PersonalInfoStep = ({ data, onChange, validation }) => (
    <div className="space-y-4">
      <FormField
        name="fullName"
        label="Full Name"
        value={data.fullName || ''}
        onChange={(e) => onChange({ fullName: e.target.value })}
        validation={{ required: true, minLength: 3 }}
      />
      <FormField
        name="email"
        label="Email Address"
        type="email"
        value={data.email || ''}
        onChange={(e) => onChange({ email: e.target.value })}
        validation={{ required: true, email: true }}
      />
      <FormField
        name="phone"
        label="Phone Number"
        type="tel"
        value={data.phone || ''}
        onChange={(e) => onChange({ phone: e.target.value })}
        validation={{ required: true, phone: true }}
      />
    </div>
  );

  const VolunteerInfoStep = ({ data, onChange, validation }) => (
    <div className="space-y-4">
      <FormField
        name="skills"
        label="Skills & Expertise"
        value={data.skills || ''}
        onChange={(e) => onChange({ skills: e.target.value })}
        suggestions={[
          'Healthcare',
          'Education',
          'Technology',
          'Construction',
          'Administration',
          'Fundraising',
          'Marketing',
          'Translation',
          'Counseling',
          'Event Planning',
        ]}
        autoComplete={true}
        validation={{ required: true }}
      />
      <FormField
        name="availability"
        label="Availability"
        value={data.availability || ''}
        onChange={(e) => onChange({ availability: e.target.value })}
        suggestions={[
          'Weekends only',
          'Weekdays only',
          'Flexible schedule',
          'Full-time',
          'Part-time',
          'Seasonal',
        ]}
        autoComplete={true}
        validation={{ required: true }}
      />
      <FormField
        name="experience"
        label="Previous Volunteer Experience"
        type="textarea"
        value={data.experience || ''}
        onChange={(e) => onChange({ experience: e.target.value })}
        validation={{ minLength: 20 }}
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
          maxFiles={5}
          onFilesChange={(files) => onChange({ documents: files })}
        />
        <p className="text-xs text-gray-500 mt-1">
          Please upload your resume, references, and any relevant certificates
        </p>
      </div>
      <FormField
        name="motivation"
        label="Why do you want to volunteer with us?"
        type="textarea"
        value={data.motivation || ''}
        onChange={(e) => onChange({ motivation: e.target.value })}
        validation={{ required: true, minLength: 50 }}
      />
    </div>
  );

  const volunteerSteps = [
    {
      title: 'Personal Information',
      description: 'Tell us about yourself',
      component: PersonalInfoStep,
      validate: (data) => {
        const errors = [];
        if (!data.fullName || data.fullName.length < 3) errors.push('Full name required');
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Valid email required');
        if (!data.phone) errors.push('Phone number required');
        return { isValid: errors.length === 0, errors };
      }
    },
    {
      title: 'Volunteer Details',
      description: 'Share your skills and availability',
      component: VolunteerInfoStep,
      validate: (data) => {
        const errors = [];
        if (!data.skills) errors.push('Skills required');
        if (!data.availability) errors.push('Availability required');
        return { isValid: errors.length === 0, errors };
      }
    },
    {
      title: 'Documents & Motivation',
      description: 'Upload documents and tell us your motivation',
      component: DocumentsStep,
      validate: (data) => {
        const errors = [];
        if (!data.motivation || data.motivation.length < 50) errors.push('Motivation statement required (min 50 characters)');
        return { isValid: errors.length === 0, errors };
      }
    }
  ];

  const handleFormSubmit = async (data) => {
    console.log('Form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Form submitted successfully!');
  };

  const handleMultiStepSubmit = async (data) => {
    console.log('Multi-step form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    alert('Volunteer application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Heading level={1} className="text-gray-900 mb-4">
            Enhanced Form Components Demo
          </Heading>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our advanced form components featuring multi-step forms, real-time validation, 
            auto-save functionality, drag-and-drop file uploads, and smart field suggestions.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <Button
              variant={activeDemo === 'enhanced' ? 'primary' : 'ghost'}
              size="medium"
              onClick={() => setActiveDemo('enhanced')}
              className="mr-1"
            >
              Enhanced Form
            </Button>
            <Button
              variant={activeDemo === 'multistep' ? 'primary' : 'ghost'}
              size="medium"
              onClick={() => setActiveDemo('multistep')}
              className="mr-1"
            >
              Multi-Step Form
            </Button>
            <Button
              variant={activeDemo === 'components' ? 'primary' : 'ghost'}
              size="medium"
              onClick={() => setActiveDemo('components')}
            >
              Individual Components
            </Button>
          </div>
        </div>

        {/* Demo Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {activeDemo === 'enhanced' && (
            <div>
              <Heading level={2} className="text-gray-900 mb-4">
                Enhanced Contact Form
              </Heading>
              <p className="text-gray-600 mb-6">
                This form features real-time validation, auto-save functionality, smart suggestions, 
                and file upload capabilities. Try typing in the organization field to see suggestions.
              </p>
              <EnhancedForm
                fields={contactFormFields}
                onSubmit={handleFormSubmit}
                autoSave={true}
                autoSaveInterval={3000}
                showToasts={true}
              />
            </div>
          )}

          {activeDemo === 'multistep' && (
            <div>
              <Heading level={2} className="text-gray-900 mb-4">
                Multi-Step Volunteer Application
              </Heading>
              <p className="text-gray-600 mb-6">
                This multi-step form includes progress indicators, step validation, and auto-save. 
                Each step must be completed before proceeding to the next.
              </p>
              <MultiStepForm
                steps={volunteerSteps}
                onSubmit={handleMultiStepSubmit}
                onStepChange={(stepIndex, step) => {
                  console.log('Step changed:', stepIndex, step.title);
                }}
                autoSave={true}
                autoSaveInterval={5000}
              />
            </div>
          )}

          {activeDemo === 'components' && (
            <div className="space-y-8">
              <div>
                <Heading level={2} className="text-gray-900 mb-4">
                  Individual Form Components
                </Heading>
                <p className="text-gray-600 mb-6">
                  Explore each form component individually to see their features.
                </p>
              </div>

              {/* FormField Demo */}
              <div>
                <Heading level={3} className="text-gray-900 mb-3">
                  Smart Form Field with Validation
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="emailDemo"
                    label="Email with Real-time Validation"
                    type="email"
                    placeholder="Enter your email..."
                    validation={{
                      required: true,
                      email: true,
                    }}
                    realTimeValidation={true}
                  />
                  <FormField
                    name="cityDemo"
                    label="City with Auto-complete"
                    placeholder="Start typing a city..."
                    suggestions={[
                      'Accra', 'Kumasi', 'Tamale', 'Cape Coast', 'Sekondi-Takoradi',
                      'Sunyani', 'Koforidua', 'Ho', 'Wa', 'Bolgatanga'
                    ]}
                    autoComplete={true}
                  />
                </div>
              </div>

              {/* FileUpload Demo */}
              <div>
                <Heading level={3} className="text-gray-900 mb-3">
                  Drag & Drop File Upload
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Single Image Upload
                    </h4>
                    <FileUpload
                      accept="image/*"
                      multiple={false}
                      maxSize={5 * 1024 * 1024}
                      onFilesChange={(files) => console.log('Images:', files)}
                      onError={(errors) => console.error('Image errors:', errors)}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Multiple Document Upload
                    </h4>
                    <FileUpload
                      accept=".pdf,.doc,.docx"
                      multiple={true}
                      maxFiles={3}
                      maxSize={10 * 1024 * 1024}
                      onFilesChange={(files) => console.log('Documents:', files)}
                      onError={(errors) => console.error('Document errors:', errors)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <Heading level={2} className="text-gray-900 mb-4">
            Form Enhancement Features
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Step Forms</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Progress indicators with step navigation</li>
                <li>• Step-by-step validation</li>
                <li>• Auto-save between steps</li>
                <li>• Breadcrumb navigation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Validation</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Instant feedback with helpful messages</li>
                <li>• Visual success/error indicators</li>
                <li>• Debounced validation for performance</li>
                <li>• Custom validation rules</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Auto-save Functionality</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automatic form data persistence</li>
                <li>• Visual save status indicators</li>
                <li>• Configurable save intervals</li>
                <li>• Recovery on page reload</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">File Upload</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Drag and drop interface</li>
                <li>• Image preview functionality</li>
                <li>• File type and size validation</li>
                <li>• Multiple file support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Suggestions</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Auto-complete with filtering</li>
                <li>• Keyboard navigation support</li>
                <li>• Customizable suggestion lists</li>
                <li>• Fuzzy matching capabilities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">User Experience</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Toast notifications for feedback</li>
                <li>• Loading states and indicators</li>
                <li>• Accessibility compliant</li>
                <li>• Mobile-responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDemoPage;