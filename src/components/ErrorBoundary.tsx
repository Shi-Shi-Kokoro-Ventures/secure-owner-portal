import React, { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import { logger } from "@/utils/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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
    logger.error("Error caught in getDerivedStateFromError:", error);
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log both the error and the component stack
    logger.error("Error caught by boundary:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      location: window.location.pathname
    });
    
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRetry = () => {
    logger.info("Retrying after error...");
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    logger.info("Navigating home after error...");
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] p-8 flex items-center justify-center">
          <div className="max-w-md w-full space-y-4">
            <Alert variant="destructive" className="border-2">
              <AlertTitle className="text-lg font-semibold">
                Something went wrong
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="text-sm mb-2">
                  {this.state.error?.message || "An unexpected error occurred"}
                </p>
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <pre className="text-xs mt-2 p-2 bg-background/10 rounded overflow-auto max-h-[200px]">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={this.handleRetry}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={this.handleGoHome}
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}