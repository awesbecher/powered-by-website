
import { useEffect, useRef } from "react";
import { POWERED_BY_STYLE } from "./hooks/types/contactFormTypes";

interface TallyFormEmbedProps {
  formId?: string;
  className?: string;
  email?: string;
  referral?: string;
}

export const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ 
  formId = "wMM2yY", 
  className = "",
  email = "",
  referral = ""
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Construct the src URL with query parameters
  const getSrcUrl = () => {
    let baseUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1`;
    
    // Add email if provided
    if (email) {
      baseUrl += `&email=${encodeURIComponent(email)}`;
    }
    
    // Add referral if provided
    if (referral) {
      baseUrl += `&ref=${encodeURIComponent(referral)}`;
    }
    
    return baseUrl;
  };

  return (
    <div className={`tally-form-container ${className}`}>
      <iframe
        ref={iframeRef}
        data-tally-src={getSrcUrl()}
        width="100%"
        height="380px"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Voice AI Contact Form"
        style={{ minHeight: "380px", maxHeight: "400px" }}
      ></iframe>
      <div className="text-[10px] text-gray-400 mt-2 text-left">
        By using <span className={POWERED_BY_STYLE}>Powered_by</span> you agree to our <a href="https://poweredby.agency/terms-of-service" className="underline hover:text-gray-300 transition-colors">Terms of Service</a>, Privacy, and Security policies and practices.
      </div>
    </div>
  );
};
