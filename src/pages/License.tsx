
import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const License = () => {
  const [customerId, setCustomerId] = useState("");

  const handleCustomerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 8 characters
    if (/^\d*$/.test(value)) {
      setCustomerId(value.slice(0, 8));
    }
  };

  const handleClick = () => {
    console.log("License upgrade request initiated", { customerId });
  };

  return <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <a href="https://madrone.capital/" target="_blank" rel="noopener noreferrer">
          <img src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" alt="Madrone Capital Logo" className="h-48 w-auto" />
        </a>
      </div>

      {/* Back button */}
      <Link to="/" className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors">
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          License Upgrade
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl text-gray-300 mb-8">RightBloom's virtual agent is ready to help you upgrade your license. To get started, we will need the following information:</p>
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-xs">
              <Input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Enter your RightBloom Customer ID # (8 digits):"
                value={customerId}
                onChange={handleCustomerIdChange}
                maxLength={8}
                className="text-center bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <button onClick={handleClick} className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md flex items-center gap-2">
              Speak To A Sales Rep
              <Phone className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};

export default License;
