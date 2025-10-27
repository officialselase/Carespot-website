import AnimatedCounter from './AnimatedCounter';

export default {
  title: 'Atoms/AnimatedCounter',
  component: AnimatedCounter,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'white'],
    },
  },
};

export const Default = {
  args: {
    target: 11880,
    suffix: '+',
    duration: 2000,
  },
};

export const DollarAmount = {
  args: {
    target: 11880,
    prefix: '$',
    duration: 2500,
    size: 'large',
    color: 'accent',
  },
};

export const Percentage = {
  args: {
    target: 85.5,
    suffix: '%',
    decimals: 1,
    duration: 2000,
    size: 'medium',
    color: 'success',
  },
};

export const LargeNumber = {
  args: {
    target: 2050,
    suffix: '+',
    size: 'xlarge',
    color: 'primary',
    duration: 3000,
  },
};

export const WithDelay = {
  args: {
    target: 500,
    suffix: ' volunteers',
    delay: 1000,
    duration: 2000,
    size: 'medium',
  },
};

export const ImpactStats = () => (
  <div className="bg-gradient-to-r from-red-600 to-blue-600 p-8 rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
      <div>
        <AnimatedCounter
          target={11880}
          prefix="$"
          size="large"
          color="white"
          duration={2000}
        />
        <p className="text-blue-200 mt-2">Dollars Raised</p>
      </div>
      <div>
        <AnimatedCounter
          target={10}
          size="large"
          color="white"
          duration={2000}
          delay={500}
        />
        <p className="text-blue-200 mt-2">Communities Reached</p>
      </div>
      <div>
        <AnimatedCounter
          target={2050}
          suffix="+"
          size="large"
          color="white"
          duration={2000}
          delay={1000}
        />
        <p className="text-blue-200 mt-2">Children Helped</p>
      </div>
    </div>
  </div>
);