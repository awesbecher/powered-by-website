
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Phone, MessageSquare, ChartBar, Store, Utensils, GraduationCap, Wallet, Users, Globe, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";

interface AgentCard {
  name: string;
  industry: string;
  features: string[];
  template: string;
  icon: JSX.Element;
}

const agents: AgentCard[] = [
  {
    name: "Virtual Sales Rep",
    industry: "Auto Dealerships",
    features: [
      "24/7 Vehicle Info Support",
      "Lead Qualification & Appointment Setting",
      "Voice & Chat Capabilities",
      "Real-time Response System"
    ],
    template: "auto",
    icon: <Phone className="w-6 h-6 text-white" />
  },
  {
    name: "Automated Concierge",
    industry: "Hotels & Hospitality",
    features: [
      "24/7 Reservation Assistance",
      "Multi-Channel Support",
      "Real-time Availability Updates",
      "Instant Guest Responses"
    ],
    template: "hotel",
    icon: <CalendarClock className="w-6 h-6 text-white" />
  },
  {
    name: "Virtual Sales Agent",
    industry: "Real Estate",
    features: [
      "Multi-Channel Communication",
      "Automated Appointment Scheduling",
      "24/7 Listing Info",
      "Lead Follow-up"
    ],
    template: "realestate",
    icon: <MessageSquare className="w-6 h-6 text-white" />
  },
  {
    name: "Voice-Enabled Support",
    industry: "SaaS",
    features: [
      "Natural Language Understanding",
      "Smart Issue Escalation",
      "24/7 Technical Support",
      "In-App Voice Integration"
    ],
    template: "saas",
    icon: <User className="w-6 h-6 text-white" />
  },
  {
    name: "Inbound Funnel Qualifier",
    industry: "B2B Sales",
    features: [
      "Intelligent Lead Qualification",
      "Automated Proposal Generation",
      "Real-time Sales Routing",
      "Pain Point Discovery"
    ],
    template: "b2b",
    icon: <ChartBar className="w-6 h-6 text-white" />
  },
  {
    name: "Virtual Sales Associate",
    industry: "Retail",
    features: [
      "Product Recommendations",
      "Real-time Inventory Checks",
      "Voice & Chat Integration",
      "Personalized Shopping Help"
    ],
    template: "retail",
    icon: <Store className="w-6 h-6 text-white" />
  },
  {
    name: "Virtual Reservation Manager",
    industry: "Restaurants",
    features: [
      "Real-time Table Booking",
      "Waitlist Management",
      "Dietary Tracking",
      "Hours/Menu Info"
    ],
    template: "restaurant",
    icon: <Utensils className="w-6 h-6 text-white" />
  },
  {
    name: "Enrollment Assistant",
    industry: "Education",
    features: [
      "24/7 Enrollment Support",
      "Course Discovery",
      "Admission Guidance",
      "Tour Scheduling"
    ],
    template: "education",
    icon: <GraduationCap className="w-6 h-6 text-white" />
  },
  {
    name: "Q&A Agent",
    industry: "Finance & Insurance",
    features: [
      "Secure Data Handling",
      "Loan Eligibility Checks",
      "Policy & Product Info",
      "Account Setup Support"
    ],
    template: "finance",
    icon: <Wallet className="w-6 h-6 text-white" />
  },
  {
    name: "Onboarding & FAQ Agent",
    industry: "Internal HR",
    features: [
      "24/7 HR Support",
      "Benefits Info",
      "Automated Onboarding",
      "Company Policy Access"
    ],
    template: "hr",
    icon: <Users className="w-6 h-6 text-white" />
  },
  {
    name: "Global Customer Agent",
    industry: "Multilingual Support",
    features: [
      "Real-time Language Detection",
      "Seamless Switching",
      "Multi-Platform Deployment",
      "Cross-Cultural Communication"
    ],
    template: "multilingual",
    icon: <Globe className="w-6 h-6 text-white" />
  },
  {
    name: "Attendee Engagement Bot",
    industry: "Events",
    features: [
      "Automated Registration",
      "Session Recommendations",
      "Schedule Management",
      "Feedback Collection"
    ],
    template: "events",
    icon: <CalendarClock className="w-6 h-6 text-white" />
  }
];

const AgentMarketplace = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const staggerDelay = 0.1;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Navbar />

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-20 px-6 md:px-12 text-center max-w-5xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Choose Your Voice Agent.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Explore AI agent templates for every industry — deploy in minutes.
        </p>
        <Button 
          onClick={() => navigate("/agent-gpt-builder")}
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] px-8 py-6 rounded-md text-lg font-medium flex items-center gap-2 mx-auto"
        >
          Start Building <ArrowRight className="ml-1" />
        </Button>
      </motion.div>

      {/* Grid Section */}
      <motion.div
        ref={cardsRef}
        initial="hidden"
        animate="visible"
        className="px-6 md:px-12 lg:px-24 pb-24 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="w-12 h-12 bg-[#8B5CF6] rounded-full flex items-center justify-center mb-5">
                {agent.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-1">{agent.name}</h3>
              <p className="text-purple-300 mb-4 text-sm italic">{agent.industry}</p>
              <ul className="mb-6 space-y-2">
                {agent.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <div className="mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate(`/agent-gpt-builder?template=${agent.template}`)}
                className="w-full bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/50 text-white"
              >
                View Setup
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default AgentMarketplace;
