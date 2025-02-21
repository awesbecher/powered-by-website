
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Building2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Solutions = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Header with Logo and Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        {/* Logo */}
        <div>
          <Link to="/">
            <img 
              src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              alt="Parlar Logo"
              className="w-[192px] lg:w-[288px] h-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex items-center space-x-3">
            <li>
              <Link to="/" className="text-white hover:text-accent transition-colors">
                AI Agency
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/solutions" className="text-accent transition-colors">
                Solutions
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/demo" className="text-white hover:text-accent transition-colors">
                Demos
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/contact" className="text-white hover:text-accent transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Solutions Content */}
      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-white text-center sm:text-6xl mb-12">
            Our Solutions
          </h1>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Customer Service AI",
                description: "24/7 automated customer support across all channels",
                icon: Bot,
                image: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpg"
              },
              {
                title: "Sales Automation",
                description: "Intelligent lead qualification and sales process automation",
                icon: Building2,
                image: "/lovable-uploads/photo-1605810230434-7631ac76ec81.jpg"
              },
              {
                title: "Workflow Automation",
                description: "Streamline internal processes with AI-powered automation",
                icon: Clock,
                image: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg"
              }
            ].map((solution, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden rounded-xl bg-black/50 p-8 transition-all duration-300 hover:bg-black/60"
              >
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <solution.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
                  <p className="text-gray-300 mb-6">{solution.description}</p>
                  <Link to="/contact">
                    <Button variant="outline" className="group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
