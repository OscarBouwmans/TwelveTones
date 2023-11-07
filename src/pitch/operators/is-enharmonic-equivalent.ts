import { Pitch, PitchShorthand, pitch } from "../pitch";
import { midiNoteNumber } from "./midi-note-number";

export function isEnharmonicEquivalent(a: (Pitch | PitchShorthand), b: (Pitch | PitchShorthand)): boolean;
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
