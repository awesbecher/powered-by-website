
// Helper function to preload images with enhanced caching
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
      console.log(`Image already cached: ${src}`);
      resolve();
      return;
    }
    
    // Not cached, so load it properly with high priority
    const img = new Image();
    
    img.onload = () => {
      // Image loaded successfully
      console.log(`Successfully preloaded: ${src}`);
      resolve();
    };
    
    img.onerror = (err) => {
      console.error(`Failed to preload image: ${src}`, err);
      // Resolve anyway to not block the animation
      resolve();
    };
    
    // Set priority to high for critical images
    img.fetchPriority = 'high';
    
    // Set cache control headers
    img.setAttribute('crossOrigin', 'anonymous');
    
    // Load the image immediately
    img.src = src;
  });
};

// Utility to fetch and cache images as blobs for better memory management
export const preloadAndCacheImage = async (src: string): Promise<void> => {
  if (!src) return;
  
  try {
    // Check if already cached
    const cachedImage = new Image();
    cachedImage.src = src;
    if (cachedImage.complete) return;
    
    // Use modern fetch API to load image with cache priorities
    const response = await fetch(src, {
      method: 'GET',
      headers: {
        'Cache-Control': 'max-age=31536000',
      },
      cache: 'force-cache',
      priority: 'high', // Use high priority for fetch
    });
    
    if (!response.ok) throw new Error(`Failed to fetch image: ${src}`);
    
    // Convert to blob and create object URL for better memory management
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    
    // Create and load image from blob
    const img = new Image();
    img.onload = () => {
      // Once loaded, add to cache by forcing a paint
      document.body.appendChild(img);
      document.body.removeChild(img);
      // Release object URL to free memory
      URL.revokeObjectURL(objectUrl);
    };
    img.style.position = 'absolute';
    img.style.opacity = '0';
    img.style.pointerEvents = 'none';
    img.style.width = '1px';
    img.style.height = '1px';
    img.src = objectUrl;
    
    console.log(`Cached as blob: ${src}`);
  } catch (error) {
    console.error(`Error in preloadAndCacheImage for ${src}:`, error);
    // Don't throw, just log, so we don't block the animation
  }
};
