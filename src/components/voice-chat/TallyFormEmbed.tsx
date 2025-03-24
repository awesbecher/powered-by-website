
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { POWERED_BY_STYLE } from "./hooks/types/contactFormTypes";

interface TallyFormEmbedProps {
  className?: string;
  initialLoad?: boolean;
  formId?: string;
  referral?: string;
}

export const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ 
  className = "",
  initialLoad,
  formId = "nW1VqP", // Default form ID
  referral
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    
    script.onload = () => {
      // Once script is loaded, set the iframe src
      if (iframeRef.current && window.Tally) {
        window.Tally.loadEmbeds();
      } else if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.dataset.tallySrc || "";
      }
    };
    
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Build the tally src URL with form ID and referral if provided
  const tallySrc = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1${referral ? `&referral=${referral}` : ''}`;

  return (
    <div className={`tally-form-container ${className}`}>
      <div className="border border-white/10 rounded-lg overflow-hidden glass-card">
        <iframe
          ref={iframeRef}
          data-tally-src={tallySrc}
          width="100%"
          height="460"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Get Started with AI Receptionist Today!"
        ></iframe>
        
        {/* Email disclaimer - completely eliminated spacing and reduced height further */}
        <div className="w-full bg-[#1a0b2e] py-0.5 px-4 text-white font-semibold text-left border-t border-gray-800/50">
          <p className="text-[9px] my-0">*Only business or company email addresses are accepted by this form.</p>
        </div>
        
        {/* Terms disclosure - completely eliminated spacing and reduced height further */}
        <div className="text-[8px] text-gray-200 text-center py-0.5 px-2 bg-gray-800/60 rounded-b border-t border-gray-700">
          By using <span className={POWERED_BY_STYLE}>Powered_by</span> you agree to our{" "}
          <Link to="/terms-of-service" className="text-purple-400 hover:text-purple-300 transition-colors">
            Terms of Service
          </Link>
          ,{" "}
          <Link to="/privacy-statement" className="text-purple-400 hover:text-purple-300 transition-colors">
            Privacy
          </Link>
          , and Security policies and practices.
        </div>
      </div>
    </div>
  );
};
