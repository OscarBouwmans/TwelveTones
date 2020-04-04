import { PitchDefinition, Pitch } from "./pitch";
import { accidentalNumber, NaturalName, naturalCirclePosition, naturalNoteNameCirclePosition, naturalNoteNameSemitonePosition } from "./utilities";

export interface PitchProperties {
    readonly naturalName: (this: PitchDefinition) => NaturalName;
    readonly accidentals: (this: PitchDefinition) => number;
    readonly midiNoteNumber: (this: Pitch) => number;
}

export const pitchProperties: PitchProperties = {
    naturalName() {
        const naturalCirclePos = naturalCirclePosition(this.circlePosition);
        return Object.keys(naturalNoteNameCirclePosition).find((key) => {
            return naturalNoteNameCirclePosition[key as NaturalName] === naturalCirclePos;
        }) as NaturalName;
    },
    accidentals() {
        return accidentalNumber(this.circlePosition);
    },
    midiNoteNumber() {
        const semitonePosition = naturalNoteNameSemitonePosition[this.naturalName()];
        return 60 + semitonePosition + 12 * (this.octave - 4) + this.accidentals();
    },
}
