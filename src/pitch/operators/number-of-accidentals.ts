import { Pitch, PitchShorthand, pitch } from "../pitch";

export function numberOfAccidentals(pitch: Pitch | PitchShorthand): number;
export function numberOfAccidentals(_p: Pitch | PitchShorthand) {
    const p = pitch(_p);
    return accidentalNumber(p.circlePosition);
}

function accidentalNumber(circlePosition: number): number {
    return Math.floor((circlePosition + 1) / 7);
}
