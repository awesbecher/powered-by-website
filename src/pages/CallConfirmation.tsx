
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";

const CallConfirmation = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222] px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/room-service" className="absolute top-24 left-8 flex items-center text-accent hover:text-accent/80 transition-colors">
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Room Service</span>
      </Link>
      
      <div className="mx-auto max-w-3xl text-center pt-20">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Call Confirmed
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300 mb-8">
            Our In-Room Dining team will take your order and have it delivered to your room in 30-45 mins.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CallConfirmation;
