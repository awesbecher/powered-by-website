import { Button } from "@/components/ui/button";
import { Headset } from "lucide-react";
import { useState, useEffect } from "react";
import { VoiceChatDialog } from "../VoiceChatDialog";
import { initiateVapiCall, endVapiCall, getVapiCallStatus } from "@/services/vapiService";

interface AIReceptionistCardProps {
  initialLoad: boolean;
}

export const AIReceptionistCard = ({ initialLoad }: AIReceptionistCardProps) => {
  const [animatedText, setAnimatedText] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Cycle through welcome messages for a dynamic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const welcomeMessages = [
    "Hello, thank you for calling! How may I assist you today?",
    "I can help you schedule an appointment or answer questions about our services.",
    "Would you like me to check our availability for next week?"
  ];

  const handleStartCall = async () => {
    setIsSubmitting(true);
    try {
      await initiateVapiCall('general');
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start call:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await endVapiCall();
    } catch (error) {
      console.error('Failed to end call:', error);
    } finally {
      setIsCallActive(false);
      setShowDialog(false);
    }
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowDialog(false);
  };

  return (
    <>
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7100ff]/20 to-[#9b87f5]/20 rounded-3xl blur-lg transform -rotate-3"></div>
        <div className={`relative bg-gradient-to-r from-[#1f1235] to-[#2a1d45] p-6 rounded-2xl border border-[#9b87f5]/30 shadow-xl transition-all duration-1000 delay-300 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7100ff] to-[#9b87f5] rounded-full flex items-center justify-center mr-4">
              <Headset className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Receptionist</h3>
              <p className="text-gray-400 text-sm">Always available, never on break</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            {welcomeMessages.map((message, index) => (
              <div 
                key={index}
                className={`bg-[#13151a]/80 p-3 rounded-lg transition-all duration-500 ${animatedText === index ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}`}
              >
                <p className="text-gray-300 text-sm">
                  "{message}"
                </p>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={() => setShowDialog(true)}
            className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
            disabled={isSubmitting}
          >
            <Headset className="mr-2 h-5 w-5" />
            Try Demo
          </Button>
        </div>
      </div>

      <VoiceChatDialog
        showDialog={showDialog}
        isCallActive={isCallActive}
        isSubmitting={isSubmitting}
        handleCloseDialog={handleCloseDialog}
        handleStartCall={handleStartCall}
        handleEndCall={handleEndCall}
        goToRealEstateSite={() => {}}
      />
    </>
  );
};
