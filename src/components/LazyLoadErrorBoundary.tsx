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

  public componentDidCatch(error: Error): void {
    if (import.meta.env.DEV) {
      console.error('[LazyLoadErrorBoundary] Failed to load component:', error);
    }
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
          <div className="text-center px-4 max-w-md">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Failed to Load Page
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We encountered an issue loading this page. This might be due to a network problem or outdated cache.
            </p>
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

