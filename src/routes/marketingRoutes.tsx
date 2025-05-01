import { lazy } from 'react';

const About = lazy(() => import('@/pages/about'));
const Contact = lazy(() => import('@/pages/contact'));
const Contact2 = lazy(() => import('@/pages/contact2'));
const Pricing = lazy(() => import('@/pages/pricing'));
const Blog = lazy(() => import('@/pages/blog'));
const News = lazy(() => import('@/pages/news'));
const Demo = lazy(() => import('@/pages/demo'));
const Products = lazy(() => import('@/pages/products'));
const Careers = lazy(() => import('@/pages/careers'));
const ProductHunt = lazy(() => import('@/pages/product-hunt'));
const ThankYou = lazy(() => import('@/pages/thank-you'));
const NotFound = lazy(() => import('@/pages/not-found'));
const DemoCapture = lazy(() => import('@/pages/demo-capture'));
const PrivacyStatement = lazy(() => import('@/pages/privacy-statement'));
const TermsOfService = lazy(() => import('@/pages/terms-of-service'));
const SubscriptionTerms = lazy(() => import('@/pages/subscription-terms'));

export const marketingRoutes = [
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/contact2", element: <Contact2 /> },
  { path: "/trynow", element: <Contact /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/blog", element: <Blog /> },
  { path: "/news", element: <News /> },
  { path: "/demo", element: <Demo /> },
  { path: "/products", element: <Products /> },
  { path: "/careers", element: <Careers /> },
  { path: "/launch", element: <ProductHunt /> },
  { path: "/thank-you", element: <ThankYou /> },
  { path: "/demos", element: <DemoCapture /> },
  { path: "/privacy-statement", element: <PrivacyStatement /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/subscription-terms", element: <SubscriptionTerms /> },
  // Catch-all route for 404 pages
  { path: "*", element: <NotFound /> },
];
