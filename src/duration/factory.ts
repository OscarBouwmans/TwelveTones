import { DurationDefinition, Duration } from "./duration";
import { noDurationData, invalidDurationDefinitionData } from "./errors";
import { Fraction, reduceFraction } from "./utilities";
import { isValidInteger } from "../utilities";

export type DurationFactory = (info: DurationDefinition | Fraction) => Duration;

/**
 * Factory function to create a duration, reduces fraction to lowest possible terms.
 * @param info Provide a DurationDefinition or a Fraction
 * @example createDuration({ numerator: 1, denominator: 4 }) => Duration
 * @example createDuration([1,8]) => Duration
 * @example createDuration([4,16]) => Duration // with numerator 1, denominator 4
 */
export const createDuration: DurationFactory = (
  info: DurationDefinition | Fraction
) => {
  if (!info) {
    throw new Error(noDurationData);
  }

  if (info instanceof Array) {
    if (info.length !== 2 || !validateNumDen(...info)) {
      throw new Error(invalidDurationDefinitionData);
    }
    const [num, den] = info;
    const [numerator, denominator] = reduceFraction([num, den]);
    return { numerator, denominator };
  }

  const { numerator, denominator } = info;
  if (!validateNumDen(numerator, denominator)) {
    throw new Error(invalidDurationDefinitionData);
  }

  const [newNum, newDen] = reduceFraction([numerator, denominator]);
  return {
    numerator: newNum,
    denominator: newDen,
  };
};

const validateNumDen = (numerator: number, denominator: number): boolean => {
  return isValidInteger(numerator, denominator);
};
