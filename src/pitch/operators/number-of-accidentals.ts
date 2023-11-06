import { Pitch, PitchFactory, pitch } from "../pitch";

export function numberOfAccidentals(pitch: Pitch | PitchFactory): number;
export function numberOfAccidentals(_p: Pitch | PitchFactory) {
    const p = pitch(_p);
    return accidentalNumber(p.circlePosition);
}

function accidentalNumber(circlePosition: number): number {
    return Math.floor((circlePosition + 1) / 7);
}
