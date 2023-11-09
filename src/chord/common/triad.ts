import { IntervalShorthand } from "../../main";
import { Chord, chord } from "../chord";

const triads: { [name: string]: IntervalShorthand[] } = {
    major: [['P', '1'], ['M', '3'], ['P', '5']],
    minor: [['P', '1'], ['m', '3'], ['P', '5']],
    diminished: [['P', '1'], ['m', '3'], ['d', '5']],
    augmented: [['P', '1'], ['M', '3'], ['A', '5']],
};

type TriadName = keyof typeof triads;

/**
 * Helper function that returns a triad as `Chord` object.
 */
export function triad(name: TriadName): Chord {
    return chord(triads[name]);
}
