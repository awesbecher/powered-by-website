import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const VirtualSeEbook = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a0b2e]">
      <Navbar />
      
      {/* E-book display section */}
      <div className="flex-grow flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-7xl bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-300/20">
          <div className="p-6 bg-gradient-to-r from-[#9b87f5]/30 to-[#6342ff]/30 border-b border-purple-300/20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-20"></div>
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#9b87f5]/30 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#6342ff]/30 blur-3xl"></div>
            
            {/* Title with enhanced styling - changed from purple to red border */}
            <div className="relative z-10 text-center">
              <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e9e1ff] leading-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl tracking-tight mb-1">A Virtual SE</span>
                <span className="block text-xl md:text-2xl lg:text-3xl text-[#ea384c] font-light tracking-wide">in the</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-1">Modern SaaS Sales Organization</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#ea384c] to-[#d42e40] mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
          
          <div className="relative w-full aspect-video md:aspect-auto md:h-[70vh]">
            <iframe 
              allowFullScreen 
              src="https://designrr.page?id=469294&token=1895197207&h=6605" 
              height="100%" 
              width="100%" 
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              title="Virtual SE e-book"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VirtualSeEbook;
