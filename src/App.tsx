import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import VoiceChat from './pages/VoiceChat';
import VoiceBusiness from './pages/VoiceBusiness';
import TextAgent from './pages/TextAgent';
import AgentPromptEditor from './pages/agent-gpt-builder';
import CustomGPT from './pages/CustomGPT';
import RealEstateDemo from './pages/RealEstateDemo';
import MercedesDemo from './pages/MercedesDemo';
import RestaurantDemo from './pages/RestaurantDemo';
import RoomService from './pages/room-service/RoomService';
import OmegaVoice1 from './pages/omega/OmegaVoice1';
import AiReceptionist from './pages/ai-receptionist/AiReceptionist';
import AssetTest from './pages/AssetTest';
import OpenAITest from './pages/OpenAITest';
import { GlobalVoiceChatDialog } from '@/components/GlobalVoiceChatDialog';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voice-chat" element={<VoiceChat />} />
        <Route path="/voice-business" element={<VoiceBusiness />} />
        <Route path="/text-agent" element={<TextAgent />} />
        <Route path="/agent-gpt-builder" element={<AgentPromptEditor />} />
        <Route path="/custom-gpt" element={<CustomGPT />} />
        <Route path="/real-estate" element={<RealEstateDemo />} />
        <Route path="/mercedes-benz" element={<MercedesDemo />} />
        <Route path="/restaurant" element={<RestaurantDemo />} />
        <Route path="/room-service" element={<RoomService />} />
        <Route path="/omega-voice1" element={<OmegaVoice1 />} />
        <Route path="/ai-receptionist" element={<AiReceptionist />} />
        <Route path="/asset-test" element={<AssetTest />} />
        <Route path="/openai-test" element={<OpenAITest />} />
      </Routes>
      
      <GlobalVoiceChatDialog />
    </BrowserRouter>
  );
};

export default App;
