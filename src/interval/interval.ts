import { intervalName } from "./operators/interval-name";

export interface Interval {
    readonly circleShift: number;
    readonly octaveShift: number;
}

const intervalQualityDescriptorsPerfect = ['perfect', 'P'] as const;
const intervalQualityDescriptorsMajor = ['major', 'M'] as const;
const intervalQualityDescriptorsMinor = ['minor', 'm'] as const;
const intervalQualityDescriptorsDiminished = ['diminished', 'd'] as const;
const intervalQualityDescriptorsAugmented = ['augmented', 'A'] as const;

type IntervalQualityDescriptorPerfect = typeof intervalQualityDescriptorsPerfect[number];
type IntervalQualityDescriptorMajor = typeof intervalQualityDescriptorsMajor[number];
type IntervalQualityDescriptorMinor = typeof intervalQualityDescriptorsMinor[number];
type IntervalQualityDescriptorDiminished = typeof intervalQualityDescriptorsDiminished[number];
type IntervalQualityDescriptorAugmented = typeof intervalQualityDescriptorsAugmented[number];

type IntervalQualityDescriptor = IntervalQualityDescriptorPerfect | IntervalQualityDescriptorMajor | IntervalQualityDescriptorMinor | IntervalQualityDescriptorDiminished | IntervalQualityDescriptorAugmented;

const intervalNameDescriptorUnison = ['unison', '1'] as const;
const intervalNameDescriptorSecond = ['second', '2'] as const;
const intervalNameDescriptorThird = ['third', '3'] as const;
const intervalNameDescriptorFourth = ['fourth', '4'] as const;
const intervalNameDescriptorFifth = ['fifth', '5'] as const;
const intervalNameDescriptorSixth = ['sixth', '6'] as const;
const intervalNameDescriptorSeventh = ['seventh', '7'] as const;
const intervalNameDescriptorOctave = ['octave', '8'] as const;

const intervalNameDescriptorsPerfect = [...intervalNameDescriptorUnison, ...intervalNameDescriptorFourth, ...intervalNameDescriptorFifth, ...intervalNameDescriptorOctave] as const;
const intervalNameDescriptorsMajorMinor = [...intervalNameDescriptorSecond, ...intervalNameDescriptorThird, ...intervalNameDescriptorSixth, ...intervalNameDescriptorSeventh] as const;

type IntervalNameDescriptorUnison = typeof intervalNameDescriptorUnison[number];
type IntervalNameDescriptorSecond = typeof intervalNameDescriptorSecond[number];
type IntervalNameDescriptorThird = typeof intervalNameDescriptorThird[number];
type IntervalNameDescriptorFourth = typeof intervalNameDescriptorFourth[number];
type IntervalNameDescriptorFifth = typeof intervalNameDescriptorFifth[number];
type IntervalNameDescriptorSixth = typeof intervalNameDescriptorSixth[number];
type IntervalNameDescriptorSeventh = typeof intervalNameDescriptorSeventh[number];
type IntervalNameDescriptorOctave = typeof intervalNameDescriptorOctave[number];

type IntervalNameDescriptorPerfect = IntervalNameDescriptorUnison | IntervalNameDescriptorFifth | IntervalNameDescriptorFourth | IntervalNameDescriptorOctave;
type IntervalNameDescriptorMajorMinor = IntervalNameDescriptorSecond | IntervalNameDescriptorThird | IntervalNameDescriptorSixth | IntervalNameDescriptorSeventh;
type IntervalNameDescriptor = IntervalNameDescriptorPerfect | IntervalNameDescriptorMajorMinor;

type IntervalShorthandPerfect = [quality: IntervalQualityDescriptorPerfect, name: IntervalNameDescriptorPerfect];
type IntervalShorthandMajor = [quality: IntervalQualityDescriptorMajor, name: IntervalNameDescriptorMajorMinor];
type MinorShorthandMinor = [quality: IntervalQualityDescriptorMinor, name: IntervalNameDescriptorMajorMinor];

type IntervalShorthandDiminished = [quality: IntervalQualityDescriptorDiminished, name: IntervalNameDescriptor];
type AugmentedShorthandAugmented = [quality: IntervalQualityDescriptorAugmented, name: IntervalNameDescriptor];

type IntervalShorthandMultipleDiminishedOrAugmented = [factor: number, name: IntervalNameDescriptor];

export type IntervalShorthand = IntervalShorthandPerfect | IntervalShorthandMajor | MinorShorthandMinor | IntervalShorthandDiminished | AugmentedShorthandAugmented | IntervalShorthandMultipleDiminishedOrAugmented;

/**
 * Returns an `Interval` object representing a _perfect_ interval.
 * 
 * @example
 * interval('perfect', 'unison');
 * interval('perfect', 'fourth');
 * interval('perfect', 'fifth');
 * interval('perfect', 'octave');
 * 
 * @example
 * interval('P', '1');
 * interval('P', '4');
 * interval('P', '5');
 * interval('P', '8');
 */
