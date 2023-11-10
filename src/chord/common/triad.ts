import { Chord, ChordShorthand, chord } from "../chord";

const triads = {
    major: [['P', '1'], ['M', '3'], ['P', '5']] satisfies ChordShorthand,
    minor: [['P', '1'], ['m', '3'], ['P', '5']] satisfies ChordShorthand,
    diminished: [['P', '1'], ['m', '3'], ['d', '5']] satisfies ChordShorthand,
    augmented: [['P', '1'], ['M', '3'], ['A', '5']] satisfies ChordShorthand,
} as const;

type TriadName = keyof typeof triads;

/**
 * Helper function that returns a triad as `Chord` object.
 */
export function triad(name: TriadName): Chord {
    return chord(triads[name]);
}
