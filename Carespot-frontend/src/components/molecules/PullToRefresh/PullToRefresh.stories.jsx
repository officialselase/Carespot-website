// src/components/molecules/PullToRefresh/PullToRefresh.stories.jsx
import { useState } from 'react';
import PullToRefresh from './PullToRefresh';

export default {
  title: 'Molecules/PullToRefresh',
  component: PullToRefresh,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A pull-to-refresh component that enables users to refresh content by pulling down on mobile devices.'
      }
    }
  },
  argTypes: {
    onRefresh: {
      description: 'Function called when refresh is triggered',
      action: 'refresh'
    },
    threshold: {
      description: 'Distance in pixels to trigger refresh',
      control: { type: 'number', min: 50, max: 150 }
    },
    refreshingText: {
      description: 'Text shown during refresh',
      control: { type: 'text' }
    },
    pullText: {
      description: 'Text shown when pulling',
      control: { type: 'text' }
    },
    releaseText: {
      description: 'Text shown when ready to release',
      control: { type: 'text' }
    },
    disabled: {
      description: 'Disable pull-to-refresh functionality',
      control: { type: 'boolean' }
    }
  }
};

// Sample content component
const SampleContent = ({ items = [] }) => (
  <div className="p-6 space-y-4">
    <h2 className="text-2xl font-bold text-color-text-primary mb-6">
      Latest Updates
    </h2>
    {items.map((item, index) => (
      <div
        key={index}
        className="bg-color-bg-secondary rounded-lg p-4 border border-color-border-primary"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {item.title.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-color-text-primary mb-1">
              {item.title}
            </h3>
            <p className="text-color-text-secondary text-sm mb-2">
              {item.description}
            </p>
            <span className="text-xs text-color-text-tertiary">
              {item.timestamp}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Default story with interactive refresh
export const Default = {
  render: (args) => {
    const [items, setItems] = useState([
      {
        title: 'Health Screening Complete',
        description: 'Successfully screened 150 children in Accra community',
        timestamp: '2 hours ago'
      },
      {
        title: 'New Volunteer Joined',
        description: 'Dr. Sarah Johnson joined our medical team',
        timestamp: '4 hours ago'
      },
      {
        title: 'Donation Milestone',
        description: 'Reached $12,000 in community donations this month',
        timestamp: '1 day ago'
      }
    ]);

    const handleRefresh = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new item to the top
      const newItem = {
        title: 'Content Refreshed',
        description: 'New updates loaded successfully',
        timestamp: 'Just now'
      };
      
      setItems(prev => [newItem, ...prev]);
    };

    return (
      <div className="h-screen bg-color-bg-primary">
        <PullToRefresh
          {...args}
          onRefresh={handleRefresh}
          className="h-full"
        >
          <SampleContent items={items} />
        </PullToRefresh>
      </div>
    );
  },
  args: {
    threshold: 80,
    refreshingText: 'Refreshing...',
    pullText: 'Pull to refresh',
    releaseText: 'Release to refresh',
    disabled: false
  }
};

// News feed example
export const NewsFeed = {
  render: (args) => {
    const [articles, setArticles] = useState([
      {
        title: 'RxCare Research Breakthrough',
        description: 'New developments in neonatal seizure detection technology show promising results in clinical trials.',
        timestamp: '3 hours ago'
      },
      {
        title: 'Community Health Fair Success',
        description: 'Over 500 community members attended our health screening event in Kumasi.',
        timestamp: '1 day ago'
      },
      {
        title: 'Partnership Announcement',
        description: 'CareSpot Initiative partners with local hospitals to expand healthcare access.',
        timestamp: '2 days ago'
      },
      {
        title: 'Volunteer Training Program',
        description: 'New volunteer orientation program launches next month with focus on community outreach.',
        timestamp: '3 days ago'
      }
    ]);

    const handleRefresh = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newArticles = [
        {
          title: 'Breaking: New Funding Secured',
          description: 'Major grant awarded for expanding healthcare programs across rural Ghana.',
          timestamp: 'Just now'
        },
        {
          title: 'Mobile Clinic Launch',
          description: 'First mobile healthcare unit begins operations in remote communities.',
          timestamp: '30 minutes ago'
        }
      ];
      
      setArticles(prev => [...newArticles, ...prev]);
    };

    return (
      <div className="h-screen bg-color-bg-primary">
        <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">CareSpot News</h1>
          <p className="text-red-100 mt-1">Stay updated with our latest impact</p>
        </div>
        
        <PullToRefresh
          {...args}
          onRefresh={handleRefresh}
          className="flex-1 overflow-auto"
          style={{ height: 'calc(100vh - 120px)' }}
        >
          <SampleContent items={articles} />
        </PullToRefresh>
      </div>
    );
  },
  args: {
    threshold: 100,
    refreshingText: 'Loading latest news...',
    pullText: 'Pull down for updates',
    releaseText: 'Release to load news'
  }
};

// Disabled state
export const Disabled = {
  render: (args) => {
    const items = [
      {
        title: 'Static Content',
        description: 'This content cannot be refreshed as pull-to-refresh is disabled.',
        timestamp: 'Always'
      }
    ];

    return (
      <div className="h-screen bg-color-bg-primary">
        <div className="bg-gray-100 border-b border-gray-200 p-4">
          <p className="text-gray-600 text-sm">
            ⚠️ Pull-to-refresh is disabled in this example
          </p>
        </div>
        
        <PullToRefresh
          {...args}
          onRefresh={() => {}}
          className="flex-1 overflow-auto"
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <SampleContent items={items} />
        </PullToRefresh>
      </div>
    );
  },
  args: {
    disabled: true
  }
};

// Custom threshold
export const CustomThreshold = {
  render: Default.render,
  args: {
    ...Default.args,
    threshold: 120,
    pullText: 'Pull further to refresh',
    releaseText: 'Almost there, release now!'
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a higher threshold requiring more pull distance to trigger refresh.'
      }
    }
  }
};