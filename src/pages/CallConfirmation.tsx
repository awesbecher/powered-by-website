
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
          Your order has been successfully placed.
        </p>

        <div className="mt-12 bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">What happens next?</h2>
          <ul className="text-left text-gray-300 space-y-4">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
              <span>Your order is being prepared</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
              <span>We'll process your {isFromFood ? "food" : "drinks"} order promptly</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
              <span>Your order will be delivered to your room shortly</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CallConfirmation;
