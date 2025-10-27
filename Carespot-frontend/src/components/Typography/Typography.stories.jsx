import Heading from './Heading';
import Body from './Body';
import Caption from './Caption';
import Label from './Label';

export default {
  title: 'Typography/Overview',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography system with semantic components for headings, body text, captions, and labels. Includes responsive sizing and accessibility features.',
      },
    },
  },
};

// Typography scale showcase
export const TypographyScale = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Headings</h2>
        <div className="space-y-3">
          <Heading as="h1" size="5xl">Heading 1 - 5xl</Heading>
          <Heading as="h2" size="4xl">Heading 2 - 4xl</Heading>
          <Heading as="h3" size="3xl">Heading 3 - 3xl</Heading>
          <Heading as="h4" size="2xl">Heading 4 - 2xl</Heading>
          <Heading as="h5" size="xl">Heading 5 - xl</Heading>
          <Heading as="h6" size="lg">Heading 6 - lg</Heading>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Body Text</h2>
        <div className="space-y-3">
          <Body size="lg">Large body text - Perfect for introductory paragraphs and important content that needs emphasis.</Body>
          <Body size="base">Base body text - The standard size for most content, optimized for readability and comfortable reading experience.</Body>
          <Body size="sm">Small body text - Used for secondary information, fine print, or when space is limited but readability is still important.</Body>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Labels & Captions</h2>
        <div className="space-y-3">
          <Label size="base">Form Label - Base Size</Label>
          <Label size="sm">Form Label - Small Size</Label>
          <Caption size="base">Caption text - Base size for image captions and descriptions</Caption>
          <Caption size="sm">Caption text - Small size for minimal descriptions</Caption>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete typography scale showing all heading levels, body text sizes, and supporting text elements.',
      },
    },
  },
};

// Font weights showcase
export const FontWeights = {
  render: () => (
    <div className="space-y-4">
      <Heading weight="light">Light Weight Heading</Heading>
      <Heading weight="normal">Normal Weight Heading</Heading>
      <Heading weight="medium">Medium Weight Heading</Heading>
      <Heading weight="semibold">Semibold Weight Heading</Heading>
      <Heading weight="bold">Bold Weight Heading</Heading>
      <Heading weight="extrabold">Extrabold Weight Heading</Heading>
      <Heading weight="black">Black Weight Heading</Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available font weights for typography components.',
      },
    },
  },
};

// Color variations
export const ColorVariations = {
  render: () => (
    <div className="space-y-4">
      <Heading color="text-color-text-primary">Primary Text Color</Heading>
      <Heading color="text-color-text-secondary">Secondary Text Color</Heading>
      <Heading color="text-color-text-muted">Muted Text Color</Heading>
      <Body color="text-color-text-primary">Primary body text with good contrast for main content.</Body>
      <Body color="text-color-text-secondary">Secondary body text for supporting information.</Body>
      <Body color="text-color-text-muted">Muted body text for less important details.</Body>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography components with different color variations from the design system.',
      },
    },
  },
};

// Alignment options
export const TextAlignment = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Heading align="left" className="mb-2">Left Aligned Heading</Heading>
        <Body align="left">This paragraph is aligned to the left, which is the default alignment for most text content in left-to-right languages.</Body>
      </div>
      
      <div>
        <Heading align="center" className="mb-2">Center Aligned Heading</Heading>
        <Body align="center">This paragraph is center aligned, often used for hero sections, quotes, or special announcements that need emphasis.</Body>
      </div>
      
      <div>
        <Heading align="right" className="mb-2">Right Aligned Heading</Heading>
        <Body align="right">This paragraph is aligned to the right, sometimes used for special layouts or in right-to-left language contexts.</Body>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text alignment options available for all typography components.',
      },
    },
  },
};

// Responsive behavior
export const ResponsiveBehavior = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Responsive Typography</h2>
        <Heading size="4xl" responsive={true} className="mb-4">
          This heading scales responsively across devices
        </Heading>
        <Body size="lg" responsive={true}>
          This body text also scales responsively, ensuring optimal readability on all screen sizes from mobile to desktop.
        </Body>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Fixed Typography</h2>
        <Heading size="4xl" responsive={false} className="mb-4">
          This heading has fixed sizing
        </Heading>
        <Body size="lg" responsive={false}>
          This body text maintains consistent sizing regardless of screen size.
        </Body>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between responsive and fixed typography sizing.',
      },
    },
  },
};

// Accessibility features
export const AccessibilityFeatures = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Standard Typography</h2>
        <Heading className="mb-2">Standard Heading Typography</Heading>
        <Body>Standard body text optimized for general readability with good contrast and spacing.</Body>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Dyslexic-Friendly Typography</h2>
        <Heading dyslexic={true} className="mb-2">Dyslexic-Friendly Heading</Heading>
        <Body dyslexic={true}>Dyslexic-friendly body text using fonts and spacing optimized for users with dyslexia and other reading difficulties.</Body>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including dyslexic-friendly typography options.',
      },
    },
  },
};

// Real-world usage example
export const RealWorldExample = {
  render: () => (
    <article className="max-w-3xl space-y-6">
      <header>
        <Heading as="h1" size="4xl" className="mb-2">
          Transforming Healthcare in Rural Ghana
        </Heading>
        <Caption color="text-color-text-muted">
          Published on March 15, 2024 • 5 min read
        </Caption>
      </header>
      
      <Body size="lg" color="text-color-text-secondary">
        Our latest healthcare initiative has reached over 10,000 people in remote villages, 
        providing essential medical services and health education to communities that previously 
        had limited access to healthcare.
      </Body>
      
      <div>
        <Heading as="h2" size="2xl" className="mb-3">
          The Challenge
        </Heading>
        <Body className="mb-4">
          Rural communities in Ghana face significant barriers to accessing quality healthcare. 
          Distance to medical facilities, lack of transportation, and limited resources create 
          a complex web of challenges that our organization is working to address.
        </Body>
        <Body>
          Through our mobile health clinics and community health worker programs, we're bringing 
          essential services directly to the people who need them most.
        </Body>
      </div>
      
      <div>
        <Heading as="h3" size="xl" className="mb-3">
          Our Approach
        </Heading>
        <Body className="mb-4">
          We believe in sustainable, community-driven solutions that empower local residents 
          to take charge of their health and well-being.
        </Body>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <Label className="block mb-2">Key Statistics</Label>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <Heading as="div" size="2xl" color="text-color-primary">10,000+</Heading>
              <Caption>People Served</Caption>
            </div>
            <div>
              <Heading as="div" size="2xl" color="text-color-primary">25</Heading>
              <Caption>Villages Reached</Caption>
            </div>
          </div>
        </div>
      </div>
    </article>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing how typography components work together in an article layout.',
      },
    },
  },
};