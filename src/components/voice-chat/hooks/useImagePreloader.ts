
import { useState, useEffect } from "react";
import { properties } from "@/data/properties";
import { preloadImage } from "../utils/imageUtils";

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Get all images that need to be preloaded
        const imagesToLoad = [
          ...properties.map(property => property.image),
          "/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png", // Agent image
          "/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png"  // Logo
        ];
        
        const totalImages = imagesToLoad.length;
        let loadedCount = 0;
        
        // Use Promise.all with individual tracking
        await Promise.all(
          imagesToLoad.map(src => 
            preloadImage(src).then(() => {
              loadedCount++;
              setProgress(Math.floor((loadedCount / totalImages) * 100));
            })
          )
        );
        
        // Set as fully loaded
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload images:", error);
        // Still set as loaded if there's an error to avoid blocking the UI
        setImagesLoaded(true);
      }
    };

    // Start preloading immediately
    preloadImages();
  }, []);

  return { imagesLoaded, progress };
};
