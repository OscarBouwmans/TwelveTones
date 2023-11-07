import { Interval, IntervalShorthand, interval } from "../interval";

export function quality(interval: Interval | IntervalShorthand): 'perfect' | 'major' | 'minor' | number;
export function quality(_i: Interval | IntervalShorthand) {
    const { circleShift } = interval(_i);
    const circleShiftModulo = circleShift % 7;
    const absoluteFactor = Math.floor((Math.abs(circleShift) + 1) / 7);

    if (circleShift < -5) {
        return -absoluteFactor;
    }
    if (circleShift > 5) {
        return absoluteFactor;
    }

    switch (circleShiftModulo) {
        case 0:
        case 1:
        case -1:
            return 'perfect';
        case 2:
        case 3:
        case 4:
        case 5:
            return 'major';
        case -2:
        case -3:
        case -4:
        case -5:
            return 'minor';
        default:
            throw new Error(`Invalid interval.`);
    }
}
