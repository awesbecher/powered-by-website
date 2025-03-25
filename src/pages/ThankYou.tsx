
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, FileText, Phone, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Thank you card */}
          <Card className="bg-[#2a1c42] border-[#6342ff]/30 shadow-xl mb-8">
            <CardContent className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-green-500/20 p-2 border border-green-500/30">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-white text-center mb-4">
                Thanks for your interest in <PoweredByText />!
              </h1>
              
              <p className="text-gray-300 text-center mb-6">
                We look forward to helping you learn more about AI agents and how they could deliver real value to your business.
              </p>
            </CardContent>
          </Card>
          
          {/* Resources section */}
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Helpful Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <ResourceCard 
              icon={<FileText className="h-5 w-5" />}
              title="Documentation"
              description="Learn more about our AI voice agents and implementation details."
              linkText="View Documentation"
              linkUrl="https://poweredbyagency.ghost.io"
              isExternal={true}
            />
            
            <ResourceCard 
              icon={<Play className="h-5 w-5" />}
              title="Demo Experience"
              description="See our AI voice agents in action with interactive demos."
              linkText="Try Our Demos"
              linkUrl="/demo"
            />
            
            <ResourceCard 
              icon={<Phone className="h-5 w-5" />}
              title="Book a Consultation"
              description="Schedule a free 30-minute consultation with our AI voice experts."
              linkText="Book a Free Consultation"
              linkUrl="/contact"
            />
            
            <ResourceCard 
              icon={<ArrowRight className="h-5 w-5" />}
              title="Other Solutions"
              description="Explore our complete suite of AI solutions for your business."
              linkText="View Products"
              linkUrl="/products"
            />
          </div>
          
          {/* Return home button */}
          <div className="text-center">
            <Button
              variant="gradient"
              className="font-semibold"
              asChild
            >
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      
      {/* Visual elements */}
      <div className="fixed -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl opacity-20 pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20 pointer-events-none" />
      
      <Footer />
    </div>
  );
};

// Helper component for resource cards
interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  isExternal?: boolean;
}

const ResourceCard = ({ icon, title, description, linkText, linkUrl, isExternal = false }: ResourceCardProps) => {
  return (
    <Card className="bg-[#21162f] border-[#6342ff]/20 hover:border-[#6342ff]/40 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start">
          <div className="rounded-full bg-[#6342ff]/20 p-2 mr-4 mt-1">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            <p className="text-gray-400 text-sm mb-3">{description}</p>
            
            {isExternal ? (
              <a 
                href={linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#9b87f5] hover:text-[#b6a7f9] text-sm font-medium flex items-center"
              >
                {linkText} <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            ) : (
              <Link 
                to={linkUrl}
                className="text-[#9b87f5] hover:text-[#b6a7f9] text-sm font-medium flex items-center"
              >
                {linkText} <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThankYou;
