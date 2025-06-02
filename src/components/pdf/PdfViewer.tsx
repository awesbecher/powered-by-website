
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface PdfViewerProps {
  pdfUrl: string;
  googleDriveId?: string;
  viewerConfig?: {
    showDownloadPDF?: boolean;
    showPrintPDF?: boolean;
    showAnnotationTools?: boolean;
  };
}

const PdfViewer = ({ pdfUrl, googleDriveId, viewerConfig = {} }: PdfViewerProps) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  
  // If we have a Google Drive ID, create a direct embed URL
  const getEmbedUrl = () => {
    if (googleDriveId) {
      return `https://drive.google.com/file/d/${googleDriveId}/preview`;
    }
    
    // Fallback to Google Docs viewer if no Drive ID
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIframeError(true);
    setIsIframeLoading(false);
    console.error("Failed to load PDF in iframe");
  };

  return (
    <div className="relative w-full h-full">
      {isIframeLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a0b2e]/50 backdrop-blur-sm z-10">
          <Skeleton className="w-full h-full bg-white/5" />
        </div>
      )}
      
      {iframeError ? (
        <div className="w-full h-full flex items-center justify-center bg-[#1a0b2e]/50">
          <div className="text-center p-6">
            <p className="text-white text-lg mb-4">Failed to load the PDF viewer.</p>
            <a 
              href={pdfUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#9b87f5] hover:text-white underline"
            >
              Download the PDF directly
            </a>
          </div>
        </div>
      ) : (
        <iframe 
          src={getEmbedUrl()}
          className="w-full h-full border-0"
          title="PDF Viewer"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          allow="autoplay"
        />
      )}
    </div>
  );
};

export default PdfViewer;
