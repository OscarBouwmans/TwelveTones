import { PitchDefinition, Pitch } from "./pitch";
import { accidentalNumber, NaturalName, naturalCirclePosition, naturalNoteNameCirclePosition, naturalNoteNameSemitonePosition, naturalNameOrder, NaturalNameIndex } from "./utilities";
import { normalizedModulo } from "../utilities";

export interface PitchProperties {
    /**
     * @returns the 'barebone' definition object of the interval, without any methods or computed properties that the Pitch object has.
     */
    readonly definition: (this: Pitch) => PitchDefinition;

    /**
     * @returns a string value describing the pitch by its note name as a capital letter, its accidentals, and octave number; e.g. C4, F♯7, A𝄫2.
     * @example
     * createPitch({ midiNoteNumber: 48, assumedAccidental:  0 }).name() // => "c3"
     * createPitch({ midiNoteNumber: 60, assumedAccidental:  0 }).name() // => "c4"
     * createPitch({ midiNoteNumber: 61, assumedAccidental:  1 }).name() // => "c♯4"
     * createPitch({ midiNoteNumber: 61, assumedAccidental: -1 }).name() // => "d♭4"
     * createPitch({ midiNoteNumber: 85, assumedAccidental: -3 }).name() // => "e♭♭♭6"
     */
    readonly name: (this: Pitch) => string;

    /**
     * @returns a string value describing the pitch as if it had no accidentals (natural); one of: c, d, e, f, g, a, b.
     * @example
     * // C => "c"
     * // D♯ => "d"
     * // E♯♯ => "e"
     * // G♭♭ => "g"
     * // A♭ => "a"
     * // B => "b"
     */
    readonly naturalName: (this: PitchDefinition) => NaturalName;

    /**
     * @returns the index of this pitches naturalName() in the array [ 'c', 'd', 'e', 'f', 'g', 'a', 'b' ].
     * @example
     * // C => 0
     * // D => 1
     * // D♯ => 1
     * // A♭♭ => 5
     * // A => 5
     * // B => 6
     */
    readonly naturalNameIndex: (this: Pitch) => NaturalNameIndex;

    /**
     * @returns the number of accidentals: positive integer for sharps, negative integer for flats, 0 for natural.
     * @example
     * // G => 0
     * // G♯ => 1
     * // G♯♯♯♯ => 4
     * // G♭♭ => -2
     * // G♭♭♭ => -3
     */
    readonly accidentals: (this: PitchDefinition) => number;

    /**
     * @returns MIDI Note Number of this pitch.
     */
    readonly midiNoteNumber: (this: Pitch) => number;

    /**
     * @returns the nth note index in the octave, considering 12 possible values.
     * @example
     * // C => 0
     * // D♯ => 3
     * // E♭ => 3
     * // B => 11
     */
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
