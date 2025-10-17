// Only load error reporter in development
if (import.meta.env.DEV) {
  import('@/lib/errorReporter');
}

// Register service worker in production
if (import.meta.env.PROD) {
  import('@/lib/serviceWorker').then(({ registerServiceWorker }) => {
    registerServiceWorker();
  });
}

import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { LazyLoadErrorBoundary } from '@/components/LazyLoadErrorBoundary';
import { Layout } from '@/components/Layout';
import '@/index.css';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const TestimonialsPage = lazy(() => import('@/pages/TestimonialsPage').then(m => ({ default: m.TestimonialsPage })));
const BlogPage = lazy(() => import('@/pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const ReferralsPage = lazy(() => import('@/pages/ReferralsPage').then(m => ({ default: m.ReferralsPage })));

// Loading component
// eslint-disable-next-line react-refresh/only-export-components
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-orange"></div>
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { 
        path: "/", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/about", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/services", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <ServicesPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/contact", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/testimonials", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <TestimonialsPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/blog", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/blog/:slug", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <BlogPostPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/referrals", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <ReferralsPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }
});
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)