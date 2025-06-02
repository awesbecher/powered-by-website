import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, X } from 'lucide-react';
import { formatCallDuration } from '@/lib/utils';
import { SERVICE_CONTENT } from '@/lib/constants';
import { initiateVapiCall, endVapiCall } from '@/services/vapiService';

interface VapiCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VapiCallDialog({ open, onOpenChange }: VapiCallDialogProps) {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showInProgress, setShowInProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const handleStartCall = async () => {
    setIsLoading(true);
    try {
      await initiateVapiCall('general');
      setShowConfirmation(false);
      setShowInProgress(true);
      setCallDuration(0);
    } catch (error) {
      console.error('Failed to start call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = async () => {
    try {
      await endVapiCall();
    } catch (error) {
      console.error('Error ending call:', error);
    }
    setShowConfirmation(true);
    setShowInProgress(false);
    setCallDuration(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showConfirmation ? (
        <DialogContent className="sm:max-w-md bg-black text-white">
          <div className="flex flex-col space-y-6">
            {/* Header with close button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="h-24 w-24 rounded-full overflow-hidden">
                    <img 
                      src={SERVICE_CONTENT.general.image} 
                      alt={SERVICE_CONTENT.general.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="h-12 w-12 flex items-center justify-center">
                    <img 
                      src={SERVICE_CONTENT.general.logo} 
                      alt={SERVICE_CONTENT.general.logoAlt}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-full p-2 hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <DialogTitle className="text-xl font-semibold text-white">
                {SERVICE_CONTENT.general.name}
              </DialogTitle>
              <div className="space-y-4 text-gray-300">
                {SERVICE_CONTENT.general.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleStartCall}
              disabled={isLoading}
              className="w-full py-6 text-lg bg-[#6342ff] hover:bg-[#7254ff] text-white"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2">
                    <Phone className="h-5 w-5" />
                  </div>
                  Starting call...
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-5 w-5" />
                  Start Voice Chat
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      ) : showInProgress ? (
        <DialogContent className="sm:max-w-md bg-black text-white">
          <div className="flex flex-col space-y-6">
            {/* Header with close button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="h-24 w-24 rounded-full overflow-hidden">
                    <img 
                      src={SERVICE_CONTENT.general.image} 
                      alt={SERVICE_CONTENT.general.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="h-12 w-12 flex items-center justify-center">
                    <img 
                      src={SERVICE_CONTENT.general.logo} 
                      alt={SERVICE_CONTENT.general.logoAlt}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <DialogTitle className="text-xl font-semibold flex items-center justify-between text-white">
                <span>{SERVICE_CONTENT.general.name}</span>
                <span className="text-sm font-normal text-gray-400">
                  {formatCallDuration(callDuration)}
                </span>
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                <p className="text-green-400 text-sm font-medium">
                  Call in Progress
                </p>
              </div>
              <p className="text-gray-300">
                {SERVICE_CONTENT.general.callMessage}
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleClose}
              className="w-full py-6 text-lg bg-red-600 hover:bg-red-700 text-white"
            >
              <PhoneOff className="mr-2 h-5 w-5" />
              End Call
            </Button>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
