
import { useState, useEffect } from "react";
import { properties } from "@/data/properties";
import { preloadImage, preloadAndCacheImage } from "../utils/imageUtils";

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      try {
        console.log("Starting aggressive image preloading...");
        
        // Preload ALL property images immediately with high priority
        const propertyImages = properties.map(property => property.image);
        const otherImages = [
          "/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png",  // Logo
          "/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png", // Agent image
        ];
        
        // Combine all images to preload
        const allImages = [...propertyImages, ...otherImages];
        const totalImages = allImages.length;
        let loadedCount = 0;
        
        // Helper function to update progress
        const updateProgress = () => {
          loadedCount++;
          const percentage = Math.floor((loadedCount / totalImages) * 100);
          setProgress(percentage);
          
          // Mark as loaded once we have at least 50% of images
          if (percentage >= 50 && !imagesLoaded) {
            setImagesLoaded(true);
          }
          
          console.log(`Image preloading progress: ${percentage}%`);
        };
        
        // Use Promise.all but don't await - this allows processing to continue
        // while images are still loading
        Promise.all(
          allImages.map(src => 
            preloadImage(src).then(updateProgress)
          )
        );
        
        // Mark as loaded after a short timeout even if images aren't all loaded yet
        // This ensures the animation starts regardless of network conditions
        setTimeout(() => {
          if (!imagesLoaded) {
            console.log("Forcing animation start despite incomplete image loading");
            setImagesLoaded(true);
          }
        }, 400); // Short timeout to ensure animation doesn't wait too long
        
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
