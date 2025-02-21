
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ServiceCard } from "../components/home/ServiceCard";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Header with Logo and Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              AI-Powered Solutions for Your Business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              We leverage the latest in artificial intelligence to provide innovative solutions tailored to your specific needs.
            </p>
          </div>

          {/* Services Grid */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard 
              title="AI Chatbots"
              description="Engage customers 24/7 with intelligent, automated conversations."
              link="/solutions/ai-chatbots"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="Retail Services"
            />
            <ServiceCard 
              title="Predictive Analytics"
              description="Make data-driven decisions with accurate forecasting and insights."
              link="/solutions/predictive-analytics"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="Insurance"
            />
            <ServiceCard 
              title="Personalized Recommendations"
              description="Increase sales with tailored product recommendations for each customer."
              link="/solutions/personalized-recommendations"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="Hospitality"
            />
            <ServiceCard 
              title="AI Sales Agent"
              description="Close more deals with an AI sales agent."
              link="/solutions/ai-sales-agent"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="SaaS Licensing"
            />
            <ServiceCard 
              title="AI Marketing Automation"
              description="Automate your marketing campaigns with AI."
              link="/solutions/ai-marketing-automation"
              logo="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              category="Auto Dealer"
            />
          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Index;
