import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import ThankYou from '@/pages/ThankYou';
import Demo from '@/pages/Demo';
import AIVoiceChat from '@/pages/AIVoiceChat';
import AIReceptionist from '@/pages/AIReceptionist';
import Insurance from '@/pages/Insurance';
import AIAgency from '@/pages/AIAgency';
import AgentGPT from '@/pages/AgentGPT';
import AgentGPTBuilder from '@/pages/AgentGPTBuilder';
import GPTLanding from '@/pages/GPTLanding';
import AgentMarketplace from '@/pages/AgentMarketplace';
import AgentIntegrations from '@/pages/AgentIntegrations';
import Careers from '@/pages/Careers';
import News from '@/pages/News';
import MercedesDealer from '@/pages/MercedesDealer';
import RoomServiceContainer from '@/pages/room-service';
import RealEstate from '@/pages/RealEstate';
import RetailServices from '@/pages/RetailServices';
import Products from '@/pages/Products';
import EmailAgent from '@/pages/EmailAgent';
import TextAgent from '@/pages/TextAgent';
import Pricing from '@/pages/Pricing';
import ExternalRedirect from '@/components/shared/ExternalRedirect';

const RouteConfig = () => {
  const location = useLocation();
  console.log('Current location:', location); // Debug log

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/voice-chat" element={<AIVoiceChat />} />
        <Route path="/ai-receptionist" element={<AIReceptionist />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/ai-agency" element={<AIAgency />} />
        <Route path="/agent-gpt" element={<AgentGPT />} />
        <Route path="/agent-gpt-builder" element={<AgentGPTBuilder />} />
        <Route path="/gpt-landing" element={<GPTLanding />} />
        <Route path="/agent-marketplace" element={<AgentMarketplace />} />
        <Route path="/agent-integrations" element={<AgentIntegrations />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/news" element={<News />} />
        <Route path="/mercedes-dealer" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <MercedesDealer />
          </React.Suspense>
        } />
        <Route path="/room-service" element={<RoomServiceContainer />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/retail-services" element={<RetailServices />} />
        <Route path="/products" element={<Products />} />
        <Route path="/email-agent" element={<EmailAgent />} />
        <Route path="/text-agent" element={<TextAgent />} />
        <Route path="/pricing" element={<Pricing />} />
        {/* External redirects */}
        <Route 
          path="/virtual-se" 
          element={<ExternalRedirect to="https://www.getvirtual.se" />} 
        />
        <Route 
          path="/outbound-ai" 
          element={<ExternalRedirect to="https://tryoutbound.ai" />} 
        />
      </Routes>
    </AnimatePresence>
  );
};

export default RouteConfig;
