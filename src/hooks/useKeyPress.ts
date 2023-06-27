import { useCallback, useEffect } from "react";

export type KeyPressConfig = {
  key: string,
  onpress: () => void,
  onrelease: () => void,
}

export const useKeyPress = (config: KeyPressConfig) => {
  const { key, onpress, onrelease } = config;
  
  const onKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === key) {
      onpress();
    }
  }, [key, onpress]);

  const onKeyRelease = useCallback((event: KeyboardEvent) => {
    if (event.key === key) {
      onrelease();
    }
  }, [key, onrelease]);


  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    window.addEventListener('keyup', onKeyRelease);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
      window.removeEventListener('keyup', onKeyRelease);
    };
  }, [onKeyPress]);
}
