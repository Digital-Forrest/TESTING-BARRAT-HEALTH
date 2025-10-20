import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class LazyLoadErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: any): void {
    console.error('[LazyLoadErrorBoundary] Failed to load component:', error);
    console.error('[LazyLoadErrorBoundary] Error message:', error.message);
    console.error('[LazyLoadErrorBoundary] Error stack:', error.stack);
    console.error('[LazyLoadErrorBoundary] Component stack:', errorInfo?.componentStack);
    console.error('[LazyLoadErrorBoundary] Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-light-gray">
          <div className="text-center px-4 max-w-2xl">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Failed to Load Page
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              We encountered an issue loading this page. This might be due to a network problem or outdated cache.
            </p>
            {this.state.error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p className="text-sm font-semibold text-red-900 mb-2">Error Details:</p>
                <p className="text-sm text-red-800 font-mono break-all">{this.state.error.message}</p>
                <p className="text-xs text-red-600 mt-2">Check browser console for full stack trace</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={this.handleRetry}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                Reload Page
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              >
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

