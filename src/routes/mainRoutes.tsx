import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));
const Index = lazy(() => import('@/pages/index'));
const AgentMarketplace = lazy(() => import('@/pages/agent-marketplace'));
const AgentGPTBuilder = lazy(() => import('@/pages/agent-gpt-builder'));
const AgentGPT = lazy(() => import('@/pages/agent-gpt'));
const CustomGPT = lazy(() => import('@/pages/custom-gpt'));
const ChatRedirect = lazy(() => import('@/pages/chat-redirect'));
const AgentIntegrations = lazy(() => import('@/pages/agent-integrations'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));
const Insurance = lazy(() => import('@/pages/insurance'));
const VoiceConfig = lazy(() => import('@/pages/voice-config'));

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
