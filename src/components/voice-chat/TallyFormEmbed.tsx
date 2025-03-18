
import { useEffect, useRef } from "react";

interface TallyFormEmbedProps {
  formId?: string;
  className?: string;
}

export const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ 
  formId = "3qvqKg", 
  className = "" 
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

  return (
    <div className={`tally-form-container ${className}`}>
      <iframe
        ref={iframeRef}
        data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1&transparentBackground=1`}
        width="100%"
        height="400px"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Voice AI Contact Form"
        style={{ minHeight: "400px", maxHeight: "480px" }}
      ></iframe>
    </div>
  );
};
