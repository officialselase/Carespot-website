// src/App.jsx

import { useState, Suspense } from "react";
import Menu from "./components/Menu.jsx";

// Lazy load all page components for better performance
import {
  LazyHomePage,
  LazyAboutPage,
  LazyProjectsPage,
  LazyContactPage,
  LazyVolunteerPage,
  LazyVolunteerHubPage,
  LazyDonationPage,
  LazyRxCarePage,
  LazyCommunityPage,
  LazyCareSpotGhanaPage,
  LazyColorShowcase,
  LazyTypographyTestPage,
  LazyInteractiveShowcase,
  LazyNavigationDemoPage,
  LazyTouchDemoPage,
  PageLoadingSkeleton
} from "./utils/lazyLoader.jsx";
import { ToastProvider } from "./components/atoms/Toast/ToastContainer.jsx";
import PWAInstallPrompt from "./components/PWAInstallPrompt.jsx";
import OfflineIndicator from "./components/OfflineIndicator.jsx";
import PerformanceDashboard from "./components/PerformanceDashboard.jsx";
// Initialize theme manager
import "./utils/themeManager.js";

const App = () => {
  // State to manage the current active page
  const [currentPage, setCurrentPage] = useState("Home"); // Default to 'Home'

  // Function to navigate to a different page
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    // You might want to scroll to the top of the page when navigating
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render the current page based on currentPage state with lazy loading
  const renderPage = () => {
    const pageProps = { navigateTo };

    switch (currentPage) {
      case "Home":
        return <LazyHomePage {...pageProps} />;
      case "About":
        return <LazyAboutPage {...pageProps} />;
      case "CareSpotGhana":
        return <LazyCareSpotGhanaPage {...pageProps} />;
      case "Projects":
        return <LazyProjectsPage {...pageProps} />;
      case "Volunteer":
        return <LazyVolunteerPage {...pageProps} />;
      case "VolunteerHub":
        return <LazyVolunteerHubPage {...pageProps} />;
      case "Donate":
        return <LazyDonationPage {...pageProps} />;
      case "RxCare":
        return <LazyRxCarePage {...pageProps} />;
      case "Community":
        return <LazyCommunityPage {...pageProps} />;
      case "Contact":
        return <LazyContactPage {...pageProps} />;
      case "ColorShowcase":
        return <LazyColorShowcase />;
      case "TypographyTest":
        return <LazyTypographyTestPage />;
      case "InteractiveShowcase":
        return <LazyInteractiveShowcase />;
      case "NavigationDemo":
        return <LazyNavigationDemoPage />;
      case "TouchDemo":
        return <LazyTouchDemoPage {...pageProps} />;
      default:
        return <LazyHomePage {...pageProps} />;
    }
  };

  return (
    <ToastProvider position="top-right">
      <div className="min-h-screen bg-color-bg-primary">
        {/* Offline Indicator */}
        <OfflineIndicator />

        {/* Menu Component */}
        <Menu navigateTo={navigateTo} />

        {/* PWA Install Prompt */}
        <PWAInstallPrompt />

        {/* Performance Dashboard (only in development) */}
        <PerformanceDashboard isVisible={import.meta.env.DEV} />

        {/* Render the current active page with Suspense for lazy loading */}
        <main id="main-content" tabIndex="-1">
          <Suspense fallback={<PageLoadingSkeleton />}>
            {renderPage()}
          </Suspense>
        </main>

        {/* Footer (remains in App.jsx as it's common to all pages) */}
        <footer className="bg-color-bg-inverse text-color-text-inverse py-16">
          <div className="container-custom grid md:grid-cols-4 gap-8">
            {/* About/Logo Section */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">CS</span>
                </div>
                <span className="text-2xl font-bold text-white">CareSpot</span>
              </div>
              <p className="text-red-200 font-semibold mb-6 text-lg">
                Compassion In Action
              </p>
              <p className="text-color-text-inverse mb-6 leading-relaxed opacity-80">
                Transforming lives through healthcare access, education, and community empowerment across Ghana and beyond.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-tiktok text-lg"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-color-text-inverse mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigateTo("Home")}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("About")}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-left"
                  >
                    Who We Are
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("CareSpotGhana")}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-left"
                  >
                    CareSpot – Ghana
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("Projects")}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-left"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("Volunteer")}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-left"
                  >
                    Volunteer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("Community")}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-left"
                  >
                    Community
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("Contact")}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("Donate")}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-left"
                  >
                    Donate
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-color-text-inverse mb-6">Get in Touch</h3>
              <ul className="space-y-3 text-color-text-inverse opacity-80">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt text-red-400 mt-1 mr-3"></i>
                  <span>Oak Villa Estate, House number 41<br />Abokobi-Accra, Ghana</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone text-red-400 mr-3"></i>
                  <span>+1 (814) 417-1575</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone text-red-400 mr-3"></i>
                  <span>+233 53 457 5833</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope text-red-400 mr-3"></i>
                  <span>carespotinitiative@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="text-xl font-bold text-color-text-inverse mb-6">Stay Updated</h3>
              <p className="text-color-text-inverse opacity-80 mb-4">Subscribe to our newsletter for updates on our impact and programs.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                />
                <button
                  onClick={() => navigateTo("Community")}
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                <button
                  onClick={() => navigateTo("Community")}
                  className="underline hover:text-red-400 transition-colors"
                >
                  Advanced subscription options
                </button>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} CareSpot Initiative. All rights reserved. |
              <span className="text-red-400"> Compassion in Action</span>
            </p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
};

export default App;
