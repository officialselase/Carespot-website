// src/components/molecules/TouchOptimizedForm/TouchOptimizedForm.jsx
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import Icon from '../../atoms/Icon/Icon';

const TouchOptimizedForm = ({
  fields = [],
  onSubmit,
  className = '',
  submitText = 'Submit',
  resetText = 'Reset',
  showReset = true,
  autoFocus = true,
  validateOnBlur = true,
  touchOptimizations = true,
  ...props
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const activeFieldRef = useRef(null);

  // Initialize form data
  useEffect(() => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = field.defaultValue || '';
    });
    setFormData(initialData);
  }, [fields]);

  // Auto-focus first field on mobile
  useEffect(() => {
    if (autoFocus && touchOptimizations) {
      const firstInput = formRef.current?.querySelector('input, textarea, select');
      if (firstInput && window.innerWidth <= 768) {
        // Delay focus to avoid keyboard jumping on mobile
        setTimeout(() => {
          firstInput.focus();
        }, 300);
      }
    }
  }, [autoFocus, touchOptimizations]);

  // Handle viewport changes when keyboard appears/disappears
  useEffect(() => {
    if (!touchOptimizations) return;

    const handleResize = () => {
      if (activeFieldRef.current && window.innerWidth <= 768) {
        // Scroll active field into view when keyboard appears
        setTimeout(() => {
          activeFieldRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [touchOptimizations]);

  const validateField = (field, value) => {
    const fieldErrors = [];

    if (field.required && (!value || value.toString().trim() === '')) {
      fieldErrors.push(`${field.label} is required`);
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        fieldErrors.push('Please enter a valid email address');
      }
    }

    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
        fieldErrors.push('Please enter a valid phone number');
      }
    }

    if (field.minLength && value && value.length < field.minLength) {
      fieldErrors.push(`${field.label} must be at least ${field.minLength} characters`);
    }

    if (field.maxLength && value && value.length > field.maxLength) {
      fieldErrors.push(`${field.label} must be no more than ${field.maxLength} characters`);
    }

    if (field.pattern && value) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value)) {
        fieldErrors.push(field.patternMessage || `${field.label} format is invalid`);
      }
    }

    if (field.validate && typeof field.validate === 'function') {
      const customError = field.validate(value, formData);
      if (customError) {
        fieldErrors.push(customError);
      }
    }

    return fieldErrors;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field.name]: value
    }));

    // Clear errors when user starts typing
    if (errors[field.name]) {
      setErrors(prev => ({
        ...prev,
        [field.name]: []
      }));
    }
  };

  const handleInputBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field.name]: true
    }));

    if (validateOnBlur) {
      const fieldErrors = validateField(field, formData[field.name]);
      setErrors(prev => ({
        ...prev,
        [field.name]: fieldErrors
      }));
    }

    activeFieldRef.current = null;
  };

  const handleInputFocus = (field, inputRef) => {
    activeFieldRef.current = inputRef;
    
    // Clear field errors on focus for better UX
    if (errors[field.name]) {
      setErrors(prev => ({
        ...prev,
        [field.name]: []
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const fieldErrors = validateField(field, formData[field.name]);
      if (fieldErrors.length > 0) {
        newErrors[field.name] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    const isValid = validateForm();
    if (!isValid) {
      // Focus first field with error
      const firstErrorField = fields.find(field => errors[field.name]?.length > 0);
      if (firstErrorField) {
        const errorInput = formRef.current?.querySelector(`[name="${firstErrorField.name}"]`);
        errorInput?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = field.defaultValue || '';
    });
    setFormData(initialData);
    setErrors({});
    setTouched({});
  };

  const getInputProps = (field) => {
    const baseProps = {
      name: field.name,
      value: formData[field.name] || '',
      onChange: (e) => handleInputChange(field, e.target.value),
      onBlur: () => handleInputBlur(field),
      onFocus: (e) => handleInputFocus(field, e.target),
      placeholder: field.placeholder || field.label,
      required: field.required,
      disabled: field.disabled || isSubmitting,
      'aria-describedby': errors[field.name]?.length > 0 ? `${field.name}-error` : undefined,
      'aria-invalid': errors[field.name]?.length > 0 ? 'true' : 'false'
    };

    // Touch optimizations
    if (touchOptimizations) {
      baseProps.autoComplete = field.autoComplete || 'off';
      baseProps.autoCapitalize = field.autoCapitalize || 'sentences';
      baseProps.autoCorrect = field.autoCorrect !== false ? 'on' : 'off';
      baseProps.spellCheck = field.spellCheck !== false;
      
      // Mobile keyboard optimizations
      if (field.type === 'email') {
        baseProps.inputMode = 'email';
        baseProps.autoComplete = 'email';
      } else if (field.type === 'tel') {
        baseProps.inputMode = 'tel';
        baseProps.autoComplete = 'tel';
      } else if (field.type === 'number') {
        baseProps.inputMode = 'numeric';
        baseProps.pattern = '[0-9]*';
      } else if (field.type === 'url') {
        baseProps.inputMode = 'url';
        baseProps.autoComplete = 'url';
      }
    }

    return baseProps;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      noValidate
      {...props}
    >
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-color-text-primary"
          >
            {field.label}
            {field.required && (
              <span className="text-red-500 ml-1" aria-label="required">*</span>
            )}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              {...getInputProps(field)}
              rows={field.rows || 4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-color-interactive-primary focus:border-color-interactive-primary transition-colors duration-200 ${
                touchOptimizations ? 'min-h-[44px] text-base' : ''
              } ${
                errors[field.name]?.length > 0
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-color-border-primary'
              }`}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              {...getInputProps(field)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-color-interactive-primary focus:border-color-interactive-primary transition-colors duration-200 ${
                touchOptimizations ? 'min-h-[44px] text-base' : ''
              } ${
                errors[field.name]?.length > 0
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-color-border-primary'
              }`}
            >
              {field.placeholder && (
                <option value="" disabled>
                  {field.placeholder}
                </option>
              )}
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id={field.name}
              type={field.type || 'text'}
              {...getInputProps(field)}
              size={touchOptimizations ? 'large' : 'medium'}
              className={
                errors[field.name]?.length > 0
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : ''
              }
            />
          )}

          {field.helpText && (
            <p className="text-sm text-color-text-tertiary">
              {field.helpText}
            </p>
          )}

          {errors[field.name]?.length > 0 && (
            <div
              id={`${field.name}-error`}
              className="text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors[field.name].map((error, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Icon name="alert-circle" size="small" />
                  {error}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className={`flex gap-4 ${touchOptimizations ? 'pt-4' : ''}`}>
        <Button
          type="submit"
          variant="primary"
          size={touchOptimizations ? 'large' : 'medium'}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <Icon name="loader" size="small" className="animate-spin" />
              Submitting...
            </>
          ) : (
            submitText
          )}
        </Button>

        {showReset && (
          <Button
            type="button"
            variant="secondary"
            size={touchOptimizations ? 'large' : 'medium'}
            onClick={handleReset}
            disabled={isSubmitting}
          >
            {resetText}
          </Button>
        )}
      </div>
    </form>
  );
};

TouchOptimizedForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      disabled: PropTypes.bool,
      defaultValue: PropTypes.any,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired
        })
      ),
      validate: PropTypes.func,
      helpText: PropTypes.string,
      autoComplete: PropTypes.string,
      autoCapitalize: PropTypes.string,
      autoCorrect: PropTypes.bool,
      spellCheck: PropTypes.bool,
      minLength: PropTypes.number,
      maxLength: PropTypes.number,
      pattern: PropTypes.string,
      patternMessage: PropTypes.string,
      rows: PropTypes.number
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  submitText: PropTypes.string,
  resetText: PropTypes.string,
  showReset: PropTypes.bool,
  autoFocus: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  touchOptimizations: PropTypes.bool
};

export default TouchOptimizedForm;