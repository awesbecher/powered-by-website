
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from 'framer-motion';

// Import all page components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import AIReceptionist from './pages/AIReceptionist';
import VoiceChat from './pages/VoiceChat';
import EmailAgent from './pages/EmailAgent';
import TextAgent from './pages/TextAgent';
import RealEstate from './pages/RealEstate';
import VirtualSE from './pages/VirtualSE';
import News from './pages/News';
import Demo from './pages/Demo';
import Products from './pages/Products';
import OutboundAI from './pages/OutboundAI';
import License from './pages/License';
import Index from './pages/Index';
import AIAgency from './pages/AIAgency';
import AgentGPT from './pages/AgentGPT';
import AgentGPTBuilder from './pages/AgentGPTBuilder';
import { GlobalVoiceChatDialog } from '@/components/shared/GlobalVoiceChatDialog';
import MercedesDealer from './pages/MercedesDealer';
import RoomService from './pages/room-service';
import RetailServices from './pages/RetailServices';
import Careers from './pages/Careers';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AnimatePresence mode="wait" initial={false}>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ai-receptionist" element={<AIReceptionist />} />
            <Route path="/voice-chat" element={<VoiceChat />} />
            <Route path="/email-agent" element={<EmailAgent />} />
            <Route path="/text-agent" element={<TextAgent />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/getvirtual-se" element={<VirtualSE />} />
            <Route path="/news" element={<News />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/products" element={<Products />} />
            <Route path="/outbound-ai" element={<OutboundAI />} />
            <Route path="/license" element={<License />} />
            <Route path="/ai-agency" element={<AIAgency />} />
            <Route path="/agent-gpt" element={<AgentGPT />} />
            <Route path="/agent-gpt-builder" element={<AgentGPTBuilder />} />
            <Route path="/mercedes-dealer" element={<MercedesDealer />} />
            <Route path="/room-service" element={<RoomService />} />
            <Route path="/retail-services" element={<RetailServices />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </AnimatePresence>
        
        {/* Add the GlobalVoiceChatDialog component here */}
        <GlobalVoiceChatDialog />
        
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
