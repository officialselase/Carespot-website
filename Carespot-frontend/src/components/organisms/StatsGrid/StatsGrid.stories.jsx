import StatsGrid from './StatsGrid';

export default {
  title: 'Organisms/StatsGrid',
  component: StatsGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'StatsGrid component for displaying multiple statistics in a responsive grid layout.',
      },
    },
  },
  argTypes: {
    stats: {
      control: { type: 'object' },
      description: 'Array of stat objects to display',
    },
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4],
      description: 'Number of columns in the grid',
    },
  },
};

// Sample stats data
const sampleStats = [
  {
    id: 1,
    title: 'Total Donations',
    value: '$127,450',
    subtitle: 'All time',
    icon: 'heart',
    trend: 'up',
    trendValue: '+23%',
    variant: 'primary'
  },
  {
    id: 2,
    title: 'People Served',
    value: '15,230',
    subtitle: 'This year',
    icon: 'users',
    trend: 'up',
    trendValue: '+18%',
    variant: 'success'
  },
  {
    id: 3,
    title: 'Active Volunteers',
    value: '342',
    subtitle: 'Currently active',
    icon: 'users',
    trend: 'up',
    trendValue: '+12%'
  },
  {
    id: 4,
    title: 'Healthcare Programs',
    value: '28',
    subtitle: 'Running programs',
    icon: 'medical',
    trend: 'neutral',
    trendValue: '0%'
  }
];

const healthcareStats = [
  {
    id: 1,
    title: 'Medical Screenings',
    value: '8,420',
    subtitle: 'This quarter',
    icon: 'medical',
    trend: 'up',
    trendValue: '+25%',
    variant: 'success'
  },
  {
    id: 2,
    title: 'Villages Reached',
    value: '156',
    subtitle: 'Across Ghana',
    icon: 'globe',
    trend: 'up',
    trendValue: '+8%',
    variant: 'primary'
  },
  {
    id: 3,
    title: 'Health Workers Trained',
    value: '89',
    subtitle: 'This year',
    icon: 'users',
    trend: 'up',
    trendValue: '+15%'
  },
  {
    id: 4,
    title: 'Emergency Cases',
    value: '234',
    subtitle: 'Handled this month',
    icon: 'medical',
    trend: 'down',
    trendValue: '-12%',
    variant: 'warning'
  },
  {
    id: 5,
    title: 'Nutrition Programs',
    value: '12',
    subtitle: 'Active programs',
    icon: 'heart',
    trend: 'up',
    trendValue: '+3%'
  },
  {
    id: 6,
    title: 'Community Events',
    value: '45',
    subtitle: 'This month',
    icon: 'star',
    trend: 'down',
    trendValue: '-5%',
    variant: 'warning'
  }
];

// Default story
export const Default = {
  args: {
    stats: sampleStats,
    columns: 4,
  },
};

// Different column layouts
export const OneColumn = {
  args: {
    stats: sampleStats.slice(0, 3),
    columns: 1,
  },
};

export const TwoColumns = {
  args: {
    stats: sampleStats,
    columns: 2,
  },
};

export const ThreeColumns = {
  args: {
    stats: sampleStats.slice(0, 3),
    columns: 3,
  },
};

export const FourColumns = {
  args: {
    stats: sampleStats,
    columns: 4,
  },
};

// Healthcare dashboard
export const HealthcareDashboard = {
  args: {
    stats: healthcareStats,
    columns: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Healthcare-focused statistics grid showing medical program metrics.',
      },
    },
  },
};

// NGO impact overview
export const NGOImpactOverview = {
  args: {
    stats: [
      {
        id: 1,
        title: 'Lives Impacted',
        value: '50,000+',
        subtitle: 'Since 2020',
        icon: 'heart',
        variant: 'primary'
      },
      {
        id: 2,
        title: 'Communities Served',
        value: '200+',
        subtitle: 'Across West Africa',
        icon: 'globe',
        variant: 'success'
      },
      {
        id: 3,
        title: 'Healthcare Workers',
        value: '150',
        subtitle: 'Trained professionals',
        icon: 'users',
        variant: 'info'
      }
    ],
    columns: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'High-level impact statistics for NGO overview pages.',
      },
    },
  },
};

