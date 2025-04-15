import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Phone, MessageCircle, Calendar, Clock, DollarSign, Shield, Headset } from "lucide-react";

const AIReceptionist = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showVoiceChatDialog, setShowVoiceChatDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const ASSISTANT_ID = "ebb38ba5-321a-49e4-b860-708bc864327f";

  useEffect(() => {
    setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    
    // Load Cal.com script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", "get-started-with-ai-receptionist", {origin:"https://cal.com"});

    Cal.ns["get-started-with-ai-receptionist"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"week_view"});
    `;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  const handleVoiceChatClick = () => {
    setShowVoiceChatDialog(true);
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowVoiceChatDialog(false);
  };

  const handleStartCall = async () => {
    setIsSubmitting(true);
    try {
      const success = await initiateVapiCall(ASSISTANT_ID);
      if (success) {
        setIsCallActive(true);
        toast({
          title: "Call started successfully",
          description: "You're now connected to our AI receptionist.",
        });
      }
    } catch (error) {
      console.error("Failed to start call:", error);
      toast({
        title: "Failed to start call",
        description: error instanceof Error ? error.message : "Please check your microphone settings and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await stopVapiCall();
      toast({
        title: "Call ended",
        description: "Thank you for trying our AI receptionist.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
    }
  };

  const goToRealEstateSite = () => {
    navigate('/real-estate');
  };

  const handleTryVoiceDemo = () => {
    window.open('/real-estate', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a]">
      <Navbar />
      
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#7100ff]/10 blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-[#9b87f5]/10 blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#5c00d6]/15 blur-2xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className={`w-full transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <div className="space-y-6">
                <div className="relative">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Transform Your Business With{" "}
                    <div className="relative inline-block">
                      <span className="relative z-10 text-[#9b87f5]">AI Receptionists</span>
                      <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#7100ff]/30 to-[#9b87f5]/30 rounded-full z-0 blur-sm"></span>
                    </div>
                  </h1>
                </div>
                
                <p className="text-xl text-gray-300 relative z-10">
                  <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md mr-1">Powered_by</span>
                  : AI Receptionists. Automate phone calls, answer questions 24/7, and convert leads into customers. Perfect for businesses of all sizes.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
                    <Phone className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-medium text-lg">Never Miss a Call</h3>
                      <p className="text-gray-400 text-sm">Your AI receptionist answers every call 24/7</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-start space-x-3">
                    <Calendar className="text-[#9b87f5] h-6 w-6 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-medium text-lg">Automate Scheduling</h3>
                      <p className="text-gray-400 text-sm">Book appointments with calendar integration</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Button 
                    className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center justify-center"
                    onClick={() => setVideoOpen(true)}
                  >
                    Watch Overview
                  </Button>
                  
                  <Button 
                    className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white px-6 py-4 text-base rounded-md flex items-center justify-center border-2 border-white"
                    onClick={handleTryVoiceDemo}
                  >
                    Try Voice Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7100ff]/20 to-[#9b87f5]/20 rounded-3xl blur-lg transform -rotate-6"></div>
              <div className="relative bg-gradient-to-r from-[#1f1235] to-[#2a1d45] p-6 rounded-2xl border border-[#9b87f5]/30 shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7100ff] to-[#9b87f5] rounded-full flex items-center justify-center mr-4">
                    <Headset className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">AI Receptionist</h3>
                    <p className="text-gray-400 text-sm">24/7 Availability</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-[#13151a]/80 p-3 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      "Hello, thank you for calling! How may I assist you today?"
                    </p>
                  </div>
                  
                  <div className="bg-[#13151a]/80 p-3 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      "I can help you schedule an appointment or answer questions about our services."
                    </p>
                  </div>
                  
                  <div className="bg-[#13151a]/80 p-3 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      "Would you like me to check our availability for next week?"
                    </p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-[#7100ff] hover:bg-[#6342ff] text-white"
                  onClick={handleVoiceChatClick}
                >
                  Try Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-[#121212] via-[#151515] to-[#121212]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Business Benefits of AI Receptionists</h2>
          <p className="text-xl text-gray-300">
            Boost efficiency, reduce wait times, and enhance customer satisfaction—all with the power of a <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> AI Receptionist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70">
            <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Never Miss a Call</h3>
            <p className="text-gray-300">Your AI receptionist answers every call 24/7, ensuring no opportunity slips through the cracks.</p>
          </div>

          <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70">
            <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Save Hours Daily</h3>
            <p className="text-gray-300">Automate routine inquiries and appointment bookings while your team focuses on high-value tasks.</p>
          </div>

          <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70">
            <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Consistent Experience</h3>
            <p className="text-gray-300">Deliver the same high-quality professional greeting and service to every caller, every time.</p>
          </div>

          <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70">
            <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cost Effective</h3>
            <p className="text-gray-300">Reduce the need for multiple receptionists while maintaining exceptional service quality.</p>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Remarkably Human-like AI Receptionists for SMBs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
            <div className="mb-4">
              <Calendar className="w-10 h-10 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Automate Bookings & Reservations</h3>
            <p className="text-gray-400">Restaurants, salons, and service businesses can schedule appointments with zero hassle, eliminating scheduling conflicts.</p>
          </div>
          
          <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
            <div className="mb-4">
              <Phone className="w-10 h-10 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Inbound Call Automation</h3>
            <p className="text-gray-400">Handle high call volumes effortlessly with AI agents that answer calls instantly, reducing wait times and improving customer satisfaction.</p>
          </div>
          
          <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
            <div className="mb-4">
              <MessageCircle className="w-10 h-10 text-[#9b87f5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Answer Customer Questions</h3>
            <p className="text-gray-400">From product details to pricing, your AI receptionist has the answers to common questions, providing immediate assistance 24/7.</p>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-3">How quickly can I integrate AI with my phone system?</h3>
            <p className="text-gray-400">Most businesses are up and running within days. We integrate with most major business phone systems via API. If you have an older phone system, we can provide easy work-arounds.</p>
          </div>
          
          <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-3">Will the AI understand my industry terminology?</h3>
            <p className="text-gray-400">Yes! We train our AI Reception on the specifics of your business, how the calls typically flow when a human handles them, and your desired call outcomes.</p>
          </div>
          
          <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-3">Can I customize when calls transfer to human agents?</h3>
            <p className="text-gray-400">Absolutely. You set the rules for when and how calls are escalated to your team, based on criteria like customer value, issue complexity, or specific requests.</p>
          </div>
          
          <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-3">How does pricing work for an AI phone receptionist?</h3>
            <p className="text-gray-400">We offer flexible pricing models based on call volume and call workflow complexities. Pricing is designed for small businesses budgets.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Stop missing calls. Stop putting customers on hold.
          <br />
          Start impressing them from <span className="italic text-[#9b87f5]">Hello</span>.
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Boost efficiency, reduce wait times, and enhance customer satisfaction—all with the power of a <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> AI Receptionist.
        </p>
        <Button 
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md mx-auto"
          data-cal-link="team-powered-by-dfbtbb/get-started-with-ai-receptionist"
          data-cal-namespace="get-started-with-ai-receptionist"
          data-cal-config='{"layout":"month_view"}'
        >
          Schedule a Demo
        </Button>
      </section>

      <Dialog open={showVoiceChatDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-[#222222] text-white border-gray-800 sm:max-w-md">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage
                src="/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png"
                alt="AI Receptionist @ Powered_by Agency"
                className="object-cover"
              />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            
            <h2 className="text-3xl font-bold text-white text-center">
              Start Voice Chat with AI Receptionist
            </h2>
            
            <p className="text-gray-300 text-lg text-center">
              You'll be able to have a voice conversation with our AI receptionist directly through your browser. Please ensure your microphone is enabled and your speaker volume is turned on appropriately.
            </p>
            
            <p className="text-base text-gray-300">
              By clicking "Start Voice Chat", you consent to having a voice conversation with Powered_by's AI agent. You can end the conversation at any time.
            </p>
            
            {isCallActive ? (
              <div className="flex flex-col w-full space-y-4">
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span>Call Active</span>
                  </div>
                  <span>Voice Chat in Progress</span>
                </div>
                
                <Button 
                  onClick={handleEndCall}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                >
                  End Call
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 w-full">
                <Button 
                  onClick={handleCloseDialog}
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white text-lg py-6"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={goToRealEstateSite}
                  className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white text-lg py-6"
                >
                  Try Demo Now
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-1 bg-black">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/wCSt1ZTXJSc?si=A4PPY9idmpo&autoplay=1" 
              title="AI Receptionist Overview" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AIReceptionist;
