import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import UserProfile from '../../molecules/UserProfile';

const Header = ({
  logo,
  navigation = [],
  user,
  onMenuToggle,
  className = '',
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuToggle) {
      onMenuToggle(!isMobileMenuOpen);
    }
  };
  
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo ? (
              <img className="h-8 w-auto" src={logo.src} alt={logo.alt} />
            ) : (
              <div className="text-xl font-bold text-primary-600">
                CareSpot
              </div>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Right side */}
          <div className="flex items-center gap-4">
            {user ? (
              <UserProfile user={user} size="small" />
            ) : (
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" size="small">
                  Sign In
                </Button>
                <Button variant="primary" size="small">
                  Donate
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="small"
              className="md:hidden"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <Icon name="menu" size="medium" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              
              {!user && (
                <div className="flex flex-col gap-2 px-3 pt-4 border-t border-gray-200">
                  <Button variant="ghost" size="medium" className="justify-start">
                    Sign In
                  </Button>
                  <Button variant="primary" size="medium">
                    Donate
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ),
  user: PropTypes.object,
  onMenuToggle: PropTypes.func,
  className: PropTypes.string
};

export default Header;