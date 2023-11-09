
export function isValidOctave(octave: unknown): octave is number {
    return Number.isInteger(octave);
}
