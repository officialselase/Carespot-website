// src/components/community/ContentSubmission.jsx

import { useState } from 'react';
import Button from '../atoms/Button/Button.jsx';
import Input from '../atoms/Input/Input.jsx';
import FileUpload from '../molecules/FileUpload/FileUpload.jsx';
import Toast from '../atoms/Toast/Toast.jsx';

const ContentSubmission = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    type: 'story',
    title: '',
    content: '',
    authorName: '',
    authorEmail: '',
    location: '',
    category: '',
    tags: [],
    images: [],
    consent: false,
    anonymous: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const contentTypes = [
    { value: 'story', label: 'Impact Story', icon: '📖', description: 'Share how CareSpot has made a difference' },
    { value: 'testimonial', label: 'Testimonial', icon: '💬', description: 'Your experience with our programs' },
    { value: 'photo', label: 'Photo Story', icon: '📸', description: 'Visual story with images' },
    { value: 'suggestion', label: 'Program Suggestion', icon: '💡', description: 'Ideas for new programs or improvements' },
    { value: 'volunteer-experience', label: 'Volunteer Experience', icon: '🤝', description: 'Share your volunteer journey' }
  ];

  const categories = [
    'Health Programs',
    'Education',
    'Nutrition',
    'Community Outreach',
    'Volunteer Experience',
    'Research & Innovation',
    'Fundraising',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleFileUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.authorName || !formData.authorEmail) {
      setToastMessage('Please fill in all required fields');
      setToastType('error');
      setShowToast(true);
      return;
    }

    if (!formData.consent) {
      setToastMessage('Please provide consent to share your content');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending_review',
        id: `content_${Date.now()}`
      };

      console.log('Content submission:', submissionData);
      
      if (onSubmit) {
        onSubmit(submissionData);
      }
      
      setToastMessage('Thank you! Your content has been submitted for review.');
      setToastType('success');
      setShowToast(true);
      
      // Reset form
      setFormData({
        type: 'story',
        title: '',
        content: '',
        authorName: '',
        authorEmail: '',
        location: '',
        category: '',
        tags: [],
        images: [],
        consent: false,
        anonymous: false
      });
      
    } catch (error) {
      setToastMessage('Failed to submit content. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Share Your Story
        </h3>
        <p className="text-gray-600">
          Help us showcase the impact of our work by sharing your experience, story, or suggestions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What would you like to share? *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contentTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.type === type.value
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="contentType"
                  value={type.value}
                  checked={formData.type === type.value}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="sr-only"
                />
                <span className="text-2xl mr-3">{type.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Give your story a compelling title"
            className="w-full"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Story *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Share your experience, impact story, or suggestions in detail..."
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum 100 characters. Be specific and include details that help others understand the impact.
          </p>
        </div>

        {/* Author Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <Input
              type="text"
              value={formData.authorName}
              onChange={(e) => handleInputChange('authorName', e.target.value)}
              placeholder="Full name"
              className="w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              value={formData.authorEmail}
              onChange={(e) => handleInputChange('authorEmail', e.target.value)}
              placeholder="your.email@example.com"
              className="w-full"
              required
            />
          </div>
        </div>

        {/* Location and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, Region, Country"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <Input
            type="text"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            placeholder="health, education, community, volunteer (separate with commas)"
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Add relevant tags to help others find your content
          </p>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images (Optional)
          </label>
          <FileUpload
            onFilesChange={handleFileUpload}
            acceptedTypes={['image/*']}
            maxFiles={5}
            maxSize={5 * 1024 * 1024} // 5MB
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload up to 5 images (max 5MB each) to accompany your story
          </p>
        </div>

        {/* Privacy Options */}
        <div className="space-y-3">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.anonymous}
              onChange={(e) => handleInputChange('anonymous', e.target.checked)}
              className="mt-1 mr-3"
            />
            <span className="text-sm text-gray-700">
              Publish anonymously (your name will not be displayed publicly)
            </span>
          </label>
          
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              className="mt-1 mr-3"
              required
            />
            <span className="text-sm text-gray-700">
              I consent to CareSpot using my story and images for promotional purposes, 
              including website, social media, and marketing materials. *
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Submitting...' : 'Submit Your Story'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          All submissions are reviewed before publication. We'll contact you if we need additional information.
        </p>
      </form>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ContentSubmission;