
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ServiceBoxesProps {
  initialLoad: boolean;
  onTryNow?: () => void;
}

export const ServiceBoxes = ({ initialLoad, onTryNow }: ServiceBoxesProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  
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
    
    // Set up message listener for form submission
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from Tally and contains form submission data
      if (event.data?.type === 'tally:form:submitted') {
        // Redirect to thank you page on form submission
        setTimeout(() => {
          navigate('/thank-you');
        }, 1000);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-2 text-left">Get Started With Voice AI Today</h2>
          <iframe
            ref={iframeRef}
            data-tally-src="https://tally.so/embed/nW1VqP?alignLeft=1"
            width="100%"
            height="445"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Get Started with AI Receptionist Today!"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
