import { useEffect, useState } from 'react';

export function useBreakpoint(query: string) {
  const [breakpoint, setBreakpoint] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query);
      setBreakpoint(mediaQueryList.matches);

      function handleMediaQueryChange(event: MediaQueryListEvent) {
        setBreakpoint(event.matches);
      }

      mediaQueryList.addEventListener('change', handleMediaQueryChange);
      return () => {
        mediaQueryList.removeEventListener('change', handleMediaQueryChange);
      };
    }
  }, [query]);

  return breakpoint;
}
