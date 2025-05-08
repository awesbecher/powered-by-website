import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GetStarted = () => {
  // Helper to check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#13151a] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6 md:text-5xl lg:text-6xl text-center">
            Get Started with Powered_by
          </h1>
          
          <div className="bg-white/5 rounded-lg p-8 backdrop-blur-md border border-white/10 shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Ready to transform your business with AI?</h2>
            <p className="text-gray-300 mb-6">
              Follow these simple steps to start using our AI solutions:
            </p>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* Step 1 */}
              <div className="bg-white/5 rounded-lg p-6">
                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Schedule a Consultation</h3>
                <p className="text-gray-400 mb-4">Speak with our AI specialists to discuss your business needs.</p>
                <button 
                  onClick={() => isBrowser && window.open('https://cal.com/team-powered-by-dfbtbb/get-started-today', '_blank')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                >
                  Book Now
                </button>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white/5 rounded-lg p-6">
                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Get a Custom Plan</h3>
                <p className="text-gray-400 mb-4">Receive a tailored solution designed for your specific business challenges.</p>
                <button 
                  onClick={() => isBrowser && window.open('/custom-ai-solutions', '_self')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                >
                  View Solutions
                </button>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white/5 rounded-lg p-6">
                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Implementation</h3>
                <p className="text-gray-400 mb-4">Our team handles the setup and integration with your existing systems.</p>
                <button 
                  onClick={() => isBrowser && window.open('/about', '_self')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                >
                  Our Process
                </button>
              </div>
              
              {/* Step 4 */}
              <div className="bg-white/5 rounded-lg p-6">
                <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="text-xl font-semibold mb-2">Launch & Support</h3>
                <p className="text-gray-400 mb-4">Go live with your AI solution with ongoing optimization and support.</p>
                <button 
                  onClick={() => isBrowser && window.location.href = 'mailto:team@poweredby.agency'}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Have Questions?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team is ready to help you navigate the world of AI and find the perfect solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => isBrowser && window.open('https://cal.com/team-powered-by-dfbtbb/get-started-today', '_blank')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Schedule a Call
              </button>
              <button 
                onClick={() => isBrowser && window.location.href = 'mailto:team@poweredby.agency'}
                className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-white font-medium rounded-lg transition-colors"
              >
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GetStarted;
