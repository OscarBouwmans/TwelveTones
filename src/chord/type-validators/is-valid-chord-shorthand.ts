import { ChordShorthand } from "../chord";
import { isValidIntervalInput } from "./is-valid-interval-input";

export function isValidChordShorthand(chord: unknown): chord is ChordShorthand {
    if (!chord) return false;
    if (!Array.isArray(chord)) return false;

    return isValidIntervalInput(chord);
}
