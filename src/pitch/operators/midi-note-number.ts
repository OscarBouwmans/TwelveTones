import { Pitch, PitchShorthand } from "../pitch";
import { semitonePosition } from "./semitone-position";
import { numberOfAccidentals } from "./number-of-accidentals";
import { natural } from "./natural";

const midiOctaveOffset = 4;

export function midiNoteNumber(pitch: Pitch | PitchShorthand): number;
export function midiNoteNumber(_p: Pitch | PitchShorthand): number {
    const pNatural = natural(_p);
    return 60 + semitonePosition(pNatural) + 12 * (pNatural.octave - midiOctaveOffset) + numberOfAccidentals(_p);
}
