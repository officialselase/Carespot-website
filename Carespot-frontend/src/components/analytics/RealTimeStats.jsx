import React from 'react';
import PropTypes from 'prop-types';
import AnimatedCounter from '../atoms/AnimatedCounter/AnimatedCounter';
import StatCard from '../molecules/StatCard/StatCard';

const RealTimeStats = ({ data }) => {
  const stats = [
    {
      id: 'donations',
      title: 'Total Donations',
      value: data.totalDonations,
      prefix: '$',
      icon: 'fas fa-heart',
      variant: 'primary',
      trend: 'up',
      trendValue: `+${data.monthlyGrowth}%`,
      subtitle: 'This month'
    },
    {
      id: 'volunteers',
      title: 'Active Volunteers',
      value: data.totalVolunteers,
      icon: 'fas fa-users',
      variant: 'success',
      trend: 'up',
      trendValue: '+12%',
      subtitle: 'Registered'
    },
    {
      id: 'impact',
      title: 'People Helped',
      value: data.peopleHelped,
      icon: 'fas fa-hands-helping',
      variant: 'warning',
      trend: 'up',
      trendValue: '+8%',
      subtitle: 'Lives impacted'
    },
    {
      id: 'projects',
      title: 'Projects Completed',
      value: data.projectsCompleted,
      icon: 'fas fa-check-circle',
      variant: 'default',
      trend: 'neutral',
      trendValue: `${data.activeProjects} active`,
      subtitle: 'Total completed'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-color-text-primary">
          Real-Time Impact Statistics
        </h3>
        <div className="flex items-center gap-2 text-sm text-color-text-secondary">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Updated live</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.variant === 'primary' ? 'bg-red-100 text-red-600' :
                stat.variant === 'success' ? 'bg-green-100 text-green-600' :
                stat.variant === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <i className={`${stat.icon} text-lg`}></i>
              </div>
              
              {stat.trend && (
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-600' :
                  stat.trend === 'down' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {stat.trend === 'up' && <i className="fas fa-arrow-up"></i>}
                  {stat.trend === 'down' && <i className="fas fa-arrow-down"></i>}
                  {stat.trend === 'neutral' && <i className="fas fa-minus"></i>}
                  <span>{stat.trendValue}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <AnimatedCounter
                target={stat.value}
                prefix={stat.prefix || ''}
                className="text-2xl font-bold text-color-text-primary"
                duration={2000}
                delay={200}
              />
              <h4 className="font-semibold text-color-text-primary">
                {stat.title}
              </h4>
              <p className="text-sm text-color-text-secondary">
                {stat.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Monthly Growth</h4>
            <i className="fas fa-chart-line text-red-200"></i>
          </div>
          <AnimatedCounter
            target={data.monthlyGrowth}
            suffix="%"
            decimals={1}
            className="text-3xl font-bold text-white"
            duration={2500}
            delay={400}
          />
          <p className="text-red-100 text-sm mt-2">
            Compared to last month
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Active Projects</h4>
            <i className="fas fa-project-diagram text-blue-200"></i>
          </div>
          <AnimatedCounter
            target={data.activeProjects}
            className="text-3xl font-bold text-white"
            duration={2500}
            delay={600}
          />
          <p className="text-blue-100 text-sm mt-2">
            Currently running
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Impact Score</h4>
            <i className="fas fa-star text-green-200"></i>
          </div>
          <AnimatedCounter
            target={95.8}
            suffix="/100"
            decimals={1}
            className="text-3xl font-bold text-white"
            duration={2500}
            delay={800}
          />
          <p className="text-green-100 text-sm mt-2">
            Community satisfaction
          </p>
        </div>
      </div>
    </div>
  );
};

RealTimeStats.propTypes = {
  data: PropTypes.shape({
    totalDonations: PropTypes.number.isRequired,
    totalVolunteers: PropTypes.number.isRequired,
    peopleHelped: PropTypes.number.isRequired,
    projectsCompleted: PropTypes.number.isRequired,
    activeProjects: PropTypes.number.isRequired,
    monthlyGrowth: PropTypes.number.isRequired,
  }).isRequired,
};

export default RealTimeStats;