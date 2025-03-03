
import React from "react";
import { useAssetTest } from "@/hooks/useAssetTest";
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
    isMuted,
    isLoading,
    isMercedesAgent,
    isRestaurantAgent,
    selectedAgent,
    handleAgentSelect,
    handleMicClick,
    handleCall,
    handleMercedesCall,
    handleRestaurantCall,
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
        isCallActive={isCallActive}
        isMuted={isMuted}
        isMercedesAgent={isMercedesAgent}
        isRestaurantAgent={isRestaurantAgent}
        isLoading={isLoading}
        onCall={handleCall}
        onMercedesCall={handleMercedesCall}
        onRestaurantCall={handleRestaurantCall}
        onEndCall={handleEndCall}
        onToggleMute={toggleMute}
      />
    </div>
  );
};

export default AssetTest;
