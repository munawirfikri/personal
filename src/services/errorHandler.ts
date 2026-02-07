import { trackEvent } from './analytics';

export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    trackEvent('Error', 'Unhandled Promise Rejection', event.reason?.message || 'Unknown');
    event.preventDefault();
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
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
