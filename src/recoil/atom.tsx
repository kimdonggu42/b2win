import { atom } from "recoil";

export const selectNewsIndexAtom = atom<number>({
  key: "selectNewsIndex",
  default: 0,
});
