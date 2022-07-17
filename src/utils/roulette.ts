export enum FieldColor {
  BLACK = "black",
  RED = "red",
  BLANK = "blank",
}

export interface Field {
  number: fieldNumber;
  color: FieldColor;
  highlighted: boolean;
}

// order of numbers
export const fieldOrder = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
] as const;
export type fieldNumber = typeof fieldOrder[number];

// black numbers
export const blackNumbers: fieldNumber[] = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];
// red numbers
export const redNumbers: fieldNumber[] = [...fieldOrder].filter(
  (n: fieldNumber) => !blackNumbers.includes(n) && n !== 0
);

// pair
export const pairNumbers: fieldNumber[] = [...fieldOrder].filter(
  (n: fieldNumber) => n % 2 === 0
);

// impair
export const impairNumbers: fieldNumber[] = [...fieldOrder].filter(
  (n: fieldNumber) => n % 2 === 1
);

// Manque
export const manqueNumbers: fieldNumber[] = [...fieldOrder].filter(
  (n: fieldNumber) => n <= 18 && n > 0
);

// Passe
export const passeNumbers: fieldNumber[] = [...fieldOrder].filter(
  (n: fieldNumber) => n > 18
);

// Premier
export const premierNumbers: fieldNumber[] = [...fieldOrder].filter(
  (n: fieldNumber) => n <= 12 && n > 0
).sort((a,b) => a -b);

// Milieu
export const milieuNumbers: fieldNumber[] = [...fieldOrder].filter(
  (n: fieldNumber) => n <= 24 && n > 12
).sort((a,b) => a -b);

// Dernier
export const dernierNumbers: fieldNumber[] = [...fieldOrder].filter(
  (n: fieldNumber) => n > 24
).sort((a,b) => a -b);

// TODO: Colonnes numbers

export function winQuota(settedFields: fieldNumber[]): number {
    console.log('winquota', Math.round((fieldOrder.length - 1) / settedFields.length))
  return Math.round((fieldOrder.length - 1) / settedFields.length);
}
