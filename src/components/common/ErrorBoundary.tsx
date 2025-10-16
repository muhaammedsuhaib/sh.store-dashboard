import { Component, useEffect, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // You can also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>

            {/* Error Message */}
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We encountered an unexpected error. Please try again.
            </p>

            {/* Technical Details (Collapsible) */}
            {this.state.error && (
              <details className="text-left mb-4">
                <summary className="cursor-pointer text-sm text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-2">
                  Technical Details
                </summary>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-xs font-mono overflow-auto max-h-32">
                  <div className="text-red-600 dark:text-red-400 font-semibold">
                    {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo?.componentStack && (
                    <div className="text-slate-600 dark:text-slate-400 mt-2">
                      {this.state.errorInfo.componentStack}
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                variant="primary"
                icon={RefreshCw}
                className="flex-1"
              >
                Try Again
              </Button>

              <Button
                onClick={this.handleGoHome}
                variant="secondary"
                icon={Home}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-4 text-xs text-slate-500 dark:text-slate-500">
              If the problem persists, contact support.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for using error boundaries in functional components
export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return setError;
}

// Specialized Error Boundaries for different use cases
export function RouteErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log route errors specifically
        console.error("Route Error:", error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export function ComponentErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
          <p className="text-red-800 dark:text-red-300 text-sm">
            This component encountered an error.
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Error Display Component (for showing errors without breaking the app)
export function ErrorDisplay({
  error,
  onRetry,
  compact = false,
}: {
  error: Error | string;
  onRetry?: () => void;
  compact?: boolean;
}) {
  const errorMessage = typeof error === "string" ? error : error.message;

  if (compact) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <span className="text-red-800 dark:text-red-300 text-sm">
            {errorMessage}
          </span>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="secondary"
              size="sm"
              className="ml-auto"
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-red-800 dark:text-red-300 font-medium mb-1">
            Error
          </h4>
          <p className="text-red-700 dark:text-red-400 text-sm">
            {errorMessage}
          </p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="primary"
              size="sm"
              className="mt-3"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
