
/**
 * Ensures CustomEvent support across browsers by implementing a polyfill if needed
 */
export const ensureCustomEventSupport = (): void => {
  if (typeof window !== 'undefined') {
    // Check if CustomEvent constructor is supported
    if (typeof window.CustomEvent === 'function') {
      console.log("CustomEvent already supported natively");
      return;
    }

    console.log("Implementing CustomEvent polyfill");
    
    // Create a polyfill for CustomEvent
    function CustomEventPolyfill<T>(
      event: string,
      params?: CustomEventInit<T>
    ): CustomEvent<T> {
      const evt = document.createEvent('CustomEvent');
      const eventParams = params || { bubbles: false, cancelable: false, detail: null };
      evt.initCustomEvent(
        event,
        eventParams.bubbles || false,
        eventParams.cancelable || false,
        eventParams.detail || null
      );
      return evt as CustomEvent<T>;
    }

    // Replace the native CustomEvent with our polyfill
    window.CustomEvent = CustomEventPolyfill as any;
  }
};
