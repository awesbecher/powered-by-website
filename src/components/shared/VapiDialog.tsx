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
      window.location.reload();
    }
  };

  const handleEndCall = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="bg-black rounded-xl p-8 max-w-md w-full mx-4 border border-white/20">
        <div className="flex justify-between items-start mb-6">
          <img
            src={logoImage}
            alt="Company Logo"
            className="h-20 object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <button
            onClick={handleEndCall}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={agentImage}
            alt="AI Agent"
            className="w-32 h-32 rounded-full mb-6 object-cover"
          />
          {callState === 'initial' && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-white">Ready to start your call?</h2>
              <p className="text-gray-300 text-center mb-6">
                Click below to connect with your AI assistant
              </p>
              <button
                onClick={handleStartCall}
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Start Voice Chat
              </button>
            </>
          )}
          {callState === 'connecting' && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-white">Connecting...</h2>
              <p className="text-gray-300 text-center">
                Please wait while we establish your call
              </p>
            </>
          )}
          {callState === 'active' && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-white">Call in Progress</h2>
              <p className="text-gray-300 text-center mb-6">
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
