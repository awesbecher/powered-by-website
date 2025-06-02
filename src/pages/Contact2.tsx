
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ContactForm2 } from "@/components/contact/ContactForm2";

const Contact2 = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Set initialLoad to false after a short delay to trigger animations
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      <div className="flex-grow flex flex-col relative z-10 pt-6 px-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header with animated fade in */}
          <div className={`transition-all duration-1000 ease-out
            ${initialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
              Thanks for your interest!
            </h1>
            <p className="text-xl text-white text-center mb-10">
              Please provide a bit more information to schedule your Free Consultation.
            </p>
          </div>
          
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ease-out
            ${initialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <ContactForm2 initialLoad={initialLoad} />
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

export default Contact2;
