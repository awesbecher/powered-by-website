import { lazy } from 'react';

const AIReceptionist = lazy(() => import('@/pages/ai-receptionist'));
const VoiceChat = lazy(() => import('@/pages/voice-chat'));
const EmailAgent = lazy(() => import('@/pages/email-agent'));
const TextAgent = lazy(() => import('@/pages/text-agent'));
const OutboundAI = lazy(() => import('@/pages/outbound-ai'));
const AIAgency = lazy(() => import('@/pages/ai-agency'));
const AgentGPT = lazy(() => import('@/pages/agent-gpt'));
const AgentGPTBuilder = lazy(() => import('@/pages/agent-gpt-builder'));
const RealEstate = lazy(() => import('@/pages/real-estate'));
const VirtualSE = lazy(() => import('@/pages/virtual-se'));

export const productRoutes = [
  { path: "/ai-receptionist", element: <AIReceptionist /> },
  { path: "/voice-chat", element: <VoiceChat /> },
  { path: "/email-agent", element: <EmailAgent /> },
  { path: "/text-agent", element: <TextAgent /> },
  { path: "/real-estate", element: <RealEstate /> },
  { path: "/getvirtual-se", element: <VirtualSE /> },
  { path: "/outbound-ai", element: <OutboundAI /> },
  { path: "/ai-agency", element: <AIAgency /> },
  { path: "/agent-gpt", element: <AgentGPT /> },
  { path: "/agent-gpt-builder", element: <AgentGPTBuilder /> },
];
