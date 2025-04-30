import React, { useEffect, useState } from 'react';
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, X } from 'lucide-react';
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
    name: 'Dave Frankel',
    description: 'Speak to Dave Frankel, sales agent at Mercedes of Tacoma! He can help you explore our available Mercedes vehicles, schedule a test drive, and learn more about our special pricing & service incentives.',
    image: '/assets/team/dave-frankel.jpg',
    imageAlt: 'Dave Frankel - Mercedes Sales Agent',
    logo: '/assets/team/mercedes-logo.png',
    logoAlt: 'Mercedes of Tacoma',
    callMessage: "You are now connected with Dave Frankel, a sales agent at Mercedes of Tacoma. Feel free to ask him questions about our available Mercedes vehicles, our service options, or even ask him to schedule a test drive at the dealership."
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
}

export function CallInProgressDialog({ 
  onEndCall,
  callDuration,
  setCallDuration,
  service
}: CallInProgressDialogProps) {
  const content = SERVICE_CONTENT[service];
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
    <DialogContent className="sm:max-w-md">
      <div className="flex flex-col space-y-6">
        {/* Header with close button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={content.image} 
                  alt={content.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-12 w-auto">
                <img 
                  src={content.logo} 
                  alt={content.logoAlt}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleEndCall}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            <span>{content.name}</span>
            <span className="text-sm font-normal text-gray-500">
              {formatCallDuration(callDuration)}
            </span>
          </DialogTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Phone className="h-5 w-5 text-green-500" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <p className="text-green-600 text-sm font-medium">
              Call in Progress
            </p>
          </div>
          <p className="text-gray-600">
            {content.callMessage}
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleEndCall}
          disabled={isEnding}
          className="w-full py-6 text-lg bg-red-600 hover:bg-red-700 text-white"
        >
          {isEnding ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-2">
                <PhoneOff className="h-5 w-5" />
              </div>
              Ending Call...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <PhoneOff className="mr-2 h-5 w-5" />
              End Call
            </div>
          )}
        </Button>
      </div>
    </DialogContent>
  );
}
