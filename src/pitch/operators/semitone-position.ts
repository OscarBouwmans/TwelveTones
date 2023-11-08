import { normalizedModulo } from "../../arithmetic/normalized-modulo";
import { Pitch, PitchShorthand } from "../pitch";
import { natural } from "./natural";
import { numberOfAccidentals } from "./number-of-accidentals";

export type SemitoneIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Returns the position of `pitch` on a semitonal scale numbered 0 through 11, starting at C.
 * In other words: the nth key index on a piano keyboard.
 * 
 * @example
 * semitonePosition(pitch('C', '♮', 4)); // => 0
 * semitonePosition(pitch('F', '♯', 4)); // => 5
 * semitonePosition(pitch('B', '♭', 4)); // => 10
 * semitonePosition(pitch('B', '♮', 4)); // => 11
 * semitonePosition(pitch('C', '♭', 4)); // => 11
 */
export function semitonePosition(pitch: Pitch | PitchShorthand): SemitoneIndex;
export function semitonePosition(_p: Pitch | PitchShorthand): SemitoneIndex {
    const pNatural = natural(_p);
    const naturalIndex = lookup.get(pNatural.circlePosition)!;
    return normalizedModulo(naturalIndex + numberOfAccidentals(_p), 12) as SemitoneIndex;
}

const lookup = new Map<number, 0 | 2 | 4 | 5 | 7 | 9 | 11>([
    [0, 0],
    [2, 2],
    [4, 4],
    [-1, 5],
    [1, 7],
    [3, 9],
    [5, 11],
]);
