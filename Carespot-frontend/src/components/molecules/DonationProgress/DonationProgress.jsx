import PropTypes from 'prop-types';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import AnimatedCounter from '../../atoms/AnimatedCounter/AnimatedCounter';
import Button from '../../atoms/Button';

const DonationProgress = ({
  campaigns = [],
  title = 'Active Fundraising Campaigns',
  subtitle,
  showDonateButton = true,
  onDonate,
  className = '',
  ...props
}) => {
  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.current, 0);
  const totalTarget = campaigns.reduce((sum, campaign) => sum + campaign.target, 0);
  const overallPercentage = totalTarget > 0 ? (totalRaised / totalTarget) * 100 : 0;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`} {...props}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        )}
      </div>

      {/* Overall Progress */}
      <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-xl border border-red-100">
        <div className="text-center mb-4">
          <div className="flex justify-center items-baseline gap-2 mb-2">
            <AnimatedCounter
              target={totalRaised}
              prefix="$"
              size="large"
              color="accent"
              className="text-red-600"
            />
            <span className="text-gray-500 text-xl">of</span>
            <span className="text-2xl font-bold text-gray-700">
              ${totalTarget.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-600 font-medium">Total Raised Across All Campaigns</p>
        </div>
        
        <ProgressBar
          current={totalRaised}
          target={totalTarget}
          color="primary"
          size="large"
          showAmount={false}
          animated={true}
          className="mb-4"
        />
        
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-700">
            {Math.round(overallPercentage)}% Complete
          </span>
        </div>
      </div>

      {/* Individual Campaigns */}
      <div className="space-y-6">
        {campaigns.map((campaign, index) => (
          <div
            key={campaign.id || index}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {campaign.title}
                </h3>
                {campaign.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {campaign.description}
                  </p>
                )}
              </div>
              {campaign.urgent && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                  Urgent
                </span>
              )}
            </div>

            <ProgressBar
              current={campaign.current}
              target={campaign.target}
              color={campaign.urgent ? 'danger' : campaign.color || 'primary'}
              size="medium"
              animated={true}
              className="mb-3"
            />

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                {campaign.donors || 0} donors
              </span>
              {campaign.deadline && (
                <span className="text-gray-500">
                  Ends: {new Date(campaign.deadline).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      {showDonateButton && (
        <div className="mt-8 text-center">
          <Button
            onClick={onDonate}
            variant="primary"
            size="large"
            className="px-8 py-3 text-lg font-semibold"
          >
            Support Our Cause
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Every donation makes a difference in someone's life
          </p>
        </div>
      )}

      {/* Impact Statement */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {campaigns.filter(c => (c.current / c.target) >= 1).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {campaigns.filter(c => (c.current / c.target) >= 0.5 && (c.current / c.target) < 1).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {campaigns.filter(c => c.urgent).length}
            </div>
            <div className="text-sm text-gray-600">Urgent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

DonationProgress.propTypes = {
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      current: PropTypes.number.isRequired,
      target: PropTypes.number.isRequired,
      donors: PropTypes.number,
      deadline: PropTypes.string,
      urgent: PropTypes.bool,
      color: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'info'])
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showDonateButton: PropTypes.bool,
  onDonate: PropTypes.func,
  className: PropTypes.string
};

export default DonationProgress;