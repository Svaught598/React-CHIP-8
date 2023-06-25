import { useState } from "react";
import { useKeyPress } from "./useKeyPress";
import { KeyMapping } from "../constants";

export const useChipKeyBoard = () => {
  const [keyBuffer, setKeyBuffer] = useState(new Array(16).fill(0));

  const clearKeys = () => {
    setKeyBuffer(new Array(16).fill(0));
  }

  const setPressedKey = (index: number) => {
    const newKeyBuffer = [...keyBuffer];
    newKeyBuffer[index] = newKeyBuffer[index] ? 0 : 1;
    setKeyBuffer(newKeyBuffer);
  }

  // this is always the same order as a constant, so
  // we don't need to worry about hook rules ;)
  Object.entries(KeyMapping).forEach(([key, index]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKeyPress(key, () => setPressedKey(index));
  })

  return { keyBuffer, clearKeys }
}