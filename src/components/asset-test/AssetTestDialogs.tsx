
import React from "react";
import ConsentDialog from "@/components/asset-test/ConsentDialog";
import MercedesConsentDialog from "@/components/asset-test/MercedesConsentDialog";
import RestaurantConsentDialog from "@/components/asset-test/RestaurantConsentDialog";
import CallDialog from "@/components/asset-test/CallDialog";

interface AssetTestDialogsProps {
  showConsentDialog: boolean;
  setShowConsentDialog: (show: boolean) => void;
  showMercedesDialog: boolean;
  setShowMercedesDialog: (show: boolean) => void;
  showRestaurantDialog: boolean;
  setShowRestaurantDialog: (show: boolean) => void;
  isCallActive: boolean;
  isMuted: boolean;
  isMercedesAgent: boolean;
  isRestaurantAgent: boolean;
  isLoading: boolean;
  onCall: () => void;
  onMercedesCall: () => void;
  onRestaurantCall: () => void;
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
  isCallActive,
  isMuted,
  isMercedesAgent,
  isRestaurantAgent,
  isLoading,
  onCall,
  onMercedesCall,
  onRestaurantCall,
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

      <CallDialog 
        open={isCallActive} 
        onOpenChange={(open) => !open && onEndCall()}
        onEndCall={onEndCall}
        onToggleMute={onToggleMute}
        isMuted={isMuted}
        isMercedesAgent={isMercedesAgent}
        isRestaurantAgent={isRestaurantAgent}
      />
    </>
  );
};

export default AssetTestDialogs;
