
// Go back to standard imports but with standard format that Vite can process
import React, { lazy } from 'react';

// Import pages with standard lazy loading - use exact same casing as files on disk
const AIReceptionist = lazy(() => import('@/pages/aireceptionist'));
const VoiceChat = lazy(() => import('@/pages/aivoicechat'));
const EmailAgent = lazy(() => import('@/pages/emailagent'));
const TextAgent = lazy(() => import('@/pages/textagent'));
const OutboundAI = lazy(() => import('@/pages/GetVirtualSE'));
const AIAgency = lazy(() => import('@/pages/AIAgency'));
const AgentGPT = lazy(() => import('@/pages/agentgpt'));
const AgentGPTBuilder = lazy(() => import('@/pages/AgentGPTBuilder'));
const RealEstate = lazy(() => import('@/pages/RealEstate'));
const VirtualSE = lazy(() => import('@/pages/GetVirtualSE'));
const AIAgents = lazy(() => import('@/pages/aiagents'));
const CustomAISolutions = lazy(() => import('@/pages/custom-ai-solutions'));
const AISolutions = lazy(() => import('@/pages/aisolutions'));

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
  { path: "/ai-agents", element: <AIAgents /> },
  { path: "/aiagents", element: <AIAgents /> },
  { path: "/custom-ai-solutions", element: <CustomAISolutions /> },
  { path: "/aisolutions", element: <AISolutions /> },
];
