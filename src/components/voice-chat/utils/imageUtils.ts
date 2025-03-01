
// Helper function to preload images with better caching
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Skip processing if the image URL is invalid
    if (!src) {
      console.warn("Invalid image source provided for preloading");
      resolve();
      return;
    }
    
    // Check if image is already cached by the browser
    const cachedImage = new Image();
    cachedImage.src = src;
    
    if (cachedImage.complete) {
      // Image is already cached, resolve immediately
      resolve();
      return;
    }
    
    // Not cached, so load it properly
    const img = new Image();
    
    img.onload = () => {
      // Image loaded successfully
      resolve();
    };
    
    img.onerror = (err) => {
      console.error(`Failed to preload image: ${src}`, err);
      // Resolve anyway to not block the animation
      resolve();
    };
    
    // Set cache control headers
    img.setAttribute('crossOrigin', 'anonymous');
    
    // Set source last to trigger loading
    img.src = src;
  });
};
