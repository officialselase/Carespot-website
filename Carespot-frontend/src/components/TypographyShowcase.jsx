import { useState } from 'react';
import { Heading, Body, Caption, Label } from './Typography';

/**
 * Typography Showcase Component - Demonstrates the typography system
 * Used for development and testing purposes
 */
const TypographyShowcase = () => {
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className={`p-8 max-w-4xl mx-auto ${highContrast ? 'text-high-contrast' : ''}`}>
      {/* Controls */}
      <div className="mb-8 p-4 bg-color-bg-secondary rounded-lg">
        <Heading as="h3" size="lg" className="mb-4">Typography Controls</Heading>
        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={dyslexicMode}
              onChange={(e) => setDyslexicMode(e.target.checked)}
              className="rounded"
            />
            <Label>Dyslexic-Friendly Font</Label>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="rounded"
            />
            <Label>High Contrast Mode</Label>
          </label>
        </div>
      </div>

      {/* Heading Showcase */}
      <section className="mb-12">
        <Heading as="h2" size="3xl" className="mb-6" dyslexic={dyslexicMode}>
          Heading Components
        </Heading>
        
        <div className="space-y-4">
          <div>
            <Caption className="mb-2">H1 - Hero Heading (5xl)</Caption>
            <Heading as="h1" size="5xl" dyslexic={dyslexicMode}>
              Transform Lives Through Healthcare
            </Heading>
          </div>
          
          <div>
            <Caption className="mb-2">H2 - Section Heading (3xl)</Caption>
            <Heading as="h2" size="3xl" dyslexic={dyslexicMode}>
              Our Impact on Communities
            </Heading>
          </div>
          
          <div>
            <Caption className="mb-2">H3 - Subsection Heading (2xl)</Caption>
            <Heading as="h3" size="2xl" dyslexic={dyslexicMode}>
              Healthcare Access Initiative
            </Heading>
          </div>
          
          <div>
            <Caption className="mb-2">H4 - Card Heading (xl)</Caption>
            <Heading as="h4" size="xl" dyslexic={dyslexicMode}>
              Community Health Screening
            </Heading>
          </div>
          
          <div>
            <Caption className="mb-2">H5 - Small Heading (lg)</Caption>
            <Heading as="h5" size="lg" dyslexic={dyslexicMode}>
              Volunteer Opportunities
            </Heading>
          </div>
        </div>
      </section>

      {/* Responsive Heading Demo */}
      <section className="mb-12">
        <Heading as="h2" size="3xl" className="mb-6" dyslexic={dyslexicMode}>
          Responsive Typography
        </Heading>
        
        <div className="p-4 bg-color-bg-secondary rounded-lg">
          <Caption className="mb-4">This heading scales with viewport size:</Caption>
          <Heading as="h2" size="4xl" responsive={true} dyslexic={dyslexicMode}>
            Responsive Heading Example
          </Heading>
          <Caption className="mt-2 text-color-text-secondary">
            Resize your browser window to see the effect
          </Caption>
        </div>
      </section>

      {/* Body Text Showcase */}
      <section className="mb-12">
        <Heading as="h2" size="3xl" className="mb-6" dyslexic={dyslexicMode}>
          Body Text Components
        </Heading>
        
        <div className="space-y-6">
          <div>
            <Caption className="mb-2">Lead Paragraph</Caption>
            <Body lead dyslexic={dyslexicMode}>
              CareSpot Initiative is a community-driven health organization focused on improving 
              healthcare access, promoting health literacy, and supporting nutrition for underserved 
              populations across Ghana and beyond.
            </Body>
          </div>
          
          <div>
            <Caption className="mb-2">Regular Paragraph (Base)</Caption>
            <Body dyslexic={dyslexicMode}>
              Our mission is to bridge gaps in healthcare access, education, and support for 
              underserved communities by promoting preventive care, nutrition, and patient 
              empowerment. We work with local partners to ensure sustainable impact.
            </Body>
          </div>
          
          <div>
            <Caption className="mb-2">Small Text</Caption>
            <Body size="sm" dyslexic={dyslexicMode}>
              Through our comprehensive programs, we have reached over 10 communities and 
              helped more than 2,050 children access better healthcare and nutrition.
            </Body>
          </div>
          
          <div>
            <Caption className="mb-2">Large Text</Caption>
            <Body size="lg" weight="medium" dyslexic={dyslexicMode}>
              Every donation helps us reach more communities and save more lives through 
              healthcare access and education.
            </Body>
          </div>
        </div>
      </section>

      {/* Caption Showcase */}
      <section className="mb-12">
        <Heading as="h2" size="3xl" className="mb-6" dyslexic={dyslexicMode}>
          Caption Components
        </Heading>
        
        <div className="space-y-4">
          <div>
            <Caption uppercase spacing="wide" dyslexic={dyslexicMode}>
              Section Subtitle
            </Caption>
          </div>
          
          <div>
            <Caption size="xs" color="text-color-text-secondary" dyslexic={dyslexicMode}>
              Image caption or metadata text
            </Caption>
          </div>
          
          <div>
            <Caption weight="semibold" color="text-color-interactive-primary" dyslexic={dyslexicMode}>
              Highlighted caption text
            </Caption>
          </div>
        </div>
      </section>

      {/* Label Showcase */}
      <section className="mb-12">
        <Heading as="h2" size="3xl" className="mb-6" dyslexic={dyslexicMode}>
          Label Components
        </Heading>
        
        <div className="space-y-4">
          <div>
            <Label required dyslexic={dyslexicMode}>Form Label (Required)</Label>
          </div>
          
          <div>
            <Label dyslexic={dyslexicMode}>Optional Form Label</Label>
          </div>
          
          <div>
            <Label disabled dyslexic={dyslexicMode}>Disabled Form Label</Label>
          </div>
          
          <div>
            <Label size="lg" weight="semibold" dyslexic={dyslexicMode}>
              Large Label for Important Fields
            </Label>
          </div>
        </div>
      </section>

      {/* Multi-language Support Demo */}
      <section className="mb-12">
        <Heading as="h2" size="3xl" className="mb-6" dyslexic={dyslexicMode}>
          Multi-language Support
        </Heading>
        
        <div className="space-y-6">
          <div>
            <Caption className="mb-2">English (Latin Script)</Caption>
            <Body className="text-latin" dyslexic={dyslexicMode}>
              CareSpot Initiative transforms lives through healthcare access and education.
            </Body>
          </div>
          
          <div>
            <Caption className="mb-2">Arabic Numerals Support</Caption>
            <Body dyslexic={dyslexicMode}>
              We have helped 2,050+ children and reached 10 communities with $11,880+ raised.
            </Body>
          </div>
          
          <div>
            <Caption className="mb-2">Mixed Content</Caption>
            <Body dyslexic={dyslexicMode}>
              Contact us at +233 123 456 789 or visit our office at 123 Healthcare Street, Accra.
            </Body>
          </div>
        </div>
      </section>

      {/* Typography Scale Demo */}
      <section className="mb-12">
        <Heading as="h2" size="3xl" className="mb-6" dyslexic={dyslexicMode}>
          Typography Scale (1.25 Ratio)
        </Heading>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-4">
            <Caption className="w-16">9xl:</Caption>
            <Heading as="div" size="9xl" dyslexic={dyslexicMode}>Aa</Heading>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-16">5xl:</Caption>
            <Heading as="div" size="5xl" dyslexic={dyslexicMode}>Aa</Heading>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-16">3xl:</Caption>
            <Heading as="div" size="3xl" dyslexic={dyslexicMode}>Aa</Heading>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-16">xl:</Caption>
            <Heading as="div" size="xl" dyslexic={dyslexicMode}>Aa</Heading>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-16">base:</Caption>
            <Body as="div" dyslexic={dyslexicMode}>Aa</Body>
          </div>
          <div className="flex items-baseline gap-4">
            <Caption className="w-16">sm:</Caption>
            <Body as="div" size="sm" dyslexic={dyslexicMode}>Aa</Body>
          </div>
        </div>
      </section>

      {/* Performance & Accessibility Notes */}
      <section className="mb-12 p-6 bg-color-bg-secondary rounded-lg">
        <Heading as="h3" size="lg" className="mb-4" dyslexic={dyslexicMode}>
          Typography System Features
        </Heading>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2">Performance Optimizations:</Label>
            <ul className="space-y-1 text-sm text-color-text-secondary">
              <li>• Font display: swap for faster loading</li>
              <li>• Optimized font loading with fallbacks</li>
              <li>• Text rendering optimization</li>
              <li>• Reduced motion support</li>
            </ul>
          </div>
          
          <div>
            <Label className="block mb-2">Accessibility Features:</Label>
            <ul className="space-y-1 text-sm text-color-text-secondary">
              <li>• Dyslexic-friendly font option</li>
              <li>• High contrast mode support</li>
              <li>• Semantic HTML structure</li>
              <li>• WCAG compliant color ratios</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypographyShowcase;