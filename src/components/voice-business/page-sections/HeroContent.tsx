
import { Link } from "react-router-dom";

interface HeroContentProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroContent = ({ initialLoad, handleContact }: HeroContentProps) => {
  const scrollToForm = () => {
    // First find the Tally form container
    const formContainer = document.querySelector('.border.border-white.rounded-3xl');
    if (formContainer) {
      // Scroll to the form
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // After scrolling, find and focus on the first input field in the Tally form
      setTimeout(() => {
        const tallyIframe = document.querySelector('iframe[data-tally-src]');
        if (tallyIframe) {
          // Try to access iframe content and focus the first input
          try {
            const iframeDoc = (tallyIframe as HTMLIFrameElement).contentDocument || 
                             (tallyIframe as HTMLIFrameElement).contentWindow?.document;
            if (iframeDoc) {
              const firstInput = iframeDoc.querySelector('input, textarea, select');
              if (firstInput) {
                (firstInput as HTMLElement).focus();
              }
            }
          } catch (error) {
            console.log("Could not focus on form input due to cross-origin restrictions");
            // If we can't access the iframe content due to cross-origin restrictions,
            // at least we've scrolled to the form
          }
        }
      }, 1000); // Wait for the scroll to complete and iframe to fully load
    }
  };

  return (
    <div className={`w-full lg:w-1/2 space-y-4 transition-all duration-1000 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Meet Your New <span className="text-[#9b87f5]">AI Receptionist</span>
      </h1>
      <p className="text-lg text-gray-300">
        With an AI Receptionist by <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span>, you get the same personable experience customers expect from a traditional receptionist—only now it never sleeps, forgets, or drops a call. Sign up now to start building your own AI Receptionist.
      </p>
      <div className="space-y-3 text-gray-300">
        <p className="text-lg">Our AI Receptionist adapts to your business needs:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
          <li>Restaurant: Automate reservations and answer menu questions</li>
          <li>Auto Dealership: Pre-screen leads for test drives</li>
          <li>Retail: Answer product questions and handle order inquiries</li>
          <li>Small Business: Capture every lead, 24/7/365</li>
        </ul>
      </div>
      
      {/* Get Started button has been removed */}
    </div>
  );
};
