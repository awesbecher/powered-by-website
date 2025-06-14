import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Youtube } from "lucide-react";

// ScrollToTop component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const Footer = () => {
  return (
    <>
      <ScrollToTop />
      <footer className="w-full py-4 px-6 bg-gradient-to-r from-[#1a0b2e]/50 via-[#2f1c4a]/50 to-[#1a0b2e]/50 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 font-light">
            2025 Powered_by Agency, LLC. All rights reserved.
          </p>
          
          <div className="flex space-x-4 text-sm text-gray-400">
            <a 
              href="mailto:team@poweredby.agency" 
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
            <Link 
              to="/about" 
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link 
              to="/terms-of-service" 
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy-statement" 
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-white transition-colors"
            >
              Privacy Statement
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <a 
              href="https://www.youtube.com/@Powered_byAgency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
                <Youtube color="black" size={20} />
              </div>
            </a>
            <a 
              href="https://x.com/poweredbyagency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
                <img 
                  src="/assets/images/b02dc570-9fbb-41b9-81cf-b85f6d49be5f.png" 
                  alt="X Logo" 
                  className="w-6 h-6 object-cover"
                  style={{ objectPosition: "0 0", objectFit: "cover", width: "24px", height: "24px" }}
                />
              </div>
            </a>
            <a 
              href="https://www.linkedin.com/company/poweredbyagents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
                <img 
                  src="/assets/images/b02dc570-9fbb-41b9-81cf-b85f6d49be5f.png" 
                  alt="LinkedIn Logo" 
                  className="w-6 h-6 object-cover"
                  style={{ objectPosition: "100% 0", objectFit: "cover", width: "24px", height: "24px" }}
                />
              </div>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
