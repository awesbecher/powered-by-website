
import React from "react";
import DemoCallBlock from "./DemoCallBlock";

interface VisitSectionProps {
  isProcessing: boolean;
  isCallActive: boolean;
  showCallDialog: boolean;
  setShowCallDialog: (value: boolean) => void;
}

const VisitSection = ({
  isProcessing,
  isCallActive,
  setShowCallDialog
}: VisitSectionProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Book Your Free Voice AI Demo</h2>
            <p className="text-white/80 mb-8">
              We'll send you a personalized demo for your dealership. Experience how our AI can transform your customer service and sales efforts.
            </p>
            
            <div className="mb-8">
              <DemoCallBlock />
            </div>
            
            {/* Button removed as per user request */}
          </div>
          
          <div>
            <div className="bg-[#1a0b2e]/40 rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Visit Us</h3>
              <p className="text-white/70 mb-6">Experience luxury in person at our state-of-the-art dealership.</p>
              
              <div className="space-y-4 text-white/80">
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p>1234 Mercedes Drive, Tacoma, WA 98402</p>
                </div>
                
                <div>
                  <h4 className="font-semibold">Hours</h4>
                  <p>Monday - Friday: 9am - 8pm</p>
                  <p>Saturday: 10am - 6pm</p>
                  <p>Sunday: 11am - 5pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitSection;
