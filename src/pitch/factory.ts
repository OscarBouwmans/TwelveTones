import { PitchDefinition, Pitch } from "./pitch";
import { pitchProperties } from "./properties";
import { MIDINoteNumberWithAssumedAccidental, pitchFromMIDINoteNumber } from "./utilities";
import { invalidPitchDefinition, noPitchData } from "./errors";
import { pitchMethods } from "./methods";

export type PitchFactory = (info: PitchDefinition | MIDINoteNumberWithAssumedAccidental) => Pitch;

export const createPitch: PitchFactory = (
    info: PitchDefinition | MIDINoteNumberWithAssumedAccidental,
) => {
    if (!info) {
        throw new Error(noPitchData);
    }

    const midiNoteNumber = info as MIDINoteNumberWithAssumedAccidental;
    if (midiNoteNumber.midiNoteNumber !== undefined && midiNoteNumber.assumedAccidental !== undefined) {
        return createPitch(pitchFromMIDINoteNumber(midiNoteNumber));
    }

    const definition = info as PitchDefinition;
    if (typeof definition.circlePosition !== "number" && typeof definition.octave !== "number") {
        throw new Error(invalidPitchDefinition);
    }
    const { circlePosition, octave } = definition;

    return {
        circlePosition,
        octave,
        ...pitchProperties,
        ...pitchMethods,
    }
};
