import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AnimatedCounter from '../atoms/AnimatedCounter/AnimatedCounter';

const VolunteerMetrics = ({ data, compact = false }) => {
  const [viewMode, setViewMode] = useState('overview'); // overview, skills, engagement

  const renderSkillsDistribution = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-color-text-primary">Skills Distribution</h4>
      <div className="space-y-3">
        {data.skillDistribution.map((skill, index) => {
          const percentage = (skill.count / data.totalActive) * 100;
          return (
            <div key={skill.skill} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-color-text-primary">
                  {skill.skill}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-color-text-secondary">
                    {skill.count} volunteers
                  </span>
                  <span className="text-xs text-color-text-secondary">
                    ({percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-yellow-500' :
                    index === 3 ? 'bg-red-500' :
                    index === 4 ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`}
                  style={{ 
                    width: `${percentage}%`,
                    animationDelay: `${index * 150}ms`
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderEngagementLevels = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-color-text-primary">Engagement Levels</h4>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-fire text-white"></i>
          </div>
          <AnimatedCounter
            target={data.engagement.high}
            className="text-xl font-bold text-green-600"
            duration={1500}
          />
          <p className="text-xs text-green-600 font-medium">High Engagement</p>
          <p className="text-xs text-color-text-secondary mt-1">
            20+ hours/month
          </p>
        </div>

        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-clock text-white"></i>
          </div>
          <AnimatedCounter
            target={data.engagement.medium}
            className="text-xl font-bold text-yellow-600"
            duration={1500}
          />
          <p className="text-xs text-yellow-600 font-medium">Medium Engagement</p>
          <p className="text-xs text-color-text-secondary mt-1">
            10-20 hours/month
          </p>
        </div>

        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-battery-quarter text-white"></i>
          </div>
          <AnimatedCounter
            target={data.engagement.low}
            className="text-xl font-bold text-red-600"
            duration={1500}
          />
          <p className="text-xs text-red-600 font-medium">Low Engagement</p>
          <p className="text-xs text-color-text-secondary mt-1">
            &lt;10 hours/month
          </p>
        </div>
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-color-text-primary">
            Volunteer Metrics
          </h3>
          <i className="fas fa-users text-blue-500"></i>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <AnimatedCounter
              target={data.totalActive}
              className="text-2xl font-bold text-color-text-primary"
              duration={2000}
            />
            <p className="text-sm text-color-text-secondary">Active Volunteers</p>
          </div>
          <div className="text-center">
            <AnimatedCounter
              target={data.retentionRate}
              suffix="%"
              decimals={1}
              className="text-2xl font-bold text-color-text-primary"
              duration={2000}
            />
            <p className="text-sm text-color-text-secondary">Retention Rate</p>
          </div>
        </div>
        
        <div className="h-32">
          {renderEngagementLevels()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h3 className="text-xl font-bold text-color-text-primary">
          Volunteer Metrics & Engagement
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-color-text-secondary">View:</span>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="overview">Overview</option>
            <option value="skills">Skills Analysis</option>
            <option value="engagement">Engagement Tracking</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-color-text-secondary">Active Volunteers</h4>
            <i className="fas fa-users text-blue-500"></i>
          </div>
          <AnimatedCounter
            target={data.totalActive}
            className="text-2xl font-bold text-color-text-primary"
            duration={2000}
          />
          <p className="text-xs text-green-600 mt-1">
            <i className="fas fa-arrow-up mr-1"></i>
            +{data.newThisMonth} this month
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-color-text-secondary">Retention Rate</h4>
            <i className="fas fa-heart text-red-500"></i>
          </div>
          <AnimatedCounter
            target={data.retentionRate}
            suffix="%"
            decimals={1}
            className="text-2xl font-bold text-color-text-primary"
            duration={2000}
          />
          <p className="text-xs text-red-600 mt-1">
            Above industry average
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-color-text-secondary">Avg Hours/Month</h4>
            <i className="fas fa-clock text-yellow-500"></i>
          </div>
          <AnimatedCounter
            target={data.averageHours}
            decimals={1}
            className="text-2xl font-bold text-color-text-primary"
            duration={2000}
          />
          <p className="text-xs text-yellow-600 mt-1">
            Per volunteer
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-color-text-secondary">New This Month</h4>
            <i className="fas fa-user-plus text-green-500"></i>
          </div>
          <AnimatedCounter
            target={data.newThisMonth}
            className="text-2xl font-bold text-color-text-primary"
            duration={2000}
          />
          <p className="text-xs text-green-600 mt-1">
            New registrations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {viewMode === 'overview' && renderEngagementLevels()}
          {viewMode === 'skills' && renderSkillsDistribution()}
          {viewMode === 'engagement' && (
            <div className="space-y-6">
              <h4 className="font-semibold text-color-text-primary">Engagement Tracking</h4>
              
              {/* Engagement Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">High Engagement</span>
                  </div>
                  <span className="text-sm text-green-600">{data.engagement.high} volunteers</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-800">Medium Engagement</span>
                  </div>
                  <span className="text-sm text-yellow-600">{data.engagement.medium} volunteers</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-800">Low Engagement</span>
                  </div>
                  <span className="text-sm text-red-600">{data.engagement.low} volunteers</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-color-text-primary mb-4">
            Volunteer Insights
          </h4>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-trophy text-blue-600"></i>
                <div>
                  <p className="font-medium text-blue-800">Top Skill</p>
                  <p className="text-sm text-blue-600">
                    {data.skillDistribution[0].skill} has {data.skillDistribution[0].count} volunteers
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-chart-line text-green-600"></i>
                <div>
                  <p className="font-medium text-green-800">Growth Rate</p>
                  <p className="text-sm text-green-600">
                    {data.newThisMonth} new volunteers joined this month
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-handshake text-yellow-600"></i>
                <div>
                  <p className="font-medium text-yellow-800">Retention</p>
                  <p className="text-sm text-yellow-600">
                    {data.retentionRate}% of volunteers stay active for 6+ months
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-clock text-purple-600"></i>
                <div>
                  <p className="font-medium text-purple-800">Commitment</p>
                  <p className="text-sm text-purple-600">
                    Average {data.averageHours} hours per volunteer monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      {viewMode === 'overview' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {renderSkillsDistribution()}
        </div>
      )}
    </div>
  );
};

VolunteerMetrics.propTypes = {
  data: PropTypes.shape({
    totalActive: PropTypes.number.isRequired,
    newThisMonth: PropTypes.number.isRequired,
    retentionRate: PropTypes.number.isRequired,
    averageHours: PropTypes.number.isRequired,
    skillDistribution: PropTypes.arrayOf(
      PropTypes.shape({
        skill: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
    engagement: PropTypes.shape({
      high: PropTypes.number.isRequired,
      medium: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  compact: PropTypes.bool,
};

export default VolunteerMetrics;