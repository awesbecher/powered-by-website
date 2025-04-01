
import { useState, useEffect } from "react";
import { CalendlyWidget } from "@/components/contact/CalendlyWidget";

interface ServiceBoxesProps {
  initialLoad: boolean;
  onTryNow?: () => void;
}

export const ServiceBoxes = ({ initialLoad }: ServiceBoxesProps) => {
  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="w-full">
        <div className="border border-white rounded-3xl p-5 overflow-hidden">
          <CalendlyWidget 
            url="https://calendly.com/d/cntp-tg6-f8k?hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=7100ff" 
            height={500}
            initialLoad={initialLoad}
          />
        </div>
      </div>
    </div>
  );
};
