
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PdfViewer from '@/components/pdf/PdfViewer';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink } from 'lucide-react';

const VirtualSeWhitepaper = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Store Google Drive ID for direct embedding
  const googleDriveId = "1VTsvGv8Id7iP3c-XtG3nXAyficFAkLCA";
  
  // Direct download URL
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${googleDriveId}`;
  
  // Direct view URL
  const viewUrl = `https://drive.google.com/file/d/${googleDriveId}/view`;
  
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
      <div className="flex-grow flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="w-full max-w-7xl bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-300/20">
          <div className="p-6 bg-gradient-to-r from-[#9b87f5]/20 to-[#6342ff]/20 border-b border-purple-300/20">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e9e1ff] whitespace-nowrap overflow-hidden text-ellipsis px-2">
              Whitepaper: <span className="font-bold text-[#9b87f5]">A Virtual SE in the Modern SaaS Sales Organization</span>
            </h1>
          </div>
          
          {/* PDF Viewer Container */}
          <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[75vh]">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a0b2e]/50 backdrop-blur-sm z-20">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-t-[#9b87f5] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-white text-lg">Loading whitepaper...</p>
                </div>
              </div>
            ) : null}
            
            <PdfViewer 
              pdfUrl={downloadUrl}
              googleDriveId={googleDriveId}
              viewerConfig={{
                showDownloadPDF: true,
                showPrintPDF: true,
                showAnnotationTools: false
              }}
            />
          </div>
          
          {/* Download and view links */}
          <div className="p-4 bg-white/5 border-t border-purple-300/20">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
              <a 
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#9b87f5] hover:text-white transition-colors"
              >
                <span>Download PDF</span>
                <ExternalLink size={16} />
              </a>
              
              <span className="hidden sm:inline-block text-gray-500">|</span>
              
              <a 
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#9b87f5] hover:text-white transition-colors"
              >
                <span>View in Google Drive</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VirtualSeWhitepaper;
