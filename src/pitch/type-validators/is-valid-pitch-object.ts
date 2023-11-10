import { Pitch } from "../pitch";

export function isValidPitchObject(pitch: unknown): pitch is Pitch {
    if (!pitch) return false;
    if (typeof pitch !== 'object') return false;

    if (!('circlePosition' in pitch)) return false;
    if (!('octave' in pitch)) return false;

    if (!Number.isInteger(pitch.circlePosition)) return false;
    if (!Number.isInteger(pitch.octave)) return false;

    return true;
}
