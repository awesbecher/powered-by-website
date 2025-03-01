
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
    
    // If image is already in DOM, resolve immediately
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
    img.setAttribute('decoding', 'sync');
    
    // Set cache control headers
    img.setAttribute('crossOrigin', 'anonymous');
    
    // Actually start loading the image
    img.src = src;
  });
};

// Force preload images before rendering by embedding them directly in the DOM with dataURIs or CSS
export const forcePrefetchImages = (urls: string[]): void => {
  // Add to localStorage cache to maintain across sessions
  try {
    const cachedImages = JSON.parse(localStorage.getItem('cachedImageUrls') || '[]');
    const newUrls = urls.filter(url => !cachedImages.includes(url));
    
    if (newUrls.length > 0) {
      localStorage.setItem('cachedImageUrls', JSON.stringify([...cachedImages, ...newUrls]));
    }
  } catch (e) {
    console.warn('Could not cache image URLs in localStorage');
  }

  // Create a hidden container for preloaded images
  const preloadContainer = document.getElementById('image-preload-container') || 
    document.createElement('div');
    
  if (!document.getElementById('image-preload-container')) {
    preloadContainer.id = 'image-preload-container';
    preloadContainer.style.position = 'absolute';
    preloadContainer.style.width = '0';
    preloadContainer.style.height = '0';
    preloadContainer.style.opacity = '0';
    preloadContainer.style.overflow = 'hidden';
    preloadContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(preloadContainer);
  }

  // Create image elements for each URL
  urls.forEach(url => {
    // Skip if already in the DOM
    if (document.querySelector(`#image-preload-container img[src="${url}"]`)) {
      return;
    }
    
    const img = document.createElement('img');
    img.src = url;
    img.loading = 'eager';
    img.fetchPriority = 'high';
    img.decoding = 'sync'; // Request synchronous decode
    img.style.position = 'absolute';
    img.style.width = '1px';
    img.style.height = '1px';
    preloadContainer.appendChild(img);
    
    // Also create a link preload tag in head
    const linkPreload = document.createElement('link');
    linkPreload.rel = 'preload';
    linkPreload.href = url;
    linkPreload.as = 'image';
    linkPreload.importance = 'high';
    document.head.appendChild(linkPreload);
  });
};

// Add CSS background-image preloading for even faster visual rendering
export const addCSSImagePreloading = (urls: string[]): void => {
  if (!document.getElementById('preload-css')) {
    const style = document.createElement('style');
    style.id = 'preload-css';
    
    const cssRules = urls.map((url, index) => 
      `.preload-image-${index} { background-image: url(${url}); }`
    ).join('\n');
    
    style.textContent = cssRules;
    document.head.appendChild(style);
  }
};

// Create an image stylesheet to force browser to download all images on page load
export const preloadAllProjectImages = (): void => {
  // Load from all known image sources
  try {
    const cachedUrls = JSON.parse(localStorage.getItem('cachedImageUrls') || '[]');
    if (cachedUrls.length > 0) {
      forcePrefetchImages(cachedUrls);
      addCSSImagePreloading(cachedUrls);
    }
  } catch (e) {
    console.warn('Could not load cached image URLs from localStorage');
  }
};

// Initialize preloading right away
preloadAllProjectImages();
