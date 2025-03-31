
import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { useEffect } from "react";

interface ServiceProps {
  title: string;
  description: string;
  link: string;
  logo: string;
  category: string;
}

export const ServiceCard = ({ title, description, link, logo, category }: ServiceProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to the link
    
    // Check if user has already completed the form
    if (localStorage.getItem('demoFormCompleted') === 'true') {
      // If completed before, redirect directly to demo page
      window.location.href = '/demo';
      return;
    }
    
    // Trigger Tally popup for new users
    if (window.Tally && typeof window.Tally.openPopup === 'function') {
      window.Tally.openPopup('mVNb9y', {
        width: 540,
        layout: 'modal',
        hideTitle: true,
        ref: category, // Use the category as a reference
      });
    }
  };
  
  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl bg-[#1a0b2e] border border-accent/20 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 transform-gpu hover:scale-[1.02] min-h-[200px] flex flex-col cursor-pointer"
    >
      <div className="flex flex-col items-center mb-1">
        <h2 className="text-xl font-semibold text-accent font-bold">
          {category}
        </h2>
      </div>

      <div className="relative z-10 text-center flex-1 flex flex-col justify-center">
        <h3 className="text-xl font-semibold tracking-tight text-white mb-1 whitespace-nowrap border-b-2 border-[#9b87f5] inline-block mx-auto pb-1">
          {title}
        </h3>
        <p className="text-gray-400 mb-3 text-sm font-bold">{description}</p>
        <button className="flex items-center justify-center gap-1 mx-auto px-3 py-1 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors font-bold text-sm pointer-events-none">
          {category === "Retail Services" ? (
            <>
              <Phone className="w-4 h-4" /> Speak to our Team
            </>
          ) : category === "Hospitality" ? (
            <>
              <Phone className="w-4 h-4" /> Speak to Room Service
            </>
          ) : category === "Insurance" ? (
            <>
              <Phone className="w-4 h-4" /> Speak to an Agent
            </>
          ) : category === "SaaS & Software" ? (
            <>
              <Phone className="w-4 h-4" /> Speak to Sales Rep
            </>
          ) : (
            <>
              <Phone className="w-4 h-4" /> {category === "Auto Dealer" ? "Speak to Sales" : "Speak to an Agent"}
            </>
          )}
        </button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};
