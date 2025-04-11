
import React, { useState } from "react";
import Logo from "@/components/layout/Logo";
import { MobileMenu } from "./MobileMenu";
import { Link } from "react-router-dom";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <div 
                  className="relative group flex items-center"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link 
                    to="/products" 
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-bold"
                  >
                    Solutions
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    className="ml-1 text-gray-300 hover:text-white focus:outline-none"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 bg-[#222222] border border-gray-700 shadow-lg w-48 z-50 rounded-md">
                      <ul className="py-1">
                        <li>
                          <Link to="/voice-chat" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                            AI Voice Chat
                          </Link>
                        </li>
                        <li>
                          <Link to="/ai-receptionist" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                            AI Receptionist
                          </Link>
                        </li>
                        <li>
                          <Link to="/email-agent" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                            Email Agent
                          </Link>
                        </li>
                        <li>
                          <Link to="/text-agent" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                            Text Agent
                          </Link>
                        </li>
                        <li>
                          <Link to="/virtual-se" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                            Virtual SE
                          </Link>
                        </li>
                        <li>
                          <Link to="/outbound-ai" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                            OutboundAI
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};
