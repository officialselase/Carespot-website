// src/components/volunteer/MultiStepApplication.jsx

import { useState, useEffect } from 'react';
import MultiStepForm from '../molecules/MultiStepForm/MultiStepForm';
import FormField from '../molecules/FormField/FormField';
import FileUpload from '../molecules/FileUpload/FileUpload';
import Button from '../atoms/Button/Button';
import ProgressBar from '../atoms/ProgressBar/ProgressBar';
import Badge from '../atoms/Badge/Badge';

const MultiStepApplication = ({ opportunityId, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: ''
    },
    // Professional Information
    professionalInfo: {
      occupation: '',
      employer: '',
      educationLevel: '',
      skills: [],
      previousExperience: '',
      motivation: ''
    },
    // Availability & Preferences
    availability: {
      availabilityType: '',
      hoursPerWeek: '',
      preferredLocation: '',
      canTravel: false,
      hasTransportation: false,
      startDate: ''
    },
    // Application Details
    applicationDetails: {
      coverLetter: '',
      whyInterested: '',
      relevantExperience: '',
      additionalComments: ''
    },
    // Documents
    documents: {
      resume: null,
      coverLetterDoc: null,
      references: null,
      backgroundCheck: null,
      certifications: null
    }
  });

  const [skills, setSkills] = useState([]);
  const [opportunity, setOpportunity] = useState(null);
  const [documentRequirements, setDocumentRequirements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchOpportunityDetails();
    fetchSkills();
    fetchDocumentRequirements();
  }, [opportunityId]);

  const fetchOpportunityDetails = async () => {
    try {
      // Fetch opportunity details from API
      // Mock data for now
      setOpportunity({
        id: opportunityId,
        title: 'Health Screening Assistant',
        description: 'Help conduct health screenings in underserved communities',
        requiredSkills: ['Healthcare Support', 'Data Collection'],
        backgroundCheckRequired: true,
        minimumAge: 18
      });
    } catch (error) {
      console.error('Error fetching opportunity:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      // Fetch available skills from API
      setSkills([
        { id: 1, name: 'Healthcare Support', category: 'Medical' },
        { id: 2, name: 'Data Collection', category: 'Administrative' },
        { id: 3, name: 'Health Education', category: 'Education' },
        { id: 4, name: 'Community Outreach', category: 'Outreach' },
        { id: 5, name: 'Public Speaking', category: 'Communication' }
      ]);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchDocumentRequirements = async () => {
    try {
      // Fetch document requirements from API
      setDocumentRequirements([
        {
          type: 'resume',
          name: 'Resume/CV',
          required: true,
          description: 'Upload your current resume or CV',
          maxSize: 5242880, // 5MB
          allowedTypes: ['pdf', 'doc', 'docx']
        },
        {
          type: 'references',
          name: 'References',
          required: true,
          description: 'Provide contact information for 2-3 professional references',
          maxSize: 5242880,
          allowedTypes: ['pdf', 'doc', 'docx']
        },
        {
          type: 'backgroundCheck',
          name: 'Background Check',
          required: opportunity?.backgroundCheckRequired || false,
          description: 'Upload background check certificate if available',
          maxSize: 5242880,
          allowedTypes: ['pdf', 'jpg', 'png']
        }
      ]);
    } catch (error) {
      console.error('Error fetching document requirements:', error);
    }
  };

  const steps = [
    {
      title: 'Personal Information',
      description: 'Tell us about yourself',
      component: PersonalInfoStep
    },
    {
      title: 'Professional Background',
      description: 'Your experience and skills',
      component: ProfessionalInfoStep
    },
    {
      title: 'Availability',
      description: 'When can you volunteer?',
      component: AvailabilityStep
    },
    {
      title: 'Application Details',
      description: 'Why do you want to volunteer?',
      component: ApplicationDetailsStep
    },
    {
      title: 'Documents',
      description: 'Upload required documents',
      component: DocumentsStep
    },
    {
      title: 'Review & Submit',
      description: 'Review your application',
      component: ReviewStep
    }
  ];

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const validateStep = (stepIndex) => {
    const stepErrors = {};
    
    switch (stepIndex) {
      case 0: // Personal Information
        const personal = formData.personalInfo;
        if (!personal.firstName) stepErrors.firstName = 'First name is required';
        if (!personal.lastName) stepErrors.lastName = 'Last name is required';
        if (!personal.email) stepErrors.email = 'Email is required';
        if (!personal.phone) stepErrors.phone = 'Phone number is required';
        if (!personal.dateOfBirth) stepErrors.dateOfBirth = 'Date of birth is required';
        break;
        
      case 1: // Professional Information
        const professional = formData.professionalInfo;
        if (!professional.motivation) stepErrors.motivation = 'Please explain your motivation';
        if (professional.skills.length === 0) stepErrors.skills = 'Please select at least one skill';
        break;
        
      case 2: // Availability
        const availability = formData.availability;
        if (!availability.availabilityType) stepErrors.availabilityType = 'Please select your availability';
        if (!availability.hoursPerWeek) stepErrors.hoursPerWeek = 'Please specify hours per week';
        break;
        
      case 3: // Application Details
        const application = formData.applicationDetails;
        if (!application.coverLetter) stepErrors.coverLetter = 'Cover letter is required';
        if (!application.whyInterested) stepErrors.whyInterested = 'Please explain why you\'re interested';
        break;
        
      case 4: // Documents
        const documents = formData.documents;
        documentRequirements.forEach(req => {
          if (req.required && !documents[req.type]) {
            stepErrors[req.type] = `${req.name} is required`;
          }
        });
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    try {
      // Submit application to API
      const applicationData = {
        opportunityId,
        ...formData
      };
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onComplete && onComplete(applicationData);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Volunteer Application
        </h1>
        {opportunity && (
          <p className="text-gray-600">
            Applying for: <span className="font-medium">{opportunity.title}</span>
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <ProgressBar 
          progress={((currentStep + 1) / steps.length) * 100}
          className="h-2"
        />
      </div>

      {/* Step Navigation */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${index <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
              }
            `}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                flex-1 h-1 mx-2
                ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>

        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
          errors={errors}
          skills={skills}
          documentRequirements={documentRequirements}
          opportunity={opportunity}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep > 0 && (
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={loading}
            >
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={loading}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Step Components
const PersonalInfoStep = ({ formData, updateFormData, errors }) => {
  const handleChange = (field, value) => {
    updateFormData('personalInfo', { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          required
          error={errors.firstName}
        >
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your first name"
          />
        </FormField>

        <FormField
          label="Last Name"
          required
          error={errors.lastName}
        >
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your last name"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Email Address"
          required
          error={errors.email}
        >
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
          />
        </FormField>

        <FormField
          label="Phone Number"
          required
          error={errors.phone}
        >
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+233 XX XXX XXXX"
          />
        </FormField>
      </div>

      <FormField
        label="Date of Birth"
        required
        error={errors.dateOfBirth}
      >
        <input
          type="date"
          value={formData.personalInfo.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </FormField>

      <FormField
        label="Address"
        required
        error={errors.address}
      >
        <textarea
          value={formData.personalInfo.address}
          onChange={(e) => handleChange('address', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your full address"
        />
      </FormField>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Contact Name"
            required
            error={errors.emergencyContactName}
          >
            <input
              type="text"
              value={formData.personalInfo.emergencyContactName}
              onChange={(e) => handleChange('emergencyContactName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Emergency contact name"
            />
          </FormField>

          <FormField
            label="Contact Phone"
            required
            error={errors.emergencyContactPhone}
          >
            <input
              type="tel"
              value={formData.personalInfo.emergencyContactPhone}
              onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+233 XX XXX XXXX"
            />
          </FormField>
        </div>

        <FormField
          label="Relationship"
          required
          error={errors.emergencyContactRelationship}
        >
          <input
            type="text"
            value={formData.personalInfo.emergencyContactRelationship}
            onChange={(e) => handleChange('emergencyContactRelationship', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Parent, Spouse, Sibling"
          />
        </FormField>
      </div>
    </div>
  );
};

const ProfessionalInfoStep = ({ formData, updateFormData, errors, skills }) => {
  const handleChange = (field, value) => {
    updateFormData('professionalInfo', { [field]: value });
  };

  const handleSkillToggle = (skillId) => {
    const currentSkills = formData.professionalInfo.skills;
    const updatedSkills = currentSkills.includes(skillId)
      ? currentSkills.filter(id => id !== skillId)
      : [...currentSkills, skillId];
    
    handleChange('skills', updatedSkills);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Current Occupation"
          error={errors.occupation}
        >
          <input
            type="text"
            value={formData.professionalInfo.occupation}
            onChange={(e) => handleChange('occupation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your current job title"
          />
        </FormField>

        <FormField
          label="Employer"
          error={errors.employer}
        >
          <input
            type="text"
            value={formData.professionalInfo.employer}
            onChange={(e) => handleChange('employer', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your employer"
          />
        </FormField>
      </div>

      <FormField
        label="Education Level"
        error={errors.educationLevel}
      >
        <select
          value={formData.professionalInfo.educationLevel}
          onChange={(e) => handleChange('educationLevel', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select education level</option>
          <option value="high_school">High School</option>
          <option value="diploma">Diploma</option>
          <option value="bachelor">Bachelor's Degree</option>
          <option value="master">Master's Degree</option>
          <option value="phd">PhD</option>
          <option value="other">Other</option>
        </select>
      </FormField>

      <FormField
        label="Skills & Expertise"
        required
        error={errors.skills}
        description="Select all skills that apply to you"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <label
              key={skill.id}
              className={`
                flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                ${formData.professionalInfo.skills.includes(skill.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <input
                type="checkbox"
                checked={formData.professionalInfo.skills.includes(skill.id)}
                onChange={() => handleSkillToggle(skill.id)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{skill.name}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField
        label="Previous Volunteer Experience"
        error={errors.previousExperience}
        description="Describe any previous volunteer work or community service"
      >
        <textarea
          value={formData.professionalInfo.previousExperience}
          onChange={(e) => handleChange('previousExperience', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us about your volunteer experience..."
        />
      </FormField>

      <FormField
        label="Motivation"
        required
        error={errors.motivation}
        description="Why do you want to volunteer with CareSpot?"
      >
        <textarea
          value={formData.professionalInfo.motivation}
          onChange={(e) => handleChange('motivation', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your motivation and what you hope to achieve..."
        />
      </FormField>
    </div>
  );
};

const AvailabilityStep = ({ formData, updateFormData, errors }) => {
  const handleChange = (field, value) => {
    updateFormData('availability', { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Availability"
          required
          error={errors.availabilityType}
        >
          <select
            value={formData.availability.availabilityType}
            onChange={(e) => handleChange('availabilityType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="evenings">Evenings</option>
            <option value="flexible">Flexible</option>
          </select>
        </FormField>

        <FormField
          label="Hours per Week"
          required
          error={errors.hoursPerWeek}
        >
          <input
            type="number"
            min="1"
            max="40"
            value={formData.availability.hoursPerWeek}
            onChange={(e) => handleChange('hoursPerWeek', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Hours you can commit per week"
          />
        </FormField>
      </div>

      <FormField
        label="Preferred Location"
        error={errors.preferredLocation}
      >
        <input
          type="text"
          value={formData.availability.preferredLocation}
          onChange={(e) => handleChange('preferredLocation', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="City or region you prefer to volunteer in"
        />
      </FormField>

      <FormField
        label="Earliest Start Date"
        error={errors.startDate}
      >
        <input
          type="date"
          value={formData.availability.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.availability.canTravel}
            onChange={(e) => handleChange('canTravel', e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-gray-700">I am willing to travel to different locations</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.availability.hasTransportation}
            onChange={(e) => handleChange('hasTransportation', e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-gray-700">I have reliable transportation</span>
        </label>
      </div>
    </div>
  );
};

const ApplicationDetailsStep = ({ formData, updateFormData, errors, opportunity }) => {
  const handleChange = (field, value) => {
    updateFormData('applicationDetails', { [field]: value });
  };

  return (
    <div className="space-y-6">
      {opportunity && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">{opportunity.title}</h3>
          <p className="text-blue-800 text-sm">{opportunity.description}</p>
          {opportunity.requiredSkills && (
            <div className="mt-3">
              <span className="text-blue-800 text-sm font-medium">Required Skills: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {opportunity.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="blue" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <FormField
        label="Cover Letter"
        required
        error={errors.coverLetter}
        description="Introduce yourself and explain why you're a good fit for this role"
      >
        <textarea
          value={formData.applicationDetails.coverLetter}
          onChange={(e) => handleChange('coverLetter', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Dear CareSpot Team,..."
        />
      </FormField>

      <FormField
        label="Why are you interested in this opportunity?"
        required
        error={errors.whyInterested}
      >
        <textarea
          value={formData.applicationDetails.whyInterested}
          onChange={(e) => handleChange('whyInterested', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Explain what draws you to this specific opportunity..."
        />
      </FormField>

      <FormField
        label="Relevant Experience"
        error={errors.relevantExperience}
        description="Describe any experience that makes you suitable for this role"
      >
        <textarea
          value={formData.applicationDetails.relevantExperience}
          onChange={(e) => handleChange('relevantExperience', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share relevant work, volunteer, or educational experience..."
        />
      </FormField>

      <FormField
        label="Additional Comments"
        error={errors.additionalComments}
        description="Anything else you'd like us to know?"
      >
        <textarea
          value={formData.applicationDetails.additionalComments}
          onChange={(e) => handleChange('additionalComments', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Optional additional information..."
        />
      </FormField>
    </div>
  );
};

const DocumentsStep = ({ formData, updateFormData, errors, documentRequirements }) => {
  const handleFileUpload = (documentType, file) => {
    updateFormData('documents', { [documentType]: file });
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-yellow-900 mb-2">Document Requirements</h3>
        <p className="text-yellow-800 text-sm">
          Please upload all required documents. Files should be in PDF, DOC, or image format and under 5MB each.
        </p>
      </div>

      {documentRequirements.map((requirement) => (
        <div key={requirement.type} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">
              {requirement.name}
              {requirement.required && <span className="text-red-500 ml-1">*</span>}
            </h3>
            {formData.documents[requirement.type] && (
              <Badge variant="green">Uploaded</Badge>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{requirement.description}</p>
          
          <FileUpload
            onFileSelect={(file) => handleFileUpload(requirement.type, file)}
            acceptedTypes={requirement.allowedTypes}
            maxSize={requirement.maxSize}
            error={errors[requirement.type]}
            currentFile={formData.documents[requirement.type]}
          />
        </div>
      ))}
    </div>
  );
};

const ReviewStep = ({ formData, opportunity, documentRequirements }) => {
  return (
    <div className="space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-medium text-green-900 mb-2">Ready to Submit</h3>
        <p className="text-green-800 text-sm">
          Please review your application below. Once submitted, you'll receive a confirmation email and we'll review your application within 48 hours.
        </p>
      </div>

      {/* Application Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {formData.personalInfo.firstName} {formData.personalInfo.lastName}</p>
              <p><span className="font-medium">Email:</span> {formData.personalInfo.email}</p>
              <p><span className="font-medium">Phone:</span> {formData.personalInfo.phone}</p>
              <p><span className="font-medium">Date of Birth:</span> {formData.personalInfo.dateOfBirth}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Professional Background</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <p><span className="font-medium">Occupation:</span> {formData.professionalInfo.occupation || 'Not specified'}</p>
              <p><span className="font-medium">Education:</span> {formData.professionalInfo.educationLevel || 'Not specified'}</p>
              <p><span className="font-medium">Skills:</span> {formData.professionalInfo.skills.length} selected</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <p><span className="font-medium">Schedule:</span> {formData.availability.availabilityType}</p>
              <p><span className="font-medium">Hours/Week:</span> {formData.availability.hoursPerWeek}</p>
              <p><span className="font-medium">Can Travel:</span> {formData.availability.canTravel ? 'Yes' : 'No'}</p>
              <p><span className="font-medium">Has Transportation:</span> {formData.availability.hasTransportation ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Documents</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              {documentRequirements.map((req) => (
                <div key={req.type} className="flex justify-between items-center">
                  <span>{req.name}:</span>
                  <Badge variant={formData.documents[req.type] ? 'green' : 'gray'}>
                    {formData.documents[req.type] ? 'Uploaded' : 'Not uploaded'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Preview */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Application Details</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-4 text-sm">
          <div>
            <span className="font-medium">Cover Letter:</span>
            <p className="mt-1 text-gray-700">{formData.applicationDetails.coverLetter.substring(0, 200)}...</p>
          </div>
          <div>
            <span className="font-medium">Why Interested:</span>
            <p className="mt-1 text-gray-700">{formData.applicationDetails.whyInterested.substring(0, 200)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepApplication;