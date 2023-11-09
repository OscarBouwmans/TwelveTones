import { normalizedModulo } from "../../arithmetic/normalized-modulo";
import { Interval, IntervalShorthand, interval } from "../interval";

/**
 * Expresses how many natural notes an interval shifts.
 * 
 * i.e. disregard all the accidentals, and then count how many
 * white keys you would need to shift on a piano to make the interval.
 * 
 * @example
 * naturalNoteShift(['perfect', 'unison']); // => 0
 * naturalNoteShift(['major', 'second']); // => 1
 * naturalNoteShift(['major', 'third']); // => 2
 * naturalNoteShift(['perfect', 'fourth']); // => 3
 * // …
 * naturalNoteShift(['perfect', 'octave']); // => 7
 */
export function naturalNoteShift(interval: Interval | IntervalShorthand): number;

export function naturalNoteShift(_i: Interval | IntervalShorthand) {
    const i = interval(_i);
    const circleShiftMod = normalizedModulo(i.circleShift, 7);
    const noteShift = circleShiftToNoteShift.get(circleShiftMod)!;
    return noteShift + 7 * i.octaveShift;
}

const circleShiftToNoteShift = new Map([
    [0, 0],
    [1, 4],
    [2, 1],
    [3, 5],
    [4, 2],
    [5, 6],
    [6, 3],
]);
