
import React, { useEffect, useRef, useState } from 'react';

interface PdfViewerProps {
  pdfUrl: string;
  viewerConfig?: {
    embedMode?: 'SIZED_CONTAINER' | 'FULL_WINDOW' | 'IN_LINE' | 'LIGHT_BOX';
    showDownloadPDF?: boolean;
    showPrintPDF?: boolean;
    showAnnotationTools?: boolean;
  };
}

const PdfViewer = ({ pdfUrl, viewerConfig = {} }: PdfViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallbackMode, setFallbackMode] = useState(false);
  
  // Default configuration
  const defaultConfig = {
    embedMode: 'SIZED_CONTAINER',
    showDownloadPDF: true,
    showPrintPDF: true,
    showAnnotationTools: false,
    ...viewerConfig
  };

  useEffect(() => {
    let initTimeout: NodeJS.Timeout;
    
    const initAdobeViewer = () => {
      // Check if the Adobe DC View SDK is loaded
      if ((window as any).AdobeDC) {
        try {
          if (!containerRef.current) return;
          
          const adobeDCView = new (window as any).AdobeDC.View({
            clientId: 'd6ec47c58f1846068c194fbb84f3cb5d', // Adobe PDF Embed API client ID
            divId: containerRef.current.id,
          });
          
          adobeDCView.previewFile({
            content: { location: { url: pdfUrl } },
            metaData: { fileName: 'Virtual SE Whitepaper.pdf' }
          }, defaultConfig);
        } catch (error) {
          console.error('Error initializing Adobe PDF viewer:', error);
          setFallbackMode(true);
        }
      } else {
        // If Adobe SDK fails to load after 5 seconds, switch to fallback mode
        initTimeout = setTimeout(() => {
          console.warn('Adobe PDF viewer failed to initialize, switching to fallback mode');
          setFallbackMode(true);
        }, 5000);
      }
    };
    
    // Add event listener for when the SDK is ready
    document.addEventListener('adobe_dc_view_sdk.ready', initAdobeViewer);
    
    // Load the Adobe DC View SDK
    const script = document.createElement('script');
    script.src = 'https://documentservices.adobe.com/view-sdk/viewer.js';
    script.async = true;
    document.head.appendChild(script);
    
    // Initialize viewer after a short delay
    const timer = setTimeout(initAdobeViewer, 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(initTimeout);
      document.removeEventListener('adobe_dc_view_sdk.ready', initAdobeViewer);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [pdfUrl]);
  
  // Simple fallback iframe PDF viewer 
  if (fallbackMode) {
    return (
      <iframe 
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
        className="w-full h-full border-0"
        title="PDF Viewer"
      />
    );
  }
  
  return (
    <div 
      ref={containerRef} 
      id="adobe-dc-view" 
      className="w-full h-full"
    />
  );
};

export default PdfViewer;
