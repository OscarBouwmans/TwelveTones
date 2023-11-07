import { Interval, IntervalShorthand, interval } from "../interval";

export function isSameInterval(a: Interval | IntervalShorthand, b: Interval | IntervalShorthand): boolean;
export function isSameInterval(...twoOrMore: (Interval | IntervalShorthand)[]): boolean;
export function isSameInterval(...intervals: (Interval | IntervalShorthand)[]): boolean {
    if (intervals.length < 2) {
        throw new Error("At least two intervals must be provided.");
    }
    const copies = intervals.map(i => interval(i));
    return copies.every(i => compare(copies[0], i));
}

function compare(a: Interval, b: Interval) {
    return a.circleShift === b.circleShift && a.octaveShift === b.octaveShift;
}