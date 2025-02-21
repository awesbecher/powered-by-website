
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const SaaSDemo = () => {
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
              SaaS Sales AI Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              See how our AI handles software demos, pricing discussions, and technical questions.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pricing Tiers */}
              <div className="bg-black/50 backdrop-blur-xl p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
                <p className="text-3xl font-bold text-accent mb-4">$49/mo</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>Up to 1,000 users</li>
                  <li>Basic support</li>
                  <li>Core features</li>
                </ul>
                <Button variant="outline" className="w-full">Choose Plan</Button>
              </div>

              <div className="bg-black/50 backdrop-blur-xl p-6 rounded-xl border border-accent">
                <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
                <p className="text-3xl font-bold text-accent mb-4">$99/mo</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>Up to 10,000 users</li>
                  <li>Priority support</li>
                  <li>Advanced features</li>
                </ul>
                <Button className="w-full bg-accent hover:bg-accent/90">Choose Plan</Button>
              </div>

              <div className="bg-black/50 backdrop-blur-xl p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-accent mb-4">Custom</p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>Unlimited users</li>
                  <li>24/7 support</li>
                  <li>Custom features</li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <Button className="bg-accent hover:bg-accent/90">
                <Phone className="w-4 h-4 mr-2" />
                Schedule a Demo Call
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

export default SaaSDemo;
