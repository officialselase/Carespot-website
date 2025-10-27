// src/components/molecules/PullToRefresh/PullToRefresh.jsx
import { usePullToRefresh } from '../../../hooks/useTouch';
import Icon from '../../atoms/Icon/Icon';
import PropTypes from 'prop-types';

const PullToRefresh = ({
  onRefresh,
  children,
  threshold = 80,
  className = '',
  refreshingText = 'Refreshing...',
  pullText = 'Pull to refresh',
  releaseText = 'Release to refresh',
  disabled = false,
  ...props
}) => {
  const { containerRef, pullIndicatorRef, isRefreshing } = usePullToRefresh({
    onRefresh,
    threshold,
    enabled: !disabled,
    refreshingText,
    pullText,
    releaseText
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      {...props}
    >
      {/* Pull indicator */}
      <div
        ref={pullIndicatorRef}
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-4 bg-color-bg-primary/95 backdrop-blur-sm border-b border-color-border-primary transform -translate-y-full opacity-0 transition-all duration-200"
        style={{ height: `${threshold}px` }}
      >
        <div className="flex items-center gap-3 text-color-text-secondary">
          <div className={`transition-transform duration-300 ${isRefreshing ? 'animate-spin' : ''}`}>
            <Icon 
              name={isRefreshing ? 'loader' : 'refresh-cw'} 
              size="medium" 
              className="refresh-icon"
            />
          </div>
          <span className="pull-text font-medium">
            {pullText}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

PullToRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  threshold: PropTypes.number,
  className: PropTypes.string,
  refreshingText: PropTypes.string,
  pullText: PropTypes.string,
  releaseText: PropTypes.string,
  disabled: PropTypes.bool
};

export default PullToRefresh;