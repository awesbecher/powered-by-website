
import React from "react";
import { Mail, Clock, Zap, BarChart3, Bot, Lock } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Mail className="h-10 w-10 text-[#9b87f5]" />,
      title: "Smart Email Management",
      description: "Automatically categorize, prioritize, and respond to emails based on content and urgency."
    },
    {
      icon: <Clock className="h-10 w-10 text-[#9b87f5]" />,
      title: "24/7 Availability",
      description: "Never miss a customer inquiry, even outside business hours or during holidays."
    },
    {
      icon: <Zap className="h-10 w-10 text-[#9b87f5]" />,
      title: "Lightning-Fast Responses",
      description: "Deliver instant, accurate replies to common questions and requests in seconds."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-[#9b87f5]" />,
      title: "Performance Analytics",
      description: "Track response times, customer satisfaction, and conversion rates with detailed analytics."
    },
    {
      icon: <Bot className="h-10 w-10 text-[#9b87f5]" />,
      title: "Continuous Learning",
      description: "Your Email Agent gets smarter with every interaction, constantly improving its effectiveness."
    },
    {
      icon: <Lock className="h-10 w-10 text-[#9b87f5]" />,
      title: "Enterprise-Grade Security",
      description: "Industry-leading encryption and privacy controls keep your email communications secure."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl" id="features">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Powerful Features That Drive Results</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our AI Email Agent combines advanced machine learning with practical business tools to transform your email communications.
        </p>
      </div>
      
      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10"
          >
            <div className="mb-4 bg-gray-800 rounded-xl w-16 h-16 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
