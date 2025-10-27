import { useState, useCallback, useRef, useEffect } from 'react';
import Button from '../../atoms/Button/Button';
import Toast from '../../atoms/Toast/Toast';
import FormField from '../../molecules/FormField/FormField';
import FileUpload from '../../molecules/FileUpload/FileUpload';

const EnhancedForm = ({
  fields = [],
  onSubmit,
  autoSave = true,
  autoSaveInterval = 3000,
  showToasts = true,
  className = '',
  children
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [toasts, setToasts] = useState([]);
  
  const formRef = useRef(null);
  const autoSaveRef = useRef(null);

  // Initialize form data
  useEffect(() => {
    const initialData = {};
    fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialData[field.name] = field.defaultValue;
      }
    });
    setFormData(initialData);

    // Load auto-saved data
    if (autoSave) {
      const saved = localStorage.getItem(`form-${window.location.pathname}`);
      if (saved) {
        try {
          const savedData = JSON.parse(saved);
          setFormData(prev => ({ ...prev, ...savedData }));
          addToast('Auto-saved data restored', 'info');
        } catch (error) {
          console.error('Failed to load auto-saved data:', error);
        }
      }
    }
  }, [fields, autoSave]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave) return;

    if (autoSaveRef.current) {
      clearTimeout(autoSaveRef.current);
    }

    autoSaveRef.current = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        setAutoSaveStatus('saving');
        localStorage.setItem(`form-${window.location.pathname}`, JSON.stringify(formData));
        setTimeout(() => setAutoSaveStatus('saved'), 500);
      }
    }, autoSaveInterval);

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
    };
  }, [formData, autoSave, autoSaveInterval]);

  // Toast management
  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    if (!showToasts) return;
    
    const id = Date.now();
    const toast = { id, message, type, duration };
    setToasts(prev => [...prev, toast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, [showToasts]);

  // Handle field change
  const handleFieldChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    let fieldValue = value;

    if (type === 'checkbox') {
      fieldValue = checked;
    } else if (type === 'file') {
      fieldValue = files;
    }

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    setAutoSaveStatus('unsaved');
  }, [errors]);

  // Handle file upload change
  const handleFileChange = useCallback((fieldName) => (files) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: files
    }));
    setAutoSaveStatus('unsaved');
  }, []);

  // Validate form
  const validateForm = useCallback(async () => {
    const newErrors = {};
    
    for (const field of fields) {
      if (field.validation) {
        const value = formData[field.name];
        const { required, minLength, maxLength, pattern, custom, email, phone } = field.validation;

        // Required validation
        if (required && (!value || (typeof value === 'string' && value.trim() === ''))) {
          newErrors[field.name] = 'This field is required';
          continue;
        }

        // Skip other validations if field is empty and not required
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          continue;
        }

        const stringVal = value.toString();

        // Length validations
        if (minLength && stringVal.length < minLength) {
          newErrors[field.name] = `Minimum ${minLength} characters required`;
          continue;
        }

        if (maxLength && stringVal.length > maxLength) {
          newErrors[field.name] = `Maximum ${maxLength} characters allowed`;
          continue;
        }

        // Pattern validation
        if (pattern && !pattern.test(stringVal)) {
          newErrors[field.name] = field.validation.patternMessage || 'Invalid format';
          continue;
        }

        // Email validation
        if (email) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(stringVal)) {
            newErrors[field.name] = 'Please enter a valid email address';
            continue;
          }
        }

        // Phone validation
        if (phone) {
          const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
          if (!phonePattern.test(stringVal.replace(/[\s\-\(\)]/g, ''))) {
            newErrors[field.name] = 'Please enter a valid phone number';
            continue;
          }
        }

        // Custom validation
        if (custom && typeof custom === 'function') {
          try {
            const result = await custom(value, formData);
            if (result !== true) {
              newErrors[field.name] = result || 'Invalid value';
            }
          } catch (err) {
            newErrors[field.name] = 'Validation error occurred';
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, formData]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const isValid = await validateForm();
      
      if (!isValid) {
        addToast('Please fix the errors before submitting', 'error');
        // Focus on first error field
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const fieldElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
          fieldElement?.focus();
        }
        return;
      }

      await onSubmit?.(formData);
      
      // Clear auto-saved data on successful submit
      if (autoSave) {
        localStorage.removeItem(`form-${window.location.pathname}`);
        setAutoSaveStatus('saved');
      }
      
      addToast('Form submitted successfully!', 'success');
      
    } catch (error) {
      console.error('Form submission error:', error);
      addToast('Failed to submit form. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, errors, onSubmit, formData, autoSave, addToast]);

  // Handle file upload errors
  const handleFileError = useCallback((fieldName) => (errors) => {
    addToast(errors.join(', '), 'error');
  }, [addToast]);

  return (
    <div className={`relative ${className}`}>
      {/* Auto-save indicator */}
      {autoSave && (
        <div className="flex items-center justify-end mb-4 text-xs text-gray-500">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            autoSaveStatus === 'saving' ? 'bg-yellow-400 animate-pulse' :
            autoSaveStatus === 'saved' ? 'bg-green-400' : 'bg-gray-400'
          }`} />
          {autoSaveStatus === 'saving' ? 'Saving...' : 
           autoSaveStatus === 'saved' ? 'All changes saved' : 'Unsaved changes'}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Render form fields */}
        {fields.map((field) => {
          if (field.type === 'file') {
            return (
              <div key={field.name}>
                {field.label && (
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.validation?.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
                <FileUpload
                  accept={field.accept}
                  multiple={field.multiple}
                  maxSize={field.maxSize}
                  maxFiles={field.maxFiles}
                  onFilesChange={handleFileChange(field.name)}
                  onError={handleFileError(field.name)}
                  disabled={isSubmitting}
                />
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
              </div>
            );
          }

          return (
            <FormField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={handleFieldChange}
              validation={field.validation}
              suggestions={field.suggestions}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              disabled={isSubmitting}
              {...field.props}
            />
          );
        })}

        {/* Custom children */}
        {children}

        {/* Submit button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>

      {/* Toast notifications */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedForm;