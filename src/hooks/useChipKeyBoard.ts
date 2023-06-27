import { useState } from "react";
import { useKeyPress } from "./useKeyPress";
import { KeyMapping } from "../constants";

export type KeyBuffer = {
  prev: number[],
  curr: number[],
}

export const useChipKeyBoard = () => {
  const [keydownBuffer, setKeydownBuffer] = useState(new Array(16).fill(0));
  const [prevKeydownBuffer, setPrevKeydownBuffer] = useState(new Array(16).fill(0));

  const setPressedKey = (index: number) => {
    const newKeyupBuffer = [...keydownBuffer];
    newKeyupBuffer[index] = 1;
    setPrevKeydownBuffer(keydownBuffer);
    setKeydownBuffer(newKeyupBuffer);
  }

  const setReleasedKey = (index: number) => {
    const newKeydownBuffer = [...keydownBuffer];
    newKeydownBuffer[index] = 0;
    setPrevKeydownBuffer(keydownBuffer);
    setKeydownBuffer(newKeydownBuffer);
  }

  // this is always the same order as a constant, so
  // we don't need to worry about hook rules ;)
  Object.entries(KeyMapping).forEach(([key, index]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKeyPress({
      key, 
      onpress: () => setPressedKey(index),
      onrelease: () => setReleasedKey(index),
    });
  })

  return { keydownBuffer: { prev: prevKeydownBuffer, curr: keydownBuffer } }
}