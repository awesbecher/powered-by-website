
import { useState, useEffect } from "react";
import { ContactHeader } from "@/components/contact/ContactHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Contact = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
    
    // Load Calendly script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      {/* Reduced top padding and made content section flex-grow */}
      <div className="flex-grow flex flex-col relative z-10 pt-16 px-4">
        <div className="max-w-2xl mx-auto w-full">
          <ContactHeader initialLoad={initialLoad} />
          
          {/* Calendly widget with optimized container */}
          <div className="mt-6 bg-neutral-900/50 p-5 rounded-xl backdrop-blur mb-16">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/d/crrs-fbd-3hf?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=a800ff" 
              style={{ minWidth: "320px", height: "630px" }}
            ></div>
          </div>
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
