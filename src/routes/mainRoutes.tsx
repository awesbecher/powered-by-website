import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Index = lazy(() => import('@/pages/Index'));
const AgentMarketplace = lazy(() => import('@/pages/AgentMarketplace'));
const AgentGPTBuilder = lazy(() => import('@/pages/AgentGPTBuilder'));
const AgentGPT = lazy(() => import('@/pages/AgentGPT'));
const CustomGPT = lazy(() => import('@/pages/CustomGPT'));
const ChatRedirect = lazy(() => import('@/pages/ChatRedirect'));
const AgentIntegrations = lazy(() => import('@/pages/AgentIntegrations'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
const Insurance = lazy(() => import('@/pages/Insurance'));
const VoiceConfig = lazy(() => import('@/pages/VoiceConfig'));

export const mainRoutes = [
  { path: "/", element: <Index /> }, 
  { path: "/home", element: <Home /> },
  { path: "/agent-marketplace", element: <AgentMarketplace /> },
  { path: "/agent-gpt-builder", element: <AgentGPTBuilder /> },
  { path: "/agent-gpt", element: <AgentGPT /> },
  { path: "/chat", element: <ChatRedirect /> },
  { path: "/agent-integrations", element: <AgentIntegrations /> },
  { path: "/insurance", element: <Insurance /> },
  { path: "/voice-config", element: <VoiceConfig /> },
  { path: "*", element: <NotFoundPage /> },
];
