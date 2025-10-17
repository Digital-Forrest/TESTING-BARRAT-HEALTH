import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimization } from '@/hooks/use-mobile-optimization';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  priority?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  poster?: string;
}

export function OptimizedVideo({
  src,
  className,
  priority = false,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = false,
  preload = 'metadata',
  poster
}: OptimizedVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { preloadImages } = useMobileOptimization();

  useEffect(() => {
    if (priority || preloadImages) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, preloadImages]);

  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className={cn('bg-gray-200 animate-pulse', className)}
        style={{ aspectRatio: '16/9' }}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={cn(
        'transition-opacity duration-200',
        canPlay ? 'opacity-100' : 'opacity-0',
        className
      )}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload={preload}
      poster={poster}
      onCanPlay={() => setCanPlay(true)}
      onLoadedData={() => setIsLoaded(true)}
      onError={(e) => {
        if (import.meta.env.DEV) {
          console.error('Failed to load video:', src);
        }
        setIsLoaded(true);
        setCanPlay(true);
      }}
    >
      <source src={src} type="video/mp4" />
      {/* Fallback for browsers that don't support video */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center">
        <p className="text-white text-center">Video not supported</p>
      </div>
    </video>
  );
}
