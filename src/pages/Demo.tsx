
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
    // Check for admin access in URL params
    const searchParams = new URLSearchParams(location.search);
    const isAdmin = searchParams.get('admin') === 'true';
    
    if (isAdmin) {
      // Set the form completed flag for admin access
      localStorage.setItem('demoFormCompleted', 'true');
      
      // Remove the admin param from URL to keep it clean
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
    
    // Check if user has completed the lead capture form
    const hasCompletedForm = localStorage.getItem('demoFormCompleted') === 'true';
    
    // Show appropriate content based on completion status
    if (hasCompletedForm) {
      console.log('User has completed the form, showing demos');
      setShowDemos(true);
      setShowForm(false);
    } else {
      console.log('User has not completed the form, showing the form');
      setShowDemos(false);
      setShowForm(true);
    }
    
    setInitialLoad(false);
  }, [navigate, toast, location]);

  // Handle form submission event from Tally
  useEffect(() => {
    // Handle Tally form submission event
    const handleTallyEvent = (event: MessageEvent) => {
      console.log('Received message event:', event.data);
      
      // Check if this is a Tally form submission success event
      if (event.data?.type === 'tally-form-submit-success') {
        console.log('Form submitted successfully, setting localStorage and showing demos');
        
        // Set local storage to mark user as having completed the form
        localStorage.setItem('demoFormCompleted', 'true');
        
        // Show success toast
        toast({
          title: "Form submitted successfully!",
          description: "Showing you our demos...",
        });
        
        // Update state to show demos
        setShowDemos(true);
        setShowForm(false);
      }
    };
    
    // Add event listener for Tally form submission
    window.addEventListener('message', handleTallyEvent);
    
    // Clean up
    return () => {
      window.removeEventListener('message', handleTallyEvent);
    };
  }, [toast]);

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
              
              {showForm ? (
                <>
                  <p className={`mt-4 text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto font-bold transition-all duration-1000 delay-300 ease-out transform
                      ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                    Please fill out the form below to access our demos:
                  </p>
                  
                  {/* Form section */}
                  <div className="mt-8 max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <TallyFormEmbed 
                      formId="mVNb9y" 
                      height={500}
                      transparentBackground={true}
                      alignLeft={true}
                    />
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
          
          {/* Gradient orbs for visual interest */}
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        {/* Services Grid - Only show if form is completed */}
        {showDemos && (
          <div className="relative px-4 lg:px-6 space-y-4">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {services.map(service => <ServiceCard key={service.title} {...service} />)}
              </div>
            </div>

            {/* Additional Services Grid */}
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {additionalServices.map(service => <ServiceCard key={service.title} {...service} />)}
              </div>
            </div>
          </div>
        )}

        {/* Closing CTA */}
        <ClosingCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Demo;
