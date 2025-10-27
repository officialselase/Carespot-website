import DonationProgress from './DonationProgress';

export default {
  title: 'Molecules/DonationProgress',
  component: DonationProgress,
  parameters: {
    layout: 'padded',
  },
};

const sampleCampaigns = [
  {
    id: 1,
    title: 'Emergency Medical Fund',
    description: 'Providing critical medical care for children in underserved communities',
    current: 11880,
    target: 20000,
    donors: 156,
    deadline: '2024-12-31',
    urgent: true,
    color: 'danger'
  },
  {
    id: 2,
    title: 'School Supplies Drive',
    description: 'Educational materials and supplies for rural schools',
    current: 8500,
    target: 10000,
    donors: 89,
    deadline: '2024-11-15',
    color: 'success'
  },
  {
    id: 3,
    title: 'Clean Water Project',
    description: 'Installing water purification systems in remote villages',
    current: 3200,
    target: 15000,
    donors: 42,
    deadline: '2025-02-28',
    color: 'info'
  },
  {
    id: 4,
    title: 'Nutrition Program',
    description: 'Monthly food packages for malnourished children',
    current: 6750,
    target: 8000,
    donors: 73,
    deadline: '2024-12-15',
    color: 'warning'
  }
];

export const Default = {
  args: {
    campaigns: sampleCampaigns,
    onDonate: () => alert('Donate button clicked!'),
  },
};

export const SingleCampaign = {
  args: {
    campaigns: [sampleCampaigns[0]],
    title: 'Featured Campaign',
    subtitle: 'Help us reach our goal for emergency medical care',
    onDonate: () => alert('Donate to emergency fund!'),
  },
};

export const CompletedCampaigns = {
  args: {
    campaigns: [
      {
        id: 1,
        title: 'Completed: School Building Project',
        description: 'Successfully built a new classroom block',
        current: 25000,
        target: 25000,
        donors: 200,
        color: 'success'
      },
      {
        id: 2,
        title: 'Completed: Medical Equipment',
        description: 'Purchased essential medical equipment for clinic',
        current: 15000,
        target: 12000,
        donors: 150,
        color: 'success'
      }
    ],
    title: 'Completed Campaigns',
    subtitle: 'Thanks to your generous support, these goals were achieved!',
    showDonateButton: false,
  },
};

export const UrgentCampaigns = {
  args: {
    campaigns: [
      {
        id: 1,
        title: 'Emergency Flood Relief',
        description: 'Immediate assistance for flood victims',
        current: 2500,
        target: 10000,
        donors: 35,
        deadline: '2024-11-01',
        urgent: true,
        color: 'danger'
      },
      {
        id: 2,
        title: 'Critical Medical Surgery',
        description: 'Life-saving surgery for a young patient',
        current: 1200,
        target: 5000,
        donors: 18,
        deadline: '2024-10-30',
        urgent: true,
        color: 'danger'
      }
    ],
    title: 'Urgent Appeals',
    subtitle: 'These campaigns need immediate support',
    onDonate: () => alert('Thank you for supporting urgent causes!'),
  },
};

export const NearlyComplete = {
  args: {
    campaigns: [
      {
        id: 1,
        title: 'Almost There: Community Garden',
        description: 'Creating sustainable food sources for the community',
        current: 9200,
        target: 10000,
        donors: 95,
        deadline: '2024-11-30',
        color: 'success'
      }
    ],
    title: 'So Close to Our Goal!',
    subtitle: 'Just a little more to make this project a reality',
    onDonate: () => alert('Help us cross the finish line!'),
  },
};

export const WithoutDonateButton = {
  args: {
    campaigns: sampleCampaigns.slice(0, 2),
    title: 'Campaign Overview',
    subtitle: 'Current status of our fundraising efforts',
    showDonateButton: false,
  },
};

export const EmptyState = {
  args: {
    campaigns: [],
    title: 'No Active Campaigns',
    subtitle: 'Check back soon for new fundraising opportunities',
    showDonateButton: false,
  },
};