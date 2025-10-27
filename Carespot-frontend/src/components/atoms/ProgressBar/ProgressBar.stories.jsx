import ProgressBar from './ProgressBar';

export default {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export const Default = {
  args: {
    current: 7500,
    target: 15000,
    label: 'Fundraising Goal',
    animated: true,
  },
};

export const DonationProgress = {
  args: {
    current: 11880,
    target: 20000,
    label: 'Emergency Medical Fund',
    color: 'primary',
    size: 'large',
    animated: true,
  },
};

export const NearComplete = {
  args: {
    current: 18500,
    target: 20000,
    label: 'School Supplies Drive',
    color: 'success',
    animated: true,
  },
};

export const JustStarted = {
  args: {
    current: 1200,
    target: 10000,
    label: 'Clean Water Project',
    color: 'info',
    animated: true,
  },
};

export const Sizes = () => (
  <div className="space-y-6">
    <ProgressBar
      current={5000}
      target={10000}
      label="Small Progress Bar"
      size="small"
      animated={true}
    />
    <ProgressBar
      current={5000}
      target={10000}
      label="Medium Progress Bar"
      size="medium"
      animated={true}
    />
    <ProgressBar
      current={5000}
      target={10000}
      label="Large Progress Bar"
      size="large"
      animated={true}
    />
  </div>
);

export const Colors = () => (
  <div className="space-y-6">
    <ProgressBar
      current={6000}
      target={10000}
      label="Primary Color"
      color="primary"
      animated={true}
    />
    <ProgressBar
      current={8500}
      target={10000}
      label="Success Color"
      color="success"
      animated={true}
    />
    <ProgressBar
      current={3000}
      target={10000}
      label="Warning Color"
      color="warning"
      animated={true}
    />
    <ProgressBar
      current={2000}
      target={10000}
      label="Danger Color"
      color="danger"
      animated={true}
    />
    <ProgressBar
      current={7000}
      target={10000}
      label="Info Color"
      color="info"
      animated={true}
    />
  </div>
);