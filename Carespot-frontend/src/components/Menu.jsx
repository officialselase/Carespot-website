// src/components/Menu.jsx

import React, { useState } from "react";

const Menu = ({ navigateTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavLinkClick = (page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="Carespot logo - IG.jpg"
            alt="Carespot Logo"
            className="h-12 mr-3 rounded-full"
          />
          <span className="text-2xl font-bold text-blue-600">CareSpot</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => handleNavLinkClick("Home")}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
          >
            Home
          </button>
          <div className="relative group">
            <button className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 focus:outline-none">
              Who We Are <span className="ml-1">&#9662;</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-48 py-2 z-10">
              <button
                onClick={() => handleNavLinkClick("About")}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                About Us
              </button>
              {/* Assuming Mission & Vision is a section within About, or a sub-page */}
              <button
                onClick={() => handleNavLinkClick("About")}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Mission & Vision
              </button>
            </div>
          </div>
          <button
            onClick={() => handleNavLinkClick("CareSpotGhana")}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
          >
            CareSpot – Ghana
          </button>
          <button
            onClick={() => handleNavLinkClick("Projects")}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
          >
            Projects
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
            <button
              onClick={() => handleNavLinkClick("About")}
              className="block text-gray-800 hover:text-blue-600 font-medium"
            >
              Who We Are
            </button>
            <button
              onClick={() => handleNavLinkClick("CareSpotGhana")}
              className="block text-gray-800 hover:text-blue-600 font-medium"
            >
              CareSpot – Ghana
            </button>
            <button
              onClick={() => handleNavLinkClick("Projects")}
              className="block text-gray-800 hover:text-blue-600 font-medium"
            >
              Projects
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
