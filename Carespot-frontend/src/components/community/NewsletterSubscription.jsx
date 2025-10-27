// src/components/community/NewsletterSubscription.jsx

import { useState } from 'react';
import Button from '../atoms/Button/Button.jsx';
import Input from '../atoms/Input/Input.jsx';
import Toast from '../atoms/Toast/Toast.jsx';

const NewsletterSubscription = ({ 
  variant = 'default', 
  showSegmentation = false,
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [frequency, setFrequency] = useState('weekly');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const interestOptions = [
    { id: 'health-programs', label: 'Health Programs', icon: '🏥' },
    { id: 'volunteer-opportunities', label: 'Volunteer Opportunities', icon: '🤝' },
    { id: 'impact-stories', label: 'Impact Stories', icon: '📖' },
    { id: 'fundraising-events', label: 'Fundraising Events', icon: '🎉' },
    { id: 'research-updates', label: 'Research Updates', icon: '🔬' },
    { id: 'community-news', label: 'Community News', icon: '📰' }
  ];

  const handleInterestToggle = (interestId) => {
    setInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setToastMessage('Please enter your email address');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful subscription
      const subscriptionData = {
        email,
        interests: showSegmentation ? interests : ['general'],
        frequency,
        subscribedAt: new Date().toISOString()
      };

      console.log('Newsletter subscription:', subscriptionData);
      
      setToastMessage('Successfully subscribed to our newsletter!');
      setToastType('success');
      setShowToast(true);
      
      // Reset form
      setEmail('');
      setInterests([]);
      setFrequency('weekly');
      
    } catch (error) {
      setToastMessage('Failed to subscribe. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    default: 'bg-white border border-gray-200 rounded-lg p-6',
    compact: 'bg-gray-50 rounded-lg p-4',
    inline: 'flex items-center gap-3',
    footer: 'bg-transparent'
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`${variants[variant]} ${className}`}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1"
          required
        />
        <Button 
          type="submit" 
          variant="primary"
          disabled={isLoading}
          className="whitespace-nowrap"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
        
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </form>
    );
  }

  return (
    <div className={`${variants[variant]} ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Stay Connected
        </h3>
        <p className="text-gray-600">
          Get the latest updates on our programs, impact stories, and volunteer opportunities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full"
            required
          />
        </div>

        {showSegmentation && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What interests you most? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      interests.includes(option.id)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={interests.includes(option.id)}
                      onChange={() => handleInterestToggle(option.id)}
                      className="sr-only"
                    />
                    <span className="text-lg mr-2">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How often would you like to hear from us?
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="weekly">Weekly updates</option>
                <option value="biweekly">Bi-weekly updates</option>
                <option value="monthly">Monthly updates</option>
                <option value="quarterly">Quarterly updates</option>
              </select>
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By subscribing, you agree to receive emails from CareSpot. 
          You can unsubscribe at any time.
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

export default NewsletterSubscription;