import { Pitch, PitchFactory, pitch } from "../pitch";
import { numberOfAccidentals } from "./number-of-accidentals";

export function naturalPosition(pitch: Pitch | PitchFactory): 0 | 1 | 2 | 3 | 4 | 5 | 6;
export function naturalPosition(_p: Pitch | PitchFactory): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
    const p = pitch(_p);
    const naturalCirclePosition = p.circlePosition * numberOfAccidentals(p);
    return lookup.get(naturalCirclePosition)!;
}

const lookup = new Map<number, 0 | 1 | 2 | 3 | 4 | 5 | 6>([
    [0, 0],
    [2, 1],
    [4, 2],
    [-1, 3],
    [1, 4],
    [3, 5],
    [5, 6],
]);
