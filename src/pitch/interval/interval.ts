
export interface Interval {
    circleShift: number;
    octaveShift: number;
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

export function interval(quality: IntervalQualityDescriptorPerfect, name: IntervalNameDescriptorPerfect): Interval;
export function interval(quality: IntervalQualityDescriptorMajor, name: IntervalNameDescriptorMajorMinor): Interval;
export function interval(quality: IntervalQualityDescriptorMinor, name: IntervalNameDescriptorMajorMinor): Interval;
export function interval(quality: IntervalQualityDescriptorDiminished, name: IntervalNameDescriptor): Interval;
export function interval(quality: IntervalQualityDescriptorAugmented, name: IntervalNameDescriptor): Interval;
export function interval(quality: IntervalShorthandMultipleDiminishedOrAugmented, name: IntervalNameDescriptor): Interval;
export function interval(shorthand: Interval | IntervalShorthand): Interval;
export function interval(qualityOrShorthand: IntervalQualityDescriptor | Interval | IntervalShorthand, name?: IntervalNameDescriptor): Interval {
    if (Array.isArray(qualityOrShorthand)) {
        return interval(...qualityOrShorthand as IntervalShorthandPerfect);
    }
    if (typeof qualityOrShorthand === 'object') {
        if (!isIntervalObject(qualityOrShorthand)) {
            throw new Error('Invalid interval object');
        }
        return {
            circleShift: qualityOrShorthand.circleShift,
            octaveShift: qualityOrShorthand.octaveShift,
        };
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
            return {
                circleShift: 0,
                octaveShift: 0,
            }
        case "fourth":
        case "4":
            return {
                circleShift: -1,
                octaveShift: 0,
            }
        case "fifth":
        case "5":
            return {
                circleShift: 1,
                octaveShift: 0,
            }
        case "octave":
        case "8":
            return {
                circleShift: 0,
                octaveShift: 1,
            }
        default:
            throw new Error('Invalid perfect interval name');
    }
}

function majorInterval(name: IntervalNameDescriptorMajorMinor): Interval {
    switch (name) {
        case '2':
        case "second":
            return {
                circleShift: 2,
                octaveShift: 0,
            }
        case "3":
        case "third":
            return {
                circleShift: 4,
                octaveShift: 0,
            }
        case "6":
        case "sixth":
            return {
                circleShift: 3,
                octaveShift: 0,
            }
        case "7":
        case "seventh":
            return {
                circleShift: 5,
                octaveShift: 0,
            }
        default:
            throw new Error('Invalid major interval name');
    }
}

function minorInterval(name: IntervalNameDescriptorMajorMinor): Interval {
    switch (name) {
        case '2':
        case "second":
            return {
                circleShift: -5,
                octaveShift: 0,
            }
        case "3":
        case "third":
            return {
                circleShift: -3,
                octaveShift: 0,
            }
        case "6":
        case "sixth":
            return {
                circleShift: -4,
                octaveShift: 0,
            }
        case "7":
        case "seventh":
            return {
                circleShift: -2,
                octaveShift: 0,
            }
        default:
            throw new Error('Invalid minor interval name');
    }
}

function dimOrAugInterval(factor: number, interval: Interval): Interval {
    return {
        circleShift: interval.circleShift + 7 * factor,
        octaveShift: interval.octaveShift,
    };
}
