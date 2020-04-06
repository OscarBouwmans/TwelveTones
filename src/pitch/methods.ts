import { Pitch } from "./pitch";
import { createPitch } from "./factory";

export interface PitchMethods {
    /**
     * Returns a new Pitch object that is the natural variant of this Pitch.
     * e.g. F♯ => F, B♭ => B.
     */
    readonly natural: (this: Pitch) => Pitch;
}

export const pitchMethods: PitchMethods = {
    natural() {
        const accidentals = this.accidentals();
        let { circlePosition, octave } = this;
        circlePosition -= accidentals * 7;
        return createPitch({ circlePosition, octave });
    }
};
