import { Pitch, PitchShorthand } from "../../pitch/pitch";
import { interval } from "../interval";
import { transpose } from "./transpose";

const augmentedUnison = interval('A', '1');

/**
 * Transposes `pitch` up by an augmented unison.
 * 
 * @example
 * sharper(pitch('A', '♭', 4)); // => 'A♮'
 * sharper(pitch('A', '♮', 4)); // => 'A♯'
 * sharper(pitch('A', '♯', 4)); // => 'A♯♯'
 */
export function sharper(pitch: Pitch | PitchShorthand): Pitch;
export function sharper(p: Pitch | PitchShorthand) {
    return transpose(p, augmentedUnison, 'up');
}

/**
 * Transposes `pitch` down by an augmented unison.
 * 
 * @example
 * flatter(pitch('A', '♯', 4)); // => 'A♮'
 * flatter(pitch('A', '♮', 4)); // => 'A♭'
 * flatter(pitch('A', '♭', 4)); // => 'A♭♭'
 */
export function flatter(pitch: Pitch | PitchShorthand): Pitch;
export function flatter(p: Pitch | PitchShorthand) {
    return transpose(p, augmentedUnison, 'down');
}
