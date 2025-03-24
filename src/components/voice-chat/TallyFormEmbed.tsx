
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface TallyFormEmbedProps {
  formId?: string;
  className?: string;
  email?: string;
  referral?: string;
  redirectToThankYou?: boolean;
  initialLoad?: boolean;
}

export const TallyFormEmbed: React.FC<TallyFormEmbedProps> = ({ 
  formId = "wMM2yY", 
  className = "",
  email = "",
  referral = "",
  redirectToThankYou = true,
  initialLoad
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Set up message listener for form submission
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from Tally and contains form submission data
      if (event.data?.type === 'tally:form:submitted' && redirectToThankYou) {
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
  }, [navigate, redirectToThankYou]);

  // Construct the src URL with query parameters
  const getSrcUrl = () => {
    let baseUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1&transparentBackground=1`;
    
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
    <div className={`tally-form-container ${className} ${initialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} transition-all duration-1000 delay-200 ease-out border border-white rounded-3xl p-4 pb-2`}>
      <h2 className="text-2xl font-bold text-white mb-3 text-left">Get Started With Powered_by Today</h2>
      <iframe
        ref={iframeRef}
        data-tally-src={getSrcUrl()}
        width="100%"
        height="580px"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Contact Form"
      ></iframe>
      <div className="text-[10px] text-gray-400 mt-1 text-left">
        By using <PoweredByText className="text-[10px] px-1 py-0" /> you agree to our <a href="https://poweredby.agency/terms-of-service" className="underline hover:text-gray-300 transition-colors">Terms of Service</a>, <a href="https://poweredby.agency/privacy-statement" className="underline hover:text-gray-300 transition-colors">Privacy</a>, and <a href="https://poweredby.agency/privacy-statement" className="underline hover:text-gray-300 transition-colors">Security</a> policies and practices.
      </div>
    </div>
  );
};
