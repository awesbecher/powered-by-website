
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
  
  // Combine all routes except the catch-all route
  const allRoutes = [...mainRoutes, ...productRoutes, ...demoRoutes]
    .concat(marketingRoutes.filter(route => route.path !== '*'));

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
