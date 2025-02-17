import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const DrinksMenu = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {!isMobile && <div className="absolute top-8 right-8">
        <a href="https://madrone.capital/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" 
            alt="Madrone Capital Logo" 
            className="h-48 w-auto"
          />
        </a>
      </div>}

      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Drinks Menu
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-white">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default DrinksMenu;
