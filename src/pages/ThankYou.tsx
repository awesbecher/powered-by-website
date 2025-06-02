
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Thank you card */}
          <Card className="bg-[#2a1c42] border-[#6342ff]/30 shadow-xl mb-8">
            <CardContent className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-green-500/20 p-2 border border-green-500/30">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-white text-center mb-4">
                Thanks for your interest in <PoweredByText />
              </h1>
              
              <p className="text-gray-300 text-center mb-6">
                We look forward to helping you learn more about AI agents and how they could deliver real value to your business.
              </p>
            </CardContent>
          </Card>
          
          {/* Return home button */}
          <div className="text-center">
            <Button
              variant="gradient"
              className="font-semibold"
              asChild
            >
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      
      {/* Visual elements */}
      <div className="fixed -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl opacity-20 pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20 pointer-events-none" />
      
      <Footer />
    </div>
  );
};

export default ThankYou;
