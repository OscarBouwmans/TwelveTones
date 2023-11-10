import { transpose } from "../../interval/operators/transpose";
import { Pitch, PitchShorthand, pitch } from "../../pitch/pitch";
import { Chord, ChordShorthand, chord } from "../chord";

/**
 * Returns individual pitches of the provided chord, based on the provided root. Optionally using an inversion.
 * 
 * @example
 * const majorTriad = chord(['P', '1'], ['M', '3'], ['P', '5']);
 * 
 * const cMajor = pitches(majorTriad, ['C', '♮', 4]); // => Pitches C♮4, E♮4, G♮4
 * const fMajor = pitches(majorTriad, ['F', '♮', 4]); // => Pitches F♮4, A♮4, C♮5
 * 
 * const cMajorFirstInversion = pitches(majorTriad, ['C', '♮', 4], 1); // => Pitches E♮4, G♮4, C♮5
 */
export function pitches(chord: Chord | ChordShorthand, root: Pitch | PitchShorthand, inversion?: number): Pitch[];

export function pitches(_chord: Chord | ChordShorthand, _root: Pitch | PitchShorthand, inversion = 0) {
    const { intervals } = chord(_chord);
    const root = pitch(_root);
    const mapped = intervals.map(i => transpose(root, i));
    return invert(mapped, inversion);
}

function invert(pitches: Pitch[], inversion: number) {
    if (!pitches?.length) {
        return pitches;
    }
    if (!Number.isInteger(inversion)) {
        throw new Error("Inversion must be an integer.");
    }
    if (inversion > 0) {
        const p = transpose(pitches.shift()!, ['perfect', 'octave'], 'up');
        return invert([...pitches, p], inversion - 1);
    }
    if (inversion < 0) {
        const p = transpose(pitches.pop()!, ['perfect', 'octave'], 'down');
        return invert([p, ...pitches], inversion + 1);
    }
    return pitches;
}
