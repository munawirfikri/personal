import React, { Component, ErrorInfo, ReactNode } from "react";
import { trackEvent } from '../services/analytics';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // Track error in analytics
    trackEvent('Error', 'Runtime Error', `${error.message} - ${errorInfo.componentStack?.slice(0, 100)}`);
    
    // Optional: Send to error tracking service (Sentry, etc)
    if (import.meta.env.PROD) {
      // this.reportErrorToService(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary p-8 text-center">
          <div className="bg-surfaceHighlight p-8 rounded-2xl border border-border shadow-2xl max-w-lg w-full">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="text-secondary mb-6">The application encountered an unexpected error.</p>
            
            <div className="bg-background p-4 rounded-lg border border-border text-left mb-6 overflow-auto max-h-40">
                <code className="text-xs font-mono text-red-400 break-words">
                    {this.state.error?.message || "Unknown Error"}
                </code>
            </div>

            <button
                onClick={() => {
                    trackEvent('Error', 'Clear Cache', 'User cleared cache after error');
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href = '/';
                }}
                className="w-full px-6 py-3 bg-primary text-background rounded-lg font-bold hover:opacity-90 transition-opacity mb-3"
            >
                Clear Cache & Reload
            </button>
            
            <button
                onClick={() => window.location.href = '/'}
                className="w-full px-6 py-3 border border-border bg-transparent text-primary rounded-lg font-medium hover:bg-surfaceHighlight transition-colors"
            >
                Go to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;