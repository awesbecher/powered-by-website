
import { useEffect, useRef } from "react";

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
    </div>
  );
};
