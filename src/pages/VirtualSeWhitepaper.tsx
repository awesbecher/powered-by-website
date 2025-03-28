
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PdfViewer from '@/components/pdf/PdfViewer';

const VirtualSeWhitepaper = () => {
  // Replace this URL with your externally hosted PDF URL if needed
  const pdfUrl = "https://your-hosting-service.com/path-to-your-pdf.pdf";
  
  return (
    <div className="min-h-screen flex flex-col bg-[#1a0b2e]">
      <Navbar />
      
      {/* PDF viewer section */}
      <div className="flex-grow flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-7xl bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-300/20">
          <div className="p-6 bg-gradient-to-r from-[#9b87f5]/20 to-[#6342ff]/20 border-b border-purple-300/20">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e9e1ff]">
              Virtual SE Whitepaper
            </h1>
          </div>
          
          {/* PDF Viewer Container */}
          <div className="relative w-full aspect-video md:aspect-auto md:h-[75vh]">
            <PdfViewer 
              pdfUrl={pdfUrl}
              viewerConfig={{
                showDownloadPDF: true,
                showPrintPDF: true,
                showAnnotationTools: false
              }}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VirtualSeWhitepaper;
