
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PdfViewer from '@/components/pdf/PdfViewer';
import { useToast } from '@/hooks/use-toast';

const VirtualSeWhitepaper = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Store Google Drive ID separately for direct embedding
  const googleDriveId = "1VTsvGv8Id7iP3c-XtG3nXAyficFAkLCA";
  
  // Provide both URLs for maximum compatibility
  const pdfUrl = `https://drive.google.com/uc?export=download&id=${googleDriveId}`;
  
  useEffect(() => {
    // Show loading toast
    if (isLoading) {
      toast({
        title: "Loading PDF",
        description: "The whitepaper is being loaded...",
        duration: 3000,
      });
    }
    
    // Set loading to false after a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Extended timeout to ensure document loads
    
    return () => clearTimeout(timer);
  }, [toast, isLoading]);
  
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
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a0b2e]/50 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-t-[#9b87f5] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-white text-lg">Loading whitepaper...</p>
                </div>
              </div>
            ) : null}
            
            <PdfViewer 
              pdfUrl={pdfUrl}
              googleDriveId={googleDriveId}
              viewerConfig={{
                showDownloadPDF: true,
                showPrintPDF: true,
                showAnnotationTools: false
              }}
            />
          </div>
          
          {/* Download link as fallback */}
          <div className="p-4 text-center border-t border-purple-300/20">
            <a 
              href={`https://drive.google.com/uc?export=download&id=${googleDriveId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9b87f5] hover:text-white transition-colors"
            >
              Download the whitepaper directly
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VirtualSeWhitepaper;
