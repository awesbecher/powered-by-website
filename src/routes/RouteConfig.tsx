import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import AIAgency from '@/pages/AIAgency';
import AIReceptionist from '@/pages/AIReceptionist';
import RetailServices from '@/pages/RetailServices';
import Insurance from '@/pages/Insurance';
import AutoDealer from '@/pages/auto-dealer';
import AgentIntegrations from '@/pages/AgentIntegrations';
import Careers from '@/pages/Careers';
import News from '@/pages/News';
import NotFound from '@/pages/NotFound';

const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ai-agency" element={<AIAgency />} />
      <Route path="/ai-receptionist" element={<AIReceptionist />} />
      <Route path="/retail-services" element={<RetailServices />} />
      <Route path="/insurance" element={<Insurance />} />
      <Route path="/agent-integrations" element={<AgentIntegrations />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/news" element={<News />} />
      <Route path="/auto-dealer" element={<AutoDealer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteConfig;
