import { useEffect } from 'react';

export function useDevServerHeartbeat() {
  useEffect(() => {
    if (typeof window === 'undefined' || !import.meta.env.DEV) {
      return;
    }

    let lastHeartbeat = 0;

    const sendHeartbeat = () => {
      const now = Date.now();
      if (now - lastHeartbeat < 60_000) {
        return;
      }
      lastHeartbeat = now;
      fetch('/', {
        method: 'GET',
      }).catch(() => {
        // no-op: this is only used to keep the dev server alive
      });
    };

    const events = ['pointerdown', 'keydown', 'touchstart', 'mousemove', 'scroll'];
    for (const eventName of events) {
      window.addEventListener(eventName, sendHeartbeat, { passive: true });
    }

    return () => {
      for (const eventName of events) {
        window.removeEventListener(eventName, sendHeartbeat);
      }
    };
  }, []);
}
