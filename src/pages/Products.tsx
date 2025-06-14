import { useState, useEffect, useRef } from "react";
import { SEO } from "@/components/shared/SEO";
import { ServiceCard } from "@/components/products/ServiceCard";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductIndex } from "@/components/products/ProductIndex";
import { serviceCardsData } from "@/data/serviceCardsData";
import Navbar from "@/components/layout/Navbar";
import { SectionTitle } from "@/components/home/SectionTitle";
import { FeaturedSolutionCard } from "@/components/products/FeaturedSolutionCard";
import { MessageSquare, Phone, Mail, Smartphone, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OfferButton from "@/components/home/OfferButton";
import CTASection from "@/components/pricing/CTASection";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useCalendarInitialization, openCalendarModal } from "@/utils/calendarUtils";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Use the centralized calendar initialization hook
  useCalendarInitialization();

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
    
    // Save current scroll position in history state
    const currentState = window.history.state || {};
    window.history.replaceState(
      { ...currentState, scrollY: window.scrollY },
      document.title
    );
    
    // Handle popstate (back/forward navigation)
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.scrollY !== undefined) {
        window.scrollTo(0, event.state.scrollY);
      } else {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionsRef.current) return;
      
      const sections = sectionsRef.current.querySelectorAll('[id^="section-"]');
      const scrollPosition = window.scrollY + 200; // Offset for sticky header
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.id.replace('section-', '');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContact = () => {
    console.log("Contact button clicked in Products");
    // Use the centralized openCalendarModal function
    if (!openCalendarModal("team-powered-by-dfbtbb/get-started-today")) {
      console.error("Cal.com button not found in DOM from Products page, navigating to /contact as fallback");
      navigate('/contact');
    }
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
      link: "https://tryoutbound.ai",
      isExternal: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const productsFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the Text Agent AI work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Text Agent uses advanced natural language processing to engage in human-like text conversations with your leads and customers. It can personalize messages, respond to inquiries, follow up automatically, and even qualify leads based on their responses. The AI continuously learns from interactions to improve its effectiveness over time."
        }
      },
      {
        "@type": "Question",
        "name": "Which CRM systems can Text Agent integrate with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Text Agent seamlessly integrates with major CRM platforms including Salesforce, HubSpot, Zoho, Microsoft Dynamics, and Pipedrive. We also offer custom API integration for proprietary CRM systems. All integration options maintain data synchronization in real-time."
        }
      },
      {
        "@type": "Question",
        "name": "Is Text Agent compliant with messaging regulations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our platform is built with TCPA, GDPR, and other messaging compliance regulations in mind. We include features like automatic opt-out processing, consent management, and message frequency controls to ensure your campaigns remain compliant with industry regulations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I personalize messages for different customer segments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Text Agent allows you to create personalized messaging templates based on demographic data, behavior patterns, past interactions, and CRM data. You can segment your audience and tailor messaging strategies for each group, ensuring relevant communication that drives engagement."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I get started with Text Agent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most businesses can be up and running with Text Agent in less than a day. Our onboarding process includes CRM integration, initial campaign setup, and strategy consultation. For more complex implementations or custom integrations, the timeline may extend to several days."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of reporting and analytics does Text Agent provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our platform offers comprehensive analytics including message delivery rates, response rates, conversion metrics, engagement analytics, and campaign performance data. You can access real-time dashboards and scheduled reports to track ROI and optimize your text messaging strategy."
        }
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AI Agent Solutions",
    "image": "https://www.poweredby.agency/images/ai-agent-solutions.jpg",
    "description": "Custom AI agents designed to automate and optimize business operations across various industries including automotive, SaaS, insurance, real estate, and hospitality.",
    "brand": {
      "@type": "Organization",
      "name": "Powered By Agency"
    },
    "sku": "AIAGENT001",
    "offers": {
      "@type": "Offer",
      "url": "https://www.poweredby.agency/products",
      "priceCurrency": "USD",
      "price": "299",
      "priceValidUntil": "2025-12-31",
      "eligibleRegion": {
        "@type": "Place",
        "name": "Global"
      },
      "seller": {
        "@type": "Organization",
        "name": "Powered By Agency"
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <SEO
        title="AI Agent Solutions for SMBs | Automated AI Voice, Email, & SMS-Text"
        description="Discover how AI agents can automate customer engagement, streamline operations, and enhance efficiency across voice, email, and SMS."
        canonical="https://www.poweredby.agency/products"
        faqSchema={{
          ...productsFaqSchema,
          additionalSchemas: [productSchema]
        }}
      />
      <div className="relative z-10 min-h-screen">
        <Navbar />
        
        <div className="w-full pt-6">
          <OfferButton className={`transition-all duration-1000 ease-out transform
            ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} />
        </div>
        
        <ProductsHero initialLoad={initialLoad} className="hero-section" />
        
        <div className="sticky top-0 z-30 bg-[#1a0b2e]/90 backdrop-blur-md border-b border-[#9b87f5]/20 py-3">
          <ProductIndex activeSection={activeSection} />
        </div>
        
        <motion.div 
          className="container mx-auto px-4 py-12 md:py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          id="featured-solutions"
        >
          <motion.div variants={itemVariants}>
            <SectionTitle title="Featured Agent Solutions:" linked={false} />
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredSolutions.map((solution, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeaturedSolutionCard
                  title={solution.title}
                  description={solution.description}
                  icon={solution.icon}
                  link={solution.link}
                  isExternal={solution.isExternal}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <div className="container mx-auto px-4 py-6">
          <SectionTitle title="Horizontal & Vertical-Industry Solutions:" linked={false} />
        </div>
        
        <div ref={sectionsRef} className="max-w-full pt-2">
          <div className="space-y-0 divide-y divide-white/10">
            {serviceCardsData.map((card, index) => (
              <motion.div 
                key={index}
                id={`section-${index}`}
                className="scroll-mt-36"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
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
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 mb-8">
          <CTASection />
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Products;
