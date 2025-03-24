
import React from "react";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, HelpCircle } from "lucide-react";
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
            Choose the plan that best fits your business needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-purple-500 transition-all">
              <h2 className="text-2xl font-bold text-white mb-2">Starter</h2>
              <p className="text-purple-400 text-lg mb-4">For small businesses</p>
              <p className="text-4xl font-bold text-white mb-6">$99<span className="text-lg text-gray-400">/mo</span></p>
              <ul className="text-left text-gray-300 space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>1 AI Agent</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Basic customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Email support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>1,000 interactions/month</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            
            {/* Professional Plan */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500 rounded-xl p-8 shadow-lg shadow-purple-500/20 transform scale-105 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full mb-4 inline-block">
                Most Popular
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Professional</h2>
              <p className="text-purple-400 text-lg mb-4">For growing teams</p>
              <p className="text-4xl font-bold text-white mb-6">$299<span className="text-lg text-gray-400">/mo</span></p>
              <ul className="text-left text-gray-300 space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>3 AI Agents</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Advanced customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>2,500 interactions/month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Analytics dashboard</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-purple-500 transition-all">
              <h2 className="text-2xl font-bold text-white mb-2">Enterprise</h2>
              <p className="text-purple-400 text-lg mb-4">For large organizations</p>
              <p className="text-4xl font-bold text-white mb-6">Custom</p>
              <ul className="text-left text-gray-300 space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Unlimited AI Agents</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Full customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Unlimited interactions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gray-700 hover:bg-gray-600">
                <Link to="/contact">Contact Sales</Link>
              </Button>
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
                <Button asChild className="bg-white text-purple-700 hover:bg-gray-100">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
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
