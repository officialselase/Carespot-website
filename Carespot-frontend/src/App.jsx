// src/App.jsx

import React, { useState } from 'react';
import Menu from './components/Menu'; // Import the Menu component
import HomePage from './pages/Homepage'; // Import the HomePage component
import AboutPage from './pages/AboutPage'; // Import the AboutPage component
import ProjectsPage from './pages/ProjectsPage'; // Import the ProjectsPage component

const App = () => {
  // State to manage the current active page
  const [currentPage, setCurrentPage] = useState('Home'); // Default to 'Home'

  // Function to navigate to a different page
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    // You might want to scroll to the top of the page when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the current page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage navigateTo={navigateTo} />; // Pass navigateTo down to HomePage if it has buttons that change pages
      case 'About':
        return <AboutPage />;
      case 'CareSpotGhana': // Assuming this is also a separate page, or a section within About
        // For simplicity, let's make this also render AboutPage for now
        // You would create a dedicated CareSpotGhanaPage if it's substantial
        return <AboutPage />;
      case 'Projects':
        return <ProjectsPage />;
      case 'Donate':
        // If 'Donate' is a separate page, render it here.
        // If it's a section on HomePage, we might handle it differently.
        // For now, let's treat it as a separate placeholder page.
        return (
          <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg">
              <h1 className="text-4xl font-bold text-rose-600 mb-4">Support Our Cause</h1>
              <p className="text-gray-700 text-lg">
                Thank you for your interest in donating! This will be our dedicated donation page.
              </p>
              {/* Add your donation form/details here */}
            </div>
          </div>
        );
      default:
        return <HomePage navigateTo={navigateTo} />; // Fallback to Home
    }
  };

  return (
    <div className="font-sans antialiased text-gray-800 bg-gray-50">
      {/* Menu Component */}
      <Menu navigateTo={navigateTo} />

      {/* Render the current active page */}
      {renderPage()}

      {/* Footer (remains in App.jsx as it's common to all pages) */}
      <footer className="bg-white text-gray-800 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          {/* About/Logo Section */}
          <div>
            <div className="flex items-center mb-4">
              <img src="Carespot logo - IG.jpg" alt="Carespot Logo" className="h-12 mr-3 rounded-full" />
              <span className="text-2xl font-bold text-blue-600">CareSpot</span>
            </div>
            <p className="text-gray-600 font-bold mb-4">Compassion In Action...</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick link</h3>
            <ul className="space-y-2">
              <li><button onClick={() => navigateTo('Home')} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</button></li>
              <li><button onClick={() => navigateTo('About')} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Who We Are</button></li>
              <li><button onClick={() => navigateTo('CareSpotGhana')} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">CareSpot – Ghana</button></li>
              <li><button onClick={() => navigateTo('Projects')} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Projects</button></li>
              <li><button onClick={() => navigateTo('Donate')} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Donate</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Get in touch</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Kwashiebu, Snowdrop St.</li>
              <li>Accra-Ghana</li>
              <li>+233 50 154 4087</li>
              <li>+233 55 902 2161</li>
              <li>carespotinitiative@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} CareSpot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;