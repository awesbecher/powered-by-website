
import React from "react";
import Index from "../pages/Index";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Pricing from "../pages/Pricing";
import Blog from "../pages/Blog";
import FreeVoiceAgent from "../pages/FreeVoiceAgent";
import TermsOfService from "../pages/TermsOfService";
import NotFound from "../pages/NotFound";
import ThankYou from "../pages/ThankYou";
import AIAgency from "../pages/AIAgency";
import PrivacyStatement from "../pages/PrivacyStatement";
import Products from "../pages/Products";

export const mainRoutes = [
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
    path: "*",
    element: <NotFound />,
  },
];
