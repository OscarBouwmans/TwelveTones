import { IntervalShorthand } from "../../main";
import { Chord, chord } from "../chord";

const sevenths: { [name: string]: IntervalShorthand[] } = {
    major: [['P', '1'], ['M', '3'], ['P', '5'], ['M', '7']],
    minor: [['P', '1'], ['m', '3'], ['P', '5'], ['m', '7']],
    dominant: [['P', '1'], ['M', '3'], ['P', '5'], ['m', '7']],
    halfDiminished: [['P', '1'], ['m', '3'], ['d', '5'], ['m', '7']],
    diminished: [['P', '1'], ['m', '3'], ['d', '5'], ['d', '7']],
};

type SeventhName = keyof typeof sevenths;

/**
 * Helper function that returns a seventh chord as `Chord` object.
 */
export function seventhChord(name: SeventhName): Chord {
    return chord(sevenths[name]);
}
