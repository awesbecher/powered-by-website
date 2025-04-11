
import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export const MobileMenu = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  if (!isMobile) return null;

  const toggleItem = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full bg-[#1a0b2e] border-[#2f1c4a] p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[#2f1c4a]">
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto text-white" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col p-4">
            <div className="py-2">
              <div className="flex justify-between items-center text-white">
                {/* Make Solutions a direct link when clicked */}
                <Link 
                  to="/products" 
                  className="py-2 text-lg font-medium hover:text-[#9b87f5]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  Solutions
                </Link>
                <button 
                  className="p-1 text-gray-400 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleItem('solutions');
                  }}
                >
                  <ChevronRight 
                    className={`h-5 w-5 transition-transform ${expandedItems.includes('solutions') ? 'rotate-90' : ''}`} 
                  />
                </button>
              </div>
              {expandedItems.includes('solutions') && (
                <div className="pl-4 mt-1 border-l border-[#2f1c4a]/50">
                  <Link to="/voice-chat" className="block py-2 text-base text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    AI Voice Chat
                  </Link>
                  <Link to="/ai-receptionist" className="block py-2 text-base text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    AI Receptionist
                  </Link>
                  <Link to="/email-agent" className="block py-2 text-base text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    Email Agent
                  </Link>
                  <Link to="/text-agent" className="block py-2 text-base text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    Text Agent
                  </Link>
                  <Link to="/virtual-se" className="block py-2 text-base text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    Virtual SE
                  </Link>
                  <Link to="/outbound-ai" className="block py-2 text-base text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    OutboundAI
                  </Link>
                </div>
              )}
            </div>
            <a 
              href="#features" 
              className="py-3 text-lg font-medium text-white hover:text-[#9b87f5]"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#benefits" 
              className="py-3 text-lg font-medium text-white hover:text-[#9b87f5]"
              onClick={() => setIsOpen(false)}
            >
              Benefits
            </a>
            <a 
              href="#how-it-works" 
              className="py-3 text-lg font-medium text-white hover:text-[#9b87f5]"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="py-3 text-lg font-medium text-white hover:text-[#9b87f5]"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="py-3 text-lg font-medium text-white hover:text-[#9b87f5]"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
          </nav>
          <div className="mt-auto p-4 border-t border-[#2f1c4a]">
            <Button 
              className="w-full bg-gradient-to-r from-[#6342ff] to-[#a87cff] text-white"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
