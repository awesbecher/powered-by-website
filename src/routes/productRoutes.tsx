
// Remove lazy import since we're using require
// import { lazy } from 'react';

// Import using dynamic import with explicit paths to avoid case sensitivity issues
import React from 'react';

// Create components object to store all our components
const components = {};

// Use this pattern to force synchronous loading
const AIReceptionist = React.lazy(() => import('../pages/aireceptionist.tsx'));
const VoiceChat = React.lazy(() => import('../pages/aivoicechat.tsx'));
const EmailAgent = React.lazy(() => import('../pages/emailagent.tsx'));
const TextAgent = React.lazy(() => import('../pages/textagent.tsx'));
const OutboundAI = React.lazy(() => import('../pages/GetVirtualSE.tsx'));
const AIAgency = React.lazy(() => import('../pages/AIAgency.tsx'));
const AgentGPT = React.lazy(() => import('../pages/agentgpt.tsx'));
const AgentGPTBuilder = React.lazy(() => import('../pages/AgentGPTBuilder.tsx'));
const RealEstate = React.lazy(() => import('../pages/RealEstate.tsx'));
const VirtualSE = React.lazy(() => import('../pages/GetVirtualSE.tsx'));
const AIAgents = React.lazy(() => import('../pages/aiagents.tsx'));
const CustomAISolutions = React.lazy(() => import('../pages/custom-ai-solutions.tsx'));
const AISolutions = React.lazy(() => import('../pages/aisolutions.tsx'));

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