export function interval(quality: IntervalQualityDescriptorPerfect, name: IntervalNameDescriptorPerfect): Interval;

/**
 * Returns an `Interval` object representing a _major_ interval.
 * 
 * @example
 * interval('major', 'second');
 * interval('major', 'third');
 * interval('major', 'sixth');
 * interval('major', 'seventh');
 * 
 * @example
 * interval('M', '2');
 * interval('M', '3');
 * interval('M', '6');
 * interval('M', '7');
 */
export function interval(quality: IntervalQualityDescriptorMajor, name: IntervalNameDescriptorMajorMinor): Interval;

/**
 * Returns an `Interval` object representing a _minor_ interval.
 * 
 * @example
 * interval('minor', 'second');
 * interval('minor', 'third');
 * interval('minor', 'sixth');
 * interval('minor', 'seventh');
 * 
 * @example
 * interval('m', '2');
 * interval('m', '3');
 * interval('m', '6');
 * interval('m', '7');
 */
export function interval(quality: IntervalQualityDescriptorMinor, name: IntervalNameDescriptorMajorMinor): Interval;

/**
 * Returns an `Interval` object representing a _diminished_ interval.
 * 
 * @example
 * interval('diminished', 'third');
 * interval('diminished', 'sixth');
 * interval('diminished', 'octave');
 * 
 * @example
 * interval('d', '3');
 * interval('d', '6');
 * interval('d', '8');
 */
export function interval(quality: IntervalQualityDescriptorDiminished, name: IntervalNameDescriptor): Interval;

/**
 * Returns an `Interval` object representing an _augmented_ interval.
 * 
 * @example
 * interval('augmented', 'third');
 * interval('augmented', 'sixth');
 * interval('augmented', 'octave');
 * 
 * @example
 * interval('A', '3');
 * interval('A', '6');
 * interval('A', '8');
 */
export function interval(quality: IntervalQualityDescriptorAugmented, name: IntervalNameDescriptor): Interval;

/**
 * Returns an `Interval` object representing a _diminished_ or _augmented_ interval.
 * 
 * @example
 * interval(-1, 'third'); // diminished third
 * interval(+1, 'sixth'); // augmented sixth
 * 
 * @example
 * interval(-2, '4'); // doubly-diminished fourth
 * interval(+3, '7'); // triply-augmented seventh
 */
export function interval(quality: IntervalShorthandMultipleDiminishedOrAugmented, name: IntervalNameDescriptor): Interval;

/**
 * Returns a new `Interval` object with the same properties as the provided `Interval` object or `IntervalShorthand` format.
 */
export function interval(shorthand: Interval | IntervalShorthand): Interval;

export function interval(qualityOrShorthand: IntervalQualityDescriptor | Interval | IntervalShorthand, name?: IntervalNameDescriptor): Interval {
    if (Array.isArray(qualityOrShorthand)) {
        return interval(...qualityOrShorthand as IntervalShorthandPerfect);
    }
    if (typeof qualityOrShorthand === 'object') {
        if (!isIntervalObject(qualityOrShorthand)) {
            throw new Error('Invalid interval object');
        }
        return wrap({
            circleShift: qualityOrShorthand.circleShift,
            octaveShift: qualityOrShorthand.octaveShift,
        });
    }

    if (typeof name !== 'string') {
        throw new Error('Invalid interval name');
    }

    if (qualityDescriptorIsPerfect(qualityOrShorthand)) {
        if (!nameDescriptorIsPerfect(name)) {
            throw new Error('Invalid perfect interval name');
        }
        return perfectInterval(name);
    }

    if (qualityDescriptorIsMajor(qualityOrShorthand)) {
        if (!nameDescriptorIsMajorMinor(name)) {
            throw new Error('Invalid major interval name');
        }
        return majorInterval(name);
    }

    if (qualityDescriptorIsMinor(qualityOrShorthand)) {
        if (!nameDescriptorIsMajorMinor(name)) {
            throw new Error('Invalid minor interval name');
        }
        return minorInterval(name);
    }

    if (qualityDescriptorIsDiminished(qualityOrShorthand)) {
        if (nameDescriptorIsPerfect(name)) {
            return dimOrAugInterval(-1, perfectInterval(name));
        }
        return dimOrAugInterval(-1, minorInterval(name));
    }

    if (qualityDescriptorIsAugmented(qualityOrShorthand)) {
        if (nameDescriptorIsPerfect(name)) {
            return dimOrAugInterval(1, perfectInterval(name));
        }
        return dimOrAugInterval(1, majorInterval(name));
    }

    if (typeof qualityOrShorthand === 'number') {
        if (qualityOrShorthand === 0 || !Number.isInteger(qualityOrShorthand)) {
            throw new Error('Invalid interval dim/aug factor');
        }
        if (nameDescriptorIsPerfect(name)) {
            return dimOrAugInterval(qualityOrShorthand, perfectInterval(name));
        }
        if (nameDescriptorIsMajorMinor(name)) {
            if (qualityOrShorthand > 0) {
                return dimOrAugInterval(qualityOrShorthand, majorInterval(name));
            }
            return dimOrAugInterval(qualityOrShorthand, minorInterval(name));
        }
        throw new Error('Invalid interval name');
    }

    throw new Error('Invalid interval arguments');
}

