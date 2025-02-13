
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DrinksMenu = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link 
        to="/room-service" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Room Service</span>
      </Link>

      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8 text-center">
          Drinks Menu
        </h1>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <img 
            src="/lovable-uploads/dfa6c12a-d0aa-4b21-bca9-73cf4b428400.png" 
            alt="Drinks Menu" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DrinksMenu;
