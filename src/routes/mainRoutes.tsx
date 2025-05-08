import { lazy } from 'react';

// Use only components that actually exist in the project
const Index = lazy(() => import('@/pages/Index'));
const AgentMarketplace = lazy(() => import('@/pages/AgentMarketplace'));
const AgentGPTBuilder = lazy(() => import('@/pages/AgentGPTBuilder'));
const AgentGPT = lazy(() => import('@/pages/agentgpt'));
const CustomGPT = lazy(() => import('@/pages/customgpt'));
const ChatRedirect = lazy(() => import('@/pages/chatredirect'));
const AgentIntegrations = lazy(() => import('@/pages/AgentIntegrations'));
const NotFoundPage = lazy(() => import('@/pages/notfound'));
// Ensure the correct casing and path
const Insurance = lazy(() => import('@/pages/insurance.tsx'));
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
