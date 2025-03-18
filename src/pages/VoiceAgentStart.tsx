
import { useState, useEffect } from "react";
import { Users, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { HeroSection } from "@/components/voiceagent-start/HeroSection";
import { IntroSection } from "@/components/voiceagent-start/IntroSection";
import { SetupSteps } from "@/components/voiceagent-start/SetupSteps";
import { InfoCard } from "@/components/ai-agency/InfoCard";
import Footer from "@/components/layout/Footer";

const VoiceAgentStart = () => {
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
          
          <div className="relative mt-8">
            <div className="mx-auto max-w-6xl">
              {/* Two-column layout for intro text and timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 pr-0 lg:pr-10">
                  <IntroSection initialLoad={initialLoad} />
                </div>

                <div className="lg:col-span-7">
                  <div className="p-6 bg-black/30 rounded-xl border border-purple-800/30 shadow-lg">
                    <SetupSteps />
                  </div>
                </div>
              </div>

              <div className="space-y-6 mt-16">
                <InfoCard 
                  title="What to Prepare" 
                  icon={CheckCircle}
                  gradientFrom="blue-600"
                  gradientTo="purple-600"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Business Information</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Company overview, mission statement, and core values</li>
                        <li>Products and services descriptions with key features and benefits</li>
                        <li>Pricing information and special offers (if applicable)</li>
                        <li>Business hours, location, and contact information</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Customer Interactions</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Common customer inquiries and appropriate responses</li>
                        <li>Frequently asked questions (FAQs) and their answers</li>
                        <li>Typical customer journey and touchpoints</li>
                        <li>Scripts or guidelines used by current customer service representatives</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Brand Voice</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Preferred tone of communication (professional, friendly, casual, etc.)</li>
                        <li>Key phrases or terminology unique to your business</li>
                        <li>Brand personality traits you want reflected in conversations</li>
                      </ul>
                    </div>
                  </div>
                </InfoCard>

                <InfoCard 
                  title="Support During Setup" 
                  icon={Users}
                  gradientFrom="yellow-600"
                  gradientTo="green-600"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Dedicated Configuration Specialist</h4>
                      <p>You'll be assigned a dedicated specialist who will guide you through the entire setup process and address any questions or concerns you may have.</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Ongoing Technical Support</h4>
                      <p>Our technical team will be available to handle any technical aspects of the setup and ensure smooth integration with your existing systems.</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Educational Resources</h4>
                      <p>Access to documentation, video tutorials, and best practices to help you make the most of your voice AI agent once it's set up.</p>
                    </div>
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClosingCTA />
      <Footer />
    </div>
  );
};

export default VoiceAgentStart;
