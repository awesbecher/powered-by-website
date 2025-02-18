
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Star, Zap, Shield, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LicenseProductCard } from "@/components/insurance/LicenseProductCard";

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

  // Check if the customer ID is exactly 8 digits
  const isValidCustomerId = customerId.length === 8;

  const licenseOptions = [
    {
      title: "Basic License",
      description: "Perfect for small businesses just getting started",
      price: "$99/month",
      icon: Star,
      features: [
        "Up to 100 transactions/month",
        "Basic support",
        "Standard API access",
        "2 team members"
      ]
    },
    {
      title: "Professional",
      description: "Ideal for growing businesses with higher volume needs",
      price: "$199/month",
      icon: Zap,
      features: [
        "Up to 1,000 transactions/month",
        "Priority support",
        "Advanced API access",
        "5 team members"
      ]
    },
    {
      title: "Business",
      description: "For established businesses requiring robust features",
      price: "$399/month",
      icon: Shield,
      features: [
        "Up to 5,000 transactions/month",
        "24/7 premium support",
        "Full API access",
        "10 team members"
      ]
    },
    {
      title: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Custom pricing",
      icon: Crown,
      features: [
        "Unlimited transactions",
        "Dedicated support team",
        "Custom API solutions",
        "Unlimited team members"
      ]
    }
  ];

  return <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-8 right-8">
        <img 
          src="/lovable-uploads/57b14d49-eab1-4dd2-827d-dceb363f5514.png" 
          alt="RightBloom Logo" 
          className="h-10 w-auto" 
        />
      </div>

      {/* Back button */}
      <Link to="/" className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors">
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          License Upgrade
        </h1>

        {/* License Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {licenseOptions.map((option) => (
            <LicenseProductCard
              key={option.title}
              title={option.title}
              description={option.description}
              price={option.price}
              features={option.features}
              icon={option.icon}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
            <p className="text-xl text-gray-300 mb-8">
              RightBloom's virtual agent is ready to help you upgrade your license. To get started, we will need the following information:
            </p>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full max-w-md">
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
              <button 
                onClick={handleClick} 
                disabled={!isValidCustomerId}
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Speak To A Sales Rep
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default License;
