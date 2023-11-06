import { Pitch, PitchFactory, pitch } from "../pitch";
import { midiNoteNumber } from "./midi-note-number";

export function areEnharmonicEquivalents(a: (Pitch | PitchFactory), b: (Pitch | PitchFactory)): boolean;
export function areEnharmonicEquivalents(...pitches: (Pitch | PitchFactory)[]): boolean;
export function areEnharmonicEquivalents(...pitches: (Pitch | PitchFactory)[]): boolean {
    if (pitches.length < 1) {
        return false;
    }
    if (pitches.length === 1) {
        return true;
    }
    const copies = pitches.map(p => pitch(p));
    return copies.every(p => compare(copies[0], p));
}

function compare(a: Pitch, b: Pitch) {
    return midiNoteNumber(a) === midiNoteNumber(b);
}
