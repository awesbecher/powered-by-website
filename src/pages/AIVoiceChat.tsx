
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MessageCircle, Settings, Clock, Shield, Phone, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AIVoiceChat = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    navigate("/contact");
    toast({
      title: "Good choice!",
      description: "You're one step closer to implementing AI voice chat."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#0f0f0f]">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className={`w-full lg:w-1/2 space-y-8 transition-all duration-1000 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your Website With <span className="text-[#9b87f5]">AI Voice Chat</span>
            </h1>
            <p className="text-xl text-gray-300">
              Engage visitors in natural conversations that convert. Our AI voice integration creates human-like interactions without hiring a call center.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md"
                onClick={handleContact}
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="gradient"
                className="text-white px-8 py-6 text-lg rounded-md"
                onClick={() => navigate("/demo")}
              >
                See Live Demo
              </Button>
            </div>
          </div>
          <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9b87f5] to-purple-600 rounded-lg blur-lg opacity-75"></div>
              <div className="relative bg-black rounded-lg overflow-hidden border border-gray-800">
                <div className="p-6">
                  <img 
                    src="/lovable-uploads/2d521c8d-084d-4a87-8491-cb795033a1d6.png" 
                    alt="AI Voice Chat Interface" 
                    className="w-full h-auto rounded-md shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Powerful Voice AI Features For Your Business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Mic className="w-10 h-10 text-[#9b87f5]" />}
            title="Natural Voice Interactions"
            description="AI that speaks and listens naturally, creating comfortable conversations with your customers." 
          />
          <FeatureCard 
            icon={<MessageCircle className="w-10 h-10 text-[#9b87f5]" />}
            title="Omnichannel Support"
            description="Integrate voice AI with your existing chat, phone, and messaging platforms." 
          />
          <FeatureCard 
            icon={<Settings className="w-10 h-10 text-[#9b87f5]" />}
            title="Easy Setup"
            description="Simple integration with your website - no coding required. Be up and running in hours, not months." 
          />
          <FeatureCard 
            icon={<Clock className="w-10 h-10 text-[#9b87f5]" />}
            title="24/7 Availability"
            description="Your AI voice assistant never sleeps, ensuring your customers get help anytime they need it." 
          />
          <FeatureCard 
            icon={<Shield className="w-10 h-10 text-[#9b87f5]" />}
            title="Data Security"
            description="Enterprise-grade security to protect customer conversations and sensitive information." 
          />
          <FeatureCard 
            icon={<Phone className="w-10 h-10 text-[#9b87f5]" />}
            title="Call Handling"
            description="Manage inbound calls, schedule appointments, qualify leads, and transfer to human agents when needed." 
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#121218] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            Why Businesses Choose Our Voice AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <BenefitItem 
                number="01"
                title="Reduce Support Costs"
                description="Cut customer service costs by up to 60% while improving service quality and availability."
              />
              <BenefitItem 
                number="02"
                title="Increase Conversion Rates"
                description="Engage website visitors with interactive voice experiences that convert up to 30% better than static forms."
              />
              <BenefitItem 
                number="03"
                title="Gather Rich Customer Data"
                description="Collect actionable insights from voice conversations to improve your products and services."
              />
            </div>
            <div className="space-y-12">
              <BenefitItem 
                number="04"
                title="Scale Your Team Instantly"
                description="Handle peak demand periods without hiring additional staff. Your AI assistant scales with your business."
              />
              <BenefitItem 
                number="05"
                title="Enhance Customer Experience"
                description="Create memorable interactions that build trust and loyalty with your brand."
              />
              <BenefitItem 
                number="06"
                title="Automate Routine Tasks"
                description="Free your human team to focus on complex problems while AI handles frequent inquiries."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
          Trusted By Forward-Thinking Companies
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Join hundreds of businesses already using our AI voice technology to transform customer interactions
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex justify-center">
              <div className="h-12 w-40 bg-gray-800/50 rounded-md flex items-center justify-center">
                <span className="text-gray-500 font-semibold">LOGO {i}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff] to-[#a87cff] opacity-90"></div>
          <div className="relative z-10 px-8 py-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Add Voice AI to Your Website?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Book a free consultation with our solutions team to learn how voice AI can transform your customer interactions.
            </p>
            <Button 
              className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
              onClick={handleContact}
            >
              Schedule Your Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FAQItem 
            question="How quickly can I implement voice AI on my website?"
            answer="Most businesses are up and running within 1-2 weeks. Simple implementations can be completed in as little as 48 hours." 
          />
          <FAQItem 
            question="Will the AI understand my industry terminology?"
            answer="Yes! We train your AI on your specific industry, products, and services to ensure accurate and relevant conversations." 
          />
          <FAQItem 
            question="How does pricing work for voice AI?"
            answer="We offer flexible pricing based on conversation volume. Monthly plans start at $299 with options to scale as your needs grow." 
          />
          <FAQItem 
            question="Can I customize the voice and personality of the AI?"
            answer="Absolutely. Choose from various voice options or create a custom voice that matches your brand identity perfectly." 
          />
          <FAQItem 
            question="What languages are supported?"
            answer="Our voice AI currently supports 25+ languages including English, Spanish, French, German, Portuguese, Japanese, and Mandarin." 
          />
          <FAQItem 
            question="How does the AI handle complex customer inquiries?"
            answer="The AI can handle most routine questions and tasks. For complex situations, it can seamlessly transfer to a human agent." 
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Transform Your Customer Experience Today
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Join the businesses revolutionizing customer interactions with AI voice technology.
        </p>
        <Button 
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-8 py-6 text-lg rounded-md mx-auto"
          onClick={handleContact}
        >
          Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>
    </div>
  );
};

// Component for feature cards
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// Component for benefit items
const BenefitItem = ({ number, title, description }: { number: string, title: string, description: string }) => {
  return (
    <div className="flex gap-6">
      <div className="text-3xl font-bold text-[#9b87f5]">{number}</div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

// Component for FAQ items
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  return (
    <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800">
      <h3 className="text-lg font-bold text-white mb-3">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

export default AIVoiceChat;
