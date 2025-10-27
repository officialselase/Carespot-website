// src/components/atoms/SwipeableCarousel/SwipeableCarousel.stories.jsx
import SwipeableCarousel from './SwipeableCarousel';

export default {
  title: 'Atoms/SwipeableCarousel',
  component: SwipeableCarousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A touch-enabled carousel component with swipe gestures, keyboard navigation, and accessibility features.'
      }
    }
  },
  argTypes: {
    items: {
      description: 'Array of items to display in the carousel',
      control: { type: 'object' }
    },
    autoPlay: {
      description: 'Enable automatic slide progression',
      control: { type: 'boolean' }
    },
    autoPlayInterval: {
      description: 'Interval between auto slides in milliseconds',
      control: { type: 'number', min: 1000, max: 10000, step: 500 }
    },
    showDots: {
      description: 'Show dot indicators',
      control: { type: 'boolean' }
    },
    showArrows: {
      description: 'Show navigation arrows',
      control: { type: 'boolean' }
    },
    infinite: {
      description: 'Enable infinite loop',
      control: { type: 'boolean' }
    },
    itemsPerView: {
      description: 'Number of items visible at once',
      control: { type: 'number', min: 1, max: 5 }
    },
    gap: {
      description: 'Gap between items in pixels',
      control: { type: 'number', min: 0, max: 50 }
    }
  }
};

// Sample images for stories
const sampleImages = [
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const sampleProjects = [
  {
    id: 1,
    title: 'RxCare Research',
    description: 'Neonatal seizure detection device',
    image: sampleImages[0],
    category: 'Research'
  },
  {
    id: 2,
    title: 'Health Screenings',
    description: 'Community health outreach programs',
    image: sampleImages[1],
    category: 'Healthcare'
  },
  {
    id: 3,
    title: 'Nutrition Support',
    description: 'Malnutrition prevention initiatives',
    image: sampleImages[2],
    category: 'Nutrition'
  },
  {
    id: 4,
    title: 'Medical Training',
    description: 'Healthcare worker education',
    image: sampleImages[3],
    category: 'Education'
  },
  {
    id: 5,
    title: 'Community Clinics',
    description: 'Pop-up healthcare facilities',
    image: sampleImages[4],
    category: 'Infrastructure'
  }
];

// Default story
export const Default = {
  args: {
    items: sampleImages,
    className: 'w-full max-w-2xl mx-auto',
    autoPlay: false,
    showDots: true,
    showArrows: true,
    infinite: true,
    itemsPerView: 1,
    gap: 16
  }
};

// Auto-play carousel
export const AutoPlay = {
  args: {
    ...Default.args,
    autoPlay: true,
    autoPlayInterval: 3000
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with automatic slide progression. Pauses on hover/focus.'
      }
    }
  }
};

// Multiple items per view
export const MultipleItems = {
  args: {
    ...Default.args,
    itemsPerView: 3,
    gap: 20,
    className: 'w-full max-w-4xl mx-auto'
  },
  parameters: {
    docs: {
      description: {
        story: 'Display multiple items at once with responsive behavior.'
      }
    }
  }
};

// Custom render function
export const CustomRender = {
  args: {
    items: sampleProjects,
    className: 'w-full max-w-3xl mx-auto',
    itemsPerView: 2,
    gap: 24,
    renderItem: (item, index) => (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with custom item rendering for complex content.'
      }
    }
  }
};

// Mobile optimized
export const MobileOptimized = {
  args: {
    ...Default.args,
    showArrows: false,
    className: 'w-full max-w-sm mx-auto'
  },
  parameters: {
    docs: {
      description: {
        story: 'Mobile-first carousel with touch gestures and no arrows for cleaner mobile experience.'
      }
    }
  }
};

// No infinite loop
export const FiniteLoop = {
  args: {
    ...Default.args,
    infinite: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel that stops at the first and last slides instead of looping infinitely.'
      }
    }
  }
};

// Minimal design
export const Minimal = {
  args: {
    items: sampleImages,
    className: 'w-full max-w-2xl mx-auto',
    showDots: false,
    showArrows: false,
    infinite: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean carousel with only swipe/touch navigation, no visual controls.'
      }
    }
  }
};