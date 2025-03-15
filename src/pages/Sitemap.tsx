
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Sitemap = () => {
  // Define all site routes for SEO purposes
  const routes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/blog", name: "Blog" },
    { path: "/contact", name: "Contact" },
    { path: "/contact-2", name: "Contact (Alternative)" },
    { path: "/products", name: "Products" },
    { path: "/demo", name: "Demo" },
    { path: "/real-estate", name: "Real Estate" },
    { path: "/ai-agency", name: "AI Agency" },
    { path: "/ai-receptionist", name: "AI Receptionist" },
    { path: "/voice-chat", name: "Voice Chat" },
    { path: "/email-agent", name: "Email Agent" },
    { path: "/text-agent", name: "Text Agent" },
    { path: "/mercedes-dealer", name: "Mercedes Dealer" },
    { path: "/retail-services", name: "Retail Services" },
    { path: "/insurance", name: "Insurance" },
    { path: "/license", name: "License" },
    { path: "/virtual-se", name: "Virtual SE" },
    { path: "/outbound-ai", name: "Outbound AI" },
    { path: "/voiceagent-form", name: "Voice Agent Form" },
    { path: "/call-confirmation", name: "Call Confirmation" },
    { path: "/food-menu", name: "Food Menu" },
    { path: "/room-service", name: "Room Service" },
    { path: "/terms-of-service", name: "Terms of Service" },
    { path: "/privacy-statement", name: "Privacy Statement" },
    { path: "/sitemap", name: "Sitemap" }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Sitemap</h1>
        
        <div className="bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 p-8 mb-8">
          <p className="text-white mb-4">
            An XML sitemap is also available at <a href="/sitemap.xml" className="text-[#9b87f5] hover:underline" target="_blank" rel="noopener noreferrer">sitemap.xml</a> for search engines.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="text-gray-300 hover:text-[#9b87f5] transition-colors py-2 block"
              >
                {route.name} - <span className="text-gray-500">{route.path}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Site Structure</h2>
          <div className="bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 p-8">
            <div className="prose prose-invert max-w-none">
              <p>
                The Powered_by Agency website is organized to provide comprehensive information about our AI agent solutions for small and medium-sized businesses.
              </p>
              <p>
                Our site is structured to showcase our various AI agent solutions including voice agents, email agents, text agents, and specialized industry solutions.
                You can find detailed information about each solution, along with use cases, benefits, and implementation details.
              </p>
              <p>
                For the latest insights on AI technology and its applications for businesses, visit our <Link to="/blog" className="text-[#9b87f5] hover:underline">blog</Link>.
                To learn more about our agency and our mission, check out our <Link to="/about" className="text-[#9b87f5] hover:underline">about page</Link>.
              </p>
              <p>
                If you're interested in our services or have questions, you can reach us through our <Link to="/contact" className="text-[#9b87f5] hover:underline">contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sitemap;
