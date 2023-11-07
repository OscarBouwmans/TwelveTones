// import {
//   invalidIntervalDescription,
//   invalidIntervalQualityFactor,
// } from "./errors";
// import { IntervalDirection } from "./interval";

// /**
//  * Highest level of Interval category: major, minor, or perfect.
//  */
// export enum IntervalQuality {
//   major = "major",
//   minor = "minor",
//   perfect = "perfect",
// }

// /**
//  * Specifies the level of augmentation or diminishment.
//  * @example IntervalQualityFactor.singly // associated with a regular augmented chord
//  * @example IntervalQualityFactor.doubly // associated with a regular augmented chord
//  */
// export enum IntervalQualityFactor {
//   singly = 1,
//   doubly = 2,
//   triply = 3,
//   quadruply = 4,
//   quintuple = 5,
//   hextuple = 6,
// }

// /**
//  * Convenience type representing IntervalQualityFactor values.
//  * @see IntervalQualityFactor
//  */
// export type IntervalQualityFactorNumerical = 1 | 2 | 3 | 4 | 5 | 6;

// /**
//  * Union type representing all Perfect interval names.
//  */
// export type PerfectIntervalName = "unison" | "fourth" | "fifth" | "octave";

// /**
//  * Union type representing all Major and Minor interval names.
//  */
// export type MajorOrMinorIntervalName = "second" | "third" | "sixth" | "seventh";

// /**
//  * Union type representing all interval names.
//  * @see PerfectIntervalName
//  * @see MajorOrMinorIntervalName
//  */
// export type IntervalName = PerfectIntervalName | MajorOrMinorIntervalName;

// /**
//  * Convenience Set representing all Perfect interval names.
//  * @see PerfectIntervalName
//  */
// export const perfectIntervalNames: Set<PerfectIntervalName> = new Set([
//   "unison",
//   "fourth",
//   "fifth",
//   "octave",
// ]);

// /**
//  * Convenience Set representing all Major and Minor interval names.
//  * @see MajorOrMinorIntervalName
//  */
// export const majorOrMinorIntervalNames: Set<MajorOrMinorIntervalName> = new Set(
//   ["second", "third", "sixth", "seventh"]
// );

// /**
//  * Intermediary building block for creating an Interval.
//  * @see createInterval
//  * @see createIntervalDescription
//  */
// export interface IntervalDescription {
//   quality: IntervalQuality;
//   name: IntervalName;
//   octaveShift: number;
//   direction: IntervalDirection;
// }

// /**
//  * Intermediary building block for creating an augmented Interval.
//  * @see IntervalDescription
//  * @see createInterval
//  * @see createIntervalDescription
//  */
// export interface AugmentedIntervalDescription extends IntervalDescription {
//   augmented: IntervalQualityFactor;
// }

// /**
//  * Intermediary building block for creating a diminished Interval.
//  * @see IntervalDescription
//  * @see createInterval
//  * @see createIntervalDescription
//  */
// export interface DiminishedIntervalDescription extends IntervalDescription {
//   diminished: IntervalQualityFactor;
// }

// /**
//  * Intermediary building block for creating a perfect Interval.
//  * @see IntervalDescription
//  * @see createInterval
//  * @see createIntervalDescription
//  */
// export interface PerfectIntervalDescription
//   extends AugmentedIntervalDescription,
//     DiminishedIntervalDescription {
//   quality: IntervalQuality.perfect;
//   name: PerfectIntervalName;
// }

// /**
//  * Intermediary building block for creating a major Interval.
//  * @see IntervalDescription
//  * @see createInterval
//  * @see createIntervalDescription
//  */
// export interface MajorIntervalDescription extends AugmentedIntervalDescription {
//   quality: IntervalQuality.major;
//   name: MajorOrMinorIntervalName;
// }

// /**
//  * Intermediary building block for creating a minor Interval.
//  * @see IntervalDescription
//  * @see createInterval
//  * @see createIntervalDescription
//  */
// export interface MinorIntervalDescription
//   extends DiminishedIntervalDescription {
//   quality: IntervalQuality.minor;
//   name: MajorOrMinorIntervalName;
// }

