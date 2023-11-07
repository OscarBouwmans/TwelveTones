import { Pitch, PitchFactory, pitch } from "../pitch";
import { naturalSemitonePosition } from "./natural-semitone-position";

export function naturalName(pitch: Pitch | PitchFactory): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export function naturalName(_p: Pitch | PitchFactory): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' {
    const p = pitch(_p);
    const naturalPos = naturalSemitonePosition(p);
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
