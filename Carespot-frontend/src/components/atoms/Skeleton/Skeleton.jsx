import PropTypes from 'prop-types';

const Skeleton = ({
  variant = 'text',
  width = '100%',
  height,
  className = '',
  animate = true,
  ...props
}) => {
  const variantClasses = {
    text: 'h-4 rounded',
    title: 'h-6 rounded',
    heading: 'h-8 rounded',
    button: 'h-10 rounded-lg',
    avatar: 'rounded-full',
    card: 'h-48 rounded-lg',
    image: 'rounded-lg',
    circle: 'rounded-full',
    rectangle: 'rounded-lg'
  };

  const variantSizes = {
    text: { width: '100%', height: '1rem' },
    title: { width: '75%', height: '1.5rem' },
    heading: { width: '50%', height: '2rem' },
    button: { width: '120px', height: '2.5rem' },
    avatar: { width: '3rem', height: '3rem' },
    card: { width: '100%', height: '12rem' },
    image: { width: '100%', height: '8rem' },
    circle: { width: '2rem', height: '2rem' },
    rectangle: { width: '100%', height: '4rem' }
  };

  const defaultSize = variantSizes[variant] || {};
  const finalWidth = width || defaultSize.width;
  const finalHeight = height || defaultSize.height;

  const animationClass = animate ? 'animate-pulse' : '';

  return (
    <div
      className={`bg-gray-200 ${variantClasses[variant]} ${animationClass} ${className}`}
      style={{
        width: finalWidth,
        height: finalHeight
      }}
      {...props}
    />
  );
};

// Skeleton presets for common UI patterns
export const SkeletonCard = ({ className = '', ...props }) => (
  <div className={`p-4 border border-gray-200 rounded-lg ${className}`} {...props}>
    <Skeleton variant="image" className="mb-4" />
    <Skeleton variant="title" className="mb-2" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" width="60%" />
  </div>
);

export const SkeletonProfile = ({ className = '', ...props }) => (
  <div className={`flex items-center space-x-4 ${className}`} {...props}>
    <Skeleton variant="avatar" />
    <div className="flex-1">
      <Skeleton variant="title" className="mb-2" />
      <Skeleton variant="text" width="80%" />
    </div>
  </div>
);

export const SkeletonStats = ({ className = '', ...props }) => (
  <div className={`text-center ${className}`} {...props}>
    <Skeleton variant="heading" className="mb-2 mx-auto" width="120px" />
    <Skeleton variant="text" className="mx-auto" width="150px" />
  </div>
);

export const SkeletonList = ({ items = 3, className = '', ...props }) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <Skeleton variant="circle" />
        <div className="flex-1">
          <Skeleton variant="text" className="mb-1" />
          <Skeleton variant="text" width="70%" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4, className = '', ...props }) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {/* Header */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={`header-${index}`} variant="text" height="1.25rem" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" />
        ))}
      </div>
    ))}
  </div>
);

Skeleton.propTypes = {
  variant: PropTypes.oneOf([
    'text', 'title', 'heading', 'button', 'avatar', 'card', 'image', 'circle', 'rectangle'
  ]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  animate: PropTypes.bool
};

SkeletonCard.propTypes = {
  className: PropTypes.string
};

SkeletonProfile.propTypes = {
  className: PropTypes.string
};

SkeletonStats.propTypes = {
  className: PropTypes.string
};

SkeletonList.propTypes = {
  items: PropTypes.number,
  className: PropTypes.string
};

SkeletonTable.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
  className: PropTypes.string
};

export default Skeleton;