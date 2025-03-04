
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import MercedesDealer from "./pages/MercedesDealer";
import RetailServices from "./pages/RetailServices";
import Insurance from "./pages/Insurance";
import License from "./pages/License";
import CallConfirmation from "./pages/CallConfirmation";
import FoodMenu from "./pages/FoodMenu";
import RoomService from "./pages/RoomService";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster"
import Admin from "./pages/admin/Admin";

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
            <Route path="/voice-chat" element={<AIVoiceChat />} />
            <Route path="/voice-business-lines" element={<AIVoiceBusinessLines />} />
            <Route path="/mercedes-dealer" element={<MercedesDealer />} />
            <Route path="/retail-services" element={<RetailServices />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/license" element={<License />} />
            <Route path="/call-confirmation" element={<CallConfirmation />} />
            <Route path="/food-menu" element={<FoodMenu />} />
            <Route path="/room-service" element={<RoomService />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
