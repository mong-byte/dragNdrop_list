import { ItemType } from "./types";

export const swapArr = (
  arr: ItemType[],
  from: number,
  to: number
): ItemType[] => {
  const newArr = [...arr];
  const temp = newArr[from];
  newArr[from] = newArr[to];
  newArr[to] = temp;
  return newArr;
};
