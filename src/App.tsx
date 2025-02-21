
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Insurance from "./pages/Insurance";
import License from "./pages/License";
import RoomService from "./pages/RoomService";
import RetailServices from "./pages/RetailServices";
import FoodMenu from "./pages/FoodMenu";
import CallConfirmation from "./pages/CallConfirmation";
import MercedesDealer from "./pages/MercedesDealer";
import RealEstate from "./pages/RealEstate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/room-service" element={<RoomService />} />
          <Route path="/food-menu" element={<FoodMenu />} />
          <Route path="/call-confirmation" element={<CallConfirmation />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/license" element={<License />} />
          <Route path="/retail" element={<RetailServices />} />
          <Route path="/mercedes" element={<MercedesDealer />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
