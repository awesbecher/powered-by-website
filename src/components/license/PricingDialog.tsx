
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PricingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PricingDialog: React.FC<PricingDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl mb-6">RightBloom Pricing Packages</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-purple-400">Essentials Package: $25/user/month</h3>
            <p className="text-gray-500">This is our base package providing core functionalities of the RightBloom software, but lacks advanced options like extensive reporting, integrations, or high user limits.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-purple-400">Sales Package: $75/user/month</h3>
            <p className="text-gray-500">This package provides core functionalities of the RightBloom software AND includes advanced AI sales automation capabilities and includes extensive reporting and extensive API integrations to SalesForce, Hubspot, and others.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-purple-400">Service Package: $125/user/month</h3>
            <p className="text-gray-500">This package provides the core functionalities of the RightBloom AI ADR capabilities provided in the Sales Package plus additional software capabilities to automate customer support and service communication & workflows with live support provided during business hours.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-purple-400">Enterprise Package: $165/user/month</h3>
            <p className="text-gray-500">This package provides all of the features in our Sales & Service packages with unlimited API integrations plus 24-by-7 live customer support.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingDialog;
