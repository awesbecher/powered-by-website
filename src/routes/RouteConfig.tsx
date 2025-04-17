
import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { mainRoutes } from './mainRoutes';
import { marketingRoutes } from './marketingRoutes';
import { productRoutes } from './productRoutes';
import { demoRoutes } from './demoRoutes';

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-xl text-gray-400">Loading...</div>
  </div>
);

export const RouteConfig = () => {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      {/* Render all routes with Suspense */}
      {[...mainRoutes, ...marketingRoutes, ...productRoutes, ...demoRoutes].map((route) => (
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
    </Routes>
  );
};
