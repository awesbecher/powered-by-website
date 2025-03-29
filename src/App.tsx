import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import VoiceChat from "./pages/VoiceChat";
import VoiceBusiness from "./pages/VoiceBusiness";
import VoiceAgent from "./pages/VoiceAgent";
import VoiceAgentStart from "./pages/VoiceAgentStart";
import VoiceAgentForm from "./pages/VoiceAgentForm";
import AIVoiceChat from "./pages/AIVoiceChat";
import AssetTest from "./pages/AssetTest";
import OmegaVoice1 from "./pages/OmegaVoice1";
import VoiceAgentBeta from "./pages/VoiceAgentBeta";
import VoiceAgentUpload from "./pages/VoiceAgentUpload";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/voice-chat" element={<VoiceChat />} />
        <Route path="/voice-business" element={<VoiceBusiness />} />
        <Route path="/voiceagent" element={<VoiceAgent />} />
        <Route path="/voiceagent-start" element={<VoiceAgentStart />} />
        <Route path="/voiceagent-form" element={<VoiceAgentForm />} />
        <Route path="/ai-voice-chat" element={<AIVoiceChat />} />
        <Route path="/asset-test" element={<AssetTest />} />
        <Route path="/omega-voice1" element={<OmegaVoice1 />} />
        <Route path="/voice-agent-beta" element={<VoiceAgentBeta />} />
        <Route path="/voice-agent-upload" element={<VoiceAgentUpload />} />
      </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
