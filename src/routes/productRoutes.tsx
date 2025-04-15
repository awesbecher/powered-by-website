
import React from "react";
import AIVoiceChat from "../pages/AIVoiceChat";
import AIReceptionist from "../pages/AIReceptionist";
import EmailAgent from "../pages/EmailAgent";
import TextAgent from "../pages/TextAgent";
import VirtualSE from "../pages/VirtualSE";
import OutboundAI from "../pages/OutboundAI";
import FileUploadPage from "../pages/FileUpload";
import CustomGPT from "../pages/CustomGPT";
import AgentGPTBuilder from "../pages/AgentGPTBuilder";
import DocumentChat from "../pages/DocumentChat";
import AgentPricing from "../pages/AgentPricing";

export const productRoutes = [
  {
    path: "/voice-chat",
    element: <AIVoiceChat />,
  },
  {
    path: "/ai-receptionist",
    element: <AIReceptionist />,
  },
  {
    path: "/email-agent",
    element: <EmailAgent />,
  },
  {
    path: "/text-agent",
    element: <TextAgent />,
  },
  {
    path: "/virtual-se",
    element: <VirtualSE />,
  },
  {
    path: "/outbound-ai",
    element: <OutboundAI />,
  },
  {
    path: "/file-upload",
    element: <FileUploadPage />,
  },
  {
    path: "/custom-gpt",
    element: <CustomGPT />,
  },
  {
    path: "/agent-gpt-builder",
    element: <AgentGPTBuilder />,
  },
  {
    path: "/document-chat",
    element: <DocumentChat />,
  },
  {
    path: "/agent-pricing",
    element: <AgentPricing />,
  },
];
