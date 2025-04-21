
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, X } from 'lucide-react';
import { ChatInterface } from '@/components/custom-gpt/ChatInterface';

export const GlobalVoiceChatDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Custom event listener to allow other components to open the chat
    const handleOpenEvent = () => {
      console.log("GlobalVoiceChatDialog: Received open-voice-dialog event");
      setIsOpen(true);
    };
    
    document.addEventListener('open-voice-dialog', handleOpenEvent);

    return () => {
      document.removeEventListener('open-voice-dialog', handleOpenEvent);
    };
  }, []);

  // We want to render the button on all pages except /chat
  // to maintain backward compatibility
  const shouldShowButton = location.pathname !== '/chat';
  
  // If the dialog is not open and we're on the /chat route, don't render anything
  if (!isOpen && location.pathname === '/chat') {
    return null;
  }

  if (!isOpen) {
    return shouldShowButton ? (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#8B5CF6] p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-6 w-6 text-white" />
      </button>
    ) : null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close AI Assistant"
        >
          <X className="h-5 w-5" />
        </button>
        <ChatInterface />
      </div>
    </div>
  );
};
