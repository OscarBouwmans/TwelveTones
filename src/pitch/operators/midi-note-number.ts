import { Pitch, PitchShorthand } from "../pitch";
import { semitonePosition } from "./semitone-position";
import { numberOfAccidentals } from "./number-of-accidentals";
import { natural } from "./natural";

const midiMiddleC = 60;
const midiOctaveOffset = 4;

/**
 * Returns the MIDI note number of `pitch`.
 * 
 * Note that values can exceed the range of 0-127.
 * 
 * @example
 * midiNoteNumber(pitch('C', '♭', 4)); // => 59
 * midiNoteNumber(pitch('C', '♮', 4)); // => 60
 * midiNoteNumber(pitch('A', '♮', 4)); // => 69
 * midiNoteNumber(pitch('A', '♮', 6)); // => 93
 */
export function midiNoteNumber(pitch: Pitch | PitchShorthand): number;
export function midiNoteNumber(_p: Pitch | PitchShorthand): number {
    const pNatural = natural(_p);
    return midiMiddleC + semitonePosition(pNatural) + 12 * (pNatural.octave - midiOctaveOffset) + numberOfAccidentals(_p);
}
