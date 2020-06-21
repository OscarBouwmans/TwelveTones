import { invalidFraction, invalidFractionInput } from "./errors";
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

export const sumFraction = (...fractions: Fraction[]): Fraction => {
  if (fractions.length < 1) {
    throw new Error(invalidFractionInput);
  }

  if (fractions.length === 1) {
    return reduceFraction(fractions[0]);
  }

  const [[numA, denA], [numB, denB]] = fractions;

  if (!isValidInteger(numA, denA, numB, denB)) {
    throw new Error(invalidFraction);
  }

  const sum = reduceFraction([numA * denB + numB * denA, denA * denB]);
  if (fractions.length > 2) {
    return sumFraction(sum, ...fractions.slice(2));
  }
  return sum;
};

export const fractionsAreEqual = (...fractions: Fraction[]): boolean => {
  if (fractions.length < 2) {
    return true;
  }

  const reducedComparisons = fractions.map((f) => reduceFraction(f));
  const [numA, denA] = reducedComparisons.shift()!;

  return reducedComparisons.every(([numB, denB]) => {
    return numA === numB && (denA === denB || numA === 0);
  });
};
