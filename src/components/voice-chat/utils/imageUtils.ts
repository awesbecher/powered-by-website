
// Helper function to preload images with enhanced caching
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Skip processing if the image URL is invalid
    if (!src) {
      console.warn("Invalid image source provided for preloading");
      resolve();
      return;
    }
    
    // Add cache busting for development, but use cached version in production
    const cacheBuster = process.env.NODE_ENV === 'development' ? `?cache=${Date.now()}` : '';
    const imgSrc = src + cacheBuster;
    
    // Check if image is already cached by the browser
    const cachedImage = new Image();
    cachedImage.src = src;
    
    if (cachedImage.complete) {
      // Image is already cached, resolve immediately
      console.log(`Image already cached: ${src}`);
      resolve();
      return;
    }
    
    // Not cached, so load it properly
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
    
    // Set source last to trigger loading
    img.src = imgSrc;
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
    
    // Fetch image and store in cache
    const response = await fetch(src, {
      method: 'GET',
      headers: {
        'Cache-Control': 'max-age=31536000',
      },
      cache: 'force-cache',
    });
    
    if (!response.ok) throw new Error(`Failed to fetch image: ${src}`);
    
    // Convert to blob and create object URL for better memory management
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    
    // Create and load image from blob
    const img = new Image();
    img.src = objectUrl;
    
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve; // Still resolve to avoid blocking
    });
    
    // Release object URL to free memory
    URL.revokeObjectURL(objectUrl);
    
    console.log(`Cached as blob: ${src}`);
  } catch (error) {
    console.error(`Error in preloadAndCacheImage for ${src}:`, error);
    // Don't throw, just log, so we don't block the animation
  }
};
