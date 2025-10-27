import Breadcrumb from './Breadcrumb';

export default {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    separator: {
      control: { type: 'select' },
      options: ['chevron-right', 'arrow-right', 'slash'],
    },
  },
};

const Template = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { label: 'About', href: '/about' },
    { label: 'Our Team', href: '/about/team' },
    { label: 'Leadership', href: '/about/team/leadership' }
  ]
};

export const WithoutHome = Template.bind({});
WithoutHome.args = {
  items: [
    { label: 'Projects', href: '/projects' },
    { label: 'Health Screenings', href: '/projects/health-screenings' },
    { label: 'Community Outreach', href: '/projects/health-screenings/community' }
  ],
  showHome: false
};

export const SingleLevel = Template.bind({});
SingleLevel.args = {
  items: [
    { label: 'Contact', href: '/contact' }
  ]
};

export const WithCustomSeparator = Template.bind({});
WithCustomSeparator.args = {
  items: [
    { label: 'Donate', href: '/donate' },
    { label: 'Monthly Giving', href: '/donate/monthly' }
  ],
  separator: 'arrow-right'
};

export const Interactive = Template.bind({});
Interactive.args = {
  items: [
    { label: 'Projects', href: '/projects' },
    { label: 'RxCare Research', href: '/projects/rxcare' },
    { label: 'Neonatal Monitoring', href: '/projects/rxcare/neonatal' }
  ],
  onNavigate: (item) => {
    console.log('Navigating to:', item);
    alert(`Navigating to: ${item.label}`);
  }
};