
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface MobileCallCTAProps {
  setShowCallDialog: (value: boolean) => void;
}

const MobileCallCTA = ({ setShowCallDialog }: MobileCallCTAProps) => {
  const [visible, setVisible] = useState(false);
  
  // Show button only after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToDemo = () => {
    const demoElement = document.getElementById("demo-call");
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-6 right-4 z-50 md:hidden">
      <Button 
        onClick={scrollToDemo}
        className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
      >
        <Phone className="h-6 w-6" />
        <span className="sr-only">📞 Call Demo</span>
      </Button>
    </div>
  );
};

export default MobileCallCTA;
