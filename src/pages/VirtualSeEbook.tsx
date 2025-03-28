
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
          <div className="p-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#6342ff]/20 border-b border-purple-300/20">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              A Virtual SE in the Modern SaaS Sales Organization
            </h1>
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
