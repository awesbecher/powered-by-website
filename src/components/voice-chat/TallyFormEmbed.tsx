
import React, { useEffect, useRef } from "react";

interface TallyFormEmbedProps {
  className?: string;
  formId?: string;
  referral?: string;
  height?: string | number;
}

export const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ 
  className = "",
  formId = "nW1VqP", // Default form ID
  referral,
  height = 800 // Default height
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
          height={height}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Get Started with AI Receptionist Today!"
        ></iframe>
      </div>
    </div>
  );
};
