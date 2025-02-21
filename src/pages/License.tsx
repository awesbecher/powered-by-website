
import { Bot, Network, MessageSquare, BarChart, Phone, DollarSign } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const License = () => {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative min-h-[100vh]">
        {/* Logo */}
        <div className="absolute top-8 right-8 z-20">
          <img 
            src="/lovable-uploads/8505af38-6a90-44dc-b6bc-554d254475ea.png"
            alt="RightBloom"
            className="h-12 w-auto"
          />
        </div>

        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/fd8a631b-2f6e-4f85-a4e8-aa0f775cd50f.png"
            alt="RightBloom AI Solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-800"></div>
        </div>

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center pt-32 gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center max-w-4xl px-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Transform Your Customer Experience with AI Agents
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-white text-center max-w-3xl px-4">
            Empower your business with intelligent automation that drives results
          </p>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="min-h-[45vh]"></div>
          <div className="flex flex-col items-center justify-center gap-16 pb-20">
            <p className="text-xl text-gray-300 text-center max-w-2xl">
              RightBloom delivers cutting-edge AI agent solutions that automate and enhance your sales and customer service operations, helping innovative companies scale their business efficiently.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <button 
                onClick={() => navigate('/products')}
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-10 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
              >
                View Products & Pricing
                <DollarSign className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  Speak to a Sales Rep
                  <Phone className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowChat(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Chat with Us
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <Bot className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">AI Agents</h3>
                <p className="text-gray-300 text-sm">Intelligent automation for customer interactions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <Network className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">Smart Routing</h3>
                <p className="text-gray-300 text-sm">Seamless request distribution and handling</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-300 text-sm">Round-the-clock automated assistance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
                <BarChart className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">Analytics</h3>
                <p className="text-gray-300 text-sm">Deep insights into customer interactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/kHr0XGInFw_HfmNBDEuXC"
            width="100%"
            style={{ height: "100%", minHeight: "700px" }}
            frameBorder="0"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default License;
