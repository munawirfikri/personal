import { trackEvent } from './analytics';

export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    // Ignore Google reCAPTCHA cross-origin errors
    if (event.reason?.message?.includes('cross-origin') || 
        event.reason?.message?.includes('optout')) {
      event.preventDefault();
      return;
    }
    
    console.error('Unhandled promise rejection:', event.reason);
    trackEvent('Error', 'Unhandled Promise Rejection', event.reason?.message || 'Unknown');
    event.preventDefault();
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    // Ignore Google extension errors and browser extension errors
    if (event.message?.includes('cross-origin') || 
        event.filename?.includes('chrome-extension://') ||
        event.filename?.includes('autoPip.js') ||
        event.message?.includes('MediaSession')) {
      return;
    }
    
    console.error('Global error:', event.error);
    trackEvent('Error', 'Global Error', event.error?.message || event.message);
  });

  // Handle resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      const target = event.target as HTMLElement;
      trackEvent('Error', 'Resource Load Error', target.tagName);
    }
  }, true);
};
