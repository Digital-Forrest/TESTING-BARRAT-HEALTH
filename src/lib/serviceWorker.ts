// Show update notification to user
const showUpdateNotification = (): void => {
  // Create a simple notification banner
  const banner = document.createElement('div');
  banner.id = 'sw-update-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff6b35;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: system-ui, -apple-system, sans-serif;
    display: flex;
    gap: 12px;
    align-items: center;
    max-width: 90%;
  `;
  
  banner.innerHTML = `
    <span>🔄 New content available! </span>
    <button id="sw-reload-btn" style="
      background: white;
      color: #ff6b35;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    ">Refresh</button>
    <button id="sw-dismiss-btn" style="
      background: transparent;
      color: white;
      border: 1px solid white;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    ">Later</button>
  `;
  
  document.body.appendChild(banner);
  
  // Handle reload
  const reloadBtn = document.getElementById('sw-reload-btn');
  if (reloadBtn) {
    reloadBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }
  
  // Handle dismiss
  const dismissBtn = document.getElementById('sw-dismiss-btn');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner.remove();
    });
  }
};

// Service Worker registration and management
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[SW] Service Worker registered successfully:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user
              console.log('[SW] New content available, please refresh');
              showUpdateNotification();
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error('[SW] Service Worker registration failed:', error);
      return null;
    }
  } else {
    console.log('[SW] Service Worker not supported');
    return null;
  }
};

// Unregister service worker (for development)
export const unregisterServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => registration.unregister()));
      console.log('[SW] Service Worker unregistered');
    } catch (error) {
      console.error('[SW] Failed to unregister Service Worker:', error);
    }
  }
};

// Check if service worker is supported
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

// Get service worker registration
export const getServiceWorkerRegistration = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      return await navigator.serviceWorker.getRegistration();
    } catch (error) {
      console.error('[SW] Failed to get Service Worker registration:', error);
      return null;
    }
  }
  return null;
};
