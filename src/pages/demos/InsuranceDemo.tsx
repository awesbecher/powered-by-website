
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const InsuranceDemo = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#222222]">
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>
        <Navigation />
      </div>

      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Insurance AI Agent Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              See how our AI handles policy inquiries, claims processing, and customer support.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Policy Cards */}
              <div 
                className={`bg-black/50 backdrop-blur-xl p-6 rounded-xl cursor-pointer transition-all ${
                  selectedPolicy === 'auto' ? 'ring-2 ring-accent' : ''
                }`}
                onClick={() => setSelectedPolicy('auto')}
              >
                <h3 className="text-xl font-semibold text-white mb-2">Auto Insurance</h3>
                <p className="text-gray-400 text-sm mb-4">Comprehensive coverage for your vehicles</p>
                <Button variant="outline" className="w-full">Select Plan</Button>
              </div>

              <div 
                className={`bg-black/50 backdrop-blur-xl p-6 rounded-xl cursor-pointer transition-all ${
                  selectedPolicy === 'home' ? 'ring-2 ring-accent' : ''
                }`}
                onClick={() => setSelectedPolicy('home')}
              >
                <h3 className="text-xl font-semibold text-white mb-2">Home Insurance</h3>
                <p className="text-gray-400 text-sm mb-4">Protect your home and belongings</p>
                <Button variant="outline" className="w-full">Select Plan</Button>
              </div>
            </div>

            {/* Action Area */}
            <div className="mt-8 text-center">
              <Button className="bg-accent hover:bg-accent/90">
                <Phone className="w-4 h-4 mr-2" />
                Speak to an Agent
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default InsuranceDemo;
