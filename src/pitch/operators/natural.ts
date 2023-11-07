import { Pitch, PitchFactory, pitch } from "../pitch";
import { numberOfAccidentals } from "./number-of-accidentals";

export function natural(pitch: Pitch | PitchFactory): Pitch;
export function natural(_p: Pitch | PitchFactory): Pitch {
    const p = pitch(_p);
    const naturalCirclePosition = p.circlePosition - 7 * numberOfAccidentals(p);
    return pitch({
        circlePosition: naturalCirclePosition,
        octave: p.octave,
    });
}
