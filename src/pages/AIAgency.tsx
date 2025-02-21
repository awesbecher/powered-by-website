
import { Link } from "react-router-dom";

const AIAgency = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Header with Logo and Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        {/* Logo */}
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex items-center space-x-3">
            <li>
              <Link to="/ai-agency" className="text-accent transition-colors">
                AI Agency
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/solutions" className="text-white hover:text-accent transition-colors">
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

      {/* AI Agency Content */}
      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-white text-center sm:text-6xl mb-4 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
            AI Agency Services
          </h1>
          <p className="text-xl text-gray-300 text-center mb-12 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
            Transforming businesses through intelligent automation
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAgency;
