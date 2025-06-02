
import React, { useEffect, useRef, useCallback } from "react";

interface TallyFormEmbedProps {
  className?: string;
  formId?: string;
  referral?: string;
  height?: string | number;
  transparentBackground?: boolean;
  alignLeft?: boolean;
  onSubmit?: () => void;
}

export const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ 
  className = "",
  formId = "nW1VqP", // Default form ID
  referral,
  height = 800, // Default height
  transparentBackground = true,
  alignLeft = true,
  onSubmit
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const handleTallyEvent = useCallback((event: MessageEvent) => {
    console.log('TallyFormEmbed received message:', event.data);
    
    // Check various forms of the success message
    const isSuccess = 
      (event.data?.type === 'tally-form-submit-success') || 
      (typeof event.data === 'string' && event.data.includes('tally-form-submit-success')) ||
      (event.data?.eventName === 'tally-form-submit-success') ||
      (typeof event.data === 'string' && event.data.includes('thanks for completing'));
    
    if (isSuccess) {
      console.log('Form submission success detected in TallyFormEmbed!');
      if (onSubmit) {
        console.log('Calling onSubmit callback');
        onSubmit();
      }
    }
  }, [onSubmit]);
  
  useEffect(() => {
    // Check if Tally script already exists to prevent duplicate loading
    const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    
    // Only load script if it doesn't already exist
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      
      script.onload = () => {
        // Once script is loaded, initialize the iframe if needed
        if (iframeRef.current && window.Tally) {
          window.Tally.loadEmbeds();
        } else if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.dataset.tallySrc || "";
        }
      };
      
      document.body.appendChild(script);
    } else if (iframeRef.current && window.Tally) {
      // If script already exists, just initialize the iframe
      window.Tally.loadEmbeds();
    }
    
    // Add event listener for messages
    window.addEventListener('message', handleTallyEvent);
    
    // Clean up
    return () => {
      window.removeEventListener('message', handleTallyEvent);
    };
  }, [handleTallyEvent]);

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
        onLoad={() => console.log('Tally iframe loaded')}
      ></iframe>
    </div>
  );
};
