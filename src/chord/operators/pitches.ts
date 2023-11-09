import { transpose } from "../../interval/operators/transpose";
import { Pitch, PitchShorthand, pitch } from "../../pitch/pitch";
import { Chord, ChordShorthand, chord } from "../chord";

/**
 * Returns individual pitches of the provided chord, based on the provided root.
 * 
 * @example
 * const majorTriad = chord(['P', '1'], ['M', '3'], ['P', '5']);
 * 
 * const cMajor = pitches(majorTriad, ['C', '♮', 4]); // => Pitches C♮4, E♮4, G♮4
 * const fMajor = pitches(majorTriad, ['F', '♮', 4]); // => Pitches F♮4, A♮4, C♮5
 */
export function pitches(chord: Chord | ChordShorthand, root: Pitch | PitchShorthand): Pitch[];

export function pitches(_chord: Chord | ChordShorthand, _root: Pitch | PitchShorthand) {
    const { intervals } = chord(_chord);
    const root = pitch(_root);
    return intervals.map(i => transpose(root, i));
}
