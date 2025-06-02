
import { lazy } from 'react';

const AIReceptionist = lazy(() => import('@/pages/AIReceptionist'));
const VoiceChat = lazy(() => import('@/pages/VoiceChat'));
const EmailAgent = lazy(() => import('@/pages/EmailAgent'));
const TextAgent = lazy(() => import('@/pages/TextAgent'));
const OutboundAI = lazy(() => import('@/pages/OutboundAI'));
const AIAgency = lazy(() => import('@/pages/AIAgency'));
const AgentGPT = lazy(() => import('@/pages/AgentGPT'));
const AgentGPTBuilder = lazy(() => import('@/pages/AgentGPTBuilder'));
const RealEstate = lazy(() => import('@/pages/RealEstate'));
const VirtualSE = lazy(() => import('@/pages/VirtualSE'));

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
