
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Sitemap = () => {
  const links = [
    { title: "Home", path: "/" },
    { title: "AI Agency", path: "/ai-agency" },
    { title: "Products", path: "/products" },
    { title: "Voice Chat", path: "/voice-chat" },
    { title: "AI Receptionist", path: "/ai-receptionist" },
    { title: "Email Agent", path: "/email-agent" },
    { title: "Text Agent", path: "/text-agent" },
    { title: "About", path: "/about" },
    { title: "Blog", path: "/blog" },
    { title: "News", path: "/news" },
    { title: "Careers", path: "/careers" },
    { title: "Pricing", path: "/pricing" },
    { title: "Contact", path: "/contact" },
    { title: "Privacy Statement", path: "/privacy-statement" },
    { title: "Terms of Service", path: "/terms-of-service" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">Sitemap</h1>
        
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path} className="border-b border-white/10 last:border-b-0">
                <Link 
                  to={link.path}
                  className="block py-3 text-gray-300 hover:text-white transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap;
