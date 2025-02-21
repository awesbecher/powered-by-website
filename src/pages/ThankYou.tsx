
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>
      </div>

      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          Thank you!
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-300">
          A human (not an AI agent) will be back in touch shortly.
        </p>
        <div className="mt-10">
          <Link 
            to="/" 
            className="text-accent hover:text-accent-dark transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Gradient orbs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default ThankYou;
