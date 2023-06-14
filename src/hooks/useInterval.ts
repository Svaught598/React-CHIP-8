import { useEffect, useRef } from "react";


export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(() => null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      const interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
}