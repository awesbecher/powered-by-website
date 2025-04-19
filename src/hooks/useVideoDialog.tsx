
import { useState, useCallback } from 'react';

export function useVideoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const VideoDialog = useCallback(() => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={close}>
        <div className="relative w-full max-w-4xl mx-4" onClick={e => e.stopPropagation()}>
          <button 
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
            onClick={close}
          >
            Close
          </button>
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/w6juT92KdRo?si=NKIDvf5BdRGp2zzx&autoplay=1" 
              title="What's an AI Agent?" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  }, [isOpen, close]);
  
  return { isOpen, open, close, VideoDialog };
}
