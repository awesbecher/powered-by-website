import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// Use explicit imports with extensions for case sensitivity consistency
const Index = require('@/pages/Index.tsx').default;
const About = require('@/pages/About.tsx').default;
const Contact = require('@/pages/Contact.tsx').default;
const Demo = require('@/pages/Demo.tsx').default;
// Use require for case sensitivity issues
// import Marketing from '@/pages/marketing';
const Marketing = require('@/pages/marketing.tsx').default;
// Use require for case sensitivity issues
// import TestSimple from '@/pages/test-simple';
const TestSimple = require('@/pages/test-simple.tsx').default;
// Use require for component imports to maintain consistency
const ExternalRedirect = require('@/components/shared/ExternalRedirect').default;

// Import route definitions
import { productRoutes } from './productRoutes';
import { mainRoutes } from './mainRoutes';
// Direct require for insurance page to avoid case sensitivity issues
const Insurance = require('@/pages/insurance').default;

const RouteConfig = () => {
  const location = useLocation();
  console.log('Current location:', location); // Debug log

  const fallbackElement = <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">Loading...</div>;

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={fallbackElement}>
        <Routes location={location} key={location.pathname}>
          {/* Static routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/test-simple" element={<TestSimple />} />
          <Route path="/test-page" element={require('@/pages/test-page').default} />
          {/* Explicit insurance route to avoid case sensitivity issues */}
          <Route path="/insurance" element={<Insurance />} />
          
          {/* External redirects */}
          <Route 
            path="/virtual-se" 
            element={<ExternalRedirect to="https://www.getvirtual.se" />} 
          />
          <Route 
            path="/outbound-ai" 
            element={<ExternalRedirect to="https://tryoutbound.ai" />} 
          />
          
          {/* Include all product routes */}
          {productRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          
          {/* Include main routes (includes 404 handling) */}
          {mainRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default RouteConfig;
