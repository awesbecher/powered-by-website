
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RoomService = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222] px-4 py-16 sm:px-6 lg:px-8">
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <img 
        src="/lovable-uploads/ec9dd264-4bb3-4b03-9b50-e31383652af9.png"
        alt="GrandView Hotel"
        className="absolute top-8 right-8 h-24 w-auto"
      />

      <div className="mx-auto max-w-3xl text-center pt-16">
        <h1 className="text-5xl font-bold text-white mb-8">Order Room Service</h1>
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/2035fcd4-8b92-4f84-ad1e-c4ecae819711.png"
            alt="Drink Menu"
            className="max-w-2xl w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomService;
