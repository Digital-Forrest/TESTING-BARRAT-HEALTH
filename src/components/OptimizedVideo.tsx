import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimization } from '@/hooks/use-mobile-optimization';
import { useIsMobile } from '@/hooks/use-mobile';

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
  disableOnMobile?: boolean;
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
  poster,
  disableOnMobile = false
}: OptimizedVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { preloadImages, connectionType } = useMobileOptimization();
  const isMobile = useIsMobile();

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

  // On mobile with disableOnMobile, show poster image if available
  if (disableOnMobile && isMobile && poster) {
    return (
      <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
        <img 
          src={poster} 
          alt="" 
          className="w-full h-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

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

  // Don't autoplay on slow connections
  const shouldAutoPlay = autoPlay && connectionType !== 'slow';

  useEffect(() => {
    if (!videoRef.current || !shouldAutoPlay) {
      return;
    }

    const video = videoRef.current;

    const attemptPlay = () => {
      // Ensure browsers that defer autoplay (especially on first load) still start playback
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch((error) => {
          if (import.meta.env.DEV) {
            console.warn('Autoplay prevented:', error);
          }
        });
      }
    };

    if (canPlay) {
      attemptPlay();
      return;
    }

    video.addEventListener('canplay', attemptPlay, { once: true });
    return () => {
      video.removeEventListener('canplay', attemptPlay);
    };
  }, [shouldAutoPlay, canPlay]);

  return (
    <video
      ref={videoRef}
      className={cn(
        'transition-opacity duration-200',
        canPlay ? 'opacity-100' : 'opacity-0',
        className
      )}
      autoPlay={shouldAutoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload={isMobile ? 'none' : preload}
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
