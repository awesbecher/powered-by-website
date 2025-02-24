
import { useState, useEffect } from "react";
import { BookOpen, Users, Rocket, Handshake } from "lucide-react";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { HeroSection } from "@/components/ai-agency/HeroSection";
import { IntroSection } from "@/components/ai-agency/IntroSection";
import { InfoCard } from "@/components/ai-agency/InfoCard";
import AgencyIllustration from "@/components/ai-agency/AgencyIllustration";

const AIAgency = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <HeroSection initialLoad={initialLoad} />
        
        <div className="relative mt-8 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <AgencyIllustration />
            <IntroSection initialLoad={initialLoad} />

            <div className="space-y-6">
              <InfoCard 
                title="What Makes an AI Agency Unique?" 
                icon={BookOpen}
                gradientFrom="purple-600"
                gradientTo="pink-600"
              >
                <p>When most small and mid-sized businesses consider AI, they either see costly in-house builds or deeply expensive enterprise solutions. At Parlar, we bridge this gap by serving as your dedicated AI Agency—guiding you step-by-step with customized, human-like AI solutions that fit your budget, timeline, and brand. We handle the technical heavy lifting and deliver straightforward, powerful tools so you can focus on what truly matters: delighting your customers and growing your business. In other words, you don't need to hire a new AI engineering team!</p>
              </InfoCard>

              <InfoCard 
                title="How are we different than OpenAI?" 
                icon={Users}
                gradientFrom="blue-600"
                gradientTo="purple-600"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Personalized Implementation</h4>
                    <p>The big AI providers like OpenAI, Anthropic, and Google excel at building robust AI engines—but they rarely deliver a fully tailored, ready-to-deploy solution. Parlar adapts these world-class models to your unique business goals, customer pain points, and existing tech stack.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Hands-On Support</h4>
                    <p>Instead of a self-service API and limited troubleshooting, our hands-on experts ensure your AI solution is properly integrated, trained, and continuously improved. We're not just handing you the keys; we're the driver, mechanic, and co-pilot every step of the way.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Ongoing Optimization</h4>
                    <p>Your AI should evolve with your business. Rather than a "one-size-fits-all" approach, we refine and optimize your AI agent over time—no guesswork or frustrating DIY updates.</p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="Our Project-Based Approach" 
                icon={Rocket}
                gradientFrom="green-600"
                gradientTo="blue-600"
              >
                <p className="mb-6">We believe in a collaborative and transparent process that gets results. Here's what to expect when you work with Parlar:</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Discovery & Strategy</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Goal Setting: We identify your top objectives, such as reducing support wait times or boosting sales conversions.</li>
                      <li>Technical Assessment: Our team audits your existing systems, data, and brand guidelines to define the perfect AI solution scope.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Custom AI Design & Integration</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Personalized Development: From conversation flows to brand tone, we craft an AI agent that mirrors your unique style.</li>
                      <li>Seamless Deployment: We integrate directly with your website, CRM, or other channels, providing end-to-end technical support.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Training & Knowledge Transfer</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Employee Onboarding: We train your team on using, managing, and interpreting AI outputs, so everyone feels confident.</li>
                      <li>Live Testing & Tweaks: Before going live, we run extensive QA to ensure the AI meets real-world user expectations.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Continuous Optimization</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Performance Monitoring: Using feedback loops and analytics, we identify improvement areas—like conversation accuracy or sentiment handling.</li>
                      <li>Iterative Updates: Our ongoing maintenance ensures your AI agent evolves alongside your business, maintaining top-notch performance.</li>
                    </ul>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="Why Should You Partner with Us?" 
                icon={Handshake}
                gradientFrom="yellow-600"
                gradientTo="green-600"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Tailored for SMBs</h4>
                    <p>We understand smaller teams need cost-effective, user-friendly solutions—not enterprise-level complexity. Our approach respects your resources and focuses on delivering maximum ROI.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Business-Centric Results</h4>
                    <p>Whether it's boosting customer satisfaction, raising sales numbers, or reducing support overhead, our success is measured by tangible business outcomes. We prioritize real impact over flashy gimmicks.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Deep Expertise, Clear Communication</h4>
                    <p>Our team of AI specialists, data scientists, and customer experience professionals translate complex tech into actionable insights. You get cutting-edge AI without the jargon or confusion.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Trusted Partnerships</h4>
                    <p>We collaborate with leading LLM providers behind the scenes but remain your single point of contact. You get the best AI technology—customized, delivered, and supported by Parlar.</p>
                  </div>
                </div>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>
      <ClosingCTA />
    </div>
  );
};

export default AIAgency;
