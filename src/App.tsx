
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
