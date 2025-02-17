
import { Link, useLocation } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";

const CallConfirmation = () => {
  const location = useLocation();
  const isFromFood = location.pathname.includes('food');

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      <Link 
        to={isFromFood ? "/food-menu" : "/drinks-menu"} 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Menu</span>
      </Link>

      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-accent/10 p-4">
            <Check className="h-12 w-12 text-accent" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Thank You For Your Order
        </h1>
        
        <p className="mt-6 text-lg text-gray-300">
          It should be delivered to your room in the next 30-45 minutes.
        </p>
      </div>
    </div>
  );
};

export default CallConfirmation;
