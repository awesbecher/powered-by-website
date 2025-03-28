
import React, { useEffect, useRef } from 'react';

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
  const adobeDCViewRef = useRef<any>(null);
  
  // Default configuration
  const defaultConfig = {
    embedMode: 'SIZED_CONTAINER',
    showDownloadPDF: true,
    showPrintPDF: true,
    showAnnotationTools: false,
    ...viewerConfig
  };

  useEffect(() => {
    // Check if the Adobe DC View SDK is loaded
    if ((window as any).AdobeDC) {
      initPdfViewer();
    } else {
      // Add event listener for when the SDK is ready
      document.addEventListener('adobe_dc_view_sdk.ready', () => initPdfViewer());
      
      // Load the Adobe DC View SDK
      const script = document.createElement('script');
      script.src = 'https://documentservices.adobe.com/view-sdk/viewer.js';
      script.async = true;
      document.head.appendChild(script);
      
      return () => {
        document.removeEventListener('adobe_dc_view_sdk.ready', () => initPdfViewer());
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [pdfUrl]);
  
  const initPdfViewer = () => {
    if (!containerRef.current) return;
    
    try {
      const adobeDCView = new (window as any).AdobeDC.View({
        clientId: 'YOUR_CLIENT_ID', // Replace with your Adobe PDF Embed API client ID
        divId: containerRef.current.id,
      });
      
      adobeDCViewRef.current = adobeDCView;
      
      adobeDCView.previewFile({
        content: { location: { url: pdfUrl } },
        metaData: { fileName: 'Virtual SE Whitepaper.pdf' }
      }, defaultConfig);
    } catch (error) {
      console.error('Error initializing Adobe PDF viewer:', error);
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      id="adobe-dc-view" 
      className="w-full h-full"
    />
  );
};

export default PdfViewer;
