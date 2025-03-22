
import { X } from "lucide-react";

interface AnnouncementBannerProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

const AnnouncementBanner = ({ 
  onClose,
  showCloseButton = false 
}: AnnouncementBannerProps) => {
  
  return (
    <div className="w-full bg-gradient-to-r from-[#a0b4ff] to-[#c9ccff] py-2">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex-1 flex justify-center">
          <a 
            href="https://www.producthunt.com/posts/powered_by?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-powered&#0095;by" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=942846&theme=dark&t=1742671943126" 
              alt="Powered&#0095;by - Custom&#0032;AI&#0032;Agents&#0032;for&#0032;SMBs&#0046;&#0032;Agentic&#0032;voice&#0044;&#0032;email&#0044;&#0032;SMS&#0044;&#0032;&#0038;&#0032;more | Product Hunt" 
              style={{ width: "250px", height: "54px" }} 
              width="250" 
              height="54" 
            />
          </a>
        </div>
        
        {showCloseButton && onClose && (
          <button 
            onClick={onClose}
            className="text-black opacity-70 hover:opacity-100 ml-2"
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
