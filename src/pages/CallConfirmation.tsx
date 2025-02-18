
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CallConfirmation = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute top-8 right-8">
        <img 
          src="/lovable-uploads/57b14d49-eab1-4dd2-827d-dceb363f5514.png" 
          alt="RightBloom Logo" 
          className="h-10 w-auto"
        />
      </div>

      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Call Confirmation
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300">
            Thank you for your interest! You will receive a confirmation SMS shortly, and our agent will be in touch with you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallConfirmation;