function isIntervalObject(object: any): object is Interval {
    return typeof object === 'object' && 'circleShift' in object && 'octaveShift' in object && Number.isInteger(object.circleShift) && Number.isInteger(object.octaveShift);
}

function nameDescriptorIsPerfect(name: IntervalNameDescriptor): name is IntervalNameDescriptorPerfect {
    return intervalNameDescriptorsPerfect.includes(name as IntervalNameDescriptorPerfect);
}

function nameDescriptorIsMajorMinor(name: IntervalNameDescriptor): name is IntervalNameDescriptorMajorMinor {
    return intervalNameDescriptorsMajorMinor.includes(name as IntervalNameDescriptorMajorMinor);
}

function qualityDescriptorIsPerfect(quality: IntervalQualityDescriptor): quality is IntervalQualityDescriptorPerfect {
    return intervalQualityDescriptorsPerfect.includes(quality as IntervalQualityDescriptorPerfect);
}

function qualityDescriptorIsMajor(quality: IntervalQualityDescriptor): quality is IntervalQualityDescriptorMajor {
    return intervalQualityDescriptorsMajor.includes(quality as IntervalQualityDescriptorMajor);
}

function qualityDescriptorIsMinor(quality: IntervalQualityDescriptor): quality is IntervalQualityDescriptorMinor {
    return intervalQualityDescriptorsMinor.includes(quality as IntervalQualityDescriptorMinor);
}

function qualityDescriptorIsDiminished(quality: IntervalQualityDescriptor): quality is IntervalQualityDescriptorDiminished {
    return intervalQualityDescriptorsDiminished.includes(quality as IntervalQualityDescriptorDiminished);
}

function qualityDescriptorIsAugmented(quality: IntervalQualityDescriptor): quality is IntervalQualityDescriptorAugmented {
    return intervalQualityDescriptorsAugmented.includes(quality as IntervalQualityDescriptorAugmented);
}

function perfectInterval(name: IntervalNameDescriptorPerfect): Interval {
    switch (name) {
        case '1':
        case "unison":
            return wrap({
                circleShift: 0,
                octaveShift: 0,
            });
        case "fourth":
        case "4":
            return wrap({
                circleShift: -1,
                octaveShift: 0,
            });
        case "fifth":
        case "5":
            return wrap({
                circleShift: 1,
                octaveShift: 0,
            });
        case "octave":
        case "8":
            return wrap({
                circleShift: 0,
                octaveShift: 1,
            });
        default:
            throw new Error('Invalid perfect interval name');
    }
}

function majorInterval(name: IntervalNameDescriptorMajorMinor): Interval {
    switch (name) {
        case '2':
        case "second":
            return wrap({
                circleShift: 2,
                octaveShift: 0,
            });
        case "3":
        case "third":
            return wrap({
                circleShift: 4,
                octaveShift: 0,
            });
        case "6":
        case "sixth":
            return wrap({
                circleShift: 3,
                octaveShift: 0,
            });
        case "7":
        case "seventh":
            return wrap({
                circleShift: 5,
                octaveShift: 0,
            });
        default:
            throw new Error('Invalid major interval name');
    }
}

function minorInterval(name: IntervalNameDescriptorMajorMinor): Interval {
    switch (name) {
        case '2':
        case "second":
            return wrap({
                circleShift: -5,
                octaveShift: 0,
            });
        case "3":
        case "third":
            return wrap({
                circleShift: -3,
                octaveShift: 0,
            });
        case "6":
        case "sixth":
            return wrap({
                circleShift: -4,
                octaveShift: 0,
            });
        case "7":
        case "seventh":
            return wrap({
                circleShift: -2,
                octaveShift: 0,
            });
        default:
            throw new Error('Invalid minor interval name');
    }
}

function dimOrAugInterval(factor: number, interval: Interval): Interval {
    return wrap({
        circleShift: interval.circleShift + 7 * factor,
        octaveShift: interval.octaveShift,
    });
}

function wrap(i: Interval): Interval {
    Object.defineProperty(i, 'toString', {
        value: () => intervalName(i),
    });
    Object.freeze(i);
    return i;
}
