export enum FieldColor {
  BLACK = "black",
  RED = "red",
  BLANK = "blank",
}

export interface Field {
  number: number;
  color: FieldColor;
  highlighted: boolean;
}

// france roulette 0 - 36
export const maxNumbers = 37;
// order of numbers
export const fieldOrder = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

// black numbers
export const blackNumbers = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];
// red numbers
export const redNumbers = [...Array(maxNumbers).keys()].filter(
  (n) => !blackNumbers.includes(n) && n !== 0
);
