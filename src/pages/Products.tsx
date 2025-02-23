
import { Car, Hotel, Users, HeadphonesIcon, Building2, Check, Mail, Phone, MessageSquare, BrainCircuit, Bot, Workflow, MessagesSquare, HeartHandshake, Network, Database, Code2, Rocket, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { WordAnimation } from "@/components/home/WordAnimation";
import { ServiceCard } from "@/components/products/ServiceCard";

const Products = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 
              className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              <WordAnimation />
              AI Solutions{" "}
              <span className="text-[#9b87f5]">
                Portfolio
              </span>
            </h1>
            
            <p 
              className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              Discover our comprehensive range of pre-built AI solutions designed to transform your business operations. Each solution is customizable to meet your specific needs.
            </p>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-full pt-24">
        <div className="space-y-0 divide-y divide-white/10">
          <ServiceCard
            title={<>
              <span className="font-bold text-white">Auto Dealerships:</span>{' '}
              <span className="font-normal text-[#9b87f5]">Virtual Sales Rep</span>
            </>}
            icon={Car}
            description="Designed for auto dealer websites and social media channels, we provide voice agents to answers questions about vehicle models, financing options, and dealer promotions. It can operate as an in-bound phone agent or as an outbound call sales associate."
            features={[
              "24/7 Vehicle Information Support",
              "Lead Qualification & Appointment Setting",
              "Voice & Chat Capabilities",
              "Real-time Response System"
            ]}
          />
          
          <ServiceCard
            title={<>
              <span className="font-bold text-white">Hotels & Hospitality:</span>{' '}
              <span className="font-normal text-[#9b87f5]">Automated Concierge</span>
            </>}
            icon={Hotel}
            description="Ideal for hotel websites, travel booking portals, and messaging apps, this agent offers reservation assistance, pricing quotes, and amenity details. Acting as a voice agent for phone calls or embedded into a chatbot, it can handle multiple inquiries simultaneously, reducing wait times for potential guests."
            features={[
              "24/7 Reservation Assistance",
              "Multi-Channel Support",
              "Real-time Availability Updates",
              "Instant Response to Guest Inquiries"
            ]}
          />

          <ServiceCard
            title={<>
              <span className="font-bold text-white">Real Estate Firms:</span>{' '}
              <span className="font-normal text-[#9b87f5]">Virtual Sales Agent</span>
            </>}
            icon={Building2}
            description="With modes for voice, SMS text, or email, this agent fields questions about listings, property details, and pricing. It can also coordinate property viewings by syncing with agents' calendars and sending appointment reminders."
            features={[
              "Multi-Channel Communication",
              "Automated Appointment Scheduling",
              "24/7 Property Information",
              "Lead Qualification & Follow-up"
            ]}
          />

          <ServiceCard
            title={<>
              <span className="font-bold text-white">SaaS Companies:</span>{' '}
              <span className="font-normal text-[#9b87f5]">Voice-Enabled Support</span>
            </>}
            icon={HeadphonesIcon}
            description="Deployed through phone lines or even inside your app, this solution helps users troubleshoot issues, run diagnostics, and escalate complex problems. It understands natural speech patterns, making tech support feel more personal and less intimidating."
            features={[
              "24/7 Technical Support",
              "Natural Language Understanding",
              "Smart Issue Escalation",
              "In-App Voice Integration"
            ]}
          />

          <ServiceCard
            title={<>
              <span className="font-bold text-white">B2B Sales:</span>{' '}
              <span className="font-normal text-[#9b87f5]">Inbound Funnel Qualifier</span>
            </>}
            icon={Users}
            description="Deployed on your website, this agent engages inbound leads, identifies pain points, and routes high-intent prospects to human sales reps. Working as a voice agent, it can deliver the most human-like verbal product overviews, collect important business details, and even auto-generate proposals for rapid follow-up."
            features={[
              "Intelligent Lead Qualification",
              "Automated Proposal Generation",
              "Real-time Sales Rep Routing",
              "Pain Point Analysis"
            ]}
          />
        </div>
      </div>

      {/* Gradient orbs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Products;
