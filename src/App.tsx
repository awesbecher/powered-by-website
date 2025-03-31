
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Contact2 from "./pages/Contact2";
import Products from "./pages/Products";
import Demo from "./pages/Demo";
import DemoCapture from "./pages/DemoCapture";
import RealEstate from "./pages/RealEstate";
import AssetTest from "./pages/AssetTest";
import AIAgency from "./pages/AIAgency";
import AIVoiceChat from "./pages/AIVoiceChat";
import AIVoiceBusinessLines from "./pages/AIVoiceBusinessLines";
import EmailAgent from "./pages/EmailAgent";
import TextAgent from "./pages/TextAgent";
import MercedesDealer from "./pages/MercedesDealer";
import RetailServices from "./pages/RetailServices";
import Insurance from "./pages/Insurance";
import License from "./pages/License";
import CallConfirmation from "./pages/CallConfirmation";
import FoodMenu from "./pages/FoodMenu";
import RoomService from "./pages/room-service";
import About from "./pages/About";
import TermsOfService from "./pages/TermsOfService";
import PrivacyStatement from "./pages/PrivacyStatement";
import VirtualSE from "./pages/VirtualSE";
import GetVirtualSE from "./pages/GetVirtualSE";
import VirtualSeEbook from "./pages/VirtualSeEbook";
import VirtualSeWhitepaper from "./pages/VirtualSeWhitepaper";
import OutboundAI from "./pages/OutboundAI";
import VoiceAgentForm from "./pages/VoiceAgentForm";
import FreeVoiceAgent from "./pages/FreeVoiceAgent";
import VoiceAgentStart from "./pages/VoiceAgentStart";
import VoiceAgentConfigEnd from "./pages/VoiceAgentConfigEnd";
// Removed import VoiceAgentBeta from "./pages/VoiceAgentBeta";
import ThankYou from "./pages/ThankYou";
import Careers from "./pages/Careers";
import ProductHunt from "./pages/ProductHunt";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import News from "./pages/News";
import { Toaster } from "@/components/ui/toaster"
import { GlobalVoiceChatDialog } from './components/shared/GlobalVoiceChatDialog';
import OmegaPediatrics from "./pages/OmegaPediatrics";
import OmegaVoice1 from "./pages/OmegaVoice1";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact-2" element={<Contact2 />} />
              <Route path="/products" element={<Products />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/demo-capture" element={<DemoCapture />} />
              <Route path="/real-estate" element={<RealEstate />} />
              <Route path="/asset-test" element={<AssetTest />} />
              <Route path="/ai-agency" element={<AIAgency />} />
              <Route path="/ai-receptionist" element={<AIVoiceBusinessLines />} />
              <Route path="/voice-chat" element={<AIVoiceChat />} />
              <Route path="/email-agent" element={<EmailAgent />} />
              <Route path="/text-agent" element={<TextAgent />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-statement" element={<PrivacyStatement />} />
              <Route path="/virtual-se" element={<VirtualSE />} />
              <Route path="/getvirtual-se" element={<GetVirtualSE />} />
              <Route path="/virtual-se-ebook" element={<VirtualSeEbook />} />
              <Route path="/virtual-se-whitepaper" element={<VirtualSeWhitepaper />} />
              <Route path="/outbound-ai" element={<OutboundAI />} />
              <Route path="/voiceagent-form" element={<VoiceAgentForm />} />
              <Route path="/voice-agent-config-end" element={<VoiceAgentConfigEnd />} />
              <Route path="/free-voiceagent" element={<FreeVoiceAgent />} />
              <Route path="/voiceagent-start" element={<VoiceAgentStart />} />
              {/* Removed Route path="/voiceagent-beta" element={<VoiceAgentBeta />} */}
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/launch" element={<ProductHunt />} />
              <Route path="/omega-pediatrics" element={<OmegaPediatrics />} />
              <Route 
                path="/omega-voice1" 
                element={
                  <ProtectedRoute>
                    <OmegaVoice1 />
                  </ProtectedRoute>
                } 
              />
              <Route path="/product-hunt" element={<Navigate to="/launch" replace />} />
              <Route path="/ai-assistant" element={<Navigate to="/ai-receptionist" replace />} />
              <Route path="/voice-business-lines" element={<Navigate to="/ai-receptionist" replace />} />
              <Route path="/mercedes-dealer" element={<MercedesDealer />} />
              <Route path="/Mercedes" element={<Navigate to="/mercedes-dealer" replace />} />
              <Route path="/retail-services" element={<RetailServices />} />
              <Route path="/Retail-Services" element={<Navigate to="/retail-services" replace />} />
              <Route path="/retail" element={<Navigate to="/retail-services" replace />} />
              <Route path="/Retail" element={<Navigate to="/retail-services" replace />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/license" element={<License />} />
              <Route path="/call-confirmation" element={<CallConfirmation />} />
              <Route path="/food-menu" element={<FoodMenu />} />
              <Route path="/room-service" element={<RoomService />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
          <GlobalVoiceChatDialog />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
