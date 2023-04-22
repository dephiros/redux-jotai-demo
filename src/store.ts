import { atom } from "jotai";

export const currentTimeAtom = atom("");
currentTimeAtom.onMount = (setAtom) => {
  const intervalId = setInterval(() => {
    setAtom(new Date().toISOString());
  }, 1000);
  return () => clearInterval(intervalId);
};
