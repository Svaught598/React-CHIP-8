import { useEffect, useRef } from "react";

export const usePausableInterval = (
  callback: () => void, 
  delay: number | null, 
  paused: boolean,
) => {
  const savedCallback = useRef<() => void>(() => null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null && !paused) {
      const interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay, paused]);
}