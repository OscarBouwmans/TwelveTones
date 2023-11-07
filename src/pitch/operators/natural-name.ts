import { Pitch, PitchShorthand } from "../pitch";
import { natural } from "./natural";
import { semitonePosition } from "./semitone-position";

export function naturalName(pitch: Pitch | PitchShorthand): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export function naturalName(_p: Pitch | PitchShorthand): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' {
    const pNatural = natural(_p);
    const naturalPos = semitonePosition(pNatural);
    return naturalNameLookup.get(naturalPos)!;
}

const naturalNameLookup = new Map<number, 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'>([
    [0, "C"],
    [2, "D"],
    [4, "E"],
    [5, "F"],
    [7, "G"],
    [9, "A"],
    [11, "B"],
]);
