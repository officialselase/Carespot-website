// src/components/Menu.jsx

import { useState, useRef } from "react"; // Import useRef
import ThemeToggle from "./ThemeToggle.jsx";
import SkipLink from "./atoms/SkipLink/SkipLink.jsx";
import GlobalSearch from "./molecules/GlobalSearch/GlobalSearch.jsx";
import MobileNavigation from "./organisms/MobileNavigation/MobileNavigation.jsx";

const Menu = ({ navigateTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWhoWeAreDropdownOpen, setIsWhoWeAreDropdownOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isVolunteerDropdownOpen, setIsVolunteerDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null); // Ref to store the timeout ID

  const handleNavLinkClick = (page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
    setIsWhoWeAreDropdownOpen(false); // Close desktop dropdown after navigation
    setIsProjectsDropdownOpen(false); // Close projects dropdown after navigation
    setIsVolunteerDropdownOpen(false); // Close volunteer dropdown after navigation
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current); // Clear any pending close timeouts
    }
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current); // Clear any pending close timeouts
    }
    setIsWhoWeAreDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown after a short delay
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsWhoWeAreDropdownOpen(false);
    }, 200); // 200ms delay
  };

  return (
    <>
      {/* Skip Links for Accessibility */}
      <SkipLink href="#main-content" />
      <SkipLink 
        href="#navigation" 
        className="top-0 left-32"
        children="Skip to navigation"
      />
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-color-bg-primary/95 backdrop-blur-md shadow-lg border-b border-color-border-primary">
        <nav 
          id="navigation"
          className="container-custom py-4 flex justify-between items-center"
          role="navigation"
          aria-label="Main navigation"
        >
        {/* Logo - Navigates to Home */}
        <button
          onClick={() => handleNavLinkClick("Home")}
          className="flex items-center focus:outline-none group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-lg">CS</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            CareSpot
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Global Search - Desktop */}
          <div className="hidden lg:block">
            <GlobalSearch
              placeholder="Search CareSpot..."
              onSearch={(term, filter, suggestion) => {
                console.log('Search:', { term, filter, suggestion });
                // Handle search functionality here
              }}
              size="small"
              showFilters={false}
              className="w-64"
            />
          </div>
          <button
            onClick={() => handleNavLinkClick("Home")}
            className="text-color-text-primary hover:text-color-interactive-primary font-semibold transition-colors duration-300 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-color-interactive-primary transition-all duration-300 group-hover:w-full"></span>
          </button>

          {/* Who We Are Dropdown - Modified for better reactivity */}
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter} // Use new handler
            onMouseLeave={handleMouseLeave} // Use new handler
          >
            <button
              onClick={() => handleNavLinkClick("About")} // Main "Who We Are" button navigates to AboutPage
              className="text-color-text-primary hover:text-color-interactive-primary font-semibold transition-colors duration-300 focus:outline-none flex items-center relative group"
            >
              Who We Are
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-color-interactive-primary transition-all duration-300 group-hover:w-full"></span>
              <svg
                className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                  isWhoWeAreDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isWhoWeAreDropdownOpen && ( // Render dropdown only if open
              <div className="absolute bg-color-bg-primary shadow-xl rounded-xl mt-2 w-48 py-3 z-10 border border-color-border-primary">
                {/* Only CareSpot – Ghana in dropdown */}
                <button
                  onClick={() => handleNavLinkClick("CareSpotGhana")}
                  className="block w-full text-left px-4 py-3 text-color-text-primary hover:bg-color-bg-secondary hover:text-color-interactive-primary font-medium transition-colors duration-200"
                >
                  CareSpot – Ghana
                </button>
              </div>
            )}
          </div>

          {/* Projects Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsProjectsDropdownOpen(true)}
            onMouseLeave={() => setIsProjectsDropdownOpen(false)}
          >
            <button
              onClick={() => handleNavLinkClick("Projects")}
              className="text-color-text-primary hover:text-color-interactive-primary font-semibold transition-colors duration-300 focus:outline-none flex items-center relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-color-interactive-primary transition-all duration-300 group-hover:w-full"></span>
              <svg
                className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                  isProjectsDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isProjectsDropdownOpen && (
              <div className="absolute bg-color-bg-primary shadow-xl rounded-xl mt-2 w-48 py-3 z-10 border border-color-border-primary">
                <button
                  onClick={() => handleNavLinkClick("RxCare")}
                  className="block w-full text-left px-4 py-3 text-color-text-primary hover:bg-color-bg-secondary hover:text-color-interactive-primary font-medium transition-colors duration-200"
                >
                  RxCare Research
                </button>
              </div>
            )}
          </div>
          {/* Volunteer Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsVolunteerDropdownOpen(true)}
            onMouseLeave={() => setIsVolunteerDropdownOpen(false)}
          >
            <button
              onClick={() => handleNavLinkClick("Volunteer")}
              className="text-color-text-primary hover:text-color-interactive-primary font-semibold transition-colors duration-300 focus:outline-none flex items-center relative group"
            >
              Volunteer
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-color-interactive-primary transition-all duration-300 group-hover:w-full"></span>
              <svg
                className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                  isVolunteerDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isVolunteerDropdownOpen && (
              <div className="absolute bg-color-bg-primary shadow-xl rounded-xl mt-2 w-56 py-3 z-10 border border-color-border-primary">
                <button
                  onClick={() => handleNavLinkClick("VolunteerHub")}
                  className="block w-full text-left px-4 py-3 text-color-text-primary hover:bg-color-bg-secondary hover:text-color-interactive-primary font-medium transition-colors duration-200"
                >
                  Volunteer Hub
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => handleNavLinkClick("Community")}
            className="text-color-text-primary hover:text-color-interactive-primary font-semibold transition-colors duration-300 relative group"
          >
            Community
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-color-interactive-primary transition-all duration-300 group-hover:w-full"></span>
          </button>

          <button
            onClick={() => handleNavLinkClick("Contact")}
            className="text-color-text-primary hover:text-color-interactive-primary font-semibold transition-colors duration-300 relative group"
          >
            Contact Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-color-interactive-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => handleNavLinkClick("Donate")}
            className="btn-primary"
          >
            Donate
          </button>
          <ThemeToggle variant="button" size="sm" showLabels={false} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-color-text-primary focus:outline-none focus:ring-2 focus:ring-color-interactive-primary focus:ring-offset-2 rounded-lg p-2 touch-manipulation"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            style={{ minHeight: '44px', minWidth: '44px' }} // Touch target size
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onToggle={setIsMobileMenuOpen}
        navigation={[
          {
            id: 'home',
            label: 'Home',
            icon: 'home',
            onClick: () => handleNavLinkClick("Home")
          },
          {
            id: 'about',
            label: 'Who We Are',
            icon: 'users',
            onClick: () => handleNavLinkClick("About"),
            children: [
              {
                id: 'carespot-ghana',
                label: 'CareSpot Ghana',
                icon: 'map-pin',
                onClick: () => handleNavLinkClick("CareSpotGhana")
              }
            ]
          },
          {
            id: 'projects',
            label: 'Projects',
            icon: 'folder',
            onClick: () => handleNavLinkClick("Projects"),
            children: [
              {
                id: 'rxcare',
                label: 'RxCare Research',
                icon: 'heart',
                onClick: () => handleNavLinkClick("RxCare")
              }
            ]
          },
          {
            id: 'volunteer',
            label: 'Volunteer',
            icon: 'hand',
            onClick: () => handleNavLinkClick("Volunteer"),
            children: [
              {
                id: 'volunteer-hub',
                label: 'Volunteer Hub',
                icon: 'users',
                onClick: () => handleNavLinkClick("VolunteerHub")
              }
            ]
          },
          {
            id: 'community',
            label: 'Community',
            icon: 'message-circle',
            onClick: () => handleNavLinkClick("Community")
          },
          {
            id: 'contact',
            label: 'Contact Us',
            icon: 'mail',
            onClick: () => handleNavLinkClick("Contact")
          },
          {
            id: 'touch-demo',
            label: 'Touch & Gesture Demo',
            icon: 'smartphone',
            onClick: () => handleNavLinkClick("TouchDemo")
          }
        ]}
        swipeToClose={true}
        position="left"
      />
    </header>
    </>
  );
};

export default Menu;