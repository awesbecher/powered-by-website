import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import CaseStudies from "./pages/CaseStudies";
import FreeVoiceAgent from "./pages/FreeVoiceAgent";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import AIAgency from "./pages/AIAgency";
import FileUploadPage from "./pages/FileUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/case-studies",
    element: <CaseStudies />,
  },
  {
    path: "/free-voice-agent",
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
    element: <PrivacyPolicy />,
  },
  {
    path: "/thank-you",
    element: <ThankYou />,
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
