
import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { mainRoutes } from './mainRoutes';
import { marketingRoutes } from './marketingRoutes';
import { productRoutes } from './productRoutes';
import { demoRoutes } from './demoRoutes';
import NotFound from '@/pages/NotFound';

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-xl text-gray-400">Loading...</div>
  </div>
);

export const RouteConfig = () => {
  const location = useLocation();
  
  // Filter out catch-all route from all route arrays
  const filteredMainRoutes = mainRoutes.filter(route => route.path !== '*');
  const filteredMarketingRoutes = marketingRoutes.filter(route => route.path !== '*');
  const filteredProductRoutes = productRoutes.filter(route => route.path !== '*');
  const filteredDemoRoutes = demoRoutes.filter(route => route.path !== '*');
  
  // Combine all routes
  const allRoutes = [
    ...filteredMainRoutes,
    ...filteredMarketingRoutes, 
    ...filteredProductRoutes, 
    ...filteredDemoRoutes
  ];

  return (
    <Routes key={location.pathname} location={location}>
      {/* Render all defined routes with Suspense */}
      {allRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Suspense fallback={<PageLoader />}>
              {route.element}
            </Suspense>
          }
        />
      ))}
      
      {/* Catch-all route for 404s */}
      <Route
        path="*"
        element={
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};
