
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RoomService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <div className="container mx-auto px-4 py-20">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-20 text-white hover:text-purple-400 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="font-medium">Back to Demos</span>
        </button>

        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Room Service</h1>
          <p className="text-xl text-gray-300 mb-12">
            Experience our AI-powered room service assistant. Order food and drinks
            directly to your room with a simple conversation.
          </p>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ol className="text-left list-decimal pl-6 space-y-4">
              <li>Click the "Call Room Service" button below</li>
              <li>Tell our AI voice assistant what you'd like to order</li>
              <li>Confirm your order details when prompted</li>
              <li>Your order will be prepared and delivered to your room</li>
            </ol>
          </div>
          
          <Button 
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 rounded-lg font-semibold text-lg"
            onClick={() => navigate('/demo')}
          >
            Call Room Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomService;
