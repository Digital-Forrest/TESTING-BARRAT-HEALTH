import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorFallback } from './ErrorFallback';

export function RouteErrorBoundary() {
  const error = useRouteError();

  console.error('[RouteErrorBoundary] Caught error:', error);
  console.error('[RouteErrorBoundary] Error type:', typeof error);
  console.error('[RouteErrorBoundary] Error keys:', error ? Object.keys(error) : 'null');

  useEffect(() => {
    // Report the route error
    if (error) {
      let errorMessage = 'Unknown route error';
      let errorStack = '';

      if (isRouteErrorResponse(error)) {
        console.error('[RouteErrorBoundary] Is RouteErrorResponse');
        errorMessage = `Route Error ${error.status}: ${error.statusText}`;
        if (error.data) {
          errorMessage += ` - ${JSON.stringify(error.data)}`;
        }
      } else if (error instanceof Error) {
        console.error('[RouteErrorBoundary] Is Error instance:', error.message);
        errorMessage = error.message;
        errorStack = error.stack || '';
      } else if (typeof error === 'string') {
        console.error('[RouteErrorBoundary] Is string:', error);
        errorMessage = error;
      } else {
        console.error('[RouteErrorBoundary] Is other type');
        errorMessage = JSON.stringify(error);
      }

      console.error('[RouteErrorBoundary] Final error message:', errorMessage);

      // Only report errors in development
      if (import.meta.env.DEV) {
        import('@/lib/errorReporter').then(({ errorReporter }) => {
          if (errorReporter) {
            errorReporter.report({
              message: errorMessage,
              stack: errorStack,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              source: 'react-router',
              error: error,
              level: "error",
            });
          }
        }).catch(() => {
          // Silently fail if error reporter can't be loaded
        });
      }
    }
  }, [error]);

  // Render error UI using shared ErrorFallback component
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorFallback
        title={`${error.status} ${error.statusText}`}
        message="Sorry, an error occurred while loading this page."
        error={error.data ? { message: JSON.stringify(error.data, null, 2) } : error}
        statusMessage="Navigation error detected"
      />
    );
  }

  return (
    <ErrorFallback
      title="Unexpected Error"
      message="An unexpected error occurred while loading this page."
      error={error}
      statusMessage="Routing error detected"
    />
  );
}