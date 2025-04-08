
import React from "react";
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
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <div className="relative group">
                  <Link 
                    to="/products" 
                    className="absolute inset-0 z-10"
                    onClick={(e) => {
                      // Allow the click to go through to the Link when clicking directly on the text
                      e.stopPropagation();
                    }}
                  />
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-gray-300 hover:text-white">
                    <span className="flex items-center">
                      Solutions
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </span>
                  </NavigationMenuTrigger>
                </div>
                <NavigationMenuContent className="bg-[#222222] border border-gray-700 shadow-lg min-w-[180px] z-50">
                  <ul className="p-2">
                    <li>
                      <Link to="/voice-chat" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                        AI Voice Chat
                      </Link>
                    </li>
                    <li>
                      <Link to="/ai-receptionist" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                        AI Receptionist
                      </Link>
                    </li>
                    <li>
                      <Link to="/email-agent" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                        Email Agent
                      </Link>
                    </li>
                    <li>
                      <Link to="/text-agent" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                        Text Agent
                      </Link>
                    </li>
                    <li>
                      <Link to="/virtual-se" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                        Virtual SE
                      </Link>
                    </li>
                    <li>
                      <Link to="/outbound-ai" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2f1c4a]">
                        OutboundAI
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};
