
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Insurance = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <img 
          src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" 
          alt="Madrone Capital Logo" 
          className="h-48 w-auto"
        />
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
          Insurance Quote
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300 mb-8">
            Our virtual agent is ready to help you get an insurance quote.
            Get personalized coverage options tailored to your needs.
          </p>
          <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-8">
            Get Your Quote
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
