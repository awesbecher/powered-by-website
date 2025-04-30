import React from 'react';
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, User, X, Loader2 } from 'lucide-react';

interface ServiceContent {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  logo: string;
  logoAlt: string;
  callMessage: string;
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  realEstate: {
    name: 'Jeff Smith',
    description: 'Speak to Jeff Smith at Township Real Estate! He can help you explore our available properties, schedule viewings, discuss your real estate requirements, and answer any other questions.',
    image: '/assets/team/jeff-smith.jpg',
    imageAlt: 'Jeff Smith - Real Estate Agent',
    logo: '/assets/team/township-realestate.png',
    logoAlt: 'Township Real Estate Logo',
    callMessage: 'Connecting you with Jeff Smith at Township Real Estate...'
  },
  roomService: {
    name: 'Room Service',
    description: 'Welcome to Room Service at Powered By! Our AI assistant is ready to take your order, answer questions about our menu, and ensure you have a delightful dining experience.',
    image: '/assets/images/room-service.jpg',
    imageAlt: 'Room Service',
    logo: '/assets/images/powered-by-logo.png',
    logoAlt: 'Powered By Logo',
    callMessage: 'Connecting you with Room Service...'
  },
  retail: {
    name: 'Alex @ Flagship Barbers',
    description: 'Speak with Alex at Flagship Barbers! Book your next appointment, learn about our services, or ask any questions about our premium barbershop experience.',
    image: '/assets/team/alex.jpg',
    imageAlt: 'Alex - Flagship Barbers',
    logo: '/assets/team/flagship-barbers.png',
    logoAlt: 'Flagship Barbers Logo',
    callMessage: 'Connecting you with Alex at Flagship Barbers...'
  },
  general: {
    name: 'Michael @ Powered_by',
    description: 'Michael is our AI agent and is designed to help you learn more about AI agents and how they can be used within your business. Click the button below to start a live voice chat. Please ensure your computer\'s mic and speaker are enabled. Ask Michael about anything pertaining to AI Agents, how they work, use cases, or AI best practices.',
    image: '/assets/team/Michael.jpg',
    imageAlt: 'Michael - AI Agent',
    logo: '/assets/team/PWB-favicon.png',
    logoAlt: 'Powered By Logo',
    callMessage: 'Connecting you with Michael...'
  }
};

interface CallConfirmationDialogProps {
  onStartCall: () => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
  service: keyof typeof SERVICE_CONTENT;
}

export function CallConfirmationDialog({
  onStartCall,
  onClose,
  isLoading = false,
  service = 'realEstate'
}: CallConfirmationDialogProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <div className="flex flex-col space-y-6">
        {/* Header with close button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={SERVICE_CONTENT[service].image} 
                  alt={SERVICE_CONTENT[service].imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-12 w-auto">
                <img 
                  src={SERVICE_CONTENT[service].logo} 
                  alt={SERVICE_CONTENT[service].logoAlt}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <DialogTitle className="text-xl font-semibold">
            {SERVICE_CONTENT[service].name}
          </DialogTitle>
          <p className="text-gray-600">
            {SERVICE_CONTENT[service].description}
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={onStartCall}
          disabled={isLoading}
          className="w-full py-6 text-lg bg-[#6342ff] hover:bg-[#7254ff] text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
  );
}
