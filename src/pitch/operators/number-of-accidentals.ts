import { Pitch, PitchShorthand, pitch } from "../pitch";

/**
 * Returns the number of accidentals of `pitch`.
 * 
 * Flats are represented by a negative number,
 * sharps by a positive number.
 * 
 * @example
 * numberOfAccidentals(pitch('C', '♭♭', 4)); // => -2
 * numberOfAccidentals(pitch('C', '♭', 4)); // => -1
 * numberOfAccidentals(pitch('C', '♮', 4)); // => 0
 * numberOfAccidentals(pitch('C', '♯', 4)); // => 1
 * numberOfAccidentals(pitch('C', '♯♯', 4)); // => 2
 * numberOfAccidentals(pitch('C', '♯♯♯', 4)); // => 3
 * // etc…
 */
export function numberOfAccidentals(pitch: Pitch | PitchShorthand): number;
export function numberOfAccidentals(_p: Pitch | PitchShorthand) {
    const p = pitch(_p);
    return accidentalNumber(p.circlePosition);
}

function accidentalNumber(circlePosition: number): number {
    return Math.floor((circlePosition + 1) / 7);
}
