import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Rocket, Handshake } from "lucide-react";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const AIAgency = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden px-6 lg:px-8 pt-12 pb-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                Just Like a Web Design Firm. But with <span className="text-[#9b87f5]">much cooler tech</span>.
              </h1>
              
              <p className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                For mom-and-pop shops to mid-sized corporates, you think of a workflow to automate or a task to agent-enable and we'll build it.
              </p>
            </div>
          </div>
          
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        <div className="relative mt-8 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className={`text-left transition-all duration-1000 delay-500 ease-out transform
                ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <h2 className="text-5xl font-bold text-white mb-8 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">
                We're the world's first AI agency.
              </h2>
              
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed text-justify">
                <p>We design and deploy intelligent agents tailored from the ground up to fit your unique needs—whether it's voice-driven phone assistants, email automation bots, text-based support, Slack integrations, or chatbots that speak and communicate as human-like as possible. Our mission? To automate the repetitive, amplify the human, and supercharge your workflows with AI that feels like it was made just for you—because it was.</p>
                
                <p className="font-medium text-white">
                  Think of us as your creative AI partner. We take the time to understand your business, your customers, and your goals, then craft AI agent-enabled workflows that simply work.
                </p>

                <div className="flex justify-center mt-8 mb-16">
                  <Link to="/blog/understanding-ai-agents">
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400/10 hover:text-white transition-all"
                    >
                      What is an AI Agent?
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none">
                      <div className="flex items-top justify-start space-x-6">
                        <BookOpen className="w-8 h-8 text-purple-400" />
                        <div className="space-y-4 w-full">
                          <h3 className="text-3xl font-bold text-[#9b87f5] cursor-pointer hover:opacity-80 transition-opacity">
                            What Makes an AI Agency Unique?
                          </h3>
                          <div className="text-gray-300 text-left opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                            <p>
                              When most small and mid-sized businesses consider AI, they either see costly in-house builds or deeply expensive enterprise solutions. At Parlar, we bridge this gap by serving as your dedicated AI Agency—guiding you step-by-step with customized, human-like AI solutions that fit your budget, timeline, and brand. We handle the technical heavy lifting and deliver straightforward, powerful tools so you can focus on what truly matters: delighting your customers and growing your business.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none">
                      <div className="flex items-top justify-start space-x-6">
                        <Users className="w-8 h-8 text-purple-400" />
                        <div className="space-y-4 w-full">
                          <h3 className="text-3xl font-bold text-[#9b87f5] cursor-pointer hover:opacity-80 transition-opacity">
                            How Are We Different Than The Major AI Giants?
                          </h3>
                          <div className="text-gray-300 text-left opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                            <p className="mb-6">We believe in a collaborative and transparent process that gets results. Here's what to expect when you work with Parlar AI:</p>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Discovery & Strategy</h4>
                                <ul className="list-inside space-y-2">
                                  <li><span className="font-semibold">Goal Setting:</span> We identify your top objectives, such as reducing support wait times or boosting sales conversions.</li>
                                  <li><span className="font-semibold">Technical Assessment:</span> Our team audits your existing systems, data, and brand guidelines to define the perfect AI solution scope.</li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Custom AI Design & Integration</h4>
                                <ul className="list-inside space-y-2">
                                  <li><span className="font-semibold">Personalized Development:</span> From conversation flows to brand tone, we craft an AI agent that mirrors your unique style.</li>
                                  <li><span className="font-semibold">Seamless Deployment:</span> We integrate directly with your website, CRM, or other channels, providing end-to-end technical support.</li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Training & Knowledge Transfer</h4>
                                <ul className="list-inside space-y-2">
                                  <li><span className="font-semibold">Employee Onboarding:</span> We train your team on using, managing, and interpreting AI outputs, so everyone feels confident.</li>
                                  <li><span className="font-semibold">Live Testing & Tweaks:</span> Before going live, we run extensive QA to ensure the AI meets real-world user expectations.</li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Continuous Optimization</h4>
                                <ul className="list-inside space-y-2">
                                  <li><span className="font-semibold">Performance Monitoring:</span> Using feedback loops and analytics, we identify improvement areas—like conversation accuracy or sentiment handling.</li>
                                  <li><span className="font-semibold">Iterative Updates:</span> Our ongoing maintenance ensures your AI agent evolves alongside your business, maintaining top-notch performance.</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none">
                      <div className="flex items-top justify-start space-x-6">
                        <Rocket className="w-8 h-8 text-purple-400" />
                        <div className="space-y-4 w-full">
                          <h3 className="text-3xl font-bold text-[#9b87f5] cursor-pointer hover:opacity-80 transition-opacity">
                            Our Project-Based Approach
                          </h3>
                          <div className="text-gray-300 text-left opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                            <p>
                              Every business is unique, and so should be its AI solution. We take a project-based approach, working closely with you to understand your specific challenges and opportunities. Our team develops custom AI agents that address your exact needs, ensuring maximum impact and ROI for your investment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-green-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none">
                      <div className="flex items-top justify-start space-x-6">
                        <Handshake className="w-8 h-8 text-purple-400" />
                        <div className="space-y-4 w-full">
                          <h3 className="text-3xl font-bold text-[#9b87f5] cursor-pointer hover:opacity-80 transition-opacity">
                            Why Should You Partner with Parlar?
                          </h3>
                          <div className="text-gray-300 text-left opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClosingCTA />
    </div>
  );
};

export default AIAgency;
