
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Users, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/components/home/NavigationButtons";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const About = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const collaborationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialLoad(false);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Navigation - Fixed to top (without banner) */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Header Section - Reduced padding from pt-24 to pt-12 */}
      <section className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className={`text-center transition-all duration-1000 ease-out transform
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
            <span className="text-white">
              Powered
            </span>
            <span className="text-[#9b87f5] text-4xl md:text-5xl">_</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              by
            </span>
            <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              AI
            </span>
            <span className="text-[#9b87f5] text-4xl md:text-5xl ml-2">/</span> 
            <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              Run
            </span>
            <span className="text-[#9b87f5] text-4xl md:text-5xl">_</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              by
            </span>
            <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#d4d4d4]">
              small business
            </span>
          </h1>
          <div className="mt-8 flex justify-center">
            <p className="text-xl bg-white text-[#6342ff] font-bold px-4 py-2 rounded-md inline-block">
              Our mission is to democratize access to AI agents for SMBs.
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Section - Removed black background */}
      <div 
        ref={collaborationRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 transition-all duration-1000 ease-out transform
          border border-[#9b87f5]/20 rounded-xl overflow-hidden py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-[#ff6b6b]">Collaboration</span>
            <span className="text-white"> = </span>
            <span className="text-[#e469e9]">You</span>
            <span className="text-[#b27af8]"> & Trae</span>
          </h2>
          
          <div className="space-y-6">
            <p className="text-3xl md:text-4xl font-semibold leading-tight text-white">
              Trae is your ideal development partner, seamlessly balancing human & AI capabilities.
            </p>
            
            <p className={`text-3xl md:text-4xl font-semibold leading-tight transition-all duration-500
              ${scrollPosition > 150 ? 'text-white' : 'text-gray-600'}`}>
              This dynamic collaboration ensures each task is handled by the most suitable agent,
            </p>
            
            <p className={`text-3xl md:text-4xl font-semibold leading-tight transition-all duration-500
              ${scrollPosition > 250 ? 'text-white' : 'text-gray-600'}`}>
              maximizing your productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Who We Are */}
          <div className={`transition-all duration-1000 delay-200 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-[#9b87f5] mr-3" />
              <h2 className="text-3xl font-bold text-white">Who We Are</h2>
            </div>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> is an agency that designs and builds bespoke AI agent solutions for diverse industries. From auto dealerships to real estate agencies, retail stores to hospitality providers, our team has a proven track record of delivering AI agent solutions that empower our clients to thrive and compete.
              </p>
              <p className="text-lg">
                Our founding thesis is that SMBs deserve the same access to the advanced AI systems currently deployed across the Fortune 500. We take the cutting-edge AI agent technology pioneered in Silicon Valley and make it deadly simple and economical to operate.
              </p>
              <p className="text-lg">
                Our team is composed of seasoned AI builders, forward deployed engineers, and SaaS startup executives with decades of combined software experience. We've mastered the intricacies of natural language processing, speech synthesis, and multi-channel communication systems, allowing us to build AI agents that seamlessly integrate into your existing workflows. We're experts in voice AI, email agents, process automation, and how to stack them together for a seamless experience.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Centricity Section */}
        <div className={`mt-16 p-8 bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 text-left
          transition-all duration-1000 delay-400 ease-out transform max-w-4xl mx-auto
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-white">Customer Centricity</h2>
          </div>
          <p className="text-xl text-gray-300 mb-4">
            Customer centricity is the foundation to our work here. We place the needs, preferences, and success of our customers at the heart of every decision and action. We build genuine relationships with our customers, listen intently to feedback, and commit to your success equalling ours.
          </p>
          <p className="text-xl text-gray-300">
            Advancements in AI are moving at astonishing speed. What the state-of-the-art in agent technology is today might be legacy within a year. When you work with us, you're not just getting a project delivered. You're getting a long-term partner dedicated to ensuring you stay ahead of the AI curve.
          </p>
        </div>

        {/* Multi-Channel Agent Expertise Section */}
        <div className={`mt-16 p-8 bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 text-left
          transition-all duration-1000 delay-500 ease-out transform max-w-4xl mx-auto
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white">Multi-Channel Agent Expertise</h2>
          </div>
          <div className="py-2">
            <NavigationButtons />
          </div>
        </div>

        {/* Closing Section */}
        <div className={`mt-16 p-8 bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 text-left
          transition-all duration-1000 delay-600 ease-out transform max-w-4xl mx-auto
          ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <h2 className="text-3xl font-bold text-white mb-4">Our Promise</h2>
          <p className="text-xl text-gray-300 mb-8">
            You don't need vast resources or pools of cash to run the latest AI agents. You just need a great partner. With <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span>, we're not just building you solutions, we're powering your success. One agent at a time.
          </p>
        </div>
      </div>

      {/* Adding the CTA from ClosingCTA component */}
      <ClosingCTA />

      <Footer />
    </div>
  );
};

export default About;
