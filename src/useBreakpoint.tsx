import { useEffect, useState } from "react"


type Breakpoint = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('md');

  const updateBreakpoint = () => {
    if (window.innerWidth > 1280) setBreakpoint('xl');
    if (window.innerWidth > 1024) setBreakpoint('lg');
    if (window.innerWidth > 768) setBreakpoint('md');
    if (window.innerWidth > 640) setBreakpoint('sm');
    if (window.innerWidth > 320) setBreakpoint('xs');
  }

  useEffect(() => {
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}