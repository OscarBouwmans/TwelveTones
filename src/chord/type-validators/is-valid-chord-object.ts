import { isValidIntervalObject } from "../../interval/type-validators/is-valid-interval-object";
import { Chord } from "../chord";

export function isValidChordObject(chord: unknown): chord is Chord {
    if (!chord) return false;
    if (typeof chord !== 'object') return false;

    if (!('intervals' in chord)) return false;
    if (!Array.isArray(chord.intervals)) return false;
    if (!chord.intervals.every(isValidIntervalObject)) return false;

    return true;
}
