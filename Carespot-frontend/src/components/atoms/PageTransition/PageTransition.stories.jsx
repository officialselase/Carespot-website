import { useState } from 'react';
import PageTransition, { usePageTransition } from './PageTransition';
import Button from '../Button/Button';

export default {
  title: 'Atoms/PageTransition',
  component: PageTransition,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    loadingType: {
      control: { type: 'select' },
      options: ['default', 'homepage', 'cards', 'stats', 'spinner', 'pulse'],
    },
  },
};

export const Default = {
  args: {
    isLoading: false,
    loadingType: 'default',
    children: (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Page Content</h2>
        <p className="text-gray-600 mb-4">
          This is the actual page content that appears after loading is complete.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Feature 1</h3>
            <p className="text-blue-600">Description of feature 1</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">Feature 2</h3>
            <p className="text-green-600">Description of feature 2</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const Loading = {
  args: {
    isLoading: true,
    loadingType: 'default',
    children: <div>This content is hidden while loading</div>,
  },
};

export const HomepageLoading = {
  args: {
    isLoading: true,
    loadingType: 'homepage',
    children: <div>Homepage content</div>,
  },
};

export const CardsLoading = {
  args: {
    isLoading: true,
    loadingType: 'cards',
    children: <div>Cards content</div>,
  },
};

export const StatsLoading = {
  args: {
    isLoading: true,
    loadingType: 'stats',
    children: <div>Stats content</div>,
  },
};

export const SpinnerLoading = {
  args: {
    isLoading: true,
    loadingType: 'spinner',
    children: <div>Content with spinner</div>,
  },
};

export const PulseLoading = {
  args: {
    isLoading: true,
    loadingType: 'pulse',
    children: <div>Content with pulse animation</div>,
  },
};

// Interactive demo
const TransitionDemo = () => {
  const { isLoading, startTransition, endTransition, withTransition } = usePageTransition();
  const [loadingType, setLoadingType] = useState('homepage');

  const simulatePageLoad = async () => {
    await withTransition(async () => {
      // Simulate API call or page load
      await new Promise(resolve => setTimeout(resolve, 2000));
    });
  };

  const toggleLoading = () => {
    if (isLoading) {
      endTransition();
    } else {
      startTransition();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={simulatePageLoad} variant="primary">
          Simulate Page Load (2s)
        </Button>
        <Button onClick={toggleLoading} variant="secondary">
          {isLoading ? 'Stop Loading' : 'Start Loading'}
        </Button>
        <select
          value={loadingType}
          onChange={(e) => setLoadingType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="default">Default</option>
          <option value="homepage">Homepage</option>
          <option value="cards">Cards</option>
          <option value="stats">Stats</option>
          <option value="spinner">Spinner</option>
          <option value="pulse">Pulse</option>
        </select>
      </div>

      <PageTransition isLoading={isLoading} loadingType={loadingType}>
        <div className="p-6 bg-white rounded-lg border">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            CareSpot Initiative
          </h2>
          <p className="text-gray-600 mb-6">
            Welcome to our healthcare initiative focused on improving access to healthcare,
            promoting health literacy, and supporting nutrition for underserved populations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">$11,880+</div>
              <div className="text-red-800">Dollars Raised</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">10</div>
              <div className="text-blue-800">Communities Reached</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">2,050+</div>
              <div className="text-green-800">Children Helped</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Health Screenings</h3>
              <p className="text-gray-600 text-sm">
                Free health screenings and outreach programs for underserved communities.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Nutritional Support</h3>
              <p className="text-gray-600 text-sm">
                Vital nutritional support and counseling for vulnerable children and mothers.
              </p>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export const InteractiveDemo = () => <TransitionDemo />;