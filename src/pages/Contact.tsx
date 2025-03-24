
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set initialLoad to false after a short delay to trigger animations
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts to ensure form is fully visible
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      {/* Content section with even less padding to maximize space */}
      <div className="flex-grow flex flex-col relative z-10 pt-6 px-4 pb-8">
        <div className="max-w-2xl mx-auto w-full">
          {/* Minimized margin for header */}
          <div className="mb-2">
            <ContactHeader initialLoad={initialLoad} />
          </div>
          
          {/* Updated Tally.so form with increased height to show submit button without scrolling */}
          <TallyFormEmbed 
            initialLoad={initialLoad} 
            className="mb-8" 
            formId="3jvjPa" 
            height={950} // Significantly increased height to ensure submit button visibility
          />
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      
      <Footer />
    </div>
  );
};

export default Contact;
