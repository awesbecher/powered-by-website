
import { useState, useEffect } from "react";
import { properties } from "@/data/properties";
import { preloadImage, forcePrefetchImages } from "../utils/imageUtils";

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      try {
        console.log("Starting ultra-aggressive image preloading...");
        
        // Get all property images
        const propertyImages = properties.map(property => property.image);
        const otherImages = [
          "/assets/images/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png",  // Logo
          "/assets/images/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png", // Agent image
        ];
        
        // Combine all images to preload
        const allImages = [...propertyImages, ...otherImages];
        
        // IMMEDIATELY create DOM elements to force browser to load these images
        // This is the most aggressive approach
        forcePrefetchImages(allImages);
        
        // Set as loaded immediately - we'll rely on the individual component's loading state
        setImagesLoaded(true);
        setProgress(100);
        
        // Still do the regular preloading in the background for completeness
        const totalImages = allImages.length;
        let loadedCount = 0;
        
        // Helper function to update progress - mostly just for logging now
        const updateProgress = () => {
          loadedCount++;
          const percentage = Math.floor((loadedCount / totalImages) * 100);
          console.log(`Background image preloading progress: ${percentage}%`);
        };
        
        // Process in background
        Promise.all(
          allImages.map(src => 
            preloadImage(src).then(updateProgress)
          )
        );
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
