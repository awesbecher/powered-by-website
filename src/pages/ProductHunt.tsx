
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ArrowRight, Star, Shield, MessageSquare, Users, Zap, Award } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Logo from "@/components/layout/Logo";

const ProductHunt = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      {/* Simple header with logo only - no navbar */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-3">
            <a href="https://www.producthunt.com/posts/powered_by?utm_source=badge-featured&utm_medium=badge" target="_blank" rel="noreferrer">
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=942846&theme=dark" 
                alt="Powered_by - AI Agents for SMBs | Product Hunt" 
                width="180" 
                height="39" 
              />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className={`transition-all duration-1000 ease-out transform ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Custom AI Agents for <span className="text-[#9b87f5]">Small Businesses</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Deploy agentic AI solutions for voice, email, SMS, and more. No coding required.
              Built for SMBs who need enterprise-grade AI solutions at affordable prices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="https://www.producthunt.com/posts/powered_by" target="_blank" rel="noreferrer">
                <Button
                  className="bg-[#DA552F] hover:bg-[#C44D2A] text-white px-6 py-6 text-lg rounded-md w-full sm:w-auto"
                >
                  <img src="/lovable-uploads/c86cda73-fde4-4673-92c8-fd650286b9e6.png" alt="Product Hunt" className="w-6 h-6 mr-2" />
                  View on Product Hunt
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-6 text-lg rounded-md w-full sm:w-auto"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Screenshot */}
        <div className={`transition-all duration-1000 delay-500 ease-out transform ${initialLoad ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="relative mx-auto max-w-5xl mt-12">
            <div className="bg-gradient-to-r from-[#6342ff]/20 to-[#a87cff]/20 rounded-2xl p-2">
              <img 
                src="/lovable-uploads/aa693bec-b111-4ff5-82d5-78ad46643ea3.png" 
                alt="AI Agents for Customer Service" 
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-8 -right-8 -z-10 w-72 h-72 rounded-full bg-[#9b87f5]/20 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 -z-10 w-72 h-72 rounded-full bg-[#6342ff]/20 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gradient-to-r from-[#1a0b2e] via-[#2f1c4a]/80 to-[#1a0b2e] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center">
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <span className="text-white ml-2 text-sm">4.9/5 Rating</span>
            </div>
            <div className="text-gray-300 text-sm">
              <span className="font-bold text-white">50+</span> SMBs Powered
            </div>
            <div className="text-gray-300 text-sm">
              <span className="font-bold text-white">$2M</span> in revenue generated
            </div>
            <div className="text-gray-300 text-sm">
              <span className="font-bold text-white">96%</span> customer satisfaction
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Multi-Channel AI Agents
          </h2>
          <p className="text-xl text-gray-300">
            Our AI agents work across all your customer touchpoints, creating a seamless experience while reducing your workload.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Voice AI Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center mb-5">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Voice AI</h3>
            <p className="text-gray-300 mb-4">
              Human-like voice agents that answer calls, schedule appointments, and handle customer inquiries 24/7.
            </p>
            <Link to="/ai-receptionist" className="text-[#9b87f5] hover:text-[#a87cff] inline-flex items-center">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Email Agent Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center mb-5">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Email Agent</h3>
            <p className="text-gray-300 mb-4">
              Autonomous email communication that handles follow-ups, inquiries, and customer interactions intelligently.
            </p>
            <Link to="/email-agent" className="text-[#9b87f5] hover:text-[#a87cff] inline-flex items-center">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Text Agent Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center mb-5">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Text Agent</h3>
            <p className="text-gray-300 mb-4">
              SMS-based AI that engages customers with intelligent conversations and provides instant responses.
            </p>
            <Link to="/text-agent" className="text-[#9b87f5] hover:text-[#a87cff] inline-flex items-center">
              Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Small Businesses Choose Us
          </h2>
          <p className="text-xl text-gray-300">
            We make enterprise-grade AI solutions accessible and affordable for SMBs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full p-1">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">No Coding Required</h3>
              <p className="text-gray-300">
                Our platform handles all the technical complexity, letting you focus on your business goals.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full p-1">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Affordable Plans</h3>
              <p className="text-gray-300">
                Pay only for what you use, with plans starting as low as $299/month for full AI agent capabilities.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full p-1">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Quick Deployment</h3>
              <p className="text-gray-300">
                Get your AI agents up and running in days, not months. Our team handles all the setup and training.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full p-1">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Full Customization</h3>
              <p className="text-gray-300">
                Your AI agents are tailored to your specific business needs, brand voice, and industry requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a0b2e] via-[#2f1c4a]/80 to-[#1a0b2e] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Our AI receptionist handles over 200 calls daily, scheduling appointments and answering questions. This has freed up our staff to focus on more complex customer needs."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium">John Doe</p>
                  <p className="text-gray-400 text-sm">Dental Practice Owner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
              </div>
              <p className="text-gray-300 mb-6 italic">
                "The email AI agent has transformed our lead response time from days to minutes. We've seen a 40% increase in conversion rates since implementation."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold">
                    JS
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium">Jane Smith</p>
                  <p className="text-gray-400 text-sm">Real Estate Agency</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
                <Star className="text-yellow-400 w-4 h-4" />
              </div>
              <p className="text-gray-300 mb-6 italic">
                "We implemented the text-based AI for customer service, and it now handles 75% of our inquiries without human intervention. Our customer satisfaction has never been higher."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold">
                    RB
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium">Robert Brown</p>
                  <p className="text-gray-400 text-sm">Retail Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300">
            No hidden fees. No long-term contracts. Just powerful AI that grows with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 relative">
            <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-bold text-white">$299</span>
              <span className="text-gray-400 ml-1 mb-1">/month</span>
            </div>
            <p className="text-gray-300 mb-8">Perfect for small businesses just getting started with AI.</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">1 AI Agent Type</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Up to 1,000 interactions/month</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Business hours support</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Basic customization</span>
              </li>
            </ul>
            <Link to="/contact">
              <Button className="w-full bg-white hover:bg-gray-100 text-[#6342ff] font-bold">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="bg-gradient-to-b from-[#6342ff]/20 to-[#a87cff]/10 backdrop-blur-xl border border-[#9b87f5]/30 rounded-2xl p-8 transition-all duration-300 hover:bg-[#6342ff]/20 relative">
            <div className="absolute top-0 right-0 bg-[#9b87f5] text-white text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Growth</h3>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-bold text-white">$599</span>
              <span className="text-gray-400 ml-1 mb-1">/month</span>
            </div>
            <p className="text-gray-300 mb-8">For businesses ready to expand their AI capabilities.</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">2 AI Agent Types</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Up to 5,000 interactions/month</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Advanced customization</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Analytics dashboard</span>
              </li>
            </ul>
            <Link to="/contact">
              <Button className="w-full bg-[#9b87f5] hover:bg-[#8a75e3] text-white font-bold">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 relative">
            <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-bold text-white">$1,499</span>
              <span className="text-gray-400 ml-1 mb-1">/month</span>
            </div>
            <p className="text-gray-300 mb-8">For businesses with complex AI needs and higher volume.</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">All AI Agent Types</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Unlimited interactions</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">24/7 dedicated support</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Full customization</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">Advanced analytics & reporting</span>
              </li>
              <li className="flex items-start">
                <Check className="text-[#9b87f5] w-5 h-5 mr-2 mt-0.5" />
                <span className="text-gray-300">API access</span>
              </li>
            </ul>
            <Link to="/contact">
              <Button className="w-full bg-white hover:bg-gray-100 text-[#6342ff] font-bold">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300">
            Getting started with Powered_by AI agents is simple
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Consultation</h3>
            <p className="text-gray-300">
              We'll discuss your business needs and determine which AI agents are right for you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Customization</h3>
            <p className="text-gray-300">
              We customize your AI agents to match your brand voice and specific business requirements.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Deployment</h3>
            <p className="text-gray-300">
              We handle all the technical setup and integration with your existing systems.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6342ff] to-[#a87cff] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
              4
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Optimization</h3>
            <p className="text-gray-300">
              We continuously monitor and improve your AI agents' performance based on real interactions.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">How human-like are your AI agents?</h3>
            <p className="text-gray-300">
              Our AI agents are designed to be indistinguishable from human representatives. They can understand context, handle complex conversations, and adapt their tone to match your brand voice.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">What kind of businesses do you work with?</h3>
            <p className="text-gray-300">
              We work with SMBs across various industries, including real estate, healthcare, retail, professional services, and more. Our solutions are customized to fit each industry's specific needs.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">Can I try before I buy?</h3>
            <p className="text-gray-300">
              Yes! We offer a demo where you can experience our AI agents in action. Contact us to schedule a personalized demonstration tailored to your business.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">How long does implementation take?</h3>
            <p className="text-gray-300">
              Typically, we can have your AI agents up and running within 1-2 weeks, depending on the complexity of your requirements and the number of agents you need.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6342ff] to-[#a87cff]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#6342ff] mix-blend-multiply opacity-60"></div>
            <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-[#a87cff] blur-3xl opacity-40"></div>
            <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-[#6342ff] blur-3xl opacity-40"></div>
          </div>
          <div className="relative px-8 py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join the SMBs already using <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> AI agents to reduce costs, improve customer satisfaction, and scale operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md w-full sm:w-auto">
                  Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-6 text-lg rounded-md w-full sm:w-auto"
                onClick={() => document.dispatchEvent(new CustomEvent('open-voice-dialog'))}
              >
                Talk to an AI Agent Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* "As Seen On" Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl border-t border-white/5">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">As Seen On</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          <img src="/lovable-uploads/0d1c3dc0-7aad-4ddd-8b25-1edf45232f70.png" alt="Product Hunt" className="h-8 grayscale hover:grayscale-0 transition-all duration-300" />
          <img src="/lovable-uploads/fd8a631b-2f6e-4f85-a4e8-aa0f775cd50f.png" alt="TechCrunch" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
          <img src="/lovable-uploads/79330a0b-f47e-4785-b5be-d22a6127fe74.png" alt="Fast Company" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
          <img src="/lovable-uploads/55af1e29-b9b8-4ff9-97be-370778010c17.png" alt="Forbes" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
          <img src="/lovable-uploads/dfa6c12a-d0aa-4b21-bca9-73cf4b428400.png" alt="Entrepreneur" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
        </div>
      </section>

      {/* Award Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center">
            <Award className="text-[#9b87f5] w-8 h-8 mr-3" />
            <div>
              <p className="text-white font-bold">Best AI Solution for SMBs</p>
              <p className="text-gray-400 text-sm">2023 Innovation Awards</p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-12 hidden md:block bg-white/10" />
          <div className="flex items-center">
            <Users className="text-[#9b87f5] w-8 h-8 mr-3" />
            <div>
              <p className="text-white font-bold">Top 10 AI Startups to Watch</p>
              <p className="text-gray-400 text-sm">Tech Innovators 2023</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductHunt;
