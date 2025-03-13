
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
