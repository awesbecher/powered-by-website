
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Demo from "./pages/Demo";
import RealEstate from "./pages/RealEstate";
import AssetTest from "./pages/AssetTest";
import AIAgency from "./pages/AIAgency";
import AIVoiceChat from "./pages/AIVoiceChat";
import AIVoiceBusinessLines from "./pages/AIVoiceBusinessLines";
import EmailAgent from "./pages/EmailAgent";
import MercedesDealer from "./pages/MercedesDealer";
import RetailServices from "./pages/RetailServices";
import Insurance from "./pages/Insurance";
import License from "./pages/License";
import CallConfirmation from "./pages/CallConfirmation";
import FoodMenu from "./pages/FoodMenu";
import RoomService from "./pages/RoomService";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/asset-test" element={<AssetTest />} />
            <Route path="/ai-agency" element={<AIAgency />} />
            <Route path="/ai-receptionist" element={<AIVoiceBusinessLines />} />
            <Route path="/voice-chat" element={<AIVoiceChat />} />
            <Route path="/email-agent" element={<EmailAgent />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
