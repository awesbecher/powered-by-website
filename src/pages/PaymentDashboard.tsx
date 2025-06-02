
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentAnalytics from "@/components/payment/PaymentAnalytics";
import WebhookSetupGuide from "@/components/payment/WebhookSetupGuide";
import { supabase } from "@/integrations/supabase/client";

const PaymentDashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("analytics");
  
  // Get domain for webhook URL
  const domain = window.location.origin;
  const webhookUrl = `${domain}/api/stripe-webhook`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Payment Dashboard</h1>
          
          <Tabs defaultValue="analytics" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="webhook">Webhook Setup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="mt-6">
              <PaymentAnalytics />
            </TabsContent>
            
            <TabsContent value="webhook" className="mt-6">
              <WebhookSetupGuide webhookUrl={webhookUrl} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentDashboard;
