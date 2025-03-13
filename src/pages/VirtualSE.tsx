
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Server, Link as LinkIcon, Shield, Calendar, ChevronRight } from "lucide-react";
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const VirtualSE = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="relative overflow-hidden px-6 lg:px-8 pt-12 pb-8">
            <div className="mx-auto max-w-4xl">
              <div className={`w-full lg:w-2/3 space-y-6 transition-all duration-1000 ease-out transform mx-auto
                ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight text-center">
                  <span className="text-[#9b87f5] block">Virtual SE</span>
                  Force-Multiply Your Sales Engineering Team
                </h1>
                <p className="text-xl text-gray-300 text-center">
                  Meet <strong>Virtual SE</strong>. An AI-driven voice and email agent solution designed to offload busy SE teams by supporting sales reps in pre-sales meetings, demos, and qualification calls. Deploy into Zoom, Google Meet, Slack, & more.
                </p>
                <div className="flex justify-center mt-4">
                  <Link to="/contact">
                    <Button 
                      className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center"
                      onClick={handleContact}
                    >
                      Schedule a Demo <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            Why Virtual SE <span className="text-[#9b87f5]">Matters</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
              <div className="mb-4 p-3 bg-[#2f1c4a] rounded-full inline-block">
                <Calendar className="w-6 h-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cost Savings & Scalability</h3>
              <p className="text-gray-400">Rather than hiring multiple SEs or juggling calendars, Virtual SE attends countless meetings simultaneously.</p>
            </div>
            <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
              <div className="mb-4 p-3 bg-[#2f1c4a] rounded-full inline-block">
                <Server className="w-6 h-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Consistent Messaging</h3>
              <p className="text-gray-400">Powered by a centralized knowledge base, Virtual SE offers uniform responses that reflect your approved product messaging.</p>
            </div>
            <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
              <div className="mb-4 p-3 bg-[#2f1c4a] rounded-full inline-block">
                <LinkIcon className="w-6 h-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Increased Efficiency</h3>
              <p className="text-gray-400">Virtual SE handles detailed product explanations while your sales reps focus on building relationships.</p>
            </div>
            <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
              <div className="mb-4 p-3 bg-[#2f1c4a] rounded-full inline-block">
                <Shield className="w-6 h-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Augment, Don't Replace</h3>
              <p className="text-gray-400">Virtual SE isn't designed to replace human SEs—only to extend their reach to be in multiple places at once.</p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
            Use Cases
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto mb-16">
            Whether you're selling cybersecurity solutions, AI platforms, or cloud software, 
            the Virtual SE can join sales calls to answer domain-specific technical questions.
          </p>
          <div className="bg-gradient-to-br from-[#2f1c4a] to-[#1a0b2e] rounded-2xl p-8 border border-[#9b87f5]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p className="text-white">Answer encryption and security compliance questions</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p className="text-white">Explain complex integration capabilities</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p className="text-white">Detail multi-cloud deployment strategies</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p className="text-white">Provide product implementation timelines</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p className="text-white">Answer technical questions during demos</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p className="text-white">Log meeting details and next steps to CRM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Compliance Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="bg-[#1a1a24] rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Privacy & Compliance
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> understands 
              the importance of ethics, accuracy, and data protection. Our solution is secured to enterprise-grade standards, 
              meets SOC 2 Type II and GDPR requirements, and adheres to your company's communication policies.
            </p>
            <p className="text-lg text-gray-300">
              We also encourage transparent disclosure of the Virtual SE's AI nature so prospects know exactly how they're receiving answers.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff] to-[#a87cff] opacity-90"></div>
            <div className="relative z-10 px-8 py-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Experience the Future of SaaS Pre-Sales Engineering
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Empower your sales team with an AI-driven ally that eliminates scheduling conflicts, delivers consistent technical messaging, and ensures every customer conversation is properly documented.
              </p>
              <Link to="/contact">
                <Button 
                  className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
                  onClick={handleContact}
                >
                  Schedule Your Demo Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualSE;
