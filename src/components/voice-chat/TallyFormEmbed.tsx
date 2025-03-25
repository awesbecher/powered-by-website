
import React, { useEffect, useRef } from "react";

interface TallyFormEmbedProps {
  className?: string;
  formId?: string;
  referral?: string;
  height?: string | number;
  transparentBackground?: boolean;
  alignLeft?: boolean;
}

export const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ 
  className = "",
  formId = "nW1VqP", // Default form ID
  referral,
  height = 800, // Default height
  transparentBackground = true,
  alignLeft = true
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

  // Build the tally src URL with form ID and all requested parameters
  const tallySrc = `https://tally.so/embed/${formId}?${alignLeft ? 'alignLeft=1&' : ''}hideTitle=1&${transparentBackground ? 'transparentBackground=1&' : ''}dynamicHeight=1${referral ? `&referral=${referral}` : ''}`;

  return (
    <div className={`tally-form-container ${className}`}>
      <iframe
        ref={iframeRef}
        data-tally-src={tallySrc}
        width="100%"
        height={height}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Contact Form"
      ></iframe>
    </div>
  );
};
