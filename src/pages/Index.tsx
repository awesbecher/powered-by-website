
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

const Index = () => {
  const [currentWord, setCurrentWord] = useState("Voice");
  const words = ["Voice", "Phone", "Text", "Email", "Slack", "Chat", "Docs", "Survey"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % words.length;
        setCurrentWord(words[nextIndex]);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      title: "In-Room Dining",
      description: "Order food and drinks directly to your room",
      link: "/room-service",
      logo: "/lovable-uploads/75ff6e78-9db7-436e-a063-2b5f8c500ee7.png",
      category: "Hospitality"
    },
    {
      title: "Get an Insurance Quote",
      description: "Get an insurance quote tailored to your needs",
      link: "/insurance",
      logo: "/lovable-uploads/5b3d5137-838b-44a5-8f54-bb2a4cb7dc5a.png",
      category: "Insurance"
    },
    {
      title: "Upgrade your License",
      description: "Manage and upgrade your seat licenses",
      link: "/license",
      logo: "/lovable-uploads/e9ddfbf3-072d-410d-b7ed-01c83eb30564.png",
      category: "SaaS Licensing"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Logo */}
      <div className="absolute top-6 right-6 lg:right-8">
        <img 
          src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
          alt="Parlar Logo"
          className="w-[192px] lg:w-[288px] h-auto"
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              <span 
                className="
                  relative inline-block min-w-[120px] sm:min-w-[180px] 
                  transition-all duration-500 ease-in-out 
                  animate-fade-in
                  bg-gradient-to-r from-accent via-[#E5DEFF] to-accent 
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_10px_rgba(155,135,245,0.3)]
                  pb-4
                  after:content-[''] 
                  after:absolute 
                  after:bottom-0 
                  after:left-0 
                  after:w-full 
                  after:h-[4px] 
                  after:bg-accent
                  after:transform
                  after:origin-bottom-left
                  after:[clip-path:path('M0,0 C25,0 25,60 50,60 C75,60 75,0 100,0')]
                "
              >
                {currentWord}
              </span>
              Automation{" "}
              <span className="text-white">
                Simplified
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-400 leading-6">
              Parlar AI's voice & workflow agents can automate and improve even your most complex customer-facing tasks. See our AI voice agents in action by selecting any of the industry-specific use cases below.
            </p>
          </div>
        </div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>

      {/* Services Grid */}
      <div className="relative px-4 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.link}
                className="group relative overflow-hidden rounded-2xl bg-black p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 transform-gpu hover:scale-[1.02] min-h-[260px] flex flex-col justify-center cursor-pointer"
              >
                <h2 className="text-xl font-semibold absolute top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent via-[#E5DEFF] to-accent bg-clip-text text-transparent font-bold">
                  {service.category}
                </h2>
                {service.logo && (
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 mb-12">
                    <img 
                      src={service.logo} 
                      alt={`${service.title} Logo`} 
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                )}
                <div className="relative z-10 text-center mt-16">
                  <h3 className="text-xl font-semibold tracking-tight text-white mb-2 whitespace-nowrap">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">{service.description}</p>
                  {service.category === "Hospitality" && (
                    <button className="flex items-center justify-center gap-1 mx-auto px-3 py-1 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors font-bold text-sm pointer-events-none">
                      <Phone className="w-4 h-4" /> Speak to Room Service
                    </button>
                  )}
                  {service.category === "Insurance" && (
                    <button className="flex items-center justify-center gap-1 mx-auto px-3 py-1 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors font-bold text-sm pointer-events-none">
                      <Phone className="w-4 h-4" /> Speak to an Agent
                    </button>
                  )}
                  {service.category === "SaaS Licensing" && (
                    <button className="flex items-center justify-center gap-1 mx-auto px-3 py-1 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors font-bold text-sm pointer-events-none">
                      <Phone className="w-4 h-4" /> Speak to Sales
                    </button>
                  )}
                </div>
                
                {/* Card hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
