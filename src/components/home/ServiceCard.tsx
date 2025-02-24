
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
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-2xl bg-[#1a0b2e] border border-accent/20 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 transform-gpu hover:scale-[1.02] min-h-[240px] flex flex-col justify-between cursor-pointer"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-accent via-[#E5DEFF] to-accent bg-clip-text text-transparent font-bold">
          {category}
        </h2>
      </div>

      <div className="relative z-10 text-center">
        <h3 className="text-xl font-semibold tracking-tight text-white mb-2 whitespace-nowrap">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 text-sm font-bold">{description}</p>
        <button className="flex items-center justify-center gap-1 mx-auto px-3 py-1 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors font-bold text-sm pointer-events-none">
          {category === "Retail Services" ? (
            <>
              <MessageCircle className="w-4 h-4" /> Chat with Us
            </>
          ) : category === "Hospitality" ? (
            <>
              <Phone className="w-4 h-4" /> Speak to Room Service
            </>
          ) : category === "Insurance" ? (
            <>
              <Phone className="w-4 h-4" /> Speak to an Agent
            </>
          ) : category === "SaaS Licensing" ? (
            <>
              <Phone className="w-4 h-4" /> Speak to Sales
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
