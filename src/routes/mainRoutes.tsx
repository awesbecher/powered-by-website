
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Index = lazy(() => import('@/pages/Index'));
const AgentMarketplace = lazy(() => import('@/pages/AgentMarketplace'));
const AgentGPTBuilder = lazy(() => import('@/pages/AgentGPTBuilder'));

export const mainRoutes = [
  { path: "/", element: <Index /> }, 
  { path: "/home", element: <Home /> },
  { path: "/agent-marketplace", element: <AgentMarketplace /> },
  { path: "/agent-gpt-builder", element: <AgentGPTBuilder /> },
  // Catch-all route for 404 pages
  { path: "*", element: <div>Not Found</div> },
];
