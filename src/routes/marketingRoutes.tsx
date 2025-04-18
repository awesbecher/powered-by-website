
import { lazy } from 'react';

const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Contact2 = lazy(() => import('@/pages/Contact2'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Blog = lazy(() => import('@/pages/Blog'));
const News = lazy(() => import('@/pages/News'));
const Demo = lazy(() => import('@/pages/Demo'));
const Products = lazy(() => import('@/pages/Products'));
const Careers = lazy(() => import('@/pages/Careers'));
const ProductHunt = lazy(() => import('@/pages/ProductHunt'));
const ThankYou = lazy(() => import('@/pages/ThankYou'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const marketingRoutes = [
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact2 /> },
  { path: "/trynow", element: <Contact /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/blog", element: <Blog /> },
  { path: "/news", element: <News /> },
  { path: "/demo", element: <Demo /> },
  { path: "/products", element: <Products /> },
  { path: "/careers", element: <Careers /> },
  { path: "/launch", element: <ProductHunt /> },
  { path: "/thank-you", element: <ThankYou /> },
  { path: "*", element: <NotFound /> }, // Catch-all route for 404 pages
];
