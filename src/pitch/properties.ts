import { PitchDefinition, Pitch } from "./pitch";
import { accidentalNumber, NaturalName, naturalCirclePosition, naturalNoteNameCirclePosition, naturalNoteNameSemitonePosition, naturalNameOrder, NaturalNameIndex } from "./utilities";
import { normalizedModulo } from "../utilities";

export interface PitchProperties {
    readonly naturalName: (this: PitchDefinition) => NaturalName;
    readonly naturalNameIndex: (this: Pitch) => NaturalNameIndex;
    readonly accidentals: (this: PitchDefinition) => number;
    readonly midiNoteNumber: (this: Pitch) => number;
    readonly semitonePosition: (this: Pitch) => number;
    readonly isEnharmonicEquivalentOf: (this: Pitch, other: Pitch, ignoreOctave?: boolean) => boolean;
}

export const pitchProperties: PitchProperties = {
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
    isEnharmonicEquivalentOf(other: Pitch, ignoreOctave: boolean = false) {
        if (ignoreOctave) {
            return (this.circlePosition - other.circlePosition) % 12 === 0;
        }
        return this.midiNoteNumber() === other.midiNoteNumber();
    },
}
