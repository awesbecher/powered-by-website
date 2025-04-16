
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: React.ReactNode;
  description: string;
  features?: string[];
  icon: LucideIcon;
}

export const ServiceCard = ({
  title,
  description,
  features = [],
  icon: Icon,
}: ServiceCardProps) => {
  return (
    <motion.div
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0b2e]/60 via-[#2f1c4a]/30 to-[#1a0b2e]/60" />
      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left column: Icon and image */}
        <motion.div 
          className="lg:col-span-5 flex flex-col items-center lg:items-start"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="p-3 bg-accent/20 backdrop-blur-sm rounded-xl mb-8 border border-accent/30">
            <Icon className="h-12 w-12 text-accent" />
          </div>
          
          <div className="rounded-xl overflow-hidden border-2 border-white/10 shadow-xl shadow-accent/5 aspect-video w-full max-w-md">
            <OptimizedImage
              src="/lovable-uploads/ac998611-204a-4c1d-984c-5f8d400f57ef.png"
              alt="Product visualization"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        {/* Right column: Title, description, features */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-4">{title}</h2>
          <p className="text-gray-300 mb-8 text-lg">{description}</p>
          
          {features.length > 0 && (
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="shrink-0 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <p className="text-gray-200">{feature}</p>
                </motion.div>
              ))}
            </div>
          )}
          
          <motion.div 
            className="flex flex-wrap gap-4"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="gradient" 
              size="lg"
              data-tally-open="w2og9b"
              data-tally-layout="modal"
              data-tally-width="476"
              data-tally-hide-title="1"
              data-tally-auto-close="0"
              data-tally-overlay="1"
              className="rounded-md"
            >
              Schedule a Demo
            </Button>
            
            <Link to="/contact">
              <Button variant="outline" size="lg" className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-accent/50 rounded-md">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
