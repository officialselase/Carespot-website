// src/App.jsx

import React, { useState } from "react";
import Menu from "./components/Menu"; // Import the Menu component
import HomePage from "./pages/HomePage"; // Import the HomePage component
import AboutPage from "./pages/AboutPage"; // Import the AboutPage component
import ProjectsPage from "./pages/ProjectsPage"; // Import the ProjectsPage component
import CareSpotGhanaPage from "./pages/CareSpotGhanaPage";
import ContactPage from "./pages/ContactPage"; // Import the new ContactPage

const App = () => {
  // State to manage the current active page
  const [currentPage, setCurrentPage] = useState("Home"); // Default to 'Home'

  // Function to navigate to a different page
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    // You might want to scroll to the top of the page when navigating
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render the current page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <HomePage navigateTo={navigateTo} />;
      case "About":
        return <AboutPage />;
      case "CareSpotGhana":
        return <CareSpotGhanaPage />; // Render the dedicated CareSpotGhanaPage
      case "Projects":
        return <ProjectsPage />;
      case "Contact":
        return <ContactPage />; // Render the dedicated ContactPage
      case "Donate":
        // Donate page with a consistent hero section
        return (
          <div className="min-h-screen pt-20 flex flex-col bg-gray-50">
            {/* Hero Section for Donate Page */}
            <section
              className="relative py-24 bg-cover bg-center text-white flex items-center justify-center"
              style={{
                backgroundImage: "url('/sedi.jpeg')", // Consistent image
              }}
            >
              <div className="absolute inset-0 bg-rose-900 opacity-70 z-0"></div>{" "}
              {/* Dark rose overlay */}
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                  Support Our Cause
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Your generous contribution helps us continue our vital work in
                  empowering children and transforming communities.
                </p>
              </div>
            </section>

            {/* Main Content Area for Donate */}
            <div className="container mx-auto px-4 py-16 text-center">
              <div className="p-8 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
                <p className="text-xl text-gray-700 mb-10">
                  Every donation, big or small, makes a significant difference.
                </p>
                <button className="bg-rose-600 text-white px-10 py-5 rounded-full text-2xl font-bold hover:bg-rose-700 transition-colors duration-300 shadow-xl transform hover:scale-105">
                  Donate Now
                </button>
                {/* Add more donation form/details here */}
              </div>
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
              <img
                src="/Carespot logo - IG -.jpg" // Corrected image path as per your provided code
                alt="Carespot Logo"
                className="h-12 mr-3 rounded-full"
              />
              <span className="text-2xl font-bold text-blue-600">CareSpot</span>
            </div>
            <p className="text-gray-600 font-bold mb-4">
              Compassion In Action...
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick link</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo("Home")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("About")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Who We Are
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("CareSpotGhana")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  CareSpot – Ghana
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("Projects")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("Contact")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Contact Us
                </button>
              </li>{" "}
              {/* Added Contact Us link */}
              <li>
                <button
                  onClick={() => navigateTo("Donate")}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Donate
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Get in touch
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Oak Villa Estate, House number 41</li>
              <li>Abokobi-Accra, Ghana</li>
              <li>+1 (814) 417-1575</li>
              <li>+233 53 457 5833</li>
              <li>carespotinitiative@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} CareSpot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
