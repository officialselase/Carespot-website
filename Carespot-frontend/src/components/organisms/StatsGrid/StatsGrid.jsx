import React from 'react';
import PropTypes from 'prop-types';
import StatCard from '../../molecules/StatCard';

const StatsGrid = ({
  stats = [],
  columns = 4,
  className = '',
  ...props
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };
  
  return (
    <div
      className={`grid gap-6 ${gridClasses[columns]} ${className}`}
      {...props}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.id || index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          trend={stat.trend}
          trendValue={stat.trendValue}
          variant={stat.variant}
        />
      ))}
    </div>
  );
};

StatsGrid.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      subtitle: PropTypes.string,
      icon: PropTypes.string,
      trend: PropTypes.oneOf(['up', 'down', 'neutral']),
      trendValue: PropTypes.string,
      variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger'])
    })
  ),
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  className: PropTypes.string
};

export default StatsGrid;