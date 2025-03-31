
import { WordAnimation } from "@/components/home/WordAnimation";
import { ServiceCard } from "@/components/home/ServiceCard";
import { services, additionalServices } from "@/data/services";
import { useState, useEffect } from "react";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OfferButton from "@/components/home/OfferButton";
import { useToast } from "@/hooks/use-toast";
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";

const Demo = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showDemos, setShowDemos] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isAdmin = searchParams.get('admin') === 'true';
    
    if (isAdmin) {
      localStorage.setItem('demoFormCompleted', 'true');
      searchParams.delete('admin');
      navigate({
        pathname: location.pathname,
        search: searchParams.toString()
      }, { replace: true });
      
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the demo page!"
      });
    }
    
    const hasCompletedForm = localStorage.getItem('demoFormCompleted') === 'true';
    
    if (hasCompletedForm) {
      setShowDemos(true);
      setShowForm(false);
    } else {
      setShowDemos(false);
      setShowForm(true);
    }
    
    setInitialLoad(false);
  }, [navigate, toast, location]);

  useEffect(() => {
    // Enhanced event listener to better detect Tally form submission
    const handleTallyEvent = (event: MessageEvent) => {
      console.log('Received message event:', event);
      
      if (
        event.data?.type === 'tally-form-submit-success' ||
        (typeof event.data === 'string' && event.data.includes('tally-form-submit-success'))
      ) {
        console.log('Form submission detected, updating state');
        
        // Set form as completed in localStorage
        localStorage.setItem('demoFormCompleted', 'true');
        
        // Show success toast
        toast({
          title: "Form submitted successfully!",
          description: "Showing you our demos...",
        });
        
        // Update UI state
        setShowDemos(true);
        setShowForm(false);
        
        // Scroll to top with a slight delay to ensure the state updates are applied
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      }
    };
    
    // Add event listener
    window.addEventListener('message', handleTallyEvent);
    
    // Cleanup
    return () => {
      window.removeEventListener('message', handleTallyEvent);
    };
  }, [toast]);

  // Add a manual form completion handler for testing
  const handleFormCompleted = () => {
    localStorage.setItem('demoFormCompleted', 'true');
    setShowDemos(true);
    setShowForm(false);
    toast({
      title: "Form processed",
      description: "Showing you our demos now",
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, [location]);

  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/345292f3-50fe-4a71-8569-80b3786a097c.png" 
          alt="Tech workspace" 
          className="w-full h-[60vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 via-[#2f1c4a] to-[#1a0b2e]"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar />
        
        <div className="relative overflow-hidden px-6 lg:px-8 pb-8 pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <OfferButton className="mb-8" />
              
              <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                See our <span className="text-[#9b87f5]">AI Agents</span> in Action!
              </h1>
              
              {showForm ? (
                <>
                  <p className={`mt-4 text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto font-bold transition-all duration-1000 delay-300 ease-out transform
                      ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                    Experience our AI agents right now by viewing our on-demand demos. See how our agent solutions apply to a series of industry-specific use cases. Please fill out the form below to access our demos:
                  </p>
                  
                  <div className="mt-8 max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <TallyFormEmbed 
                      formId="mVNb9y" 
                      height={500}
                      transparentBackground={true}
                      alignLeft={true}
                    />
                    
                    {/* Hidden button for testing */}
                    <button 
                      onClick={handleFormCompleted}
                      className="hidden mt-4 px-4 py-2 bg-accent text-white rounded-md"
                    >
                      Manual Override (Testing)
                    </button>
                  </div>
                </>
              ) : (
                <p className={`mt-4 text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto font-bold transition-all duration-1000 delay-300 ease-out transform
                    ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                  While <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> offers fully custom & multi-channel AI agent solutions, you can experience our pre-built voice agents by clicking any one of the below.
                </p>
              )}
            </div>
          </div>
          
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        {showDemos && (
          <div className="relative px-4 lg:px-6 space-y-4 animate-fadeIn">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {services.map(service => <ServiceCard key={service.title} {...service} />)}
              </div>
            </div>

            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {additionalServices.map(service => <ServiceCard key={service.title} {...service} />)}
              </div>
            </div>
          </div>
        )}

        <ClosingCTA />
        <Footer />
      </div>

      {/* Add the animation keyframes in the global CSS instead of inline styles */}
    </div>
  );
};

export default Demo;
