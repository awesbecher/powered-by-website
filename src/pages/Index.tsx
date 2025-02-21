
import { WordAnimation } from "@/components/home/WordAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Bot, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Logo */}
      <div className="absolute top-6 right-6 lg:right-8">
        <img 
          src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
          alt="Parlar Logo"
          className="w-[192px] lg:w-[288px] h-auto"
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              <WordAnimation />
              Automation{" "}
              <span className="text-white">
                Simplified
              </span>
            </h1>
            
            {/* Value Proposition */}
            <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empower your business with intelligent AI agents that handle customer interactions across all channels - voice, email, SMS, chat, and more.
            </p>
            
            {/* CTA Button */}
            <div className="mt-10">
              <Link to="/demo">
                <Button className="bg-accent hover:bg-accent-dark text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105">
                  See Our Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            {
              icon: Building2,
              title: "Built for SMBs",
              description: "Tailored automation solutions for businesses with 5-250 employees"
            },
            {
              icon: Bot,
              title: "Multi-Channel AI",
              description: "Voice, email, SMS, Slack, chat, and document automation"
            },
            {
              icon: Clock,
              title: "24/7 Availability",
              description: "Instant responses across all communication channels"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-xl text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>

      {/* Integrations Grid Section */}
      <div className="relative px-6 lg:px-8 py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Connect your intelligent AI agents to hundreds of apps & systems
          </h2>
          
          {/* Apps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-4xl mx-auto mb-12">
            {[
              {
                path: "/lovable-uploads/2035fcd4-8b92-4f84-ad1e-c4ecae819711.png",
                name: "Slack"
              },
              {
                path: "/lovable-uploads/5b3d5137-838b-44a5-8f54-bb2a4cb7dc5a.png",
                name: "Microsoft Teams"
              },
              {
                path: "/lovable-uploads/a03fe01f-a020-43b3-a46c-2fda077f0baf.png",
                name: "Gmail"
              },
              {
                path: "/lovable-uploads/860a3675-3fea-42c8-9967-63f4048af67f.png",
                name: "Outlook"
              },
              {
                path: "/lovable-uploads/994965fb-70d5-436c-8d42-8377d9d8d3bd.png",
                name: "WhatsApp"
              },
              {
                path: "/lovable-uploads/419d1e06-4c6b-4d9c-8bc7-a8f2fb198d28.png",
                name: "Telegram"
              },
              {
                path: "/lovable-uploads/1b808953-0aa3-4587-ae4b-8ecef7d13cce.png",
                name: "Twilio"
              },
              {
                path: "/lovable-uploads/fb2b365b-82f1-49db-9f01-3400903c0199.png",
                name: "Vonage"
              },
              {
                path: "/lovable-uploads/e305eace-d64d-4437-9d8e-533d49b3d934.png",
                name: "RingCentral"
              },
              {
                path: "/lovable-uploads/dd51c971-3ffc-4f39-900e-81be1ba6f99c.png",
                name: "Zoom Phone"
              },
              {
                path: "/lovable-uploads/57b14d49-eab1-4dd2-827d-dceb363f5514.png",
                name: "Stripe"
              },
              {
                path: "/lovable-uploads/dfa6c12a-d0aa-4b21-bca9-73cf4b428400.png",
                name: "PayPal"
              },
              {
                path: "/lovable-uploads/f61255a3-5368-4739-a068-ec3431ea636f.png",
                name: "Zendesk"
              },
              {
                path: "/lovable-uploads/ba7183d3-c2d6-46b1-b51e-afa9de2b5af2.png",
                name: "Jira"
              },
              {
                path: "/lovable-uploads/8505af38-6a90-44dc-b6bc-554d254475ea.png",
                name: "Google"
              },
              {
                path: "/lovable-uploads/e504e0c0-aac1-498a-9e32-e6e42a133dee.png",
                name: "Dialpad"
              },
              {
                path: "/lovable-uploads/92d1275c-847a-49ad-a297-792c7bf899a7.png",
                name: "Dropbox"
              },
              {
                path: "/lovable-uploads/54a3f767-41a4-4083-a920-5592f61dbd63.png",
                name: "Salesforce"
              },
              {
                path: "/lovable-uploads/ba13be0d-77b7-49f3-aa99-9524e25c5294.png",
                name: "HubSpot"
              }
            ].map((app, index) => (
              <div 
                key={index}
                className="bg-[#2a2a2a] rounded-lg p-4 aspect-square flex items-center justify-center transition-transform hover:scale-105"
              >
                <img 
                  src={app.path}
                  alt={app.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Connect Button */}
          <Button className="bg-white hover:bg-gray-100 text-black px-8 py-4 text-lg rounded-lg transition-all duration-300">
            Connect Your Apps
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
