import StatCard from './StatCard';

export default {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'StatCard component for displaying key metrics and statistics with optional icons, trends, and variants.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Title/label for the statistic',
    },
    value: {
      control: { type: 'text' },
      description: 'The main statistic value',
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Optional subtitle or description',
    },
    icon: {
      control: { type: 'select' },
      options: ['heart', 'users', 'medical', 'globe', 'star'],
      description: 'Optional icon to display',
    },
    trend: {
      control: { type: 'select' },
      options: ['up', 'down', 'neutral'],
      description: 'Trend direction',
    },
    trendValue: {
      control: { type: 'text' },
      description: 'Trend value (e.g., "+12%")',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger'],
      description: 'Visual variant of the card',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// Default story
export const Default = {
  args: {
    title: 'Total Donations',
    value: '$45,230',
    subtitle: 'This month',
  },
};

// With icon
export const WithIcon = {
  args: {
    title: 'People Helped',
    value: '12,450',
    subtitle: 'Across all programs',
    icon: 'users',
  },
};

// With trend
export const WithTrend = {
  args: {
    title: 'Monthly Donations',
    value: '$8,420',
    subtitle: 'March 2024',
    icon: 'heart',
    trend: 'up',
    trendValue: '+15%',
  },
};

// Negative trend
export const NegativeTrend = {
  args: {
    title: 'Volunteer Applications',
    value: '234',
    subtitle: 'This quarter',
    icon: 'users',
    trend: 'down',
    trendValue: '-8%',
  },
};

// Neutral trend
export const NeutralTrend = {
  args: {
    title: 'Active Projects',
    value: '18',
    subtitle: 'Currently running',
    icon: 'globe',
    trend: 'neutral',
    trendValue: '0%',
  },
};

// Variant stories
export const Primary = {
  args: {
    title: 'Healthcare Programs',
    value: '25',
    subtitle: 'Active initiatives',
    icon: 'medical',
    variant: 'primary',
  },
};

export const Success = {
  args: {
    title: 'Goals Achieved',
    value: '92%',
    subtitle: 'This year',
    icon: 'star',
    variant: 'success',
    trend: 'up',
    trendValue: '+5%',
  },
};

export const Warning = {
  args: {
    title: 'Pending Reviews',
    value: '47',
    subtitle: 'Require attention',
    icon: 'star',
    variant: 'warning',
  },
};

export const Danger = {
  args: {
    title: 'Critical Issues',
    value: '3',
    subtitle: 'Need immediate action',
    icon: 'medical',
    variant: 'danger',
  },
};

// All variants showcase
export const AllVariants = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ width: '800px' }}>
      <StatCard
        title="Total Donations"
        value="$45,230"
        subtitle="This month"
        icon="heart"
        variant="default"
      />
      <StatCard
        title="Healthcare Programs"
        value="25"
        subtitle="Active initiatives"
        icon="medical"
        variant="primary"
      />
      <StatCard
        title="Goals Achieved"
        value="92%"
        subtitle="This year"
        icon="star"
        variant="success"
        trend="up"
        trendValue="+5%"
      />
      <StatCard
        title="Pending Reviews"
        value="47"
        subtitle="Require attention"
        icon="users"
        variant="warning"
      />
      <StatCard
        title="Critical Issues"
        value="3"
        subtitle="Need immediate action"
        icon="medical"
        variant="danger"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All StatCard variants displayed together.',
      },
    },
  },
};

// NGO dashboard example
export const NGODashboard = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ width: '1000px' }}>
      <StatCard
        title="Total Donations"
        value="$127,450"
        subtitle="All time"
        icon="heart"
        trend="up"
        trendValue="+23%"
        variant="primary"
      />
      <StatCard
        title="People Served"
        value="15,230"
        subtitle="This year"
        icon="users"
        trend="up"
        trendValue="+18%"
        variant="success"
      />
      <StatCard
        title="Active Volunteers"
        value="342"
        subtitle="Currently active"
        icon="users"
        trend="up"
        trendValue="+12%"
      />
      <StatCard
        title="Healthcare Programs"
        value="28"
        subtitle="Running programs"
        icon="medical"
        trend="neutral"
        trendValue="0%"
      />
      <StatCard
        title="Villages Reached"
        value="156"
        subtitle="Across Ghana"
        icon="globe"
        trend="up"
        trendValue="+8%"
      />
      <StatCard
        title="Medical Screenings"
        value="8,420"
        subtitle="This quarter"
        icon="medical"
        trend="up"
        trendValue="+25%"
        variant="success"
      />
      <StatCard
        title="Nutrition Programs"
        value="12"
        subtitle="Active programs"
        icon="heart"
        trend="up"
        trendValue="+3%"
      />
      <StatCard
        title="Community Events"
        value="45"
        subtitle="This month"
        icon="star"
        trend="down"
        trendValue="-5%"
        variant="warning"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of StatCards used in an NGO dashboard context with real-world metrics.',
      },
    },
  },
};

// Large numbers formatting
export const LargeNumbers = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ width: '600px' }}>
      <StatCard
        title="Total Impact"
        value="1.2M"
        subtitle="Lives touched"
        icon="heart"
        variant="primary"
      />
      <StatCard
        title="Funds Raised"
        value="$2.8M"
        subtitle="Since inception"
        icon="star"
        variant="success"
      />
      <StatCard
        title="Global Reach"
        value="50K+"
        subtitle="Communities served"
        icon="globe"
        variant="default"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of StatCards displaying large numbers with appropriate formatting.',
      },
    },
  },
};