
import { Brain, Bot, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

const AIAgency = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222] pt-24">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Business with
            <span className="bg-gradient-to-r from-accent via-[#E5DEFF] to-accent bg-clip-text text-transparent"> AI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We specialize in creating custom AI solutions that automate your business processes and enhance customer experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Brain,
              title: "Custom AI Development",
              description: "Tailored AI solutions designed specifically for your business needs"
            },
            {
              icon: Bot,
              title: "AI Integration",
              description: "Seamlessly integrate AI into your existing systems and workflows"
            },
            {
              icon: Workflow,
              title: "Process Automation",
              description: "Automate repetitive tasks and streamline your operations"
            }
          ].map((service, index) => (
            <div
              key={index}
              className="bg-[#2A2A2A] p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <service.icon className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center pb-16">
          <Link
            to="/demo"
            className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-accent hover:bg-accent-dark transition-colors duration-200"
          >
            See Our Solutions
          </Link>
        </div>
      </div>

      {/* Gradient Orbs */}
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="fixed bottom-0 left-0 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default AIAgency;
