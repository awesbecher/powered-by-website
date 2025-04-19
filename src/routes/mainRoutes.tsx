
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Index = lazy(() => import('@/pages/Index'));
const AgentMarketplace = lazy(() => import('@/pages/AgentMarketplace'));
const AgentGPTBuilder = lazy(() => import('@/pages/AgentGPTBuilder'));
const AgentGPT = lazy(() => import('@/pages/AgentGPT'));
const CustomGPT = lazy(() => import('@/pages/CustomGPT'));
const AgentIntegrations = lazy(() => import('@/pages/AgentIntegrations'));

export const mainRoutes = [
  { path: "/", element: <Index /> }, 
  { path: "/home", element: <Home /> },
  { path: "/agent-marketplace", element: <AgentMarketplace /> },
  { path: "/agent-gpt-builder", element: <AgentGPTBuilder /> },
  { path: "/agent-gpt", element: <AgentGPT /> },
  { path: "/chat", element: <CustomGPT /> },
  { path: "/agent-integrations", element: <AgentIntegrations /> },
  { path: "*", element: <div>Not Found</div> },
];
