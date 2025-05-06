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
  mercedes: {
    name: 'Chris @ Mercedes-Benz of Tacoma',
    description: 'Speak with Chris, your Mercedes-Benz of Tacoma AI assistant! Get information about our latest models, schedule test drives, discuss financing options, and learn about our exclusive deals.',
    image: '/assets/team/Chris Cambridge.jpg',
    imageAlt: 'Chris - Mercedes-Benz of Tacoma Assistant',
    logo: '/assets/team/mercedes-logo.png',
    logoAlt: 'Mercedes-Benz of Tacoma Logo',
    callMessage: 'Connecting you with Chris at Mercedes-Benz of Tacoma...'
  },
  roomService: {
    name: 'Room Service at Grandview Hotels',
    description: 'Welcome to Room Service at Grandview Hotels! Our AI assistant is ready to take your order, answer questions about our menu, and ensure you have a delightful dining experience.',
    image: '/assets/team/Grandview Hotels.png',
    imageAlt: 'Grandview Hotels Room Service',
    logo: '/assets/team/Grandview Hotels.png',
    logoAlt: 'Grandview Hotels Logo',
    callMessage: 'Connecting you with Room Service at Grandview Hotels...'
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
  const content = SERVICE_CONTENT[service];
  const dialogClass = service === 'mercedes' ? 'bg-black text-white' : 'sm:max-w-md';
  const logoClass = service === 'mercedes' ? 'brightness-0 invert w-48 object-contain' : '';

  return (
    <DialogContent className={dialogClass}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className={`absolute right-4 top-4 ${service === 'mercedes' ? 'text-white hover:text-white/80' : ''}`}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
      
      <div className="flex flex-col items-center justify-center pt-1 px-4">
        <img 
          src={content.logo} 
          alt={content.logoAlt} 
          className={`mb-2 ${logoClass}`}
        />
        <div className="flex flex-col space-y-3">
          {/* Agent info */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <img
                src={content.image}
                alt={content.imageAlt}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className={`font-semibold ${service === 'mercedes' ? 'text-white' : ''}`}>{content.name}</h3>
              <p className={service === 'mercedes' ? 'text-white/80' : 'text-muted-foreground'}>{content.description}</p>
            </div>
          </div>

          {/* Call button */}
          <Button
            onClick={onStartCall}
            disabled={isLoading}
            size="lg"
            className={`w-full ${service === 'mercedes' ? 'bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing call...
              </>
            ) : (
              <>
                <Phone className="mr-2 h-4 w-4" />
                Start Voice Chat
              </>
            )}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
