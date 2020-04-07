import { PitchDefinition } from "./pitch";
import { invalidAssumedAccidental, invalidPitchName } from "./errors";
import { normalizedModulo } from "../utilities";

export type NaturalName = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type NaturalNameIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const naturalNameOrder: readonly NaturalName[] = [
    "C", "D", "E", "F", "G", "A", "B",
];

export type NaturalCirclePosition = -1 | 0 | 1 | 2 | 3 | 4 | 5;
export type NaturalNoteNameMap = { readonly [key in NaturalName]: number };
export type NaturalNoteNameCirclePositionMap = { readonly [key in NaturalName]: NaturalCirclePosition };

export const naturalNoteNameCirclePosition: NaturalNoteNameCirclePositionMap = {
    C:  0,
    D:  2,
    E:  4,
    F: -1,
    G:  1,
    A:  3,
    B:  5,
};

export const naturalNoteNameSemitonePosition: NaturalNoteNameMap = {
    C:  0,
    D:  2,
    E:  4,
    F:  5,
    G:  7,
    A:  9,
    B: 11,
};

export const naturalCirclePosition = (circlePosition: number): NaturalCirclePosition => {
    const truncated = normalizedModulo(circlePosition, 7);
    if (truncated === 6) { return -1; }
    return truncated as NaturalCirclePosition;
};

export const accidentalNumber = (circlePosition: number): number => {
    return Math.floor((circlePosition + 1) / 7);
};



export interface MIDINoteNumberWithAssumedAccidental {
    midiNoteNumber: number;
    assumedAccidental: number;
}

export const pitchDefinitionFromMIDINoteNumber = ({ midiNoteNumber, assumedAccidental = 0 }: MIDINoteNumberWithAssumedAccidental): PitchDefinition => {
    const natural = midiNoteNumber - assumedAccidental;
    const naturalNormalized = normalizedModulo(natural, 12);
    const naturalName = (Object.keys(naturalNoteNameSemitonePosition) as NaturalName[]).find((name) => naturalNoteNameSemitonePosition[name] === naturalNormalized);
    if (naturalName === undefined) {
        throw new Error(invalidAssumedAccidental);
    }

    const circlePosition = naturalNoteNameCirclePosition[naturalName] + assumedAccidental * 7;
    const octave = Math.floor(natural / 12) - 1;

    return { circlePosition, octave };
};

export const pitchNameStringRegex = /^(C|D|E|F|G|A|B)((?:𝄪|𝄫|♯|#|♭|b|♮|n)*)(-?\d+)$/;

export const doubleFlatSymbolsRegex = /𝄫/g;
export const flatSymbolsRegex = /♭|b/g;
export const sharpSymbolsRegex = /♯|#/g;
export const doubleSharpSymbolsRegex = /𝄪/g;
export const naturalSymbolsRegex = /♮|n/g;

export const pitchDefinitionFromNameString = (name: string): PitchDefinition => {
    const match = name.match(pitchNameStringRegex);
    if (!match) {
        throw new Error(invalidPitchName);
    }
    const [ _, naturalName, accidentalStr, octaveStr ] = match as string[];
    let accidentals = 0;
    accidentals -= 2 * (accidentalStr.match(doubleFlatSymbolsRegex) || []).length;
    accidentals -= (accidentalStr.match(flatSymbolsRegex) || []).length;
    accidentals += (accidentalStr.match(sharpSymbolsRegex) || []).length;
    accidentals += 2 * (accidentalStr.match(doubleSharpSymbolsRegex) || []).length;
    const octave = Number(octaveStr);

    const naturalCirclePos = naturalNoteNameCirclePosition[naturalName as NaturalName];
    const circlePosition = naturalCirclePos + 7 * accidentals;

    return { circlePosition, octave };
}
