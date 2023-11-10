import { Pitch, PitchShorthand } from "../../main";
import { isValidPitchObject } from "../../pitch/type-validators/is-valid-pitch-object";
import { isValidPitchShorthand } from "../../pitch/type-validators/is-valid-pitch-shorthand";

export function isValidPitchInput(input: unknown[]): input is (Pitch | PitchShorthand)[] {
    if (!Array.isArray(input)) return false;

    return input.every(pitch => isValidPitchObject(pitch) || isValidPitchShorthand(pitch));
}
