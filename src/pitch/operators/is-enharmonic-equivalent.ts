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

export function isEnharmonicEquivalent(...pitches: (Pitch | PitchShorthand)[]): boolean {
    if (pitches.length < 2) {
        throw new Error("At least two pitches must be provided.");
    }
    const copies = pitches.map(p => pitch(p));
    return copies.every(p => compare(copies[0], p));
}

function compare(a: Pitch, b: Pitch) {
    return midiNoteNumber(a) === midiNoteNumber(b);
}
