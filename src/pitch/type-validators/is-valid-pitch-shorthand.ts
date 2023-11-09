import { PitchShorthand } from "../pitch";
import { isValidAccidental } from "./is-valid-accidental";
import { isValidNoteName } from "./is-valid-note-name";
import { isValidOctave } from "./is-valid-octave";

export function isValidPitchShorthand(pitch: unknown): pitch is PitchShorthand {
    if (!pitch) return false;
    if (typeof pitch !== 'object') return false;

    if (!Array.isArray(pitch)) return false;
    if (pitch.length !== 3) return false;

    const [noteName, accidental, octave] = pitch;

    if (!isValidNoteName(noteName)) return false;
    if (!isValidAccidental(accidental)) return false;
    if (!isValidOctave(octave)) return false;

    return true;
}
