
import { WordAnimation } from "@/components/home/WordAnimation";
import { useState, useEffect, useRef } from "react";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OfferButton from "@/components/home/OfferButton";
import { useToast } from "@/hooks/use-toast";
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";

const DemoCapture = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const tallyScriptLoaded = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already completed the form and redirect if true
    if (localStorage.getItem('demoFormCompleted') === 'true') {
      console.log('User already completed the form, redirecting to /demo');
      navigate('/demo');
      return;
    }
    
    setInitialLoad(false);
  }, [navigate]);
  
  // Set up the message event listener in a separate effect
  useEffect(() => {
    // Handle Tally form submission event
    const handleTallyEvent = (event: MessageEvent) => {
      console.log('Received message event:', event.data);
      
      // Check if this is a Tally form submission success event
      if (event.data?.type === 'tally-form-submit-success') {
        console.log('Form submitted successfully, setting localStorage and redirecting');
        
        // Set local storage to mark user as having completed the form
        localStorage.setItem('demoFormCompleted', 'true');
        
        // Show success toast
        toast({
          title: "Form submitted successfully!",
          description: "Redirecting you to the demos page...",
        });
        
        // Redirect to demo page after a short delay to ensure the toast is seen
        setTimeout(() => {
          navigate('/demo');
        }, 1000);
      }
    };
    
    // Add event listener for Tally form submission
    window.addEventListener('message', handleTallyEvent);
    
    // Clean up
    return () => {
      window.removeEventListener('message', handleTallyEvent);
    };
  }, [navigate, toast]);

  useEffect(() => {
    // Scroll to top with a slight delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, [location]);

  return (
    <div className="min-h-screen w-full relative">
      {/* Background image at the top */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/345292f3-50fe-4a71-8569-80b3786a097c.png" 
          alt="Tech workspace" 
          className="w-full h-[60vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 via-[#2f1c4a] to-[#1a0b2e]"></div>
      </div>

      {/* Content container with higher z-index */}
      <div className="relative z-10 min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden px-6 lg:px-8 pb-8 pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              {/* Add the offer button above the heading */}
              <OfferButton className="mb-8" />
              
              <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                See our <span className="text-[#9b87f5]">AI Agents</span> in Action!
              </h1>
              
              <p className={`mt-4 text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto font-bold transition-all duration-1000 delay-300 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                Please fill out the form below to access our demos:
              </p>
              
              {/* Using the reusable TallyFormEmbed component for better consistency */}
              <div className="mt-8 max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <TallyFormEmbed 
                  formId="mVNb9y" 
                  height={500}
                  transparentBackground={true}
                  alignLeft={true}
                />
              </div>
            </div>
          </div>
          
          {/* Gradient orbs for visual interest */}
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        {/* Closing CTA */}
        <ClosingCTA />
        <Footer />
      </div>
    </div>
  );
};

export default DemoCapture;
