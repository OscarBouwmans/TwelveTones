import { Pitch, PitchFactory, pitch } from "../pitch";
import { numberOfAccidentals } from "./number-of-accidentals";

export function naturalSemitonePosition(pitch: Pitch | PitchFactory): 0 | 2 | 4 | 5 | 7 | 9 | 11;
export function naturalSemitonePosition(_p: Pitch | PitchFactory): 0 | 2 | 4 | 5 | 7 | 9 | 11 {
    const p = pitch(_p);
    const naturalCirclePosition = p.circlePosition - 7 * numberOfAccidentals(p);
    return lookup.get(naturalCirclePosition)!;
}

const lookup = new Map<number, 0 | 2 | 4 | 5 | 7 | 9 | 11>([
    [0, 0],
    [2, 2],
    [4, 4],
    [-1, 5],
    [1, 7],
    [3, 9],
    [5, 11],
]);
