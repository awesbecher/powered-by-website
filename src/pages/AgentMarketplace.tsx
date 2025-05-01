import React, { ReactNode, useState, useEffect } from 'react';
import PageLayout from "@/components/layout/PageLayout";
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
  icon: ReactNode;
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
    categories: ["Sales", "Automotive"]
  },
  {
    name: "Property Assistant",
    industry: "Real Estate",
    features: [
      "Property Listings Management",
      "Viewing Scheduling",
      "Lead Qualification",
      "Market Analysis Support"
    ],
    template: "realestate",
    icon: <Store className="w-6 h-6 text-white" />,
    categories: ["Real Estate", "Sales"]
  },
  {
    name: "Room Service Agent",
    industry: "Hospitality",
    features: [
      "Order Taking & Processing",
      "Menu Information",
      "Special Requests Handling",
      "Delivery Status Updates"
    ],
    template: "roomservice",
    icon: <Utensils className="w-6 h-6 text-white" />,
    categories: ["Hospitality", "Customer Service"]
  },
  {
    name: "AI Receptionist",
    industry: "General Business",
    features: [
      "Call Routing",
      "Appointment Scheduling",
      "Basic Inquiries Handling",
      "Message Taking"
    ],
    template: "receptionist",
    icon: <User className="w-6 h-6 text-white" />,
    categories: ["Business Services", "Customer Service"]
  },
  {
    name: "Support Agent",
    industry: "Customer Service",
    features: [
      "Technical Support",
      "Issue Resolution",
      "Product Information",
      "Escalation Management"
    ],
    template: "support",
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    categories: ["Customer Service", "Technical"]
  }
];

const categories = [
  "All",
  "Sales",
  "Customer Service",
  "Automotive",
  "Real Estate",
  "Hospitality",
  "Business Services",
  "Technical"
];

const AgentMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || agent.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4"
          >
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                AI Agent Marketplace
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                Discover and deploy pre-built AI agents tailored for your industry needs.
                Get started with customizable templates designed for specific business use cases.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 w-full"
                  />
                </div>
                <Button variant="outline" className="md:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <CustomBadge
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    active={selectedCategory === category}
                    className="cursor-pointer"
                  >
                    {category}
                  </CustomBadge>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Agents Grid */}
        <section className="py-20 bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="block h-full">
                    <div className="group relative h-full bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {agent.icon}
                        </div>
                        <Badge variant="secondary" className="bg-white/10 text-white">
                          {agent.industry}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{agent.name}</h3>
                      <ul className="space-y-2 mb-4">
                        {agent.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-300">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Choose Our AI Agents?
              </h2>
              <p className="text-xl text-gray-300">
                Get started quickly with pre-built solutions designed for your industry
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/5 p-6 rounded-lg mb-4 inline-block">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Pre-trained Models</h3>
                <p className="text-gray-300">Ready-to-use AI agents with industry-specific knowledge</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/5 p-6 rounded-lg mb-4 inline-block">
                  <CalendarClock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quick Deployment</h3>
                <p className="text-gray-300">Set up and start using your AI agent in minutes</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/5 p-6 rounded-lg mb-4 inline-block">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
                <p className="text-gray-300">AI agents that improve with every interaction</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/5 p-6 rounded-lg mb-4 inline-block">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Scalable Solution</h3>
                <p className="text-gray-300">Grow and adapt your AI agents as your business expands</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AgentMarketplace;
