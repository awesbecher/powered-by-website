
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Payment Cancelled
            </h1>
            
            <p className="text-gray-200 mb-6">
              Your payment process has been cancelled. No charges have been made.
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/">Return to Home</Link>
              </Button>
              
              <Button 
                className="bg-[#6342ff] hover:bg-[#7e5fff]"
                asChild
              >
                <Link to="/payment">Try Again</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentCancelled;
