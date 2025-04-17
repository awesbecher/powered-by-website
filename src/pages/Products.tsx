
import { useState, useEffect, useRef } from "react";
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
import { getCalApi } from "@calcom/embed-react";
import CTASection from "@/components/pricing/CTASection";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
    
    (async function () {
      try {
        console.log("Initializing Cal.com embed at Products page level");
        const cal = await getCalApi({"namespace":"get-started-today"});
        cal("ui", {
          "cssVarsPerTheme": {
            "light": {"cal-brand":"#292929"},
            "dark": {"cal-brand":"#fafafa"}
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
        console.log("Cal.com embed initialized successfully at Products page level");
      } catch (error) {
        console.error("Error initializing Cal.com embed at Products page level:", error);
      }
    })();
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
    
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found in Products, triggering click");
      calBtn.click();
    } else {
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

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
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
        
        <button
          data-cal-namespace="get-started-today"
          data-cal-link="team-powered-by-dfbtbb/get-started-today"
          data-cal-config='{"layout":"month_view"}'
          className="hidden"
        ></button>
        
        <Footer />
      </div>
    </div>
  );
};

export default Products;
