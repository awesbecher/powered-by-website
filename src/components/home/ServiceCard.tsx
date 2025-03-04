
import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";

interface ServiceProps {
  title: string;
  description: string;
  link: string;
  logo: string;
  category: string;
}

export const ServiceCard = ({ title, description, link, logo, category }: ServiceProps) => {
  // Ensure the link for Retail Services is always lowercase and correctly formatted
  const formattedLink = category === "Retail Services" ? "/retail-services" : link;
  
  return (
    <Link
      to={formattedLink}
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
    </Link>
  );
};
