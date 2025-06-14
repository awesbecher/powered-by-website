
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const VirtualSEMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const toggleExpandItem = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button 
        className="text-gray-300 hover:text-white p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Dropdown with Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden py-4 bg-[#222222] border-t border-gray-700 absolute top-20 left-0 right-0 z-50"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col space-y-2">
              <Link 
                to="/"
                className="mx-4 py-2 text-sm text-gray-300 hover:text-white font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Solutions Section */}
              <div className="flex flex-col">
                <div 
                  className="mx-4 py-2 flex items-center justify-between text-sm cursor-pointer"
                  onClick={() => toggleExpandItem("Solutions")}
                >
                  <span className="text-gray-300 font-medium">Solution</span>
                  <ChevronDown 
                    className="h-4 w-4 text-gray-500 transition-transform duration-200"
                    style={{ transform: expandedItem === "Solutions" ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </div>
                
                {expandedItem === "Solutions" && (
                  <div className="ml-8 flex flex-col space-y-2 mt-2 mb-2">
                    <Link
                      to="/voice-chat"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      AI Voice Chat
                    </Link>
                    <Link
                      to="/ai-receptionist"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      AI Receptionist
                    </Link>
                    <Link
                      to="/email-agent"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      Email Agent
                    </Link>
                    <Link
                      to="/text-agent"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      Text Agent
                    </Link>
                    <a
                      href="https://www.getvirtual.se"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      Virtual SE
                    </a>
                    <Link
                      to="/outbound-ai"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      OutboundAI
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Resources Section */}
              <div className="flex flex-col">
                <div 
                  className="mx-4 py-2 flex items-center justify-between text-sm cursor-pointer"
                  onClick={() => toggleExpandItem("Resources")}
                >
                  <span className="text-gray-300 font-medium">Resources</span>
                  <ChevronDown 
                    className="h-4 w-4 text-gray-500 transition-transform duration-200"
                    style={{ transform: expandedItem === "Resources" ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </div>
                
                {expandedItem === "Resources" && (
                  <div className="ml-8 flex flex-col space-y-2 mt-2 mb-2">
                    <Link
                      to="/demo"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      Demos
                    </Link>
                    <a
                      href="https://poweredbyagency.ghost.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      AI Research
                    </a>
                    <Link
                      to="/news"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      News
                    </Link>
                    <a
                      href="https://www.youtube.com/@Powered_byAgency"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      Videos
                    </a>
                    <a
                      href="https://powered-by-ai-agents.jellypod.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 inline" />
                      Podcast
                    </a>
                  </div>
                )}
              </div>
              
              <Link
                to="/contact"
                className="mx-4 mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ea384c]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualSEMobileMenu;
