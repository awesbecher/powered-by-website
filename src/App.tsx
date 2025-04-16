import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from "@/components/ui/toaster"
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

import { GlobalVoiceChatDialog } from '@/components/GlobalVoiceChatDialog';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  const WrapperWithAnimatedRoutes = ({ children }: { children: React.ReactNode }) => (
    <AnimatePresence mode="wait" initial={false}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </AnimatePresence>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <WrapperWithAnimatedRoutes>
          {/* Add the GlobalVoiceChatDialog component here */}
          <GlobalVoiceChatDialog />
        </WrapperWithAnimatedRoutes>
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
