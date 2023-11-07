import { isValidNumber } from "./is-valid-number";

/**
 * Acts similar to (input % mod), but the result is always within the range 0 — mod.
 * @param input Number to take remainder from
 * @param mod Divisor
 * @example
 * normalizedModulo(7, 5) // returns 2
 * normalizedModulo(-3, 5) // also returns 2, whereas % 5 would give -3
 */
export function normalizedModulo(input: number, mod: number) {
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
}