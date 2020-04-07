import { PitchDefinition, Pitch } from "./pitch";
import { accidentalNumber, NaturalName, naturalCirclePosition, naturalNoteNameCirclePosition, naturalNoteNameSemitonePosition, naturalNameOrder, NaturalNameIndex } from "./utilities";
import { normalizedModulo } from "../utilities";

export interface PitchProperties {
    readonly definition: (this: Pitch) => PitchDefinition;
    readonly name: (this: Pitch) => string;
    readonly naturalName: (this: PitchDefinition) => NaturalName;
    readonly naturalNameIndex: (this: Pitch) => NaturalNameIndex;
    readonly accidentals: (this: PitchDefinition) => number;
    readonly midiNoteNumber: (this: Pitch) => number;
    readonly semitonePosition: (this: Pitch) => number;
}

export const pitchProperties: PitchProperties = {
    definition() {
        const { circlePosition, octave } = this;
        return { circlePosition, octave };
    },
    name() {
        const accidentals = this.accidentals();
        const sharps = Math.max(0, accidentals);
        const flats = Math.max(0, -accidentals);
        return `${this.naturalName()}${"♯".repeat(sharps)}${"♭".repeat(flats)}${this.octave}`;
    },
    naturalName() {
        const naturalCirclePos = naturalCirclePosition(this.circlePosition);
        return Object.keys(naturalNoteNameCirclePosition).find((key) => {
            return naturalNoteNameCirclePosition[key as NaturalName] === naturalCirclePos;
        }) as NaturalName;
    },
    naturalNameIndex() {
        return naturalNameOrder.indexOf(this.naturalName()) as NaturalNameIndex;
    },
    accidentals() {
        return accidentalNumber(this.circlePosition);
    },
    midiNoteNumber() {
        const semitonePosition = naturalNoteNameSemitonePosition[this.naturalName()];
        return 60 + semitonePosition + 12 * (this.octave - 4) + this.accidentals();
    },
    semitonePosition() {
        const naturalSemitonePosition = naturalNoteNameSemitonePosition[this.naturalName()];
        return normalizedModulo(naturalSemitonePosition + this.accidentals(), 12);
    },
}
