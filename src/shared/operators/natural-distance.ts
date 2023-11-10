import { normalizedModulo } from "../../arithmetic/normalized-modulo";
import { Interval, IntervalShorthand, interval } from "../../interval/interval";
import { isValidIntervalObject } from "../../interval/type-validators/is-valid-interval-object";
import { isValidIntervalShorthand } from "../../interval/type-validators/is-valid-interval-shorthand";
import { Pitch, PitchShorthand, pitch } from "../../pitch/pitch";

/**
 * Expresses the distance between the natural variants of two notes.
 * 
 * i.e. disregard all the accidentals, and then count how many white keys
 * you would need to shift on a piano to travel from one note to the other.
 * 
 * Can be used to sort pitches by their natural order.
 * 
 * @example
 * naturalDistance(['C', '♮', 4], ['D', '♮', 4]); // => 1
 * naturalDistance(['C', '♮', 4], ['B', '♮', 3]); // => -1
 * naturalDistance(['C', '♮', 4], ['G', '♮', 4]); // => 4
 * naturalDistance(['C', '♮', 4], ['F', '♮', 3]); // => -4
 * naturalDistance(['C', '♮', 4], ['C', '♮', 6]); // => 14
 * 
 * @example
 * const pitches = [
 *      pitch('C', '♮', 4),
 *      pitch('D', '♯♯', 4),
 *      pitch('B', '♮', 3),
 *      pitch('E', '♭', 4),
 * ];
 * 
 * // descending:
 * pitches.sort((a, b) => naturalDistance(a, b));
 * // => E♭4, D♯♯4, C♮4, B♮3
 * 
 * // ascending:
 * pitches.sort((a, b) => -naturalDistance(a, b));
 * // => B♮3, C♮4, D♯♯4, E♭4
 * 
 * // note that this places the D♯♯4 before the E♭4,
 * // even though the D♯♯4 is a higher pitch than E♭4.
 */
export function naturalDistance(a: Pitch | PitchShorthand, b: Pitch | PitchShorthand): number;

/**
 * Expresses how many natural notes an interval shifts.
 * 
 * i.e. disregard all the accidentals, and then count how many
 * white keys you would need to shift on a piano to make the interval.
 * 
 * @example
 * naturalDistance(['perfect', 'unison']); // => 0
 * naturalDistance(['major', 'second']); // => 1
 * naturalDistance(['major', 'third']); // => 2
 * naturalDistance(['perfect', 'fourth']); // => 3
 * // …
 * naturalDistance(['perfect', 'octave']); // => 7
 */
export function naturalDistance(interval: Interval | IntervalShorthand): number;

export function naturalDistance(_a: Pitch | PitchShorthand | Interval | IntervalShorthand, _b?: Pitch | PitchShorthand) {
    if (isValidIntervalObject(_a) || isValidIntervalShorthand(_a)) {
        return betweenInterval(_a);
    }

    return betweenPitches(_a, _b!);
}

function betweenPitches(_a: Pitch | PitchShorthand, _b: Pitch | PitchShorthand) {
    const a = pitch(_a);
    const b = pitch(_b);

    const octaveDelta = b.octave - a.octave;

    const aIndex = circlePositionToNaturalIndex.get(normalizedModulo(a.circlePosition, 7))!;
    const bIndex = circlePositionToNaturalIndex.get(normalizedModulo(b.circlePosition, 7))!;

    return octaveDelta * 7 + (bIndex - aIndex);
}

function betweenInterval(_i: Interval | IntervalShorthand) {
    const i = interval(_i);
    const circleShiftMod = normalizedModulo(i.circleShift, 7);
    const noteShift = circlePositionToNaturalIndex.get(circleShiftMod)!;
    return noteShift + 7 * i.octaveShift;
}

const circlePositionToNaturalIndex = new Map([
    [0, 0],
    [1, 4],
    [2, 1],
    [3, 5],
    [4, 2],
    [5, 6],
    [6, 3],
]);
