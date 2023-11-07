import { flatSymbol, sharpSymbol } from "../definitions";
import { Pitch, PitchShorthand, pitch } from "../pitch";
import { naturalName } from "./natural-name";
import { numberOfAccidentals } from "./number-of-accidentals";

export function pitchName(pitch: Pitch | PitchShorthand): string;
export function pitchName(_p: Pitch | PitchShorthand) {
    const p = pitch(_p);
    const accidentals = numberOfAccidentals(p);
    const accidentalString = accidentals > 0 ? sharpSymbol.repeat(accidentals) : flatSymbol.repeat(-accidentals);
    return `${naturalName(p)}${accidentalString}${p.octave}`;
}