import { Interval, IntervalShorthand, interval } from "../interval";

/**
 * Returns the quality of `interval`, described as either:
 * - `'perfect'` for unisons, fourths, fifths, octaves
 * - `'major'` for major seconds, thirds, sixths, sevenths
 * - `'minor'` for minor seconds, thirds, sixths, sevenths
 * - a positive `number` for augmented intervals
 *      - `1` => augmented
 *      - `2` => doubly-augmented
 *      - `3` => triply-augmented
 *      - etc.
 * - a negative `number` for diminished intervals
 *      - `-1` => diminished
 *      - `-2` => doubly-diminished
 *      - `-3` => triply-diminished
 *      - etc.
 */
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
