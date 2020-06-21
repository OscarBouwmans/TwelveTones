import { invalidFraction } from "./errors";
import { isValidInteger } from "../utilities";

export type Fraction = [number, number];

export const reduceFraction = ([
  numerator,
  denominator,
]: Fraction): Fraction => {
  if (!isValidInteger(numerator, denominator)) {
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

  if (!isValidInteger(numA, denA, numB, denB)) {
    throw new Error(invalidFraction);
  }

  return reduceFraction([numA * denB + numB * denA, denA * denB]);
};

export const fractionsAreEqual = (a: Fraction, b: Fraction): boolean => {
  const [numA, denA] = reduceFraction(a);
  const [numB, denB] = reduceFraction(b);

  return numA === numB && denA === denB;
};
