
/**
 * CustomEvent polyfill for IE support and consistent behavior across browsers
 */
export const ensureCustomEventSupport = () => {
  if (typeof window.CustomEvent === 'function') return;

  function CustomEvent(event: string, params: CustomEventInit) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles || false, params.cancelable || false, params.detail || null);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  (window as any).CustomEvent = CustomEvent;
};
