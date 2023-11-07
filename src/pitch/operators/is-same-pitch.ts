import { Pitch, PitchShorthand, pitch } from "../pitch";

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
