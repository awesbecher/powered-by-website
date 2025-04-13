
import { useState } from "react";
import { Phone } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import InsuranceHeader from "@/components/insurance/InsuranceHeader";
import InsuranceHero from "@/components/insurance/InsuranceHero";
import InsuranceProductGrid from "@/components/insurance/InsuranceProductGrid";
import InsuranceDialog from "@/components/insurance/InsuranceDialog";
import { useInsuranceCall } from "@/hooks/useInsuranceCall";

const Insurance = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  
  const {
    isLoading,
    isCallActive,
    isMuted,
    handleCall,
    handleEndCall,
    toggleMute
  } = useInsuranceCall();

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <InsuranceHeader />

      <div className="relative z-10 px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <InsuranceHero 
            onShowConsentDialog={() => setShowConsentDialog(true)}
            isLoading={isLoading}
          />
          
          <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm mt-8">
            <InsuranceProductGrid 
              selectedProducts={selectedProducts}
              onProductSelect={handleProductSelect}
            />
          </div>
        </div>
      </div>

      <InsuranceDialog
        showConsentDialog={showConsentDialog}
        setShowConsentDialog={setShowConsentDialog}
        isCallActive={isCallActive}
        isLoading={isLoading}
        isMuted={isMuted}
        toggleMute={toggleMute}
        handleCall={handleCall}
        handleEndCall={handleEndCall}
      />
      
      <Footer />
    </div>
  );
};

export default Insurance;
