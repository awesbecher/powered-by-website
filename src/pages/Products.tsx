
import { useState, useEffect } from "react";
import { ServiceCard } from "@/components/products/ServiceCard";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductIndex } from "@/components/products/ProductIndex";
import { serviceCardsData } from "@/data/serviceCardsData";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import Navbar from "@/components/layout/Navbar";
import { SectionTitle } from "@/components/home/SectionTitle";
import { FeaturedSolutionCard } from "@/components/products/FeaturedSolutionCard";
import { MessageSquare, Phone, Mail, Smartphone, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OfferButton from "@/components/home/OfferButton";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  const handleContact = () => {
    navigate('/contact');
  };

  const featuredSolutions = [
    {
      title: "AI Voice Chat",
      description: "Deploy remarkably human-like voice agents into your existing website to automate 24/7 customer support, appointment bookings, or upsell/cross-sell campaigns.",
      icon: MessageSquare,
      link: "/voice-chat"
    },
    {
      title: "AI Receptionist",
      description: "Greet and manage callers to your business with voice AI. Automatically answer calls 24/7, handle any inquiry, book reservations, or take messages.",
      icon: Phone,
      link: "/ai-receptionist"
    },
    {
      title: "Email Agent",
      description: "Deploy autonomous email agents that think, write, and behave exactly as your most well-trained staff. Autonomously and securely handle follow-ups, inquiries, & customer workflows.",
      icon: Mail,
      link: "/email-agent"
    },
    {
      title: "Text Agent",
      description: "Automate your SMS text messaging with smart, human-like, and personalized texts that engage customers instantly. Save time, boost conversions, and scale—all securely, private, & compliant.",
      icon: Smartphone,
      link: "/text-agent"
    },
    {
      title: "Virtual SE",
      description: "Force-multiply your sales engineering team with AI pre-sales engineers that join unlimited meetings to provide technical support with minimal incremental expense.",
      icon: Cpu,
      link: "https://www.getvirtual.se",
      isExternal: true
    },
    {
      title: "OutboundAI",
      description: "Deploy AI agents to handle outbound sales calls at scale, booking more meetings and qualifying leads without expanding headcount or dealing with call reluctance.",
      icon: Phone,
      link: "/outbound-ai"
    }
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Background image at the top */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/lovable-uploads/1318bebd-9e04-4b11-9a98-a8c9b0843824.png" 
          alt="Tech workspace" 
          className="w-full h-[60vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 via-[#2f1c4a] to-[#1a0b2e]"></div>
      </div>

      {/* Content container with higher z-index */}
      <div className="relative z-10 min-h-screen">
        <Navbar />
        
        {/* New Offer Button */}
        <div className="w-full pt-6">
          <OfferButton className={`transition-all duration-1000 ease-out transform
            ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} />
        </div>
        
        <ProductsHero initialLoad={initialLoad} className="hero-section" />
        
        {/* Featured Agent Solutions Section - now directly after hero */}
        <div className="container mx-auto px-4 py-12">
          <SectionTitle title="Featured Agent Solutions:" linked={false} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {featuredSolutions.map((solution, index) => (
              <FeaturedSolutionCard
                key={index}
                title={solution.title}
                description={solution.description}
                icon={solution.icon}
                link={solution.link}
                isExternal={solution.isExternal}
              />
            ))}
          </div>
        </div>
        
        {/* Section Title for Industry Solutions - MOVED above ProductIndex */}
        <div className="container mx-auto px-4 py-6">
          <SectionTitle title="Horizontal & Vertical-Industry Solutions:" linked={false} />
        </div>
        
        <ProductIndex />
        
        {/* Detailed Solutions */}
        <div className="max-w-full pt-2">
          <div className="space-y-0 divide-y divide-white/10">
            {serviceCardsData.map((card, index) => (
              <div 
                key={index}
                id={`section-${index}`}
                className="scroll-mt-24"
              >
                <ServiceCard
                  title={
                    <>
                      <span className="font-bold text-white">{card.title.main}</span>{' '}
                      <span className="font-normal text-[#9b87f5]">{card.title.sub}</span>
                    </>
                  }
                  icon={card.icon}
                  description={card.description}
                  features={card.features}
                />
              </div>
            ))}
          </div>
        </div>

        <ClosingCTA onContactClick={handleContact} />

        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default Products;
