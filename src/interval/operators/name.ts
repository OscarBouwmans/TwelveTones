import { Interval, IntervalShorthand, interval } from "../interval";

export function name(interval: Interval | IntervalShorthand): string;
export function name(_i: Interval | IntervalShorthand) {
    const { circleShift, octaveShift } = interval(_i);
    const circleShiftModulo = circleShift % 7;

    switch (circleShiftModulo) {
        case 0:
            switch (octaveShift) {
                case 0:
                    return 'unison';
                case 1:
                    return 'octave';
                default:
                    return octaveOrOctaves(octaveShift);
            }
        case -6:
        case 1:
            if (octaveShift === 0) {
                return 'fifth';
            }
            return `fifth and ${octaveOrOctaves(octaveShift)}`;
        case -1:
        case 6:
            switch (octaveShift) {
                case 0:
                    return 'fourth';
                case 1:
                    return 'evelenth';
                default:
                    return `fourth and ${octaveOrOctaves(octaveShift)}`;
            }
        case -5:
        case 2:
            switch (octaveShift) {
                case 0:
                    return 'second';
                case 1:
                    return 'ninth';
                default:
                    return `second and ${octaveOrOctaves(octaveShift)}`;
            }
        case -4:
        case 3:
            switch (octaveShift) {
                case 0:
                    return 'sixth';
                case 1:
                    return 'thirteenth';
                default:
                    return `sixth and ${octaveOrOctaves(octaveShift)}`;
            }
        case -3:
        case 4:
            if (octaveShift === 0) {
                return 'third';
            }
            return `third and ${octaveOrOctaves(octaveShift)}`;
        case -2:
        case 5:
            if (octaveShift === 0) {
                return 'seventh';
            }
            return `seventh and ${octaveOrOctaves(octaveShift)}`;
        default:
            throw new Error(`Invalid interval.`);
    }
}

function octaveOrOctaves(octaves: number) {
    switch (octaves) {
        case -1:
            return `-1 octave`;
        case 1:
            return `1 octave`;
        default:
            return `${octaves} octaves`;
    }
}
