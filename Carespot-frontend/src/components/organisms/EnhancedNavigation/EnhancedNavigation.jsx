import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button/Button.jsx';
import Icon from '../../atoms/Icon/Icon.jsx';
import SkipLink from '../../atoms/SkipLink/SkipLink.jsx';
import GlobalSearch from '../../molecules/GlobalSearch/GlobalSearch.jsx';
import MobileMenu from '../../molecules/MobileMenu/MobileMenu.jsx';
import Breadcrumb from '../../molecules/Breadcrumb/Breadcrumb.jsx';
import { useKeyboardNavigation } from '../../../hooks/useKeyboardNavigation';

const EnhancedNavigation = ({
  logo,
  navigation = [],
  breadcrumbs = [],
  showBreadcrumbs = true,
  showSearch = true,
  showMobileMenu = true,
  user,
  onNavigate,
  onSearch,
  className = '',
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navRef = useRef(null);
  const searchRef = useRef(null);

  // Default navigation items
  const defaultNavigation = [
    {
      label: 'Home',
      href: '/',
      icon: 'home'
    },
    {
      label: 'About Us',
      href: '/about',
      icon: 'users',
      children: [
        { label: 'Our Mission', href: '/about/mission' },
        { label: 'Our Team', href: '/about/team' },
        { label: 'CareSpot Ghana', href: '/about/ghana' }
      ]
    },
    {
      label: 'Projects',
      href: '/projects',
      icon: 'folder',
      children: [
        { label: 'RxCare Research', href: '/projects/rxcare' },
        { label: 'Health Screenings', href: '/projects/health' },
        { label: 'Community Outreach', href: '/projects/community' },
        { label: 'Nutrition Programs', href: '/projects/nutrition' }
      ]
    },
    {
      label: 'Get Involved',
      href: '/get-involved',
      icon: 'hand',
      children: [
        { label: 'Volunteer', href: '/volunteer' },
        { label: 'Partner with Us', href: '/partner' },
        { label: 'Fundraise', href: '/fundraise' }
      ]
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: 'mail'
    }
  ];

  const allNavigation = navigation.length > 0 ? navigation : defaultNavigation;

  // Keyboard navigation setup
  const { containerRef } = useKeyboardNavigation({
    onEscape: () => {
      setActiveDropdown(null);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    },
    trapFocus: isMobileMenuOpen,
    focusableSelector: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle navigation item click
  const handleNavClick = (item, event) => {
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      setActiveDropdown(activeDropdown === item.label ? null : item.label);
    } else {
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
      if (onNavigate) {
        onNavigate(item);
      }
    }
  };

  // Handle search
  const handleSearch = (term, filter, suggestion) => {
    setIsSearchOpen(false);
    if (onSearch) {
      onSearch(term, filter, suggestion);
    }
  };

  // Handle mobile menu toggle
  const handleMobileMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen);
    if (isOpen) {
      setActiveDropdown(null);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Skip Links */}
      <SkipLink href="#main-content" />
      <SkipLink
        href="#navigation"
        className="top-0 left-32"
        children="Skip to navigation"
      />
      {showSearch && (
        <SkipLink
          href="#search"
          className="top-0 left-64"
          children="Skip to search"
        />
      )}

      <header
        ref={containerRef}
        className={`fixed top-0 left-0 right-0 z-40 bg-color-bg-primary/95 backdrop-blur-md shadow-lg border-b border-color-border-primary ${className}`}
        {...props}
      >
        <div className="container-custom">
          {/* Main Navigation Bar */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => onNavigate && onNavigate({ href: '/', label: 'Home' })}
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-color-interactive-primary focus:ring-offset-2 rounded-lg group"
                aria-label="CareSpot Home"
              >
                {logo ? (
                  <img src={logo.src} alt={logo.alt} className="h-10 w-auto" />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">CS</span>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                      CareSpot
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav
              ref={navRef}
              id="navigation"
              className="hidden lg:flex items-center space-x-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {allNavigation.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={(e) => handleNavClick(item, e)}
                    onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                    onMouseLeave={() => item.children && setTimeout(() => setActiveDropdown(null), 150)}
                    className="flex items-center gap-1 text-color-text-primary hover:text-color-interactive-primary font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-color-interactive-primary focus:ring-offset-2 rounded-lg px-2 py-1 relative group"
                    aria-expanded={item.children ? activeDropdown === item.label : undefined}
                    aria-haspopup={item.children ? 'menu' : undefined}
                  >
                    {item.label}
                    {item.children && (
                      <Icon
                        name="chevron-down"
                        size="small"
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : 'rotate-0'
                          }`}
                      />
                    )}
                    <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-color-interactive-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>

                  {/* Dropdown Menu */}
                  {item.children && activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 bg-color-bg-primary border border-color-border-primary rounded-lg shadow-xl z-50"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {item.children.map((child, childIndex) => (
                        <button
                          key={childIndex}
                          onClick={() => {
                            setActiveDropdown(null);
                            if (onNavigate) onNavigate(child);
                          }}
                          className="w-full text-left px-4 py-3 text-color-text-primary hover:bg-color-bg-secondary hover:text-color-interactive-primary transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg focus:outline-none focus:bg-color-bg-secondary focus:text-color-interactive-primary"
                          role="menuitem"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Toggle (Desktop) */}
              {showSearch && (
                <div className="hidden md:block">
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2"
                    aria-label="Toggle search"
                    aria-expanded={isSearchOpen}
                  >
                    <Icon name="search" size="medium" />
                  </Button>
                </div>
              )}

              {/* User Profile or Auth Buttons */}
              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm text-color-text-secondary">
                    Welcome, {user.name}
                  </span>
                  <Button variant="ghost" size="small">
                    <Icon name="user" size="small" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" size="small">
                    Sign In
                  </Button>
                  <Button variant="primary" size="small">
                    Donate
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              {showMobileMenu && (
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => handleMobileMenuToggle(true)}
                  className="lg:hidden p-2"
                  aria-label="Open mobile menu"
                >
                  <Icon name="menu" size="medium" />
                </Button>
              )}
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          {showSearch && isSearchOpen && (
            <div ref={searchRef} className="hidden md:block pb-4 border-t border-color-border-primary pt-4">
              <GlobalSearch
                id="search"
                onSearch={handleSearch}
                placeholder="Search projects, articles, team members..."
                className="max-w-2xl mx-auto"
              />
            </div>
          )}

          {/* Breadcrumbs */}
          {showBreadcrumbs && breadcrumbs.length > 0 && (
            <div className="py-3 border-t border-color-border-primary">
              <Breadcrumb
                items={breadcrumbs}
                onNavigate={onNavigate}
                className="text-sm"
              />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onToggle={handleMobileMenuToggle}
          navigation={allNavigation.map(item => ({
            ...item,
            onClick: onNavigate
          }))}
        />
      )}

      {/* Mobile Search Overlay */}
      {showSearch && isSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50">
          <div className="bg-color-bg-primary p-4">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="small"
                onClick={() => setIsSearchOpen(false)}
                className="p-2"
                aria-label="Close search"
              >
                <Icon name="x" size="medium" />
              </Button>
              <span className="font-semibold text-color-text-primary">Search</span>
            </div>
            <GlobalSearch
              onSearch={handleSearch}
              placeholder="Search..."
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
};

EnhancedNavigation.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.string,
      children: PropTypes.array
    })
  ),
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string
    })
  ),
  showBreadcrumbs: PropTypes.bool,
  showSearch: PropTypes.bool,
  showMobileMenu: PropTypes.bool,
  user: PropTypes.object,
  onNavigate: PropTypes.func,
  onSearch: PropTypes.func,
  className: PropTypes.string
};

export default EnhancedNavigation;