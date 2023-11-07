import { Pitch, PitchShorthand, pitch } from "../pitch";
import { numberOfAccidentals } from "./number-of-accidentals";

export function natural(pitch: Pitch | PitchShorthand): Pitch;
export function natural(_p: Pitch | PitchShorthand): Pitch {
    const p = pitch(_p);
    const naturalCirclePosition = p.circlePosition - 7 * numberOfAccidentals(p);
    return pitch({
        circlePosition: naturalCirclePosition,
        octave: p.octave,
    });
}
