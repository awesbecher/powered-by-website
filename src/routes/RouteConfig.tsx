import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Demo from '@/pages/Demo';
import VoiceChat from '@/pages/VoiceChat';
import AIReceptionist from '@/pages/AIReceptionist';
import Insurance from '@/pages/Insurance';
import AIAgency from '@/pages/AIAgency';
import AgentGPT from '@/pages/AgentGPT';
import AgentGPTBuilder from '@/pages/AgentGPTBuilder';
import GPTLanding from '@/pages/GPTLanding';
import AgentMarketplace from '@/pages/AgentMarketplace';
import Careers from '@/pages/Careers';
import News from '@/pages/News';

// Fix Routes props by removing key prop
const RouteConfig = ({ location }) => {
  return (
    <Routes location={location}>
      {/* Remove key prop from Route components */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/voice-chat" element={<VoiceChat />} />
      <Route path="/ai-receptionist" element={<AIReceptionist />} />
      <Route path="/insurance" element={<Insurance />} />
      <Route path="/ai-agency" element={<AIAgency />} />
      <Route path="/agent-gpt" element={<AgentGPT />} />
      <Route path="/agent-gpt-builder" element={<AgentGPTBuilder />} />
      <Route path="/gpt-landing" element={<GPTLanding />} />
      <Route path="/agent-marketplace" element={<AgentMarketplace />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
};

export default RouteConfig;
