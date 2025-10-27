import SkipLink from './SkipLink';

export default {
  title: 'Atoms/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => (
  <div className="min-h-screen bg-gray-100">
    <SkipLink {...args} />
    
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h1 className="text-2xl font-bold mb-4">Skip Link Demo</h1>
        <p className="text-gray-600 mb-4">
          Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Tab</kbd> to focus the skip link.
          It will appear at the top-left corner when focused.
        </p>
        <p className="text-gray-600 mb-4">
          The skip link allows keyboard users to quickly jump to the main content,
          bypassing navigation and other page elements.
        </p>
        
        {/* Focusable elements to demonstrate tab navigation */}
        <div className="space-y-2">
          <button className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Navigation Button 1
          </button>
          <button className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Navigation Button 2
          </button>
          <button className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Navigation Button 3
          </button>
        </div>
      </div>
      
      <main id="main-content" className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Main Content</h2>
        <p className="text-gray-600 mb-4">
          This is the main content area. When you use the skip link, focus will jump directly here.
        </p>
        <p className="text-gray-600 mb-4">
          This is especially helpful for users who navigate with keyboards or screen readers,
          as they don't have to tab through all the navigation elements to reach the main content.
        </p>
        
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Main Content Button
        </button>
      </main>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const CustomText = Template.bind({});
CustomText.args = {
  children: 'Jump to main content',
};

export const CustomTarget = Template.bind({});
CustomTarget.args = {
  href: '#custom-target',
  children: 'Skip to article',
};

// Add the custom target for the CustomTarget story
CustomTarget.decorators = [
  (Story) => (
    <div>
      <Story />
      <div className="p-8">
        <div id="custom-target" className="bg-yellow-100 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-bold mb-2">Custom Target Section</h3>
          <p className="text-gray-700">
            This demonstrates a skip link with a custom target element.
          </p>
        </div>
      </div>
    </div>
  ),
];

export const MultipleSkipLinks = () => (
  <div className="min-h-screen bg-gray-100">
    <SkipLink href="#main-content" />
    <SkipLink 
      href="#navigation" 
      className="top-0 left-20"
      children="Skip to navigation"
    />
    <SkipLink 
      href="#footer" 
      className="top-0 left-40"
      children="Skip to footer"
    />
    
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h1 className="text-2xl font-bold mb-4">Multiple Skip Links Demo</h1>
        <p className="text-gray-600 mb-4">
          This page demonstrates multiple skip links. Press Tab to cycle through them.
        </p>
      </div>
      
      <nav id="navigation" className="bg-blue-50 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>
        <ul className="space-y-2">
          <li><a href="#" className="text-blue-600 hover:underline">Home</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">About</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Services</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Contact</a></li>
        </ul>
      </nav>
      
      <main id="main-content" className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Main Content</h2>
        <p className="text-gray-600">Main content goes here...</p>
      </main>
      
      <footer id="footer" className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Footer</h2>
        <p className="text-gray-600">Footer content goes here...</p>
      </footer>
    </div>
  </div>
);