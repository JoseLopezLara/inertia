import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="p-8 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Oops! Something went wrong.</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    We've encountered an error. Please try refreshing the page.
                </p>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
