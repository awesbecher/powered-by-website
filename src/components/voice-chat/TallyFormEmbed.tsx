
import { useEffect, useRef } from "react";

interface TallyFormEmbedProps {
  formId: string;
  className?: string;
}

export const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ formId, className = "" }) => {
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
        data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1`}
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Voice AI Contact Form"
        className="min-h-[500px]"
      ></iframe>
    </div>
  );
};
