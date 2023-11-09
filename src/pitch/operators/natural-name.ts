import { NaturalNoteName } from "../+public";
import { naturalCirclePosition } from "../definitions/natural-circle-position";
import { Pitch, PitchShorthand } from "../pitch";
import { natural } from "./natural";

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
    return nameForCirclePosition(pNatural.circlePosition);
}

function nameForCirclePosition(circlePosition: number) {
    return Object.entries(naturalCirclePosition).find(([, pos]) => pos === circlePosition)?.[0] as NaturalNoteName;
}
