import { Chord, ChordShorthand, chord } from "../chord";

const sevenths = {
    major: [['P', '1'], ['M', '3'], ['P', '5'], ['M', '7']] satisfies ChordShorthand,
    minor: [['P', '1'], ['m', '3'], ['P', '5'], ['m', '7']] satisfies ChordShorthand,
    dominant: [['P', '1'], ['M', '3'], ['P', '5'], ['m', '7']] satisfies ChordShorthand,
    'half-diminished': [['P', '1'], ['m', '3'], ['d', '5'], ['m', '7']] satisfies ChordShorthand,
    diminished: [['P', '1'], ['m', '3'], ['d', '5'], ['d', '7']] satisfies ChordShorthand,
} as const;

type SeventhName = keyof typeof sevenths;

/**
 * Helper function that returns a seventh chord as `Chord` object.
 */
export function seventhChord(name: SeventhName): Chord {
    return chord(sevenths[name]);
}