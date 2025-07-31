// src/components/Menu.jsx

import React, { useState, useRef } from "react"; // Import useRef

const Menu = ({ navigateTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWhoWeAreDropdownOpen, setIsWhoWeAreDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null); // Ref to store the timeout ID

  const handleNavLinkClick = (page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
    setIsWhoWeAreDropdownOpen(false); // Close desktop dropdown after navigation
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo - Navigates to Home */}
        <button
          onClick={() => handleNavLinkClick("Home")}
          className="flex items-center focus:outline-none"
        >
          <img
            src="/logo1.png"
            alt="Carespot Logo"
            className="h-16 mr-3 rounded-full"
          />
          <span className="text-2xl font-bold text-blue-600">CareSpot</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => handleNavLinkClick("Home")}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
          >
            Home
          </button>

          {/* Who We Are Dropdown - Modified for better reactivity */}
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter} // Use new handler
            onMouseLeave={handleMouseLeave} // Use new handler
          >
            <button
              onClick={() => handleNavLinkClick("About")} // Main "Who We Are" button navigates to AboutPage
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 focus:outline-none flex items-center"
            >
              Who We Are
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
              <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48 py-2 z-10">
                {/* Only CareSpot – Ghana in dropdown */}
                <button
                  onClick={() => handleNavLinkClick("CareSpotGhana")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  CareSpot – Ghana
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavLinkClick("Projects")}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavLinkClick("Contact")}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
          >
            Contact Us
          </button>
          <button
            onClick={() => handleNavLinkClick("Donate")}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            Donate
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 focus:outline-none"
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => handleNavLinkClick("Home")}
              className="block text-gray-800 hover:text-blue-600 font-medium"
            >
              Home
            </button>
            {/* Mobile Who We Are - Modified */}
            <button
              onClick={() => handleNavLinkClick("About")}
              className="block text-gray-800 hover:text-blue-600 font-medium"
            >
              Who We Are
            </button>
            <button
              onClick={() => handleNavLinkClick("CareSpotGhana")}
              className="block text-gray-800 hover:text-blue-600 pl-8 font-medium"
            >
              {" "}
              &mdash; CareSpot – Ghana
            </button>{" "}
            {/* Indent for sub-item clarity */}
            <button
              onClick={() => handleNavLinkClick("Projects")}
              className="block text-gray-800 hover:text-blue-600 font-medium"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavLinkClick("Contact")}
              className="block text-gray-800 hover:text-blue-600 font-medium"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavLinkClick("Donate")}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
              Donate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Menu;
