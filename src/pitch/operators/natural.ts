import { Pitch, PitchShorthand, pitch } from "../pitch";
import { numberOfAccidentals } from "./number-of-accidentals";

/**
 * Returns a `Pitch` that is the natural version of `pitch`, i.e. without any accidentals.
 * 
 * @example
 * natural(pitch('C', '♮', 4)); // => Pitch (C♮4)
 * natural(pitch('C', '♯', 4)); // => Pitch (C♮4)
 * natural(pitch('E', '♭', 4)); // => Pitch (E♮4)
 * natural(pitch('E', '♭♭', 4)); // => Pitch (E♮4)
 */
export function natural(pitch: Pitch | PitchShorthand): Pitch;
export function natural(_p: Pitch | PitchShorthand): Pitch {
    const p = pitch(_p);
    const naturalCirclePosition = p.circlePosition - 7 * numberOfAccidentals(p);
    return pitch({
        circlePosition: naturalCirclePosition,
        octave: p.octave,
    });
}
