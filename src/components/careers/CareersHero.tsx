
import React from "react";
import { Users } from "lucide-react";

export const CareersHero = () => {
  return (
    <div className="relative">
      <div className="glass-card rounded-xl p-8 md:p-12 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-gradient-to-br from-accent to-accent/60 p-4 rounded-full">
            <Users className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Join Our Team
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              We're building the future of AI agents for businesses. Join us on our mission to revolutionize how businesses engage with their customers through intelligent, conversational AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
