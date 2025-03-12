
import { useState, useEffect } from "react";
import { ServiceCard } from "@/components/products/ServiceCard";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductIndex } from "@/components/products/ProductIndex";
import { serviceCardsData } from "@/data/serviceCardsData";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import Navbar from "@/components/layout/Navbar";
import { SectionTitle } from "@/components/home/SectionTitle";
import { FeaturedSolutionCard } from "@/components/products/FeaturedSolutionCard";
import { MessageSquare, Phone, Mail, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <ProductsHero initialLoad={initialLoad} className="hero-section" />
      
      <ProductIndex />
      
      {/* Featured Agent Solutions Section - Reduced padding */}
      <div className="container mx-auto px-4 py-6">
        <SectionTitle title="Featured Agent Solutions:" linked={false} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
          {featuredSolutions.map((solution, index) => (
            <FeaturedSolutionCard
              key={index}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              link={solution.link}
            />
          ))}
        </div>
      </div>

      {/* Detailed Solutions */}
      <div className="max-w-full pt-8">
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
                onContactClick={handleContact}
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
  );
};

export default Products;
