import { useState, useCallback, useEffect } from 'react';
import Button from '../../atoms/Button/Button';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';

const MultiStepForm = ({
  steps = [],
  onSubmit,
  onStepChange,
  autoSave = false,
  autoSaveInterval = 5000,
  className = '',
  children
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [stepValidation, setStepValidation] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave) return;

    const interval = setInterval(() => {
      if (Object.keys(formData).length > 0) {
        setAutoSaveStatus('saving');
        // Simulate auto-save
        setTimeout(() => {
          localStorage.setItem('form-autosave', JSON.stringify(formData));
          setAutoSaveStatus('saved');
        }, 500);
      }
    }, autoSaveInterval);

    return () => clearInterval(interval);
  }, [formData, autoSave, autoSaveInterval]);

  // Load auto-saved data on mount
  useEffect(() => {
    if (autoSave) {
      const saved = localStorage.getItem('form-autosave');
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to load auto-saved data:', error);
        }
      }
    }
  }, [autoSave]);

  const updateFormData = useCallback((stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
    setAutoSaveStatus('unsaved');
  }, []);

  const validateStep = useCallback((stepIndex) => {
    const step = steps[stepIndex];
    if (!step?.validate) return true;
    
    const validation = step.validate(formData);
    setStepValidation(prev => ({
      ...prev,
      [stepIndex]: validation
    }));
    
    return validation.isValid;
  }, [steps, formData]);

  const goToStep = useCallback((stepIndex) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return;
    
    // Validate current step before moving forward
    if (stepIndex > currentStep && !validateStep(currentStep)) {
      return;
    }
    
    setCurrentStep(stepIndex);
    onStepChange?.(stepIndex, steps[stepIndex]);
  }, [currentStep, steps, validateStep, onStepChange]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, steps.length, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate all steps
    let allValid = true;
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        allValid = false;
      }
    }
    
    if (!allValid) {
      // Go to first invalid step
      const firstInvalidStep = Object.keys(stepValidation).find(
        key => !stepValidation[key]?.isValid
      );
      if (firstInvalidStep) {
        goToStep(parseInt(firstInvalidStep));
      }
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
      // Clear auto-saved data on successful submit
      if (autoSave) {
        localStorage.removeItem('form-autosave');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [steps, validateStep, stepValidation, goToStep, onSubmit, formData, autoSave]);

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const currentValidation = stepValidation[currentStep];

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          {autoSave && (
            <div className="flex items-center text-xs text-gray-500">
              <div className={`w-2 h-2 rounded-full mr-1 ${
                autoSaveStatus === 'saving' ? 'bg-yellow-400 animate-pulse' :
                autoSaveStatus === 'saved' ? 'bg-green-400' : 'bg-gray-400'
              }`} />
              {autoSaveStatus === 'saving' ? 'Saving...' : 
               autoSaveStatus === 'saved' ? 'Saved' : 'Unsaved changes'}
            </div>
          )}
        </div>
        <ProgressBar 
          value={progress} 
          className="h-2"
          showLabel={false}
        />
      </div>

      {/* Step navigation breadcrumb */}
      <div className="flex justify-center mb-6">
        <nav className="flex space-x-2">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              disabled={index > currentStep}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                index === currentStep
                  ? 'bg-primary-100 text-primary-700 border border-primary-300'
                  : index < currentStep
                  ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              }`}
            >
              {step.title || `Step ${index + 1}`}
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current step content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {currentStepData?.title && (
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentStepData.title}
            </h2>
          )}
          
          {currentStepData?.description && (
            <p className="text-gray-600 mb-6">
              {currentStepData.description}
            </p>
          )}

          {/* Render step component */}
          {currentStepData?.component && (
            <currentStepData.component
              data={formData}
              onChange={updateFormData}
              validation={currentValidation}
            />
          )}

          {/* Render children if no component specified */}
          {!currentStepData?.component && children}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          <div className="flex space-x-3">
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={currentValidation && !currentValidation.isValid}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || (currentValidation && !currentValidation.isValid)}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;