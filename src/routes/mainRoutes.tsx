import { lazy } from 'react';

// Use only components that actually exist in the project
const Index = lazy(() => import('@/pages/Index'));
const AgentMarketplace = lazy(() => import('@/pages/AgentMarketplace'));
const AgentGPTBuilder = lazy(() => import('@/pages/AgentGPTBuilder'));
const AgentGPT = lazy(() => import('@/pages/AgentGPT'));
const CustomGPT = lazy(() => import('@/pages/CustomGPT'));
const ChatRedirect = lazy(() => import('@/pages/ChatRedirect'));
const AgentIntegrations = lazy(() => import('@/pages/AgentIntegrations'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
// Use standard import without file extension
const Insurance = lazy(() => import('@/pages/insurance'));
// Removed backup require as it's causing issues
const GetStarted = lazy(() => import('@/pages/get-started'));

export const mainRoutes = [
  { path: "/", element: <Index /> },
  { path: "/agent-marketplace", element: <AgentMarketplace /> },
  { path: "/agent-gpt-builder", element: <AgentGPTBuilder /> },
  { path: "/agent-gpt", element: <AgentGPT /> },
  { path: "/chat", element: <ChatRedirect /> },
  { path: "/agent-integrations", element: <AgentIntegrations /> },
  { path: "/insurance", element: <Insurance /> },
  { path: "/get-started", element: <GetStarted /> },
  { path: "*", element: <NotFoundPage /> },
];
