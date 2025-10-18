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
const MeetOurTeamPage = lazy(() => import('@/pages/MeetOurTeamPage').then(m => ({ default: m.MeetOurTeamPage })));
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const TestimonialsPage = lazy(() => import('@/pages/TestimonialsPage').then(m => ({ default: m.TestimonialsPage })));
const WhatOurPatientsSayPage = lazy(() => import('@/pages/WhatOurPatientsSayPage').then(m => ({ default: m.WhatOurPatientsSayPage })));
const ADHDCarePage = lazy(() => import('@/pages/ADHDCarePage').then(m => ({ default: m.ADHDCarePage })));
const PTSDCarePage = lazy(() => import('@/pages/PTSDCarePage').then(m => ({ default: m.PTSDCarePage })));
const TraumaCarePage = lazy(() => import('@/pages/TraumaCarePage').then(m => ({ default: m.TraumaCarePage })));
const MentalHealthCarePage = lazy(() => import('@/pages/MentalHealthCarePage').then(m => ({ default: m.MentalHealthCarePage })));
const MoodDisordersPage = lazy(() => import('@/pages/MoodDisordersPage').then(m => ({ default: m.MoodDisordersPage })));
const AnxietyDisordersPage = lazy(() => import('@/pages/AnxietyDisordersPage').then(m => ({ default: m.AnxietyDisordersPage })));
const SleepConcernsPage = lazy(() => import('@/pages/SleepConcernsPage').then(m => ({ default: m.SleepConcernsPage })));
const ImmigrantRefugeeSupportPage = lazy(() => import('@/pages/ImmigrantRefugeeSupportPage').then(m => ({ default: m.ImmigrantRefugeeSupportPage })));
const MedicalWeightLossPage = lazy(() => import('@/pages/MedicalWeightLossPage').then(m => ({ default: m.MedicalWeightLossPage })));
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
        path: "/meet-our-team", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <MeetOurTeamPage />
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
        path: "/what-our-patients-say", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <WhatOurPatientsSayPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/adhd-care", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <ADHDCarePage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/ptsd-care", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <PTSDCarePage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/trauma-care", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <TraumaCarePage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/mental-health-care", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <MentalHealthCarePage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/mood-disorders", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <MoodDisordersPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/anxiety-disorders", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <AnxietyDisordersPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/sleep-concerns", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <SleepConcernsPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/immigrant-refugee-support", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <ImmigrantRefugeeSupportPage />
            </Suspense>
          </LazyLoadErrorBoundary>
        )
      },
      { 
        path: "/medical-weight-loss", 
        element: (
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <MedicalWeightLossPage />
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
);