// /**
//  * Intermediary building block for creating a major or minor Interval.
//  * @see IntervalDescription
//  * @see createInterval
//  * @see createIntervalDescription
//  */
// export type MajorMinorIntervalDescription =
//   | MajorIntervalDescription
//   | MinorIntervalDescription;

// /**
//  * Fundamental building block used to create an Interval.
//  * @see IntervalDescription
//  * @see createInterval
//  * @see createIntervalDescription
//  */
// export type IntervalDescriptionBuilder = {
//   major?: MajorOrMinorIntervalName;
//   minor?: MajorOrMinorIntervalName;
//   perfect?: PerfectIntervalName;
//   augmented?: IntervalName;
//   diminished?: IntervalName;
//   factor?: IntervalQualityFactor | IntervalQualityFactorNumerical;
//   octaveShift?: number;
//   direction?: IntervalDirection;
// };

// const qualityFromNameAndMajorOrAug = (
//   name: IntervalName,
//   majorOrAug: boolean
// ): IntervalQuality => {
//   if (perfectIntervalNames.has(name as any)) {
//     return IntervalQuality.perfect;
//   }
//   return majorOrAug ? IntervalQuality.major : IntervalQuality.minor;
// };

// export function createIntervalDescription(description: {
//   major: MajorOrMinorIntervalName;
//   octaveShift?: number;
//   direction?: IntervalDirection;
// }): MajorIntervalDescription;
// export function createIntervalDescription(description: {
//   minor: MajorOrMinorIntervalName;
//   octaveShift?: number;
//   direction?: IntervalDirection;
// }): MinorIntervalDescription;
// export function createIntervalDescription(description: {
//   perfect: PerfectIntervalName;
//   octaveShift?: number;
//   direction?: IntervalDirection;
// }): PerfectIntervalDescription;
// export function createIntervalDescription(description: {
//   augmented: PerfectIntervalName;
//   factor?: IntervalQualityFactor | IntervalQualityFactorNumerical;
//   octaveShift?: number;
//   direction?: IntervalDirection;
// }): PerfectIntervalDescription;
// export function createIntervalDescription(description: {
//   diminished: PerfectIntervalName;
//   factor?: IntervalQualityFactor | IntervalQualityFactorNumerical;
//   octaveShift?: number;
//   direction?: IntervalDirection;
// }): PerfectIntervalDescription;
// export function createIntervalDescription(description: {
//   augmented: MajorOrMinorIntervalName;
//   factor?: IntervalQualityFactor | IntervalQualityFactorNumerical;
//   octaveShift?: number;
//   direction?: IntervalDirection;
// }): MajorIntervalDescription;
// export function createIntervalDescription(description: {
//   diminished: MajorOrMinorIntervalName;
//   factor?: IntervalQualityFactor | IntervalQualityFactorNumerical;
//   octaveShift?: number;
//   direction?: IntervalDirection;
// }): MinorIntervalDescription;
// export function createIntervalDescription(
//   des: IntervalDescriptionBuilder
// ): IntervalDescription {
//   if (
//     !des ||
//     (!des.major &&
//       !des.minor &&
//       !des.perfect &&
//       !des.augmented &&
//       !des.diminished)
//   ) {
//     throw new Error(invalidIntervalDescription);
//   }

//   const name = (des.major ||
//     des.minor ||
//     des.perfect ||
//     des.augmented ||
//     des.diminished) as IntervalName;
//   const basicDescription: IntervalDescription = {
//     name,
//     quality: qualityFromNameAndMajorOrAug(name, !!(des.major || des.augmented)),
//     octaveShift: des.octaveShift || 0,
//     direction: des.direction || IntervalDirection.up,
//   };

//   if (des.augmented) {
//     if (
//       des.factor !== undefined &&
//       (typeof des.factor !== "number" || des.factor < 1)
//     ) {
//       throw new Error(invalidIntervalQualityFactor);
//     }
//     return {
//       ...basicDescription,
//       augmented: des.factor || 1,
//     } as any;
//   }

//   if (des.diminished) {
//     if (
//       des.factor !== undefined &&
//       (typeof des.factor !== "number" || des.factor < 1)
//     ) {
//       throw new Error(invalidIntervalQualityFactor);
//     }
//     return {
//       ...basicDescription,
//       diminished: des.factor || 1,
//     } as any;
//   }

//   return basicDescription;
// }
