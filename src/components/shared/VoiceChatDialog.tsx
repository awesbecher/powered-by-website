// This component has been replaced by CallConfirmationDialog and CallInProgressDialog
// Please use those components instead
// This file can be safely deleted

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Loader2, User, X } from 'lucide-react';
import { VoiceChatService } from '@/services/voiceChat';

interface VoiceChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceChatDialog: React.FC<VoiceChatDialogProps> = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState<'confirmation' | 'connecting' | 'inCall'>('confirmation');
  const [error, setError] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when dialog closes
      setStage('confirmation');
      setError(null);
      setCallDuration(0);
      setTranscription([]);
      setImageError(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === 'inCall') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async () => {
    setStage('connecting');
    setError(null);
    
    try {
      const voiceChatService = VoiceChatService.getInstance();
      await voiceChatService.startCall();
      setStage('inCall');
    } catch (err) {
      console.error('Failed to start call:', err);
      setError('Failed to start the call. Please try again.');
      setStage('confirmation');
    }
  };

  const handleEndCall = async () => {
    try {
      const voiceChatService = VoiceChatService.getInstance();
      await voiceChatService.endCall();
    } catch (err) {
      console.error('Failed to end call:', err);
    } finally {
      onClose();
      setStage('confirmation');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <DialogContent className="bg-[#6342ff] border-white/10 sm:max-w-lg p-0 rounded-xl">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 border-2 border-white/50 rounded-lg text-white hover:bg-white/10 hover:border-white transition-colors duration-200"
      >
        <X size={24} />
      </button>

      <div className="py-8 px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-8 mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden relative bg-gray-100 shadow-lg ring-4 ring-white/20">
              {imageError ? (
                <div className="w-full h-full bg-[#9b87f5] flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
              ) : (
                <img
                  src="/assets/team/jeff-smith.jpg"
                  alt="Jeff Smith - Real Estate Agent"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={handleImageError}
                />
              )}
            </div>
            <div className="h-20">
              <img
                src="/assets/team/township-realestate.png"
                alt="Township Real Estate"
                className="h-full w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
          </div>

          <div className="text-white text-center text-3xl font-bold mb-4">
            {stage === 'confirmation' && 'Talk to Jeff Smith'}
            {stage === 'connecting' && (
              <div className="flex items-center gap-3">
                <span>Connecting</span>
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
            {stage === 'inCall' && (
              <div className="flex items-center gap-3">
                <span>Call in Progress</span>
                <span className="text-lg font-normal">({formatDuration(callDuration)})</span>
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-400 text-base max-w-md mx-auto mb-8">
              {error}
            </div>
          )}

          <div className="text-white/90 text-base max-w-md mx-auto mb-8">
            {stage === 'confirmation' && (
              "Speak to Jeff Smith at Township Real Estate! He can help you explore our available properties, schedule viewings, discuss your real estate requirements, and answer any other questions."
            )}
            {stage === 'connecting' && (
              "Please wait while we connect you with Jeff Smith..."
            )}
            {stage === 'inCall' && (
              "You're now speaking with Jeff Smith. Feel free to ask any questions about real estate!"
            )}
          </div>

          <div className="text-center text-white">
            {stage === 'confirmation' && (
              <Button 
                onClick={handleStartCall}
                size="lg"
                className="bg-white hover:bg-white/90 text-[#6342ff] px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200"
              >
                <Phone className="mr-2 h-6 w-6" />
                Start Voice Chat
              </Button>
            )}
            {stage === 'inCall' && (
              <Button 
                onClick={handleEndCall}
                size="lg"
                className="bg-white hover:bg-white/90 text-[#6342ff] px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200"
              >
                <PhoneOff className="mr-2 h-6 w-6" />
                End Call
              </Button>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default VoiceChatDialog;
