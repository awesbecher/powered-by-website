import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';

// Main Pages
import Index from "./pages/Index";
import About from "./pages/About";
import AgentGPTBuilder from "./pages/AgentGPTBuilder";
import AgentIntegrations from "./pages/AgentIntegrations";
import GPTLanding from "./pages/GPTLanding";
import Pricing from "./pages/Pricing";
import Careers from "./pages/Careers";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import PaymentDashboard from "./pages/PaymentDashboard";
import Contact2 from "./pages/Contact2";
import Contact from "./pages/Contact";
import OutboundAI from "./pages/OutboundAI";
import AIReceptionist from "./pages/AIReceptionist";
import FileUpload from "./pages/FileUpload";
import EmailAgent from "./pages/EmailAgent";
import DemoCapture from "./pages/DemoCapture";
import MercedesDealer from "./pages/MercedesDealer";
import OmegaPediatrics from "./pages/OmegaPediatrics";
import CallConfirmation from "./pages/CallConfirmation";

// Others as needed
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/agent-gpt-builder" element={<AgentGPTBuilder />} />
        <Route path="/agent-integrations" element={<AgentIntegrations />} />
        <Route path="/agent-gpt" element={<GPTLanding />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/careers" element={<Careers />} />
        
        {/* Payment routes */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/payment-dashboard" element={<PaymentDashboard />} />
        
        {/* Contact routes */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact2" element={<Contact2 />} />
        
        {/* AI service routes */}
        <Route path="/outbound-ai" element={<OutboundAI />} />
        <Route path="/ai-receptionist" element={<AIReceptionist />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/email-agent" element={<EmailAgent />} />
        
        {/* Demo and special pages */}
        <Route path="/demo-capture" element={<DemoCapture />} />
        <Route path="/mercedes-dealer" element={<MercedesDealer />} />
        <Route path="/omega-pediatrics" element={<OmegaPediatrics />} />
        <Route path="/call-confirmation" element={<CallConfirmation />} />
        
        {/* Catch all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
