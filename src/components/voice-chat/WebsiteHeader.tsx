import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu } from "lucide-react";

export const WebsiteHeader = () => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/assets/images/314cb21d-7fdb-4cdd-a44e-da8af003a7f9.png" 
              alt="Phoenix Realty Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-gray-900 font-semibold">Phoenix Realty</span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Properties</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>

          {/* Contact Button and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              className="hidden md:flex items-center text-gray-700 hover:text-gray-900"
            >
              <Phone className="w-4 h-4 mr-2" />
              (480) 555-0123
            </Button>
            <Button 
              size="icon"
              variant="ghost"
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
