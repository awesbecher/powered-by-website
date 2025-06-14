import React, { useEffect, useState } from 'react';
import { DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, X, Mic, MicOff, Loader2 } from 'lucide-react';
import { formatCallDuration } from '@/lib/utils';

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
    logoAlt: 'Township Real Estate',
    callMessage: "You're now speaking with Jeff Smith. Feel free to ask any questions about real estate!"
  },
  mercedes: {
    name: 'Chris @ Mercedes-Benz of Tacoma',
    description: 'Speak with Chris, your Mercedes-Benz of Tacoma AI assistant! Get information about our latest models, schedule test drives, discuss financing options, and learn about our exclusive deals.',
    image: '/assets/team/Chris Cambridge.jpg',
    imageAlt: 'Chris - Mercedes-Benz of Tacoma Assistant',
    logo: '/assets/team/mercedes-logo.png',
    logoAlt: 'Mercedes-Benz of Tacoma',
    callMessage: "You are now connected with Chris, your Mercedes-Benz of Tacoma AI assistant. Feel free to ask about our available vehicles, schedule a test drive, or learn about our special offers."
  },
  roomService: {
    name: 'Room Service Assistant',
    description: 'Connect with our AI room service assistant to place your order, customize your meal, or get recommendations from our menu. Available 24/7 for your convenience.',
    image: '/assets/team/Grandview Hotels.png',
    imageAlt: 'Grandview Hotels',
    logo: '/assets/team/Grandview Hotels.png',
    logoAlt: 'Grandview Hotels',
    callMessage: "You're now connected to our room service assistant. Feel free to ask about our menu, place an order, or request recommendations!"
  },
  retail: {
    name: 'Alex',
    description: 'Speak with Alex at Flagship Barbers! Book an appointment, learn about our services, or get style recommendations. Available 24/7 to assist you.',
    image: '/assets/team/Alex.jpg',
    imageAlt: 'Alex from Flagship Barbers',
    logo: '/assets/team/Flagship Barbers.png',
    logoAlt: 'Flagship Barbers',
    callMessage: "You're now connected with Alex from Flagship Barbers. Feel free to ask about our services, book an appointment, or get style recommendations!"
  }
};

interface CallInProgressDialogProps {
  onEndCall: () => Promise<void>;
  callDuration: number;
  setCallDuration: React.Dispatch<React.SetStateAction<number>>;
  service: keyof typeof SERVICE_CONTENT;
  onMuteToggle: () => void;
  isMuted: boolean;
}

export function CallInProgressDialog({
  onEndCall,
  callDuration,
  setCallDuration,
  service = 'realEstate',
  onMuteToggle,
  isMuted
}: CallInProgressDialogProps) {
  const content = SERVICE_CONTENT[service];
  const dialogClass = service === 'mercedes' ? 'bg-black text-white' : 'sm:max-w-md';
  const logoClass = service === 'mercedes' ? 'brightness-0 invert w-48 object-contain' : '';

  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [setCallDuration]);

  const handleEndCall = async () => {
    setIsEnding(true);
    try {
      await onEndCall();
    } catch (error) {
      console.error('Error ending call:', error);
    }
    setIsEnding(false);
  };

  return (
    <DialogContent className={dialogClass}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleEndCall}
        className={`absolute right-4 top-4 ${service === 'mercedes' ? 'text-white hover:text-white/80' : ''}`}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">End Call</span>
      </Button>

      <div className="flex flex-col space-y-3 pt-1 px-4">
        <div className="flex flex-col items-center space-y-4 p-4">
          <div className="relative w-64" style={{ aspectRatio: '3/2' }}>
            <img 
              src={content.logo}
              alt={content.logoAlt}
              className={`w-full h-full object-contain ${service === 'mercedes' ? 'brightness-0 invert' : ''}`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <DialogTitle className="text-lg font-semibold flex items-center justify-between">
            <span>{content.name}</span>
            <span className="text-sm font-normal text-gray-500">
              {formatCallDuration(callDuration)}
            </span>
          </DialogTitle>
          <DialogDescription className={service === 'mercedes' ? 'text-white/80' : ''}>
            {content.callMessage}
          </DialogDescription>
        </div>

        {/* Call controls */}
        <div className="flex justify-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={service === 'mercedes' ? 'text-white hover:text-white/80' : ''}
            onClick={onMuteToggle}
          >
            {isMuted ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleEndCall}
            disabled={isEnding}
          >
            {isEnding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PhoneOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
