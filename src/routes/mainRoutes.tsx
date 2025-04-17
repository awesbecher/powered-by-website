
import { lazy } from 'react';

// Import essential pages that need to be loaded immediately
const Index = lazy(() => import('@/pages/Index'));
const Home = lazy(() => import('@/pages/Home'));

export const mainRoutes = [
  { path: "/", element: <Index /> },
  { path: "/home", element: <Home /> },
];
