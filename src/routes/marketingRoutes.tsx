
import { lazy } from 'react';

const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Blog = lazy(() => import('@/pages/Blog'));
const News = lazy(() => import('@/pages/News'));
const Demo = lazy(() => import('@/pages/Demo'));
const Products = lazy(() => import('@/pages/Products'));
const Careers = lazy(() => import('@/pages/Careers'));
const ProductHunt = lazy(() => import('@/pages/ProductHunt'));

export const marketingRoutes = [
  { path: "/about", element: <About /> },
  { path: "/trynow", element: <Contact /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/blog", element: <Blog /> },
  { path: "/news", element: <News /> },
  { path: "/demo", element: <Demo /> },
  { path: "/products", element: <Products /> },
  { path: "/careers", element: <Careers /> },
  { path: "/launch", element: <ProductHunt /> },
];
