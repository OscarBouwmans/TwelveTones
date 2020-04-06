import { invalidIntervalDescription, invalidIntervalQualityFactor } from "./errors";
import { IntervalDirection } from "./interval";

export enum IntervalQuality {
    major = "major",
    minor = "minor",
    perfect = "perfect",
}

export enum IntervalQualityFactor {
    singly = 1,
    doubly = 2,
    triply = 3,
    quadruply = 4,
    quintuple = 5,
    hextuple = 6,
}

export type IntervalQualityFactorNumerical = 1 | 2 | 3 | 4 | 5 | 6;

export type PerfectIntervalName = "unison" | "fourth" | "fifth" | "octave";
export type MajorOrMinorIntervalName = "second" | "third" | "sixth" | "seventh";
export type IntervalName = PerfectIntervalName | MajorOrMinorIntervalName;

export const perfectIntervalNames: Set<PerfectIntervalName> = new Set([ "unison", "fourth", "fifth", "octave" ]);
export const majorOrMinorIntervalNames: Set<MajorOrMinorIntervalName> = new Set([ "second", "third", "sixth", "seventh" ]);

export interface IntervalDescription {
    quality: IntervalQuality;
    name: IntervalName;
    octaveShift: number;
    direction: IntervalDirection;
}

export interface AugmentedIntervalDescription extends IntervalDescription {
    augmented: number;
}
export interface DiminishedIntervalDescription extends IntervalDescription {
    diminished: number;
}

export interface PerfectIntervalDescription extends AugmentedIntervalDescription, DiminishedIntervalDescription {
    quality: IntervalQuality.perfect;
    name: PerfectIntervalName;
}
export interface MajorIntervalDescription extends AugmentedIntervalDescription {
    quality: IntervalQuality.major;
    name: MajorOrMinorIntervalName;
}
export interface MinorIntervalDescription extends DiminishedIntervalDescription {
    quality: IntervalQuality.minor;
    name: MajorOrMinorIntervalName;
}
export type MajorMinorIntervalDescription = MajorIntervalDescription | MinorIntervalDescription;

export type IntervalDescriptionBuilder = {
    major?: MajorOrMinorIntervalName,
    minor?: MajorOrMinorIntervalName,
    perfect?: PerfectIntervalName,
    augmented?: IntervalName,
    diminished?: IntervalName,
    factor?: IntervalQualityFactor | IntervalQualityFactorNumerical,
    octaveShift?: number;
    direction?: IntervalDirection;
}

const qualityFromNameAndMajorOrAug = (name: IntervalName, majorOrAug: boolean): IntervalQuality => {
    if (perfectIntervalNames.has(name as any)) {
        return IntervalQuality.perfect;
    }
    return majorOrAug ? IntervalQuality.major : IntervalQuality.minor;
};

export function createIntervalDescription(description: { major: MajorOrMinorIntervalName, octaveShift?: number, direction?: IntervalDirection }): MajorIntervalDescription;
export function createIntervalDescription(description: { minor: MajorOrMinorIntervalName, octaveShift?: number, direction?: IntervalDirection }): MinorIntervalDescription;
export function createIntervalDescription(description: { perfect: PerfectIntervalName, octaveShift?: number, direction?: IntervalDirection }): PerfectIntervalDescription;
export function createIntervalDescription(description: { augmented: PerfectIntervalName, factor?: IntervalQualityFactor | IntervalQualityFactorNumerical, octaveShift?: number, direction?: IntervalDirection }): PerfectIntervalDescription;
export function createIntervalDescription(description: { diminished: PerfectIntervalName, factor?: IntervalQualityFactor | IntervalQualityFactorNumerical, octaveShift?: number, direction?: IntervalDirection }): PerfectIntervalDescription;
export function createIntervalDescription(description: { augmented: MajorOrMinorIntervalName, factor?: IntervalQualityFactor | IntervalQualityFactorNumerical, octaveShift?: number, direction?: IntervalDirection }): MajorIntervalDescription;
export function createIntervalDescription(description: { diminished: MajorOrMinorIntervalName, factor?: IntervalQualityFactor | IntervalQualityFactorNumerical, octaveShift?: number, direction?: IntervalDirection }): MinorIntervalDescription;
export function createIntervalDescription(des: IntervalDescriptionBuilder): IntervalDescription {
    if (!des || (!des.major && !des.minor && !des.perfect && !des.augmented && !des.diminished)) {
        throw new Error(invalidIntervalDescription);
    }

    const name = (des.major || des.minor || des.perfect || des.augmented || des.diminished) as IntervalName;
    const basicDescription: IntervalDescription = {
        name,
        quality: qualityFromNameAndMajorOrAug(name, !!(des.major || des.augmented)),
        octaveShift: des.octaveShift || 0,
        direction: des.direction || IntervalDirection.up,
    }

    if (des.augmented) {
        if (typeof des.factor !== "number" || des.factor < 1) {
            throw new Error(invalidIntervalQualityFactor);
        }
        return {
            ...basicDescription,
            augmented: des.factor || 1,
        } as any;
    }
    
    if (des.diminished) {
        if (typeof des.factor !== "number" || des.factor < 1) {
            throw new Error(invalidIntervalQualityFactor);
        }
        return {
            ...basicDescription,
            diminished: des.factor || 1,
        } as any;
    }

    return basicDescription;
}
