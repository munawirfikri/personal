import { useEffect } from 'react';
import { trackEvent } from '../services/analytics';

interface AsyncErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AsyncErrorBoundary = ({ children, fallback }: AsyncErrorBoundaryProps) => {
  useEffect(() => {
    const handleError = (event: PromiseRejectionEvent) => {
      console.error('Async error caught:', event.reason);
      trackEvent('Error', 'Async Operation Failed', event.reason?.message || 'Unknown');
    };

    window.addEventListener('unhandledrejection', handleError);
    return () => window.removeEventListener('unhandledrejection', handleError);
  }, []);

  return <>{children}</>;
};
