
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export const MobileMenu = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (!isMobile) return null;

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
