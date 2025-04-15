
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DeploymentCTA: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-[#1a0b2e]/90 to-[#2f1c4a]/90 border border-white/10 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#6a5acd] bg-clip-text text-transparent mb-4">
        Deploy Your Agent
      </h2>
      
      <div className="space-y-6 text-gray-300">
        <p>
          Your agent is ready to be deployed! You can choose from multiple deployment options:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="border border-white/10 rounded-lg p-4 bg-black/20 hover:bg-black/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">Website Embed</h3>
            <p className="text-sm mb-4">
              Add your voice agent directly to your website with our simple embed code.
            </p>
            <Button variant="outline" className="w-full">
              Get Embed Code
            </Button>
          </div>
          
          <div className="border border-white/10 rounded-lg p-4 bg-black/20 hover:bg-black/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">API Integration</h3>
            <p className="text-sm mb-4">
              Connect your voice agent to your applications using our API.
            </p>
            <Button variant="outline" className="w-full">
              View API Docs
            </Button>
          </div>
          
          <div className="border border-white/10 rounded-lg p-4 bg-black/20 hover:bg-black/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">Phone Number</h3>
            <p className="text-sm mb-4">
              Get a dedicated phone number for your voice agent.
            </p>
            <Button variant="outline" className="w-full">
              Set Up Phone
            </Button>
          </div>
          
          <div className="border border-white/10 rounded-lg p-4 bg-black/20 hover:bg-black/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-2">Custom Integration</h3>
            <p className="text-sm mb-4">
              Need help with a custom deployment solution? Contact our team.
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm opacity-80">
            Need help deploying your agent? Our team is here to help! Contact us for assistance.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DeploymentCTA;
