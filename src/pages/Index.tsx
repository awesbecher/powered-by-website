
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Phone, LineChart, Users, Hourglass, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#222222]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#222222]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <img 
              src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              alt="Parlar AI Logo"
              className="h-10 w-auto"
            />
            <div className="flex gap-6">
              <Link 
                to="/products"
                className="text-white/80 hover:text-white transition-colors"
              >
                Solutions
              </Link>
              <Link 
                to="/"
                className="text-white/80 hover:text-white transition-colors"
              >
                Industries
              </Link>
              <Link 
                to="/"
                className="text-white/80 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link 
                to="/"
                className="text-white/80 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              AI Voice Solutions for<br />
              <span className="bg-gradient-to-r from-[#9b87f5] to-[#7a6cc5] text-transparent bg-clip-text">
                Growing Businesses
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transform your customer interactions with custom AI voice agents. 
              Reduce costs, improve service quality, and free your team for higher-value tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#9b87f5] hover:bg-[#7a6cc5] text-white px-8 py-6 rounded-lg font-semibold text-lg"
              >
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/products">
                <Button 
                  variant="outline"
                  className="px-8 py-6 rounded-lg font-semibold text-lg border-white/20 hover:bg-white/10"
                >
                  View Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Parlar AI?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We deliver tailored AI voice solutions that fit your business needs and budget,
            with end-to-end support from design to deployment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <Building2 className="w-12 h-12 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Industry-Specific Solutions</h3>
            <p className="text-gray-400">
              Custom voice agents designed for hospitality, automotive, food service, and real estate industries.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <DollarSign className="w-12 h-12 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">SMB-Friendly Pricing</h3>
            <p className="text-gray-400">
              Competitive pricing with flexible plans designed specifically for small and medium businesses.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <Users className="w-12 h-12 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Full Service Support</h3>
            <p className="text-gray-400">
              Comprehensive support from initial setup to ongoing maintenance and optimization.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-2xl p-12 backdrop-blur-sm border border-[#9b87f5]/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Experience AI Voice Agents in Action</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Try our interactive demo to see how AI voice agents can transform your business operations.
            </p>
            <Link to="/products">
              <Button 
                className="bg-white text-[#222222] hover:bg-white/90 px-8 py-6 rounded-lg font-semibold text-lg"
              >
                Launch Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <img 
                src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
                alt="Parlar AI Logo"
                className="h-8 w-auto"
              />
              <p className="text-gray-400 mt-2">Empowering SMBs with AI voice solutions</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Solutions</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Voice Agents</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Workflow Automation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
