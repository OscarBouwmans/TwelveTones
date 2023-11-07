import { Pitch, PitchFactory, pitch } from "../pitch";
import { naturalSemitonePosition } from "./natural-semitone-position";
import { numberOfAccidentals } from "./number-of-accidentals";

const midiOctaveOffset = 4;

export function midiNoteNumber(pitch: Pitch | PitchFactory): number;
export function midiNoteNumber(_p: Pitch | PitchFactory): number {
    const p = pitch(_p);
    return 60 + naturalSemitonePosition(p) + 12 * (p.octave - midiOctaveOffset) + numberOfAccidentals(p);
}
