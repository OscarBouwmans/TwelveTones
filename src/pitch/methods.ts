import { Pitch } from "./pitch";
import { createPitch } from "./factory";
import { Interval } from "./interval/interval";
import { normalizedModulo } from "../utilities";

export interface PitchMethods {
  /**
   * Returns true for equal pitches, e.g. C♯ == C♯, C♯ != D♭.
   * @param other
   * Other Pitch to compare this Pitch to.
   * @param ignoreOctave
   * If true, C♯ in octave 4 is considered equal to C♯ in octave 7.
   * Default is false, meaning C♯4 == C♯4, C♯4 != C♯7.
   */
  readonly isEqualTo: (
    this: Pitch,
    other: Pitch,
    ignoreOctave?: boolean
  ) => boolean;

  /**
   * Returns true for enharmonic equivalent other pitch, e.g. C♯ and D♭, or A𝄫 and F𝄪, but not G and G♯.
   * @param other
   * Other Pitch to compare this Pitch to.
   * @param ignoreOctave
   * If true, C♯ in octave 4 is considered an enharmonic equivalent of D♭ in octave 7.
   * Default is false. Octave is then determined by sounding pitch, meaning B♯4 ≈ C5.
   */
  readonly isEnharmonicEquivalentOf: (
    this: Pitch,
    other: Pitch,
    ignoreOctave?: boolean
  ) => boolean;

  /**
   * Returns a new Pitch object that is the natural variant of this Pitch.
   * e.g. F♯ => F, B♭ => B.
   */
  readonly natural: (this: Pitch) => Pitch;

  /**
   * Returns transposed version of this Pitch.
   */
  readonly transposedBy: (this: Pitch, ...interval: Interval[]) => Pitch;
}

export const pitchMethods: PitchMethods = {
  isEqualTo(other: Pitch, ignoreOctave: boolean = false) {
    return (
      this.circlePosition === other.circlePosition &&
      (ignoreOctave || this.octave === other.octave)
    );
  },
  isEnharmonicEquivalentOf(other: Pitch, ignoreOctave: boolean = false) {
    if (ignoreOctave) {
      return (
        normalizedModulo(this.circlePosition - other.circlePosition, 12) === 0
      );
    }
    return this.midiNoteNumber() === other.midiNoteNumber();
  },
  natural() {
    const accidentals = this.accidentals();
    let { circlePosition, octave } = this;
    circlePosition -= accidentals * 7;
    return createPitch({ circlePosition, octave });
  },
  transposedBy(...intervals: Interval[]) {
    if (intervals.length === 0) {
      return createPitch({
        circlePosition: this.circlePosition,
        octave: this.octave,
      });
    }

    if (intervals.length > 1) {
      const i = [...intervals];
      return this.transposedBy(i.shift() as Interval).transposedBy(...i);
    }

    const [interval] = intervals;
    const octaveCrossings = interval.octaveCrossings(this);
    return createPitch({
      circlePosition:
        this.circlePosition + interval.direction * interval.circleShift,
      octave: this.octave + octaveCrossings,
    });
  },
};
