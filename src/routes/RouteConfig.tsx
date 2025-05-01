import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/index';
import aiagency from '@/pages/ai-agency';
import aireceptionist from '@/pages/ai-receptionist';
import retailservices from '@/pages/retail-services';
import insurance from '@/pages/insurance';
import autodealer from '@/pages/auto-dealer';
import agentintegrations from '@/pages/agent-integrations';
import careers from '@/pages/careers';
import news from '@/pages/news';
import notfound from '@/pages/not-found';

const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ai-agency" element={<aiagency />} />
      <Route path="/ai-receptionist" element={<aireceptionist />} />
      <Route path="/retail-services" element={<retailservices />} />
      <Route path="/insurance" element={<insurance />} />
      <Route path="/agent-integrations" element={<agentintegrations />} />
      <Route path="/careers" element={<careers />} />
      <Route path="/news" element={<news />} />
      <Route path="/auto-dealer" element={<autodealer />} />
      <Route path="*" element={<notfound />} />
    </Routes>
  );
};

export default RouteConfig;
