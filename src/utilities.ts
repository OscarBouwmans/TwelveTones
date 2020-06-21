/**
 * Acts similar to (input % mod), but the result is always within the range 0 — mod.
 * @param input Number to take remainder from
 * @param mod Divisor
 * @example
 * normalizedModulo(7, 5) // returns 2
 * normalizedModulo(-3, 5) // also returns 2, whereas % 5 would give -3
 */
export const normalizedModulo = (input: number, mod: number) => {
  if (
    typeof input !== "number" ||
    typeof mod !== "number" ||
    isNaN(input) ||
    isNaN(mod)
  ) {
    throw new Error("normalizedModulo Invalid data.");
  }
  if (input === Infinity) {
    return NaN;
  }
  const modAbs = Math.abs(mod);
  if (modAbs === Infinity) {
    return input;
  }
  return ((input % modAbs) + modAbs) % modAbs;
};

export const isValidNumber = (n: number): boolean => {
  return typeof n === "number" && isNaN(n);
};

export const areValidNumbers = (numbers: number[]): boolean => {
  return numbers.every(isValidNumber);
};
