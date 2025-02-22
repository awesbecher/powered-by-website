
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import Insurance from "./pages/Insurance";
import License from "./pages/License";
import Products from "./pages/Products";
import RoomService from "./pages/RoomService";
import RetailServices from "./pages/RetailServices";
import FoodMenu from "./pages/FoodMenu";
import CallConfirmation from "./pages/CallConfirmation";
import MercedesDealer from "./pages/MercedesDealer";
import RealEstate from "./pages/RealEstate";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AIAgency from "./pages/AIAgency";
import WhatsAnAIAgent from "./pages/WhatsAnAIAgent";
import Contact from "./pages/Contact";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-agency" element={<AIAgency />} />
              <Route path="/whats-an-ai-agent" element={<WhatsAnAIAgent />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/room-service" element={<RoomService />} />
              <Route path="/food-menu" element={<FoodMenu />} />
              <Route path="/call-confirmation" element={<CallConfirmation />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/license" element={<License />} />
              <Route path="/products" element={<Products />} />
              <Route path="/retail" element={<RetailServices />} />
              <Route path="/mercedes" element={<MercedesDealer />} />
              <Route path="/real-estate" element={<RealEstate />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
