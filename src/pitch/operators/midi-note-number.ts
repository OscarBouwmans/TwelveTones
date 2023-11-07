import { Pitch, PitchFactory } from "../pitch";
import { semitonePosition } from "./semitone-position";
import { numberOfAccidentals } from "./number-of-accidentals";
import { natural } from "./natural";

const midiOctaveOffset = 4;

export function midiNoteNumber(pitch: Pitch | PitchFactory): number;
export function midiNoteNumber(_p: Pitch | PitchFactory): number {
    const pNatural = natural(_p);
    return 60 + semitonePosition(pNatural) + 12 * (pNatural.octave - midiOctaveOffset) + numberOfAccidentals(_p);
}
