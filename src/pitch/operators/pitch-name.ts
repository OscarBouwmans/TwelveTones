import { flatSymbol, sharpSymbol } from "../definitions/symbols";
import { Pitch, PitchShorthand, pitch } from "../pitch";
import { naturalName } from "./natural-name";
import { numberOfAccidentals } from "./number-of-accidentals";

/**
 * Returns a string representation of `pitch`.
 * 
 * @example
 * pitchName(pitch('C', '♭♭', 4)); // => 'C♭♭4'
 * pitchName(pitch('F', '♯', 9)); // => 'F♯9'
 */
export function pitchName(pitch: Pitch | PitchShorthand): string;
export function pitchName(_p: Pitch | PitchShorthand) {
    const p = pitch(_p);
    const accidentals = numberOfAccidentals(p);
    const accidentalString = accidentals > 0 ? sharpSymbol.repeat(accidentals) : flatSymbol.repeat(-accidentals);
    return `${naturalName(p)}${accidentalString}${p.octave}`;
}
