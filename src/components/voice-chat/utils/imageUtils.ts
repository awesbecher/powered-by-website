
// Helper function to preload images with browser cache prioritization
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Skip processing if the image URL is invalid
    if (!src) {
      console.warn("Invalid image source provided for preloading");
      resolve();
      return;
    }
    
    // Check if image is already cached by the browser using a DOM check
    const cachedImage = new Image();
    
    // If image is already in cache, resolve immediately
    if (document.querySelector(`img[src="${src}"]`)) {
      console.log(`Image already in DOM: ${src}`);
      resolve();
      return;
    }
    
    cachedImage.src = src;
    if (cachedImage.complete) {
      console.log(`Image already cached: ${src}`);
      resolve();
      return;
    }
    
    // Not cached, so load it properly with high priority
    const img = new Image();
    
    img.onload = () => {
      console.log(`Successfully preloaded: ${src}`);
      resolve();
    };
    
    img.onerror = (err) => {
      console.error(`Failed to preload image: ${src}`, err);
      // Resolve anyway to not block the animation
      resolve();
    };
    
    // Set attributes for high priority loading
    img.setAttribute('loading', 'eager');
    img.setAttribute('fetchpriority', 'high');
    img.setAttribute('importance', 'high');
    
    // Set cache control headers
    img.setAttribute('crossOrigin', 'anonymous');
    
    // Actually start loading the image
    img.src = src;
  });
};

// Force preload images before rendering by creating DOM elements that load the images
export const forcePrefetchImages = (urls: string[]): void => {
  // Create a hidden container for preloaded images
  const preloadContainer = document.createElement('div');
  preloadContainer.style.position = 'absolute';
  preloadContainer.style.width = '0';
  preloadContainer.style.height = '0';
  preloadContainer.style.opacity = '0';
  preloadContainer.style.overflow = 'hidden';
  preloadContainer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(preloadContainer);

  // Create image elements for each URL
  urls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.loading = 'eager';
    img.fetchPriority = 'high';
    img.style.position = 'absolute';
    img.style.width = '1px';
    img.style.height = '1px';
    preloadContainer.appendChild(img);
  });

  // Clean up after a delay (images should be cached by then)
  setTimeout(() => {
    if (document.body.contains(preloadContainer)) {
      document.body.removeChild(preloadContainer);
    }
  }, 5000);
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
      priority: 'high', 
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
