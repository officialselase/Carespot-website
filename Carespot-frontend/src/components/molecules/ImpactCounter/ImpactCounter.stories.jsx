import ImpactCounter from './ImpactCounter';

export default {
  title: 'Molecules/ImpactCounter',
  component: ImpactCounter,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'success', 'info', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
    },
  },
};

export const Default = {
  args: {
    value: 11880,
    label: 'Dollars Raised',
    description: 'Supporting communities across Ghana',
    icon: 'currency-dollar',
    prefix: '$',
    color: 'primary',
  },
};

export const CommunitiesReached = {
  args: {
    value: 10,
    label: 'Communities Reached',
    description: 'Orphanages and underserved areas',
    icon: 'home',
    color: 'info',
  },
};

export const ChildrenHelped = {
  args: {
    value: 2050,
    label: 'Children Helped',
    description: 'Lives transformed through our programs',
    icon: 'heart',
    suffix: '+',
    color: 'success',
  },
};

export const VolunteersActive = {
  args: {
    value: 150,
    label: 'Active Volunteers',
    description: 'Dedicated individuals making a difference',
    icon: 'users',
    suffix: '+',
    color: 'warning',
  },
};

export const Sizes = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ImpactCounter
      value={1000}
      label="Small Counter"
      description="This is a small impact counter"
      icon="star"
      size="small"
      color="primary"
    />
    <ImpactCounter
      value={5000}
      label="Medium Counter"
      description="This is a medium impact counter"
      icon="star"
      size="medium"
      color="success"
    />
    <ImpactCounter
      value={10000}
      label="Large Counter"
      description="This is a large impact counter"
      icon="star"
      size="large"
      color="info"
    />
    <ImpactCounter
      value={25000}
      label="XLarge Counter"
      description="This is an extra large impact counter"
      icon="star"
      size="xlarge"
      color="warning"
    />
  </div>
);

export const CareSpotStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <ImpactCounter
      value={11880}
      label="Dollars Raised"
      description="Supporting communities across Ghana"
      icon="currency-dollar"
      prefix="$"
      color="primary"
      delay={0}
    />
    <ImpactCounter
      value={10}
      label="Communities Reached"
      description="Orphanages and underserved areas"
      icon="home"
      color="info"
      delay={500}
    />
    <ImpactCounter
      value={2050}
      label="Children Helped"
      description="Lives transformed through our programs"
      icon="heart"
      suffix="+"
      color="success"
      delay={1000}
    />
  </div>
);

export const WithoutIcon = {
  args: {
    value: 95.5,
    label: 'Success Rate',
    description: 'Percentage of successful interventions',
    suffix: '%',
    color: 'success',
  },
};

export const LargeNumbers = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ImpactCounter
      value={1250000}
      label="Total Impact"
      description="Lives touched through our initiatives"
      icon="globe"
      prefix="$"
      color="primary"
      size="large"
    />
    <ImpactCounter
      value={50000}
      label="Meals Provided"
      description="Nutritional support delivered"
      icon="cake"
      suffix="+"
      color="warning"
      size="large"
    />
  </div>
);