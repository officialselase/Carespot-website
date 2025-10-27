import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AnimatedCounter from '../atoms/AnimatedCounter/AnimatedCounter';

const DonationAnalytics = ({ data, compact = false }) => {
  const [chartType, setChartType] = useState('trend'); // trend, category, comparison
  const [timeRange, setTimeRange] = useState('6months');

  const totalDonations = data.monthly.reduce((sum, month) => sum + month.amount, 0);
  const totalDonors = data.monthly.reduce((sum, month) => sum + month.donors, 0);
  const averageDonation = totalDonations / totalDonors;
  const monthlyGrowth = data.monthly.length > 1 
    ? ((data.monthly[data.monthly.length - 1].amount - data.monthly[data.monthly.length - 2].amount) / data.monthly[data.monthly.length - 2].amount) * 100
    : 0;

  const maxAmount = Math.max(...data.monthly.map(m => m.amount));

  const renderTrendChart = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-color-text-primary">Monthly Donation Trends</h4>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="3months">Last 3 months</option>
          <option value="6months">Last 6 months</option>
          <option value="12months">Last 12 months</option>
        </select>
      </div>
      
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between gap-2 px-4 pb-8">
          {data.monthly.map((month, index) => (
            <div key={month.month} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-1000 hover:from-red-600 hover:to-red-500 cursor-pointer relative group"
                style={{ 
                  height: `${(month.amount / maxAmount) * 100}%`,
                  minHeight: '8px',
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${month.amount.toLocaleString()}
                </div>
              </div>
              <div className="mt-2 text-xs text-color-text-secondary font-medium">
                {month.month}
              </div>
              <div className="text-xs text-color-text-secondary">
                {month.donors} donors
              </div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-color-text-secondary py-2">
          <span>${(maxAmount / 1000).toFixed(0)}k</span>
          <span>${(maxAmount / 2000).toFixed(0)}k</span>
          <span>$0</span>
        </div>
      </div>
    </div>
  );

  const renderCategoryChart = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-color-text-primary">Donations by Category</h4>
      <div className="space-y-3">
        {data.categories.map((category, index) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-color-text-primary">
                {category.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-color-text-secondary">
                  ${category.amount.toLocaleString()}
                </span>
                <span className="text-xs text-color-text-secondary">
                  ({category.percentage}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  index === 0 ? 'bg-red-500' :
                  index === 1 ? 'bg-blue-500' :
                  index === 2 ? 'bg-green-500' :
                  'bg-yellow-500'
                }`}
                style={{ 
                  width: `${category.percentage}%`,
                  animationDelay: `${index * 200}ms`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-color-text-primary">
            Donation Analytics
          </h3>
          <i className="fas fa-heart text-red-500"></i>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <AnimatedCounter
              target={totalDonations}
              prefix="$"
              className="text-2xl font-bold text-color-text-primary"
              duration={2000}
            />
            <p className="text-sm text-color-text-secondary">Total Raised</p>
          </div>
          <div className="text-center">
            <AnimatedCounter
              target={totalDonors}
              className="text-2xl font-bold text-color-text-primary"
              duration={2000}
            />
            <p className="text-sm text-color-text-secondary">Total Donors</p>
          </div>
        </div>
        
        <div className="h-32">
          {renderTrendChart()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h3 className="text-xl font-bold text-color-text-primary">
          Donation Analytics & Trends
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-color-text-secondary">View:</span>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="trend">Trend Analysis</option>
            <option value="category">By Category</option>
            <option value="comparison">Comparison</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-color-text-secondary">Total Raised</h4>
            <i className="fas fa-dollar-sign text-green-500"></i>
          </div>
          <AnimatedCounter
            target={totalDonations}
            prefix="$"
            className="text-2xl font-bold text-color-text-primary"
            duration={2000}
          />
          <p className="text-xs text-green-600 mt-1">
            <i className="fas fa-arrow-up mr-1"></i>
            +{monthlyGrowth.toFixed(1)}% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-color-text-secondary">Total Donors</h4>
            <i className="fas fa-users text-blue-500"></i>
          </div>
          <AnimatedCounter
            target={totalDonors}
            className="text-2xl font-bold text-color-text-primary"
            duration={2000}
          />
          <p className="text-xs text-blue-600 mt-1">
            Unique contributors
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-color-text-secondary">Average Donation</h4>
            <i className="fas fa-chart-bar text-yellow-500"></i>
          </div>
          <AnimatedCounter
            target={averageDonation}
            prefix="$"
            decimals={0}
            className="text-2xl font-bold text-color-text-primary"
            duration={2000}
          />
          <p className="text-xs text-yellow-600 mt-1">
            Per donor
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-color-text-secondary">Growth Rate</h4>
            <i className="fas fa-trending-up text-red-500"></i>
          </div>
          <AnimatedCounter
            target={monthlyGrowth}
            suffix="%"
            decimals={1}
            className="text-2xl font-bold text-color-text-primary"
            duration={2000}
          />
          <p className="text-xs text-red-600 mt-1">
            Monthly growth
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {chartType === 'trend' && renderTrendChart()}
          {chartType === 'category' && renderCategoryChart()}
          {chartType === 'comparison' && (
            <div className="text-center py-12">
              <i className="fas fa-chart-pie text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500">Comparison view coming soon</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-color-text-primary mb-4">
            Donation Insights
          </h4>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-arrow-up text-green-600"></i>
                <div>
                  <p className="font-medium text-green-800">Strong Growth</p>
                  <p className="text-sm text-green-600">
                    Donations increased by {monthlyGrowth.toFixed(1)}% this month
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-heart text-blue-600"></i>
                <div>
                  <p className="font-medium text-blue-800">Top Category</p>
                  <p className="text-sm text-blue-600">
                    {data.categories[0].name} leads with {data.categories[0].percentage}% of donations
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-star text-yellow-600"></i>
                <div>
                  <p className="font-medium text-yellow-800">Peak Month</p>
                  <p className="text-sm text-yellow-600">
                    {data.monthly.reduce((max, month) => month.amount > max.amount ? month : max).month} had the highest donations
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-users text-red-600"></i>
                <div>
                  <p className="font-medium text-red-800">Donor Engagement</p>
                  <p className="text-sm text-red-600">
                    Average of {(totalDonors / data.monthly.length).toFixed(0)} new donors per month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DonationAnalytics.propTypes = {
  data: PropTypes.shape({
    monthly: PropTypes.arrayOf(
      PropTypes.shape({
        month: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        donors: PropTypes.number.isRequired,
      })
    ).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        percentage: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  compact: PropTypes.bool,
};

export default DonationAnalytics;