import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Rocket, Handshake, CheckCircle } from "lucide-react";

const AIAgency = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-24 pb-12 px-4">
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

                {/* New Content Sections */}
                <div className="space-y-32">
                  {/* Section 1 */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                      <BookOpen className="w-8 h-8 text-purple-400" />
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#9b87f5]">What Makes an AI Agency Unique?</h3>
                        <p className="text-gray-300">
                          Unlike traditional software development firms, we specialize in creating AI agents that learn, adapt, and evolve. Our solutions don't just follow scripts – they understand context, recognize patterns, and make intelligent decisions, bringing a new level of automation to your business processes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                      <Users className="w-8 h-8 text-purple-400" />
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#9b87f5]">How Are We Different Than The Major AI Giants?</h3>
                        <p className="text-gray-300">
                          While tech giants offer powerful but generic AI solutions, we create custom-tailored agents specifically for your business needs. Our focus is on developing practical, focused AI solutions that integrate seamlessly with your existing workflows and systems, providing immediate value without the complexity of enterprise-scale implementations.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                      <Rocket className="w-8 h-8 text-purple-400" />
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#9b87f5]">Our Project-Based Approach</h3>
                        <p className="text-gray-300">
                          Every business is unique, and so should be its AI solution. We take a project-based approach, working closely with you to understand your specific challenges and opportunities. Our team develops custom AI agents that address your exact needs, ensuring maximum impact and ROI for your investment.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-green-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                      <Handshake className="w-8 h-8 text-purple-400" />
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#9b87f5]">Why Should You Partner with Parlar?</h3>
                        <p className="text-gray-300">
                          We combine deep technical expertise with a commitment to understanding your business inside and out. Our team doesn't just build AI agents; we create strategic partnerships that drive long-term success. With Parlar, you get a dedicated partner invested in your growth and innovation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yellow-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                      <CheckCircle className="w-8 h-8 text-purple-400" />
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-[#9b87f5]">Get Started Today</h3>
                        <p className="text-gray-300">
                          Ready to transform your business with AI? Let's start with a conversation about your needs and goals. Our team will work with you to identify the perfect AI solution for your business, whether it's automating customer service, streamlining operations, or creating new revenue streams.
                        </p>
                        <div className="pt-4">
                          <Link to="/contact">
                            <Button 
                              variant="default" 
                              className="bg-purple-500 hover:bg-purple-600 text-white"
                            >
                              Schedule a Consultation
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
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
    </div>;
};
export default AIAgency;
