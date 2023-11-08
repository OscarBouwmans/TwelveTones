import { NaturalNoteName } from "../+public";
import { Pitch, PitchShorthand } from "../pitch";
import { natural } from "./natural";
import { semitonePosition } from "./semitone-position";

/**
 * Returns the natural note name of `pitch`.
 * 
 * @example
 * naturalNoteName(pitch('C', '♮', 4)); // => 'C'
 * naturalNoteName(pitch('C', '♯♯', 4)); // => 'C'
 * naturalNoteName(pitch('B', '♭', 4)); // => 'B'
 */
export function naturalName(pitch: Pitch | PitchShorthand): NaturalNoteName;
export function naturalName(_p: Pitch | PitchShorthand): NaturalNoteName {
    const pNatural = natural(_p);
    const naturalPos = semitonePosition(pNatural);
    return naturalNameLookup.get(naturalPos)!;
}

const naturalNameLookup = new Map<number, NaturalNoteName>([
    [0, "C"],
    [2, "D"],
    [4, "E"],
    [5, "F"],
    [7, "G"],
    [9, "A"],
    [11, "B"],
]);
