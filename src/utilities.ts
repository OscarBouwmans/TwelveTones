/**
 * Acts similar to (input % mod), but the result is always within the range 0 — mod.
 * @param input Number to take remainder from
 * @param mod Divisor
 * @example
 * normalizedModulo(7, 5) // returns 2
 * normalizedModulo(-3, 5) // also returns 2, whereas % 5 would give -3
 */
export const normalizedModulo = (input: number, mod: number) => {
  if (input === Infinity || input === -Infinity) {
    return NaN;
  }
  if (mod === Infinity || mod === -Infinity) {
    return input;
  }
  if (!isValidNumber(input, mod)) {
    throw new Error("normalizedModulo Invalid data.");
  }
  const modAbs = Math.abs(mod);
  return ((input % modAbs) + modAbs) % modAbs;
};

/**
 * => typeof n === 'number' && isNaN(n)
 * @param n input number
 */
export const isValidNumber = (...number: number[]): boolean => {
  return number.every(
    (n) =>
      typeof n === "number" && !isNaN(n) && n !== Infinity && n !== -Infinity
  );
};

/**
 * => typeof n === 'number' && isNaN(n) && n % 1 === 0
 * @param n input number
 */
export const isValidInteger = (...number: number[]): boolean => {
  return number.every((n) => isValidNumber(n) && n % 1 === 0);
};
