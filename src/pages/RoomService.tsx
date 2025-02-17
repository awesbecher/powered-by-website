
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RoomService = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <a 
          href="https://madrone.capital/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" 
            alt="Madrone Capital Logo" 
            className="h-48 w-auto"
          />
        </a>
      </div>

      {/* Back button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Room Service
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300 mb-8">
            Our virtual agent is ready to take your room service order. 
            Place your order anytime, day or night.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/food-menu">
                <button 
                  className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 transition-colors w-full sm:w-auto"
                >
                  Food Menu
                </button>
              </Link>
              <Link to="/drinks-menu">
                <button 
                  className="bg-neutral-800 text-white px-6 py-2 rounded-md hover:bg-neutral-700 transition-colors w-full sm:w-auto"
                >
                  Drinks Menu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomService;
