import { Interval, IntervalShorthand, interval } from "../interval";
import { naturalNoteShift } from "./natural-note-shift";

/**
 * Combine two intervals into a single interval.
 * 
 * @example
 * const perfectFourth = combine(['M', '3'], ['m', '2']);
 * const majorNinth = combine(['P', '8'], ['M', '2']);
 */
export function combine(a: Interval | IntervalShorthand, b: Interval | IntervalShorthand): Interval;

/**
 * Combine two or more intervals into a single interval.
 * 
 * @example
 * const perfectFifth = combine(['M', '3'], ['m', '2'], ['M', '1']);
 * const majorNinth = combine(['P', '5'], ['P', '4'], ['M', '2']);
 */
export function combine(...twoOrMore: (Interval | IntervalShorthand)[]): Interval;

export function combine(...intervals: (Interval | IntervalShorthand)[]): Interval {
    if (intervals.length < 2) {
        throw new Error("At least two intervals must be provided.");
    }
    return intervals.map(interval).reduce((a, b) => {
        const noteShift = naturalNoteShift(a) + naturalNoteShift(b);
        const octaveShift = Math.floor(noteShift / 7);
        return interval({
            circleShift: a.circleShift + b.circleShift,
            octaveShift,
        });
    });
}
