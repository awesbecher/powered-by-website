
import { useState, useEffect } from "react";
import { properties } from "@/data/properties";
import { preloadImage } from "../utils/imageUtils";

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Get the first 4 properties for preloading
        const displayProperties = properties.slice(0, 4);
        
        // Preload all property images and agent image
        await Promise.all([
          ...displayProperties.map(property => preloadImage(property.image)),
          preloadImage("/lovable-uploads/f8dcc881-9e41-4bee-b8e5-78e0fdbccabb.png"), // Agent image
          preloadImage("/lovable-uploads/f6cd5c39-f85a-4586-9140-cd8e12d9b947.png")  // Logo
        ]);
        
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload images:", error);
        // Still set as loaded if there's an error to avoid blocking the UI
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  return imagesLoaded;
};
