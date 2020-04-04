import { PitchDefinition, Pitch } from "./pitch";
import { pitchProperties } from "./properties";

export type PitchFactory = (definition: PitchDefinition) => Pitch;

export const createPitch: PitchFactory = (
    { circlePosition = 0, octave = 0 } = { circlePosition: 0, octave: 0 },
) => {
    return {
        circlePosition,
        octave,
        ...pitchProperties,
    }
};
