
import React from "react";
import News from "../pages/News";
import Demo from "../pages/Demo";
import ProductHunt from "../pages/ProductHunt";
import DemoCapture from "../pages/DemoCapture";
import License from "../pages/License";
import VoiceAgentStart from "../pages/VoiceAgentStart";
import VoiceAgentConfigEnd from "../pages/VoiceAgentConfigEnd";
import Careers from "../pages/Careers";
import GPTLanding from "../pages/GPTLanding";
import CallConfirmation from "../pages/CallConfirmation";
import Contact2 from "../pages/Contact2";

export const marketingRoutes = [
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/launch",
    element: <ProductHunt />,
  },
  {
    path: "/product-hunt",
    element: <DemoCapture />,
  },
  {
    path: "/license",
    element: <License />,
  },
  {
    path: "/voiceagent-start",
    element: <VoiceAgentStart />,
  },
  {
    path: "/voiceagent-config-end",
    element: <VoiceAgentConfigEnd />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
  {
    path: "/agent-gpt",
    element: <GPTLanding />,
  },
  {
    path: "/gpt",
    element: <GPTLanding />,
  },
  {
    path: "/call-confirmation",
    element: <CallConfirmation />,
  },
  {
    path: "/contact2",
    element: <Contact2 />,
  },
];
