
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AnnouncementBannerProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

const AnnouncementBanner = ({ 
  onClose,
  showCloseButton = false 
}: AnnouncementBannerProps) => {
  // Change the URL to the internal route
  const FREE_VOICEAGENT_ROUTE = "/free-voiceagent";
  
  return (
    <div className="w-full bg-gradient-to-r from-[#a0b4ff] to-[#c9ccff] py-1.5">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="text-sm sm:text-base text-center text-black">
          <span className="font-semibold">New Offer</span>
          <span> Build a </span>
          <span className="text-[#9b87f5] font-semibold">Free</span>
          <span> Voice AI Agent Today for any Business Use Case </span>
          <Link 
            to={FREE_VOICEAGENT_ROUTE}
            className="font-semibold inline-flex items-center hover:underline"
          >
            Learn more 
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {showCloseButton && onClose && (
          <button 
            onClick={onClose}
            className="ml-2 text-black opacity-70 hover:opacity-100"
            aria-label="Close announcement"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
