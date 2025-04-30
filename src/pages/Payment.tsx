
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import PaymentForm from "@/components/payment/PaymentForm";

const Payment = () => {
  const [searchParams] = useSearchParams();
  
  // Get parameters from URL
  const amountFromUrl = searchParams.get('amount');
  const productFromUrl = searchParams.get('product');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-white/5 backdrop-blur-lg border border-white/10">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/images/6402ce08-e286-4857-864a-8d835bfaa5d3.png" 
                alt="Payment Logo" 
                className="h-24 w-auto"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
              {productFromUrl ? `Payment for ${productFromUrl}` : 'Complete Your Payment'}
            </h1>
            
            <PaymentForm 
              productFromUrl={productFromUrl} 
              amountFromUrl={amountFromUrl} 
            />
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
