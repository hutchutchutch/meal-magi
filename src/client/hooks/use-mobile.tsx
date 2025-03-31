// Copied and updated from original src/hooks/use-mobile.tsx
import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  return isMobile;
}