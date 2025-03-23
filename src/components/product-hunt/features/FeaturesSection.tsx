
import React from "react";
import { FeatureCard } from "./FeatureCard";
import { MessageSquare, Shield, Zap, User, Megaphone, Mic } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Multi-Channel AI Agents
        </h2>
        <p className="text-xl text-gray-300">
          Our AI agents work across all your customer touchpoints, creating a seamless experience while reducing your workload.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <FeatureCard 
          icon={<Mic className="w-6 h-6 text-white" />}
          title="AI Voice Chat"
          description="Interactive voice AI that engages in natural conversations, answers questions, and provides assistance in real-time."
          linkTo="/voice-chat"
        />

        <FeatureCard 
          icon={<MessageSquare className="w-6 h-6 text-white" />}
          title="Voice AI"
          description="Human-like voice agents that answer calls, schedule appointments, and handle customer inquiries 24/7."
          linkTo="/voice-chat"
        />

        <FeatureCard 
          icon={<Shield className="w-6 h-6 text-white" />}
          title="Email Agent"
          description="Autonomous email communication that handles follow-ups, inquiries, and customer interactions intelligently."
          linkTo="/email-agent"
        />

        <FeatureCard 
          icon={<Zap className="w-6 h-6 text-white" />}
          title="Text Agent"
          description="SMS-based AI that engages customers with intelligent conversations and provides instant responses."
          linkTo="/text-agent"
        />

        <FeatureCard 
          icon={<User className="w-6 h-6 text-white" />}
          title="Virtual SE"
          description="AI-powered sales engineers that qualify leads, provide demos, and answer technical questions for your software product."
          linkTo="/virtual-se"
        />

        <FeatureCard 
          icon={<Megaphone className="w-6 h-6 text-white" />}
          title="OutboundAI"
          description="Proactive AI agents that reach out to prospects, follow up with leads, and nurture customer relationships."
          linkTo="/outbound-ai"
        />
      </div>
    </section>
  );
};
