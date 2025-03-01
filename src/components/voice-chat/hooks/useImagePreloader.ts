
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
        console.log("Starting advanced image preloading...");
        
        // Critical images that need to load first (logo and first property)
        const criticalImages = [
          "/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png",  // Logo
          properties[0].image,  // First property image
        ];
        
        // Secondary images that can load afterwards
        const secondaryImages = [
          ...properties.slice(1).map(property => property.image),
          "/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png", // Agent image
        ];
        
        const totalImages = criticalImages.length + secondaryImages.length;
        let loadedCount = 0;
        
        // Helper function to update progress
        const updateProgress = () => {
          loadedCount++;
          const percentage = Math.floor((loadedCount / totalImages) * 100);
          setProgress(percentage);
          console.log(`Image preloading progress: ${percentage}%`);
        };
        
        // First preload critical images (await them)
        console.log("Preloading critical images first...");
        await Promise.all(
          criticalImages.map(src => 
            preloadImage(src).then(updateProgress)
          )
        );
        
        // Mark as loaded as soon as critical images are ready
        // This allows the animation to start while remaining images load in background
        console.log("Critical images loaded, starting animation...");
        setImagesLoaded(true);
        
        // Then load the rest in the background (don't await)
        console.log("Loading remaining images in background...");
        Promise.all(
          secondaryImages.map(src => 
            preloadAndCacheImage(src).then(updateProgress)
          )
        ).then(() => {
          console.log("All images fully loaded and cached");
        });
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
