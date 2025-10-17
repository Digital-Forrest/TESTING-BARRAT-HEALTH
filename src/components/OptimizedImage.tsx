import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimization } from '@/hooks/use-mobile-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
  sizes = '100vw',
  quality
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const { preloadImages } = useMobileOptimization();

  useEffect(() => {
    if (priority || preloadImages) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, preloadImages]);

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={cn('bg-gray-200 animate-pulse', className)}
        style={{ width, height }}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      width={width}
      height={height}
      sizes={sizes}
      onLoad={() => setIsLoaded(true)}
      onError={(e) => {
        // Log error in development only
        if (import.meta.env.DEV) {
          console.error('Failed to load image:', src);
        }
        setIsLoaded(true);
      }}
    />
  );
}
