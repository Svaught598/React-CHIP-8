import { useCallback, useEffect } from "react";

export const useKeyPress = (key: string, cb: () => void) => {
  const onKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === key) {
      cb();
    }
  }, [key, cb]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [onKeyPress]);
}
