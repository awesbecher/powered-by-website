
import { useState, useEffect } from "react";
import { Users, Rocket, Handshake } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { HeroSection } from "@/components/free-voiceagent/HeroSection";
import { IntroSection } from "@/components/free-voiceagent/IntroSection";
import { InfoCard } from "@/components/ai-agency/InfoCard";
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";

const FreeVoiceAgent = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="pt-12 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <HeroSection initialLoad={initialLoad} />
          
          <div className="relative mt-8 px-2 lg:px-4">
            <div className="mx-auto max-w-6xl">
              {/* Two-column layout for intro text and form */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
                <div className="lg:col-span-2">
                  <IntroSection initialLoad={initialLoad} />
                </div>

                <div className="lg:col-span-3 flex justify-start lg:justify-center">
                  <div className="p-2 bg-[#1a0b2e]/50 rounded-xl border border-purple-800/30 shadow-lg w-full max-w-md lg:ml-0">
                    <h2 className="text-xl font-bold text-[#9b87f5] mb-0.5">Get started now! Please give us your information:</h2>
                    <TallyFormEmbed 
                      formId="wMM2yY" 
                      className="mt-0.5 rounded-lg overflow-hidden" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <InfoCard 
                  title="How Does It Work?" 
                  icon={Users}
                  gradientFrom="blue-600"
                  gradientTo="purple-600"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Simple Setup Process</h4>
                      <p>Getting started with your free voice AI agent is straightforward. We'll guide you through a simple setup process to customize your agent for your specific business needs.</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Personalized Configuration</h4>
                      <p>Tailor your AI voice agent to match your brand voice, business requirements, and specific use cases. Our team will help you configure the perfect solution for your needs.</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Seamless Integration</h4>
                      <p>Integrate your voice AI agent with your existing systems with minimal effort. We handle the technical aspects so you can focus on your business.</p>
                    </div>
                  </div>
                </InfoCard>

                <InfoCard 
                  title="What's Included" 
                  icon={Rocket}
                  gradientFrom="green-600"
                  gradientTo="blue-600"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Core Voice AI Features</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Natural language understanding for human-like conversations</li>
                        <li>Customizable voice and personality that matches your brand</li>
                        <li>Basic integration with your existing business systems</li>
                        <li>Standard reporting and analytics on agent interactions</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Support and Training</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Initial setup assistance from our expert team</li>
                        <li>Basic documentation and self-service resources</li>
                        <li>Community support for troubleshooting and best practices</li>
                      </ul>
                    </div>
                  </div>
                </InfoCard>

                <InfoCard 
                  title="Why Choose Our Free Voice AI" 
                  icon={Handshake}
                  gradientFrom="yellow-600"
                  gradientTo="green-600"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">No Risk Trial</h4>
                      <p>Experience the power of AI voice technology with no financial commitment. Our free tier gives you a genuine opportunity to test our solution in your real business environment.</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Built for SMBs</h4>
                      <p>Unlike enterprise solutions, our voice AI is specifically designed for small and medium-sized businesses, with appropriate features and complexity for your scale.</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Upgrade Path</h4>
                      <p>As your needs grow, easily upgrade to our premium tiers for additional features, integrations, and support without disrupting your existing setup.</p>
                    </div>
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClosingCTA />
    </div>
  );
};

export default FreeVoiceAgent;
