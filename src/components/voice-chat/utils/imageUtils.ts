
// Helper function to preload images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if image is already cached by the browser
    const img = new Image();
    
    img.onload = () => {
      // Add a small delay to ensure the image is fully processed
      setTimeout(() => resolve(), 10);
    };
    
    img.onerror = (err) => {
      console.error(`Failed to preload image: ${src}`, err);
      reject();
    };
    
    // Set cache control headers
    img.setAttribute('crossOrigin', 'anonymous');
    
    // Set source last to trigger loading
    img.src = src;
    
    // If image is already complete, resolve immediately
    if (img.complete) {
      resolve();
    }
  });
};
