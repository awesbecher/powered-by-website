import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { ServiceCard } from "@/components/products/ServiceCard";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductIndex } from "@/components/products/ProductIndex";
import { serviceCardsData } from "@/data/serviceCardsData";
import { SectionTitle } from "@/components/home/SectionTitle";
import { FeaturedSolutionCard } from "@/components/products/FeaturedSolutionCard";
import { MessageSquare, Phone, Mail, Smartphone, Cpu } from "lucide-react";
import Link from 'next/link';
import OfferButton from "@/components/home/OfferButton";
import { getCalApi } from "@calcom/embed-react";
import CTASection from "@/components/pricing/CTASection";
import { motion } from "framer-motion";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
      });
    })();
  }, []);

  const handleScroll = () => {
    if (!sectionsRef.current) return;

    const sections = sectionsRef.current.querySelectorAll("section");
    let currentSection = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderIcon = (Icon: typeof Phone | typeof MessageSquare | typeof Mail | typeof Smartphone | typeof Cpu) => (
    <Icon className="w-6 h-6 text-white" />
  );

  return (
    <PageLayout>
      <div className="relative">
        <ProductsHero />
        
        <div className="container mx-auto px-4 py-16">
          <ProductIndex activeSection={activeSection} />
          
          <div ref={sectionsRef}>
            {/* Voice Chat Section */}
            <section id="voice-chat" className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <SectionTitle
                  title="Voice Chat AI"
                  subtitle="Natural conversations with your customers"
                  className="text-center mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeaturedSolutionCard
                    title="Auto Dealer Voice Agent"
                    description="24/7 customer service for dealerships. Handle inquiries, schedule test drives, and qualify leads automatically."
                    icon={renderIcon(Phone)}
                    link="/auto-dealer"
                  />
                  <FeaturedSolutionCard
                    title="Real Estate Voice Agent"
                    description="Automate property inquiries, schedule viewings, and qualify potential buyers with AI-powered conversations."
                    icon={renderIcon(Phone)}
                    link="/real-estate"
                  />
                  <FeaturedSolutionCard
                    title="Room Service Voice Agent"
                    description="Streamline hotel room service orders with a voice AI that understands guest requests and manages orders efficiently."
                    icon={renderIcon(Phone)}
                    link="/room-service"
                  />
                </div>
              </motion.div>
            </section>

            {/* Chat Section */}
            <section id="chat" className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <SectionTitle
                  title="Chat AI"
                  subtitle="Instant responses to customer inquiries"
                  className="text-center mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeaturedSolutionCard
                    title="Customer Support Chat"
                    description="Provide instant support to your customers with an AI that understands their needs and resolves issues quickly."
                    icon={renderIcon(MessageSquare)}
                    link="/customer-support"
                  />
                  <FeaturedSolutionCard
                    title="Sales Chat"
                    description="Convert more leads with an AI sales agent that qualifies prospects and schedules meetings with your team."
                    icon={renderIcon(MessageSquare)}
                    link="/sales"
                  />
                  <FeaturedSolutionCard
                    title="FAQ Chat"
                    description="Answer common questions instantly with an AI that learns from your knowledge base and documentation."
                    icon={renderIcon(MessageSquare)}
                    link="/faq"
                  />
                </div>
              </motion.div>
            </section>

            {/* Email Section */}
            <section id="email" className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <SectionTitle
                  title="Email AI"
                  subtitle="Automated email communication"
                  className="text-center mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeaturedSolutionCard
                    title="Email Response"
                    description="Automate email responses with an AI that understands context and maintains your brand voice."
                    icon={renderIcon(Mail)}
                    link="/email-response"
                  />
                  <FeaturedSolutionCard
                    title="Lead Generation"
                    description="Generate and nurture leads through personalized email campaigns powered by AI."
                    icon={renderIcon(Mail)}
                    link="/lead-generation"
                  />
                  <FeaturedSolutionCard
                    title="Email Support"
                    description="Handle support tickets efficiently with AI-powered email responses and ticket routing."
                    icon={renderIcon(Mail)}
                    link="/email-support"
                  />
                </div>
              </motion.div>
            </section>

            {/* Text Section */}
            <section id="text" className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <SectionTitle
                  title="Text AI"
                  subtitle="SMS and messaging solutions"
                  className="text-center mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeaturedSolutionCard
                    title="SMS Support"
                    description="Provide instant support through text messages with an AI that understands customer needs."
                    icon={renderIcon(Smartphone)}
                    link="/sms-support"
                  />
                  <FeaturedSolutionCard
                    title="Appointment Reminders"
                    description="Reduce no-shows with automated SMS reminders and confirmations."
                    icon={renderIcon(Smartphone)}
                    link="/appointment-reminders"
                  />
                  <FeaturedSolutionCard
                    title="Order Updates"
                    description="Keep customers informed with automated order status updates via text message."
                    icon={renderIcon(Smartphone)}
                    link="/order-updates"
                  />
                </div>
              </motion.div>
            </section>

            {/* Custom AI Section */}
            <section id="custom" className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <SectionTitle
                  title="Custom AI Solutions"
                  subtitle="Tailored to your specific needs"
                  className="text-center mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeaturedSolutionCard
                    title="Custom Integration"
                    description="Integrate AI into your existing systems with custom solutions built for your needs."
                    icon={renderIcon(Cpu)}
                    link="/custom-integration"
                  />
                  <FeaturedSolutionCard
                    title="Industry Solutions"
                    description="AI solutions tailored to your industry's specific requirements and challenges."
                    icon={renderIcon(Cpu)}
                    link="/industry-solutions"
                  />
                  <FeaturedSolutionCard
                    title="Enterprise AI"
                    description="Large-scale AI solutions for enterprise organizations with complex needs."
                    icon={renderIcon(Cpu)}
                    link="/enterprise"
                  />
                </div>
              </motion.div>
            </section>
          </div>
        </div>

        <CTASection />
      </div>
    </PageLayout>
  );
};

export default Products;
