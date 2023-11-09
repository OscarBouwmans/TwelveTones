import { normalizedModulo } from "../../arithmetic/normalized-modulo";
import { Pitch, PitchShorthand, pitch } from "../pitch";

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

export function naturalDistance(_a: Pitch | PitchShorthand, _b: Pitch | PitchShorthand) {
    const a = pitch(_a);
    const b = pitch(_b);

    const octaveDelta = b.octave - a.octave;

    const aIndex = circlePositionToNaturalIndex.get(normalizedModulo(a.circlePosition, 7))!;
    const bIndex = circlePositionToNaturalIndex.get(normalizedModulo(b.circlePosition, 7))!;

    return octaveDelta * 7 + (bIndex - aIndex);
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
