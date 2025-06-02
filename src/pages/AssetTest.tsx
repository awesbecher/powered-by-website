
import React from "react";
import { useAssetTest } from "@/hooks/useAssetTest";
import Footer from "@/components/layout/Footer";
import AssetTestContent from "@/components/asset-test/AssetTestContent";
import AssetTestDialogs from "@/components/asset-test/AssetTestDialogs";

const AssetTest = () => {
  const {
    agentTypes,
    isCallActive,
    showConsentDialog,
    setShowConsentDialog,
    showMercedesDialog,
    setShowMercedesDialog,
    showRestaurantDialog,
    setShowRestaurantDialog,
    showRealEstateDialog,
    setShowRealEstateDialog,
    isMuted,
    isLoading,
    isMercedesAgent,
    isRestaurantAgent,
    isRealEstateAgent,
    selectedAgent,
    handleAgentSelect,
    handleMicClick,
    handleCall,
    handleMercedesCall,
    handleRestaurantCall,
    handleRealEstateCall,
    handleEndCall,
    toggleMute
  } = useAssetTest();

  return (
    <div className="pt-24 min-h-screen bg-[#121212] text-white">
      <AssetTestContent 
        agentTypes={agentTypes}
        selectedAgent={selectedAgent}
        isCallActive={isCallActive}
        onAgentSelect={handleAgentSelect}
        onMicClick={handleMicClick}
      />

      <AssetTestDialogs 
        showConsentDialog={showConsentDialog}
        setShowConsentDialog={setShowConsentDialog}
        showMercedesDialog={showMercedesDialog}
        setShowMercedesDialog={setShowMercedesDialog}
        showRestaurantDialog={showRestaurantDialog}
        setShowRestaurantDialog={setShowRestaurantDialog}
        showRealEstateDialog={showRealEstateDialog}
        setShowRealEstateDialog={setShowRealEstateDialog}
        isCallActive={isCallActive}
        isMuted={isMuted}
        isMercedesAgent={isMercedesAgent}
        isRestaurantAgent={isRestaurantAgent}
        isRealEstateAgent={isRealEstateAgent}
        isLoading={isLoading}
        onCall={handleCall}
        onMercedesCall={handleMercedesCall}
        onRestaurantCall={handleRestaurantCall}
        onRealEstateCall={handleRealEstateCall}
        onEndCall={handleEndCall}
        onToggleMute={toggleMute}
      />
      
      <Footer />
    </div>
  );
};

export default AssetTest;
