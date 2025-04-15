
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import BillingPageWithCards from "@/components/pricing/BillingPageWithCards";
import { supabase } from "@/integrations/supabase/client";

const AgentPricing = () => {
  const [user, setUser] = useState<{ id: string } | null>(null);
  
  React.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    fetchUser();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Agent <span className="text-[#9b87f5]">Pricing</span>
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <BillingPageWithCards user={user} />
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default AgentPricing;
