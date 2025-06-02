
import React from "react";
import ConsentDialog from "@/components/asset-test/ConsentDialog";
import MercedesConsentDialog from "@/components/asset-test/MercedesConsentDialog";
import RestaurantConsentDialog from "@/components/asset-test/RestaurantConsentDialog";
import RealEstateConsentDialog from "@/components/asset-test/RealEstateConsentDialog";
import CallDialog from "@/components/asset-test/CallDialog";

interface AssetTestDialogsProps {
  showConsentDialog: boolean;
  setShowConsentDialog: (show: boolean) => void;
  showMercedesDialog: boolean;
  setShowMercedesDialog: (show: boolean) => void;
  showRestaurantDialog: boolean;
  setShowRestaurantDialog: (show: boolean) => void;
  showRealEstateDialog: boolean;
  setShowRealEstateDialog: (show: boolean) => void;
  isCallActive: boolean;
  isMuted: boolean;
  isMercedesAgent: boolean;
  isRestaurantAgent: boolean;
  isRealEstateAgent: boolean;
  isLoading: boolean;
  onCall: () => void;
  onMercedesCall: () => void;
  onRestaurantCall: () => void;
  onRealEstateCall: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
}

const AssetTestDialogs: React.FC<AssetTestDialogsProps> = ({
  showConsentDialog,
  setShowConsentDialog,
  showMercedesDialog,
  setShowMercedesDialog,
  showRestaurantDialog,
  setShowRestaurantDialog,
  showRealEstateDialog,
  setShowRealEstateDialog,
  isCallActive,
  isMuted,
  isMercedesAgent,
  isRestaurantAgent,
  isRealEstateAgent,
  isLoading,
  onCall,
  onMercedesCall,
  onRestaurantCall,
  onRealEstateCall,
  onEndCall,
  onToggleMute
}) => {
  return (
    <>
      <ConsentDialog 
        open={showConsentDialog} 
        onOpenChange={setShowConsentDialog}
        onConfirm={onCall}
        isLoading={isLoading}
      />

      <MercedesConsentDialog
        open={showMercedesDialog}
        onOpenChange={setShowMercedesDialog}
        onConfirm={onMercedesCall}
        isLoading={isLoading}
      />

      <RestaurantConsentDialog
        open={showRestaurantDialog}
        onOpenChange={setShowRestaurantDialog}
        onConfirm={onRestaurantCall}
        isLoading={isLoading}
      />

      <RealEstateConsentDialog
        open={showRealEstateDialog}
        onOpenChange={setShowRealEstateDialog}
        onConfirm={onRealEstateCall}
        isLoading={isLoading}
      />

      <CallDialog 
        open={isCallActive} 
        onOpenChange={(open) => !open && onEndCall()}
        onEndCall={onEndCall}
        onToggleMute={onToggleMute}
        isMuted={isMuted}
        isMercedesAgent={isMercedesAgent}
        isRestaurantAgent={isRestaurantAgent}
        isRealEstateAgent={isRealEstateAgent}
      />
    </>
  );
};

export default AssetTestDialogs;
