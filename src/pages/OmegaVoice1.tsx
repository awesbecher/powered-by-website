
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const OmegaVoice1 = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/omega-pediatrics");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/2855384c-487c-46d3-90a0-b663019ac215.png" 
            alt="Omega Pediatrics - Accessibility & Love" 
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
        
        <div className="flex flex-col items-center justify-center py-4">
          <h1 className="text-3xl font-bold text-white mb-6">Omega Voice Agent: Draft 3-26-25</h1>
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <Button 
          variant="default" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default OmegaVoice1;
