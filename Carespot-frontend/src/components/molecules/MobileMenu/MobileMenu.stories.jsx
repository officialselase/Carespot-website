import { useState } from 'react';
import MobileMenu from './MobileMenu';
import Button from '../../atoms/Button';

export default {
  title: 'Molecules/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
    },
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
        className="mb-4"
      >
        Open Mobile Menu
      </Button>
      
      <p className="text-gray-600 mb-4">
        Click the button above to open the mobile menu. The menu will overlay the entire screen.
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Sample Page Content</h2>
        <p className="text-gray-600 mb-4">
          This represents the main page content that will be covered by the mobile menu overlay.
        </p>
        <p className="text-gray-600">
          The menu supports keyboard navigation, escape key to close, and smooth animations.
        </p>
      </div>

      <MobileMenu
        {...args}
        isOpen={isOpen}
        onToggle={setIsOpen}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  onToggle: () => {},
};

export const LeftPosition = Template.bind({});
LeftPosition.args = {
  position: 'left',
  onToggle: () => {},
};

export const WithoutOverlay = Template.bind({});
WithoutOverlay.args = {
  overlay: false,
  onToggle: () => {},
};

export const FastAnimation = Template.bind({});
FastAnimation.args = {
  animationDuration: 150,
  onToggle: () => {},
};

export const SlowAnimation = Template.bind({});
SlowAnimation.args = {
  animationDuration: 500,
  onToggle: () => {},
};

export const CustomNavigation = Template.bind({});
CustomNavigation.args = {
  navigation: [
    { 
      label: 'Dashboard', 
      href: '/dashboard', 
      icon: 'home',
      description: 'View your dashboard'
    },
    { 
      label: 'Health Programs', 
      href: '/programs', 
      icon: 'heart',
      description: 'Our health initiatives',
      children: [
        { label: 'Maternal Health', href: '/programs/maternal', icon: 'users' },
        { label: 'Child Nutrition', href: '/programs/nutrition', icon: 'apple' },
        { label: 'Mental Health', href: '/programs/mental', icon: 'brain' }
      ]
    },
    { 
      label: 'Research', 
      href: '/research', 
      icon: 'search',
      description: 'Latest research findings',
      children: [
        { label: 'Publications', href: '/research/publications', icon: 'document' },
        { label: 'Clinical Trials', href: '/research/trials', icon: 'flask' }
      ]
    },
    { 
      label: 'Support Us', 
      href: '/support', 
      icon: 'gift',
      description: 'Help our cause',
      highlight: true,
      children: [
        { label: 'One-time Donation', href: '/donate/once', icon: 'heart', highlight: true },
        { label: 'Monthly Giving', href: '/donate/monthly', icon: 'calendar' },
        { label: 'Corporate Partnership', href: '/partner', icon: 'building' }
      ]
    }
  ],
  onToggle: () => {},
};