
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FoodMenu = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {!isMobile && <div className="absolute top-8 right-8">
        <img 
          src="/lovable-uploads/f61255a3-5368-4739-a068-ec3431ea636f.png" 
          alt="GrandView Hotel Logo" 
          className="h-24 w-auto"
        />
      </div>}

      <Link 
        to="/room-service" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Room Service</span>
      </Link>

      <div className="mx-auto max-w-6xl mt-20">
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <img 
            src="/lovable-uploads/ac8b8cfd-fc02-4e33-88bc-33898e7820f9.png" 
            alt="Restaurant Menu" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
