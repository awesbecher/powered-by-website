
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AgentGPTBuilder from "./pages/AgentGPTBuilder";
import AgentIntegrations from "./pages/AgentIntegrations";
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/agent-gpt-builder" element={<AgentGPTBuilder />} />
        <Route path="/agent-integrations" element={<AgentIntegrations />} />
      </Routes>
    </Router>
  );
}

export default App;
