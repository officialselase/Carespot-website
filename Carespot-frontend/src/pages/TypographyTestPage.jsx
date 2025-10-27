import { useState } from 'react';
import { Heading, Body, Caption, Label } from '../components/Typography';
import TypographyShowcase from '../components/TypographyShowcase';
import TypographySettings from '../components/TypographySettings';

/**
 * Typography Test Page - For development and testing
 * This page demonstrates all typography features and components
 */
const TypographyTestPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showShowcase, setShowShowcase] = useState(true);

  return (
    <div className="min-h-screen bg-color-bg-primary pt-20">
      {/* Header */}
      <div className="bg-color-bg-secondary py-8">
        <div className="container-custom">
          <Heading as="h1" size="4xl" className="mb-4">
            Typography System Test Page
          </Heading>
          <Body lead className="mb-6">
            This page demonstrates the advanced typography system with responsive scaling, 
            accessibility features, and multi-language support.
          </Body>
          
          {/* Navigation */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => {
                setShowShowcase(true);
                setShowSettings(false);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showShowcase 
                  ? 'bg-color-interactive-primary text-white' 
                  : 'bg-color-bg-primary text-color-text-primary hover:bg-color-neutral-100'
              }`}
            >
              Typography Showcase
            </button>
            <button
              onClick={() => {
                setShowSettings(true);
                setShowShowcase(false);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showSettings 
                  ? 'bg-color-interactive-primary text-white' 
                  : 'bg-color-bg-primary text-color-text-primary hover:bg-color-neutral-100'
              }`}
            >
              Typography Settings
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {showShowcase && <TypographyShowcase />}
        {showSettings && (
          <div className="max-w-2xl mx-auto">
            <TypographySettings />
          </div>
        )}
      </div>

      {/* Quick Test Section */}
      {!showSettings && (
        <div className="bg-color-bg-secondary py-16">
          <div className="container-custom">
            <Heading as="h2" size="3xl" className="mb-8 text-center">
              Quick Typography Test
            </Heading>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Headings */}
              <div>
                <Caption uppercase spacing="wide" className="mb-4">
                  Heading Examples
                </Caption>
                
                <div className="space-y-4">
                  <Heading as="h1" size="5xl">Hero Heading</Heading>
                  <Heading as="h2" size="3xl">Section Heading</Heading>
                  <Heading as="h3" size="2xl">Subsection Heading</Heading>
                  <Heading as="h4" size="xl">Card Heading</Heading>
                  <Heading as="h5" size="lg">Small Heading</Heading>
                </div>
              </div>
              
              {/* Right Column - Body Text */}
              <div>
                <Caption uppercase spacing="wide" className="mb-4">
                  Body Text Examples
                </Caption>
                
                <div className="space-y-4">
                  <Body lead>
                    This is a lead paragraph that introduces important content 
                    with larger, lighter text for better visual hierarchy.
                  </Body>
                  
                  <Body>
                    This is regular body text that provides the main content. 
                    It's optimized for readability with proper line height and spacing.
                  </Body>
                  
                  <Body size="sm">
                    This is smaller body text used for secondary information, 
                    captions, or fine print content.
                  </Body>
                  
                  <div className="flex items-center gap-2">
                    <Label required>Form Label</Label>
                    <Caption size="xs" color="text-color-text-secondary">
                      (with caption)
                    </Caption>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypographyTestPage;