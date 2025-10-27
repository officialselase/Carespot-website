import { useState, useEffect, useCallback, useRef } from 'react';
import Input from '../../atoms/Input/Input';

const FormField = ({
  name,
  label,
  type = 'text',
  value = '',
  onChange,
  onBlur,
  validation = {},
  suggestions = [],
  autoComplete = false,
  realTimeValidation = true,
  debounceMs = 300,
  className = '',
  ...props
}) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isValidating, setIsValidating] = useState(false);
  
  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Validation rules
  const validateField = useCallback(async (val) => {
    if (!validation || Object.keys(validation).length === 0) {
      return { isValid: true, error: '' };
    }

    const { required, minLength, maxLength, pattern, custom, email, phone } = validation;

    // Required validation
    if (required && (!val || val.toString().trim() === '')) {
      return { isValid: false, error: 'This field is required' };
    }

    // Skip other validations if field is empty and not required
    if (!val || val.toString().trim() === '') {
      return { isValid: true, error: '' };
    }

    const stringVal = val.toString();

    // Length validations
    if (minLength && stringVal.length < minLength) {
      return { isValid: false, error: `Minimum ${minLength} characters required` };
    }

    if (maxLength && stringVal.length > maxLength) {
      return { isValid: false, error: `Maximum ${maxLength} characters allowed` };
    }

    // Pattern validation
    if (pattern && !pattern.test(stringVal)) {
      return { isValid: false, error: 'Invalid format' };
    }

    // Email validation
    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(stringVal)) {
        return { isValid: false, error: 'Please enter a valid email address' };
      }
    }

    // Phone validation (basic)
    if (phone) {
      const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phonePattern.test(stringVal.replace(/[\s\-\(\)]/g, ''))) {
        return { isValid: false, error: 'Please enter a valid phone number' };
      }
    }

    // Custom validation
    if (custom && typeof custom === 'function') {
      try {
        const result = await custom(val);
        if (result !== true) {
          return { isValid: false, error: result || 'Invalid value' };
        }
      } catch (err) {
        return { isValid: false, error: 'Validation error occurred' };
      }
    }

    return { isValid: true, error: '' };
  }, [validation]);

  // Debounced validation
  const debouncedValidation = useCallback((val) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (realTimeValidation) {
        setIsValidating(true);
        const result = await validateField(val);
        setError(result.error);
        setIsValid(result.isValid);
        setIsValidating(false);
      }
    }, debounceMs);
  }, [validateField, realTimeValidation, debounceMs]);

  // Handle input change
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setFieldValue(newValue);
    onChange?.(e);

    // Filter suggestions
    if (suggestions.length > 0 && autoComplete) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && newValue.length > 0);
      setActiveSuggestion(-1);
    }

    // Trigger validation
    debouncedValidation(newValue);
  }, [onChange, suggestions, autoComplete, debouncedValidation]);

  // Handle blur
  const handleBlur = useCallback(async (e) => {
    onBlur?.(e);
    
    // Validate on blur
    const result = await validateField(fieldValue);
    setError(result.error);
    setIsValid(result.isValid);
    
    // Hide suggestions after a delay to allow clicking
    setTimeout(() => setShowSuggestions(false), 150);
  }, [onBlur, validateField, fieldValue]);

  // Handle focus
  const handleFocus = useCallback(() => {
    if (suggestions.length > 0 && autoComplete && fieldValue) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(fieldValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
  }, [suggestions, autoComplete, fieldValue]);

  // Handle keyboard navigation for suggestions
  const handleKeyDown = useCallback((e) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          selectSuggestion(filteredSuggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  }, [showSuggestions, filteredSuggestions, activeSuggestion]);

  // Select suggestion
  const selectSuggestion = useCallback((suggestion) => {
    setFieldValue(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    
    // Trigger onChange with synthetic event
    const syntheticEvent = {
      target: { name, value: suggestion }
    };
    onChange?.(syntheticEvent);
    
    // Focus back to input
    inputRef.current?.focus();
  }, [name, onChange]);

  // Update field value when prop changes
  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        name={name}
        label={label}
        type={type}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        error={error}
        className={`${isValidating ? 'pr-8' : ''}`}
        {...props}
      />

      {/* Validation loading indicator */}
      {isValidating && (
        <div className="absolute right-3 top-9 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-primary-600"></div>
        </div>
      )}

      {/* Success indicator */}
      {!isValidating && isValid && fieldValue && !error && (
        <div className="absolute right-3 top-9 transform -translate-y-1/2">
          <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => selectSuggestion(suggestion)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                index === activeSuggestion ? 'bg-primary-50 text-primary-700' : 'text-gray-900'
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormField;