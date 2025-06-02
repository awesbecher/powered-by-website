
import React from 'react';
import { InfoCard } from './InfoCard';
import { ServiceIcons } from './ServiceIcons';
import { Brain, Layers, RefreshCw } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <section className="relative py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Full-Service AI Agency
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We design, build, and deploy custom AI agents that handle real-world tasks for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InfoCard
            title="Custom AI Agents"
            description="Tailored AI solutions designed specifically for your business needs, brand voice, and customer experience."
            icon={Brain}
          />
          <InfoCard
            title="Multi-Channel Deployment"
            description="Deploy your AI agents across voice, chat, email, SMS, and custom channels for a unified experience."
            icon={Layers}
          />
          <InfoCard
            title="Continuous Optimization"
            description="We analyze performance and continuously improve your AI agents based on real interactions and feedback."
            icon={RefreshCw}
          />
        </div>

        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Our Services
          </h3>
          <ServiceIcons />
        </div>
      </div>
    </section>
  );
};
