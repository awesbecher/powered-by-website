
import { lazy } from 'react';

// Use require with explicit file extensions to avoid case sensitivity issues
const AIReceptionist = require('@/pages/aireceptionist.tsx').default;
const VoiceChat = require('@/pages/aivoicechat.tsx').default;
const EmailAgent = require('@/pages/emailagent.tsx').default;
const TextAgent = require('@/pages/textagent.tsx').default;
const OutboundAI = require('@/pages/GetVirtualSE.tsx').default;
const AIAgency = require('@/pages/AIAgency.tsx').default;
const AgentGPT = require('@/pages/agentgpt.tsx').default;
const AgentGPTBuilder = require('@/pages/AgentGPTBuilder.tsx').default;
const RealEstate = require('@/pages/RealEstate.tsx').default;
const VirtualSE = require('@/pages/GetVirtualSE.tsx').default;
const AIAgents = require('@/pages/aiagents.tsx').default;
const CustomAISolutions = require('@/pages/custom-ai-solutions.tsx').default;
const AISolutions = require('@/pages/aisolutions.tsx').default;

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
