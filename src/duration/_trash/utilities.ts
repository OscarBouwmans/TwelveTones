// import { invalidFraction, invalidFractionInput } from "./errors";
// import { isValidInteger } from "../../utilities";

// export type Fraction = [number, number];

// /**
//  * Reduce a fraction to the lowest possible lowest terms
//  * @param fraction the fraction to reduce
//  * @example [6,8] => [3,4]
//  * @example [12,-144] => [-1,12]
//  * @example [1.5, 3] => throw Error // only integer fractions are allowed
//  */
// export const reduceFraction = ([
//   numerator,
//   denominator,
// ]: Fraction): Fraction => {
//   if (!isValidInteger(numerator, denominator)) {
//     throw new Error(invalidFraction);
//   }

//   let newDenominator = greatestCommonDivisor(numerator, denominator);
//   if (denominator / newDenominator < 0) {
//     newDenominator *= -1;
//   }

//   return [numerator / newDenominator, denominator / newDenominator];
// };

// const greatestCommonDivisor = (
//   numerator: number,
//   denominator: number
// ): number => {
//   if (denominator === 0) {
//     return numerator;
//   }
//   return greatestCommonDivisor(denominator, numerator % denominator);
// };

// /**
//  * Return reduced form of summed fractions
//  * @param fractions Fractions to sum together
//  * @example sumFraction([1,4], [2,4]) => [3,4]
//  * @example sumFraction([3,24], [7,12], [7,-8]) => [-1,6]
//  * @example sumFraction() => throw Error // provide at least 1 fraction
//  */
// export const sumFraction = (...fractions: Fraction[]): Fraction => {
//   if (fractions.length < 1) {
//     throw new Error(invalidFractionInput);
//   }

//   if (fractions.length === 1) {
//     return reduceFraction(fractions[0]);
//   }

//   const [[numA, denA], [numB, denB]] = fractions;

//   if (!isValidInteger(numA, denA, numB, denB)) {
//     throw new Error(invalidFraction);
//   }

//   const sum = reduceFraction([numA * denB + numB * denA, denA * denB]);
//   if (fractions.length > 2) {
//     return sumFraction(sum, ...fractions.slice(2));
//   }
//   return sum;
// };

// /**
//  * Compares fraction equality in reduced state
//  * @param fractions Fractions to compare
//  * @example fractionsAreEqual([1,2], [720,1440], [-3,-6]) => true
//  * @example fractionsAreEqual([3,8], [13,2]) => false
//  * @example fractionsAreEqual([1.5, 4], [3,8]) => throw Error // only integer fractions are allowed
//  */
// export const fractionsAreEqual = (...fractions: Fraction[]): boolean => {
//   if (fractions.length < 2) {
//     return true;
//   }

//   const reducedComparisons = fractions.map((f) => reduceFraction(f));
//   const [numA, denA] = reducedComparisons.shift()!;

//   return reducedComparisons.every(([numB, denB]) => {
//     return numA === numB && (denA === denB || numA === 0);
//   });
// };
