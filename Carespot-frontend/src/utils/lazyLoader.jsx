import { lazy, Suspense } from 'react';

// Lazy load page components
export const LazyHomePage = lazy(() => import('../pages/Homepage.jsx'));
export const LazyAboutPage = lazy(() => import('../pages/AboutPage.jsx'));
export const LazyProjectsPage = lazy(() => import('../pages/ProjectsPage.jsx'));
export const LazyContactPage = lazy(() => import('../pages/ContactPage.jsx'));
export const LazyVolunteerPage = lazy(() => import('../pages/VolunteerPage.jsx'));
export const LazyVolunteerHubPage = lazy(() => import('../pages/VolunteerHubPage.jsx'));
export const LazyDonationPage = lazy(() => import('../pages/DonationPage.jsx'));
export const LazyRxCarePage = lazy(() => import('../pages/RxCarePage.jsx'));
export const LazyCommunityPage = lazy(() => import('../pages/CommunityPage.jsx'));
export const LazyCareSpotGhanaPage = lazy(() => import('../pages/CareSpotGhanaPage.jsx'));

// Lazy load showcase/demo components
export const LazyColorShowcase = lazy(() => import('../components/ColorShowcase.jsx'));
export const LazyTypographyTestPage = lazy(() => import('../pages/TypographyTestPage.jsx'));
export const LazyInteractiveShowcase = lazy(() => import('../components/InteractiveShowcase.jsx'));
export const LazyNavigationDemoPage = lazy(() => import('../pages/NavigationDemoPage.jsx'));
export const LazyTouchDemoPage = lazy(() => import('../pages/TouchDemoPage.jsx'));

// Lazy load heavy components
export const LazyVolunteerManagementPage = lazy(() => import('../pages/VolunteerManagementPage.jsx'));
export const LazyAnalyticsComponents = lazy(() => import('../components/analytics/index.js'));
export const LazyCommunityComponents = lazy(() => import('../components/community/index.js'));

// Higher-order component for lazy loading with error boundary
export const withLazyLoading = (LazyComponent, fallback = null) => {
  return (props) => (
    <Suspense fallback={fallback || <PageLoadingSkeleton />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Loading skeleton component
const PageLoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50 animate-pulse">
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      
      {/* Image skeleton */}
      <div className="h-64 bg-gray-200 rounded mt-8"></div>
      
      {/* More content skeleton */}
      <div className="space-y-4 mt-8">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  </div>
);

export { PageLoadingSkeleton };