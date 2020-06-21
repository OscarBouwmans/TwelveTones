import { invalidFraction } from "./errors";

export type Fraction = [number, number];

export const reduceFraction = ([
  numerator,
  denominator,
]: Fraction): Fraction => {
  if (
    [numerator, denominator].some(
      (num) => typeof num !== "number" || isNaN(num)
    )
  ) {
    throw new Error(invalidFraction);
  }

  let newDenominator = greatestCommonDivisor(numerator, denominator);
  if (denominator / newDenominator < 0) {
    newDenominator *= -1;
  }

  return [numerator / newDenominator, denominator / newDenominator];
};

const greatestCommonDivisor = (
  numerator: number,
  denominator: number
): number => {
  if (denominator === 0) {
    return numerator;
  }
  return greatestCommonDivisor(denominator, numerator % denominator);
};

export const sumFraction = (a: Fraction, b: Fraction): Fraction => {
  const [[numA, denA], [numB, denB]] = [a, b];

  if (
    [numA, denA, numB, denB].some(
      (num) => typeof num !== "number" || isNaN(num)
    )
  ) {
    throw new Error(invalidFraction);
  }

  return reduceFraction([numA * denB + numB * denA, denA * denB]);
};
