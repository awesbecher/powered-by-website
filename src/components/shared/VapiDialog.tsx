import React, { useState } from 'react';
import { X } from 'lucide-react';
import { initiateVapiCall } from '@/services/vapiService';

interface VapiDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
  agentImage: string;
  logoImage: string;
}

export const VapiDialog: React.FC<VapiDialogProps> = ({
  isOpen,
  onClose,
  agentId,
  agentImage,
  logoImage
}) => {
  const [callState, setCallState] = useState<'initial' | 'connecting' | 'active'>('initial');

  if (!isOpen) return null;

  const handleStartCall = async () => {
    setCallState('connecting');
    try {
      await initiateVapiCall(agentId);
      setCallState('active');
    } catch (error) {
      console.error('Error starting call:', error);
      onClose();
    }
  };

  const handleEndCall = () => {
    onClose();
    // The browser will refresh automatically due to the onCallEnded handler in vapiService
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <img
            src={logoImage}
            alt="Company Logo"
            className="h-10 object-contain"
          />
          <button
            onClick={handleEndCall}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={agentImage}
            alt="AI Agent"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          {callState === 'initial' && (
            <>
              <h2 className="text-xl font-semibold mb-2">Ready to start your call?</h2>
              <p className="text-gray-600 text-center mb-4">
                Click below to connect with your AI assistant
              </p>
              <button
                onClick={handleStartCall}
                className="bg-[#8B5CF6] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7C3AED] transition-colors"
              >
                Start Voice Chat
              </button>
            </>
          )}
          {callState === 'connecting' && (
            <>
              <h2 className="text-xl font-semibold mb-2">Connecting...</h2>
              <p className="text-gray-600 text-center">
                Please wait while we establish your call
              </p>
            </>
          )}
          {callState === 'active' && (
            <>
              <h2 className="text-xl font-semibold mb-2">Call in Progress</h2>
              <p className="text-gray-600 text-center mb-4">
                You are now connected to your AI assistant
              </p>
              <button
                onClick={handleEndCall}
                className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                End Call
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
