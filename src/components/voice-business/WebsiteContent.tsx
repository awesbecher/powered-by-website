
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

interface WebsiteContentProps {
  onStartCall: () => void;
  autoSimulate?: boolean;
}

export const WebsiteContent = ({ onStartCall, autoSimulate = false }: WebsiteContentProps) => {
  return (
    <div className="p-3 bg-white min-h-[500px] max-h-[500px] h-[500px] overflow-hidden relative">
      {/* Logo at top left */}
      <div className="mb-2">
        <img 
          src="/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png" 
          alt="Business Connections Logo" 
          className="h-8 mb-1"
        />
        <h2 className="text-lg font-bold text-gray-800">Business Phone Solutions</h2>
        <p className="text-sm text-gray-600">Cloud PBX | VoIP | Call Center | Unified Communications</p>
      </div>
      
      {/* Business phone system features */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
          <div className="h-24 rounded-md mb-2 overflow-hidden relative bg-blue-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <div className="text-sm font-semibold text-gray-800 truncate">Cloud PBX Systems</div>
          <div className="text-xs text-gray-600 truncate">From $19.99/month per user</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
          <div className="h-24 rounded-md mb-2 overflow-hidden relative bg-purple-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 12h6"></path>
              <path d="M9 16h6"></path>
            </svg>
          </div>
          <div className="text-sm font-semibold text-gray-800 truncate">Call Management</div>
          <div className="text-xs text-gray-600 truncate">Advanced routing & analytics</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
          <div className="h-24 rounded-md mb-2 overflow-hidden relative bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="text-sm font-semibold text-gray-800 truncate">Call Center Solutions</div>
          <div className="text-xs text-gray-600 truncate">For teams of any size</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
          <div className="h-24 rounded-md mb-2 overflow-hidden relative bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="text-sm font-semibold text-gray-800 truncate">Analytics & Reporting</div>
          <div className="text-xs text-gray-600 truncate">Real-time call insights</div>
        </div>
      </div>
      
      {/* Call to action button */}
      <div className="mt-1 flex justify-center" id="cta-button">
        <Button 
          onClick={onStartCall} 
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-3 py-2 rounded-md text-sm"
        >
          <Mic className="w-4 h-4 mr-2" /> Speak to a Business Solutions Expert
        </Button>
      </div>
      
      {/* Animated cursor for auto simulation */}
      {autoSimulate && (
        <div className="cursor-simulation absolute w-6 h-6 pointer-events-none z-50" />
      )}
    </div>
  );
};
