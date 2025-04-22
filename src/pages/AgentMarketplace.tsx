import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CustomBadge from "@/components/ui/custom-badge";
import { 
  ArrowRight, 
  Bot, 
  CalendarClock, 
  BarChart, 
  CheckCircle, 
  Filter, 
  GraduationCap, 
  Globe, 
  MessageSquare, 
  Phone, 
  Search, 
  Store, 
  User, 
  Users, 
  Utensils, 
  Wallet
} from "lucide-react";
import { motion } from "framer-motion";

interface AgentCard {
  name: string;
  industry: string;
  features: string[];
  template: string;
  icon: JSX.Element;
  categories: string[];
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
    icon: <Phone className="w-6 h-6 text-white" />,
    categories: ["voice", "sales", "automotive"]
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
    icon: <CalendarClock className="w-6 h-6 text-white" />,
    categories: ["voice", "chat", "hospitality"]
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
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    categories: ["voice", "chat", "real estate", "sales"]
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
    icon: <User className="w-6 h-6 text-white" />,
    categories: ["voice", "support", "technology"]
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
    icon: <BarChart className="w-6 h-6 text-white" />,
    categories: ["chat", "sales", "outbound"]
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
    icon: <Store className="w-6 h-6 text-white" />,
    categories: ["voice", "chat", "retail", "sales"]
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
    icon: <Utensils className="w-6 h-6 text-white" />,
    categories: ["voice", "chat", "hospitality"]
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
    icon: <GraduationCap className="w-6 h-6 text-white" />,
    categories: ["chat", "support", "education"]
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
    icon: <Wallet className="w-6 h-6 text-white" />,
    categories: ["chat", "support", "finance"]
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
    icon: <Users className="w-6 h-6 text-white" />,
    categories: ["chat", "support", "internal"]
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
    icon: <Globe className="w-6 h-6 text-white" />,
    categories: ["voice", "chat", "support", "global"]
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
    icon: <CalendarClock className="w-6 h-6 text-white" />,
    categories: ["chat", "events", "sales"]
  }
];

const AgentMarketplace = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filteredAgents, setFilteredAgents] = useState<AgentCard[]>(agents);
  
  const categories = ["voice", "chat", "outbound", "sales", "support"];

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = [...agents];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        agent => 
          agent.name.toLowerCase().includes(query) || 
          agent.industry.toLowerCase().includes(query) ||
          agent.features.some(feature => feature.toLowerCase().includes(query))
      );
    }
    
    if (filterCategory) {
      result = result.filter(agent => 
        agent.categories.includes(filterCategory.toLowerCase())
      );
    }
    
    setFilteredAgents(result);
  }, [searchQuery, filterCategory]);

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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 px-6 md:px-12 text-center max-w-5xl mx-auto"
      >
        <div className="inline-block mb-6">
          <CustomBadge className="px-3 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30 text-sm font-medium rounded-full flex items-center gap-1.5">
            <Bot size={14} />
            Agent Templates
          </CustomBadge>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Choose Your Voice Agent Template
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Explore AI agent templates for every industry — deploy in minutes.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text"
                placeholder="Search templates..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white rounded-full"
              />
            </div>
            <Button 
              onClick={() => navigate("/agent-gpt-builder")}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-full"
            >
              Create Custom Agent <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <CustomBadge 
                key={category}
                className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer ${
                  filterCategory === category 
                  ? 'bg-[#8B5CF6] text-white border-transparent' 
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setFilterCategory(filterCategory === category ? null : category)}
              >
                {filterCategory === category && <CheckCircle className="mr-1" size={12} />}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </CustomBadge>
            ))}
            {filterCategory && (
              <CustomBadge 
                className="px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                onClick={() => setFilterCategory(null)}
              >
                Clear Filter
              </CustomBadge>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="px-6 md:px-12 lg:px-24 pb-24 max-w-7xl mx-auto"
      >
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent, index) => (
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
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.categories.map((category, idx) => (
                    <Badge key={idx} className="bg-white/10 text-gray-300 border-white/5 px-2 text-xs">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={() => navigate(`/agent-gpt-builder?template=${agent.template}`)}
                  className="w-full bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/50 text-white"
                >
                  View Setup
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bot size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">No agents found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setFilterCategory(null);
              }}
              variant="outline"
              className="border-white/20 hover:border-white/50"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </motion.div>

      <Footer />
    </div>
  );
};

export default AgentMarketplace;
