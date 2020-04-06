import { PitchDefinition } from "./pitch";
import { invalidAssumedAccidental } from "./errors";

export type NaturalName = "a" | "b" | "c" | "d" | "e" | "f" | "g";
export type NaturalNameIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const naturalNameOrder: readonly NaturalName[] = [
    "c", "d", "e", "f", "g", "a", "b",
];

export type NaturalCirclePosition = -1 | 0 | 1 | 2 | 3 | 4 | 5;
export type NaturalNoteNameMap = { readonly [key in NaturalName]: number };
export type NaturalNoteNameCirclePositionMap = { readonly [key in NaturalName]: NaturalCirclePosition };

export const naturalNoteNameCirclePosition: NaturalNoteNameCirclePositionMap = {
    c:  0,
    d:  2,
    e:  4,
    f: -1,
    g:  1,
    a:  3,
    b:  5,
};

export const naturalNoteNameSemitonePosition: NaturalNoteNameMap = {
    c:  0,
    d:  2,
    e:  4,
    f:  5,
    g:  7,
    a:  9,
    b: 11,
};

export const naturalCirclePosition = (circlePosition: number): NaturalCirclePosition => {
    const truncated = ((circlePosition % 7) + 7) % 7;
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

export const pitchFromMIDINoteNumber = ({ midiNoteNumber, assumedAccidental = 0 }: MIDINoteNumberWithAssumedAccidental): PitchDefinition => {
    const natural = midiNoteNumber - assumedAccidental;
    const naturalTruncated = ((natural % 12) + 12) % 12;
    const naturalName = (Object.keys(naturalNoteNameSemitonePosition) as NaturalName[]).find((name) => naturalNoteNameSemitonePosition[name] === naturalTruncated);
    if (naturalName === undefined) {
        throw new Error(invalidAssumedAccidental);
    }

    const circlePosition = naturalNoteNameCirclePosition[naturalName] + assumedAccidental * 7;
    const octave = Math.floor(natural / 12) - 1;

    return { circlePosition, octave };
};
