
export type Fraction = [numerator: number, denominator: number];

/**
 * Reduce a fraction to the lowest possible lowest terms
 * @param fraction the fraction to reduce
 * @example [6,8] => [3,4]
 * @example [12,-144] => [-1,12]
 * @example [1.5, 3] => throw Error // only integer fractions are allowed
 */
export function reduceFraction(fraction: Fraction): Fraction;
export function reduceFraction([num, den]: Fraction) {
    if (!Number.isInteger(num) || !Number.isInteger(den)) {
        throw new Error("Invalid fraction: numerator and denominator must be integers.");
    }

    let commonDivisor = greatestCommonDivisor(num, den);
    if (den / commonDivisor < 0) {
        commonDivisor *= -1;
    }

    return [num / commonDivisor, den / commonDivisor];
}

function greatestCommonDivisor(numerator: number, denominator: number): number {
    if (denominator === 0) {
        return numerator;
    }
    return greatestCommonDivisor(denominator, numerator % denominator);
}
