import { useCallback, useEffect, useState } from "react";
import { KeyMapping } from "../constants";

export type KeyBuffer = {
  prev: number[],
  curr: number[],
}

const KEYS = Object.keys(KeyMapping);

export const useChipKeyBoard = () => {
  const [keydownBuffer, setKeydownBuffer] = useState(() => new Array(16).fill(0));
  const [prevKeydownBuffer, setPrevKeydownBuffer] = useState(() => new Array(16).fill(0));

  const setPressedKey = useCallback((event: KeyboardEvent) => {
    if (!KEYS.includes(event.key)) return;
    const index = KeyMapping[event.key];
    const newKeyupBuffer = [...keydownBuffer];
    newKeyupBuffer[index] = 1;
    setPrevKeydownBuffer(keydownBuffer);
    setKeydownBuffer(newKeyupBuffer);
  }, [keydownBuffer]);

  const setReleasedKey = useCallback((event: KeyboardEvent) => {
    if (!KEYS.includes(event.key)) return;
    const index = KeyMapping[event.key];
    const newKeydownBuffer = [...keydownBuffer];
    newKeydownBuffer[index] = 0;
    setPrevKeydownBuffer(keydownBuffer);
    setKeydownBuffer(newKeydownBuffer);
  }, [keydownBuffer]);

  useEffect(() => {
    window.addEventListener('keydown', setPressedKey);
    window.addEventListener('keyup', setReleasedKey);
  }, []);

  return { keydownBuffer: { prev: prevKeydownBuffer, curr: keydownBuffer } }
}