// src/pages/TouchDemoPage.jsx
import { useState } from 'react';
import SwipeableCarousel from '../components/atoms/SwipeableCarousel/SwipeableCarousel';
import PullToRefresh from '../components/molecules/PullToRefresh/PullToRefresh';
import TouchOptimizedForm from '../components/molecules/TouchOptimizedForm/TouchOptimizedForm';
import MobileNavigation from '../components/organisms/MobileNavigation/MobileNavigation';
import Button from '../components/atoms/Button/Button';
import Section from '../components/Section';
import { isTouchDevice, triggerHapticFeedback } from '../utils/touchUtils';

const TouchDemoPage = ({ navigateTo }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [formData, setFormData] = useState(null);

  // Sample data for carousel
  const carouselItems = [
    {
      id: 1,
      title: 'Swipe Gestures',
      description: 'Try swiping left or right on this carousel',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Touch Interactions',
      description: 'Optimized for mobile touch interfaces',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 3,
      title: 'Gesture Support',
      description: 'Long press, double tap, and pinch gestures',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-red-500 to-pink-500'
    }
  ];

  // Form fields for touch demo
  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your name',
      autoComplete: 'name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'your@email.com',
      autoComplete: 'email'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      autoComplete: 'tel'
    },
    {
      name: 'feedback',
      label: 'Feedback',
      type: 'textarea',
      rows: 4,
      placeholder: 'Tell us about your touch experience...'
    }
  ];

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshCount(prev => prev + 1);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    if (isTouchDevice()) {
      triggerHapticFeedback('success');
    }
  };

  const handleHapticTest = (type) => {
    if (isTouchDevice()) {
      triggerHapticFeedback(type);
    } else {
      alert(`Haptic feedback: ${type} (not available on non-touch devices)`);
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="min-h-screen bg-color-bg-primary">
      <main className="pt-20 pb-8">
        {/* Header */}
        <Section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h1 className="text-4xl font-bold mb-4">Touch & Gesture Demo</h1>
          <p className="text-xl text-blue-100 mb-6">
            Experience mobile-optimized interactions and gestures
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm">Device: {isTouchDevice() ? 'Touch' : 'Non-Touch'}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm">Refreshed: {refreshCount} times</span>
            </div>
          </div>
        </Section>

        {/* Pull to Refresh Demo */}
        <Section
          title="Pull to Refresh"
          subtitle="Mobile Interaction"
          description="Pull down on mobile devices to refresh content"
          className="bg-color-bg-secondary"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">📱 Try pulling down to refresh</h3>
            <p className="text-color-text-secondary mb-4">
              This page supports pull-to-refresh functionality. On mobile devices, 
              pull down from the top to trigger a refresh.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-color-bg-secondary rounded-lg p-4">
                  <h4 className="font-medium mb-2">Content Block {item}</h4>
                  <p className="text-sm text-color-text-secondary">
                    This content will be refreshed when you pull down.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Swipeable Carousel Demo */}
        <Section
          title="Swipeable Carousel"
          subtitle="Touch Gestures"
          description="Swipe left or right to navigate through items"
        >
          <SwipeableCarousel
            items={carouselItems}
            autoPlay={false}
            showDots={true}
            showArrows={true}
            infinite={true}
            className="mb-8"
            renderItem={(item, index) => (
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-4 text-center">{item.title}</h3>
                  <p className="text-lg text-center opacity-90">{item.description}</p>
                </div>
              </div>
            )}
            onSlideChange={(index) => {
              console.log('Slide changed to:', index);
              if (isTouchDevice()) {
                triggerHapticFeedback('light');
              }
            }}
          />
          
          <div className="text-center">
            <p className="text-color-text-secondary">
              💡 Tip: Use touch gestures to navigate, or click the arrows on desktop
            </p>
          </div>
        </Section>

        {/* Touch-Optimized Buttons */}
        <Section
          title="Touch-Optimized Buttons"
          subtitle="Haptic Feedback"
          description="Buttons with enhanced touch interactions and haptic feedback"
          className="bg-color-bg-secondary"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button
              variant="primary"
              size="large"
              ripple={true}
              haptic={true}
              onClick={() => handleHapticTest('light')}
              className="w-full"
            >
              Light Haptic
            </Button>
            <Button
              variant="secondary"
              size="large"
              ripple={true}
              haptic={true}
              onClick={() => handleHapticTest('medium')}
              className="w-full"
            >
              Medium Haptic
            </Button>
            <Button
              variant="outline"
              size="large"
              ripple={true}
              haptic={true}
              onClick={() => handleHapticTest('success')}
              className="w-full"
            >
              Success
            </Button>
            <Button
              variant="danger"
              size="large"
              ripple={true}
              haptic={true}
              onClick={() => handleHapticTest('error')}
              className="w-full"
            >
              Error
            </Button>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">🎯 Touch Target Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Minimum Touch Targets</h4>
                <ul className="text-sm text-color-text-secondary space-y-1">
                  <li>• Mobile: 48px × 48px minimum</li>
                  <li>• Desktop: 44px × 44px minimum</li>
                  <li>• Adequate spacing between targets</li>
                  <li>• Visual feedback on interaction</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Touch Enhancements</h4>
                <ul className="text-sm text-color-text-secondary space-y-1">
                  <li>• Ripple effects for visual feedback</li>
                  <li>• Haptic feedback for confirmation</li>
                  <li>• Optimized for one-handed use</li>
                  <li>• Reduced accidental activations</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Mobile Navigation Demo */}
        <Section
          title="Mobile Navigation"
          subtitle="Swipe to Close"
          description="Enhanced mobile navigation with gesture support"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">📱 Mobile Navigation Features</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-color-bg-secondary rounded-lg">
                <span>Swipe to close navigation</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-color-bg-secondary rounded-lg">
                <span>Touch-friendly menu items</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-color-bg-secondary rounded-lg">
                <span>Keyboard navigation support</span>
                <span className="text-green-600">✓</span>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="large"
              onClick={() => setIsNavOpen(true)}
              className="w-full md:w-auto"
            >
              Open Mobile Navigation
            </Button>
          </div>
        </Section>

        {/* Touch-Optimized Form */}
        <Section
          title="Touch-Optimized Forms"
          subtitle="Mobile Keyboards"
          description="Forms optimized for mobile input with proper keyboard types"
          className="bg-color-bg-secondary"
        >
          <div className="max-w-2xl mx-auto">
            <TouchOptimizedForm
              fields={formFields}
              onSubmit={handleFormSubmit}
              submitText="Submit Feedback"
              touchOptimizations={true}
              className="bg-white rounded-lg p-6 shadow-lg"
            />
            
            {formData && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  ✅ Form Submitted Successfully!
                </h3>
                <pre className="text-sm text-green-700 overflow-auto">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Section>

        {/* Touch Guidelines */}
        <Section
          title="Touch Design Guidelines"
          subtitle="Best Practices"
          description="Guidelines for creating touch-friendly interfaces"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">🎯 Target Sizes</h3>
              <ul className="space-y-2 text-sm text-color-text-secondary">
                <li>• Minimum 44px for touch targets</li>
                <li>• 48px recommended for mobile</li>
                <li>• Adequate spacing between elements</li>
                <li>• Consider thumb reach zones</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-green-600">👆 Gestures</h3>
              <ul className="space-y-2 text-sm text-color-text-secondary">
                <li>• Swipe for navigation</li>
                <li>• Pull-to-refresh for content</li>
                <li>• Long press for context menus</li>
                <li>• Pinch for zoom interactions</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-purple-600">📱 Feedback</h3>
              <ul className="space-y-2 text-sm text-color-text-secondary">
                <li>• Visual feedback on touch</li>
                <li>• Haptic feedback for confirmation</li>
                <li>• Clear loading states</li>
                <li>• Error prevention and recovery</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Back Navigation */}
        <Section className="text-center">
          <Button
            variant="outline"
            size="large"
            onClick={() => navigateTo("Home")}
            className="mx-auto"
          >
            ← Back to Home
          </Button>
        </Section>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isNavOpen}
        onToggle={setIsNavOpen}
        swipeToClose={true}
        position="left"
      />
    </PullToRefresh>
  );
};

export default TouchDemoPage;