// Financial overview
export const FinancialOverview = {
  args: {
    stats: [
      {
        id: 1,
        title: 'Total Raised',
        value: '$2.8M',
        subtitle: 'All time',
        icon: 'star',
        trend: 'up',
        trendValue: '+15%',
        variant: 'success'
      },
      {
        id: 2,
        title: 'This Month',
        value: '$45,230',
        subtitle: 'March 2024',
        icon: 'heart',
        trend: 'up',
        trendValue: '+8%',
        variant: 'primary'
      },
      {
        id: 3,
        title: 'Program Funding',
        value: '85%',
        subtitle: 'Of goal reached',
        icon: 'star',
        trend: 'up',
        trendValue: '+5%',
        variant: 'warning'
      },
      {
        id: 4,
        title: 'Donors',
        value: '1,250',
        subtitle: 'Active supporters',
        icon: 'users',
        trend: 'up',
        trendValue: '+12%'
      }
    ],
    columns: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Financial statistics grid for donation and fundraising overview.',
      },
    },
  },
};

// Volunteer metrics
export const VolunteerMetrics = {
  args: {
    stats: [
      {
        id: 1,
        title: 'Active Volunteers',
        value: '342',
        subtitle: 'Currently active',
        icon: 'users',
        trend: 'up',
        trendValue: '+12%',
        variant: 'success'
      },
      {
        id: 2,
        title: 'Volunteer Hours',
        value: '12,450',
        subtitle: 'This year',
        icon: 'star',
        trend: 'up',
        trendValue: '+25%',
        variant: 'primary'
      },
      {
        id: 3,
        title: 'New Applications',
        value: '89',
        subtitle: 'This month',
        icon: 'users',
        trend: 'up',
        trendValue: '+18%'
      },
      {
        id: 4,
        title: 'Training Sessions',
        value: '24',
        subtitle: 'Completed',
        icon: 'star',
        trend: 'neutral',
        trendValue: '0%'
      }
    ],
    columns: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Volunteer program statistics and metrics.',
      },
    },
  },
};

// Mixed variants showcase
export const MixedVariants = {
  args: {
    stats: [
      {
        id: 1,
        title: 'Successful Projects',
        value: '95%',
        subtitle: 'Completion rate',
        icon: 'star',
        trend: 'up',
        trendValue: '+3%',
        variant: 'success'
      },
      {
        id: 2,
        title: 'Pending Reviews',
        value: '47',
        subtitle: 'Require attention',
        icon: 'star',
        trend: 'up',
        trendValue: '+12%',
        variant: 'warning'
      },
      {
        id: 3,
        title: 'Critical Issues',
        value: '3',
        subtitle: 'Need immediate action',
        icon: 'medical',
        trend: 'down',
        trendValue: '-2',
        variant: 'danger'
      },
      {
        id: 4,
        title: 'New Initiatives',
        value: '8',
        subtitle: 'In planning',
        icon: 'globe',
        variant: 'primary'
      }
    ],
    columns: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Statistics grid showing different variants and status types.',
      },
    },
  },
};

// Responsive behavior
export const ResponsiveBehavior = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">4 Columns (Desktop)</h3>
        <StatsGrid stats={sampleStats} columns={4} />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">3 Columns (Tablet)</h3>
        <div className="max-w-4xl">
          <StatsGrid stats={sampleStats.slice(0, 3)} columns={3} />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">2 Columns (Small Tablet)</h3>
        <div className="max-w-2xl">
          <StatsGrid stats={sampleStats.slice(0, 2)} columns={2} />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">1 Column (Mobile)</h3>
        <div className="max-w-sm">
          <StatsGrid stats={sampleStats.slice(0, 2)} columns={1} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'StatsGrid responsive behavior across different screen sizes.',
      },
    },
  },
};

// Large dataset
export const LargeDataset = {
  args: {
    stats: [
      ...healthcareStats,
      {
        id: 7,
        title: 'Mobile Clinics',
        value: '15',
        subtitle: 'Operating daily',
        icon: 'medical',
        trend: 'up',
        trendValue: '+2',
        variant: 'primary'
      },
      {
        id: 8,
        title: 'Partnerships',
        value: '32',
        subtitle: 'Active collaborations',
        icon: 'globe',
        trend: 'up',
        trendValue: '+5',
        variant: 'success'
      }
    ],
    columns: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'StatsGrid with a larger dataset showing comprehensive metrics.',
      },
    },
  },
};