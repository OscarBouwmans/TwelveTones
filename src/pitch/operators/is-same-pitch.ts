import { Pitch, PitchShorthand, pitch } from "../pitch";

/**
 * Returns whether or not the provided objects represent the same pitch.
 * 
 * @example
 * isSamePitch(pitch('A', '♭', 4), pitch('A', '♭', 4)); // => true
 * isSamePitch(pitch('A', '♭', 4), pitch('G', '♯', 4)); // => false
 * 
 * isSamePitch(['G', '♯', 4], ['G', '♯', 4]); // => true
 * isSamePitch(['G', '♯', 4], ['G', '♯', 5]); // => false
 */
export function isSamePitch(a: Pitch | PitchShorthand, b: Pitch | PitchShorthand): boolean;
export function isSamePitch(...twoOrMore: (Pitch | PitchShorthand)[]): boolean;
export function isSamePitch(...pitches: (Pitch | PitchShorthand)[]): boolean {
    if (pitches.length < 2) {
        throw new Error("At least two pitches must be provided.");
    }
    const copies = pitches.map(p => pitch(p));
    return copies.every(p => compare(copies[0], p));
}

function compare(a: Pitch, b: Pitch) {
    return a.circlePosition === b.circlePosition && a.octave === b.octave;
}
