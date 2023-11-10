import { isValidIntervalInput } from "../../chord/type-validators/is-valid-interval-input";
import { Interval, IntervalShorthand, transpose } from "../../main";
import { Pitch, PitchShorthand, pitch } from "../pitch";
import { midiNoteNumber } from "./midi-note-number";

/**
 * Returns whether or not the provided pitches are enharmonic equivalents.
 * 
 * @example
 * isEnharmonicEquivalent(pitch('A', '♭', 4), pitch('G', '♯', 4)); // => true
 * isEnharmonicEquivalent(pitch('A', '♭', 4), pitch('C', '♯', 4)); // => false
 * 
 * isEnharmonicEquivalent(['A', '♭', 4], ['G', '♯', 4]); // => true
 * isEnharmonicEquivalent(['A', '♭', 4], ['G', '♯', 5]); // => false
 */
export function isEnharmonicEquivalent(a: (Pitch | PitchShorthand), b: (Pitch | PitchShorthand)): boolean;

/**
 * Returns whether or not the provided pitches are enharmonic equivalents.
 * 
 * @example
 * isEnharmonicEquivalent(pitch('A', '♭', 4), pitch('G', '♯', 4), pitch('F', '♯♯♯', 4)); // => true
 * isEnharmonicEquivalent(pitch('A', '♭', 4), pitch('G', '♯', 4), pitch('C', '♯', 4)); // => false
 * 
 * isEnharmonicEquivalent(['A', '♭', 4], ['G', '♯', 4], ['F', '♯♯♯', 4]); // => true
 * isEnharmonicEquivalent(['A', '♭', 4], ['G', '♯', 5], ['F', '♯♯♯', 6]); // => false
 */
export function isEnharmonicEquivalent(...twoOrMore: (Pitch | PitchShorthand)[]): boolean;

/**
 * Returns whether or not the provided intervals are enharmonic equivalents.
 * 
 * @example
 * isEnharmonicEquivalent(interval('augmented', 'fourth'), interval('diminished', 'fifth')); // => true
 * isEnharmonicEquivalent(interval('augmented', 'fourth'), interval('perfect', 'octave')); // => false
 */
export function isEnharmonicEquivalent(a: (Interval | IntervalShorthand), b: (Interval | IntervalShorthand)): boolean;

/**
 * Returns whether or not the provided intervals are enharmonic equivalents.
 * 
 * @example
 * isEnharmonicEquivalent(interval('augmented', 'fourth'), interval('diminished', 'fifth'), interval('doubly-augmented', 'third')); // => true
 * isEnharmonicEquivalent(interval('augmented', 'fourth'), interval('perfect', 'octave'), interval('diminished', 'fifth')); // => false
 */
export function isEnharmonicEquivalent(...twoOrMore: (Interval | IntervalShorthand)[]): boolean;

export function isEnharmonicEquivalent(...pitches: (Pitch | PitchShorthand)[] | (Interval | IntervalShorthand)[]): boolean {
    if (isValidIntervalInput(pitches)) {
        const ref = pitch('A', '♮', 0);
        return isEnharmonicEquivalent(...pitches.map(p => transpose(ref, p)));
    }
    if (pitches.length < 2) {
        throw new Error("At least two pitches must be provided.");
    }
    const copies = pitches.map(p => pitch(p));
    return copies.every(p => compare(copies[0], p));
}

function compare(a: Pitch, b: Pitch) {
    return midiNoteNumber(a) === midiNoteNumber(b);
}
