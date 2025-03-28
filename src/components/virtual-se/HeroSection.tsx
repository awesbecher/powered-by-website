
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  return (
    <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left side - Hero content */}
        <div className="lg:col-span-6">
          <div className={`space-y-6 transition-all duration-1000 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h1>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#9b87f5] block">
                Virtual SE
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Force-Multiply Your Sales Engineering Team
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              <strong>Virtual SE</strong> gives SaaS sales organizations the ability to deploy AI pre-sales engineers to unlimited meetings with minimal incremental expense. Free up your scarce human SE resources for the highest value customer activities by utilizing super-intelligent, tireless SE agents.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <a 
                href="https://poweredbyagency.ghost.io/meet-virtual-se-force-multiply-your-technical-pre-sales/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="order-2 sm:order-1"
              >
                <Button 
                  className="bg-white hover:bg-gray-100 text-[#6342ff] w-full sm:w-auto flex items-center"
                >
                  <FileText className="mr-2 h-5 w-5" /> Read Product Announcement
                </Button>
              </a>
              <Link to="/contact" className="order-1 sm:order-2">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-5 text-base rounded-md flex items-center w-full sm:w-auto"
                  onClick={handleContact}
                >
                  Schedule a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right side - Tally.so form */}
        <div className="lg:col-span-6">
          <div className={`mt-8 lg:mt-0 transition-all duration-1000 delay-300 ease-out transform
            ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="rounded-[2rem] border border-white/50 p-5 overflow-hidden">
              {/* Added e-book text above the form */}
              <div className="mb-5 text-white">
                <h3 className="font-semibold text-xl mb-2">Read our comprehensive e-book "A Virtual SE in the Modern SaaS Sales Organization"</h3>
                <p className="text-gray-300 mb-2">and learn how to guarantee SE coverage in every sales meeting using an AI-enabled pre-sales engineer.</p>
                <p className="text-gray-200 italic">Enter your details below to access the report:</p>
              </div>
              <TallyFormEmbed 
                formId="wdz0QD"
                height={420}
                transparentBackground={true}
                alignLeft={true}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </section>
  );
};

export default HeroSection;
