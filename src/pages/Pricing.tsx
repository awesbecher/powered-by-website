import React from "react";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, HelpCircle, Star, Rocket, Award, Asterisk } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <AnnouncementBanner />
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Get started quickly & affordable. Just powerful AI agents that grow with your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-[#2a1f47] rounded-xl p-8 hover:bg-[#32245e] transition-all">
              <div className="flex items-center mb-4">
                <Star className="text-[#9b87f5] mr-2" size={24} />
                <h2 className="text-2xl font-bold text-white">Starter</h2>
              </div>
              <p className="text-4xl font-bold text-white mb-2">$299<span className="text-lg text-gray-400">/month</span></p>
              <p className="text-gray-300 mb-8">
                Perfect for small businesses just getting started with AI agents.
              </p>
              <ul className="text-left text-gray-300 space-y-4 mb-10">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>1 AI Agent Type</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Up to 1,000 interactions/month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Business hours support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Basic customization</span>
                </li>
                <li className="flex items-start">
                  <Asterisk className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span className="text-xs">Deployment & integration services for additional fee</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-[#9b87f5] hover:bg-[#8a75e3] text-white">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            
            {/* Growth Plan */}
            <div className="bg-[#2a1f47] rounded-xl p-8 hover:bg-[#32245e] transition-all relative">
              <div className="absolute -top-3 right-8 bg-[#9b87f5] text-white text-xs font-bold px-4 py-1 rounded">
                MOST POPULAR
              </div>
              <div className="flex items-center mb-4">
                <Rocket className="text-[#9b87f5] mr-2" size={24} />
                <h2 className="text-2xl font-bold text-white">Growth</h2>
              </div>
              <p className="text-4xl font-bold text-white mb-2">$599<span className="text-lg text-gray-400">/month</span></p>
              <p className="text-gray-300 mb-8">
                For businesses ready to expand their AI agent capabilities.
              </p>
              <ul className="text-left text-gray-300 space-y-4 mb-10">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>2 AI Agent Types</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Up to 2,500 interactions/month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Advanced customization</span>
                </li>
                <li className="flex items-start">
                  <Asterisk className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span className="text-xs">Deployment & integration services for additional fee</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-[#9b87f5] hover:bg-[#8a75e3] text-white">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-[#2a1f47] rounded-xl p-8 hover:bg-[#32245e] transition-all">
              <div className="flex items-center mb-4">
                <Award className="text-[#9b87f5] mr-2" size={24} />
                <h2 className="text-2xl font-bold text-white">Enterprise</h2>
              </div>
              <div className="mb-8">
                <Button asChild className="w-full bg-white hover:bg-gray-100 text-[#6342ff] mt-4">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
              <p className="text-gray-300 mb-8">
                For businesses with complex AI agent needs and higher volume.
              </p>
              <ul className="text-left text-gray-300 space-y-4 mb-10">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>All AI Agent Types</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Unlimited interactions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Full customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 shrink-0" />
                  <span>API access</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What's included in each plan?</h3>
                <p className="text-gray-300">
                  Each plan includes different levels of AI agent access, customization options, and support levels. The number of monthly interactions also varies by plan.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Can I upgrade or downgrade my plan?</h3>
                <p className="text-gray-300">
                  Yes, you can change your plan at any time. When upgrading, the new features will be available immediately. When downgrading, the changes will take effect at the start of your next billing cycle.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What happens if I exceed my monthly interactions?</h3>
                <p className="text-gray-300">
                  If you exceed your monthly interaction limit, additional interactions will be billed at a per-interaction rate. You'll receive notifications as you approach your limit.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Do you offer custom solutions?</h3>
                <p className="text-gray-300">
                  Yes, our Enterprise plan offers custom solutions tailored to your specific business needs. Contact our sales team to discuss your requirements.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-24">
            <div className="bg-gradient-to-r from-[#6342ff]/20 to-[#a87cff]/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Choose the plan that works for you or contact us for a custom solution.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-[#7E69AB] text-white hover:bg-[#6E59A5]">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
                <Button asChild variant="outline" className="bg-[#6342ff] text-white hover:bg-[#5838e0] border-transparent">
                  <Link to="/demo">Book a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
