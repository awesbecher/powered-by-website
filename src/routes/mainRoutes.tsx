
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Index = lazy(() => import('@/pages/Index'));
const AgentMarketplace = lazy(() => import('@/pages/AgentMarketplace'));

export const mainRoutes = [
  { path: "/", element: <Index /> }, 
  { path: "/home", element: <Home /> },
  { path: "/agent-marketplace", element: <AgentMarketplace /> },
  // Catch-all route for 404 pages
  { path: "*", element: <div>Not Found</div> },
];
