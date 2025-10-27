import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../atoms/Icon';

const Breadcrumb = ({
  items = [],
  separator = 'chevron-right',
  className = '',
  showHome = true,
  onNavigate,
  ...props
}) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const allItems = showHome 
      ? [{ label: 'Home', href: '/', current: false }, ...items]
      : items;
    
    // Mark the last item as current
    const updatedItems = allItems.map((item, index) => ({
      ...item,
      current: index === allItems.length - 1
    }));
    
    setBreadcrumbItems(updatedItems);
  }, [items, showHome]);

  const handleClick = (e, item) => {
    if (item.current) {
      e.preventDefault();
      return;
    }
    
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item);
    }
  };

  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? `${window.location.origin}${item.href}` : undefined
      }))
    };

    return JSON.stringify(structuredData);
  };

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
      />
      
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-1 text-sm ${className}`}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon
                  name={separator}
                  size="small"
                  className="text-color-text-tertiary mx-2"
                  aria-hidden="true"
                />
              )}
              
              {item.current ? (
                <span
                  className="text-color-text-primary font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className="text-color-text-secondary hover:text-color-interactive-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-color-interactive-primary focus:ring-offset-2 rounded-sm"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      current: PropTypes.bool
    })
  ),
  separator: PropTypes.string,
  className: PropTypes.string,
  showHome: PropTypes.bool,
  onNavigate: PropTypes.func
};

export default Breadcrumb;