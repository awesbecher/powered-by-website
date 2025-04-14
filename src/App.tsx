
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import FreeVoiceAgent from "./pages/FreeVoiceAgent";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import AIAgency from "./pages/AIAgency";
import FileUploadPage from "./pages/FileUpload";
import Index from "./pages/Index";
import PrivacyStatement from "./pages/PrivacyStatement";
import Products from "./pages/Products";
import AIVoiceChat from "./pages/AIVoiceChat";
import AIReceptionist from "./pages/AIReceptionist";
import EmailAgent from "./pages/EmailAgent";
import TextAgent from "./pages/TextAgent";
import VirtualSE from "./pages/VirtualSE";
import OutboundAI from "./pages/OutboundAI";
import News from "./pages/News";
import Demo from "./pages/Demo";
import ProductHunt from "./pages/ProductHunt";
import DemoCapture from "./pages/DemoCapture";
import License from "./pages/License";
import VoiceAgentStart from "./pages/VoiceAgentStart";
import VoiceAgentConfigEnd from "./pages/VoiceAgentConfigEnd";
import Careers from "./pages/Careers";
import GPTLanding from "./pages/GPTLanding";
import RoomService from "./pages/room-service";
import Insurance from "./pages/Insurance";
import MercedesDealer from "./pages/MercedesDealer";
import RealEstate from "./pages/RealEstate";
import RetailServices from "./pages/RetailServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/free-voice-agent",
    element: <FreeVoiceAgent />,
  },
  // Add an explicit route for the URL without the dash
  {
    path: "/free-voiceagent",
    element: <FreeVoiceAgent />,
  },
  {
    path: "/ai-agency",
    element: <AIAgency />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyStatement />,
  },
  {
    path: "/privacy-statement",
    element: <PrivacyStatement />,
  },
  {
    path: "/thank-you",
    element: <ThankYou />,
  },
  {
    path: "/products",
    element: <Products />,
  },
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
  // Add a redirect from the old path to the new path
  {
    path: "/gpt",
    element: <GPTLanding />,
  },
  {
    path: "/room-service",
    element: <RoomService />,
  },
  {
    path: "/insurance",
    element: <Insurance />,
  },
  {
    path: "/mercedes-dealer",
    element: <MercedesDealer />,
  },
  {
    path: "/real-estate",
    element: <RealEstate />,
  },
  {
    path: "/retail-services",
    element: <RetailServices />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/file-upload",
    element: <FileUploadPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
