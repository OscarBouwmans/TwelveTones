import { NaturalNoteName } from "./definitions/natural-note-names";
import { FlatSymbol, NaturalSymbol, SharpSymbol, flatSymbol, sharpSymbol } from './definitions/symbols';
import { naturalCirclePosition } from "./definitions/natural-circle-position";
import { pitchName } from "./operators/pitch-name";
import { isValidPitchObject } from "./type-validators/is-valid-pitch-object";
import { isValidNoteName } from "./type-validators/is-valid-note-name";
import { isValidAccidental } from "./type-validators/is-valid-accidental";
import { isValidOctave } from "./type-validators/is-valid-octave";
import { isValidPitchShorthand } from "./type-validators/is-valid-pitch-shorthand";

export interface Pitch {
    readonly circlePosition: number;
    readonly octave: number;
}

type Flats = FlatSymbol | `${FlatSymbol}${FlatSymbol}` | `${FlatSymbol}${FlatSymbol}${FlatSymbol}` | `${FlatSymbol}${FlatSymbol}${FlatSymbol}${FlatSymbol}`;
type Sharps = SharpSymbol | `${SharpSymbol}${SharpSymbol}` | `${SharpSymbol}${SharpSymbol}${SharpSymbol}` | `${SharpSymbol}${SharpSymbol}${SharpSymbol}${SharpSymbol}`;

type AccidentalDescription = NaturalSymbol | Flats | Sharps;

export type Accidental = AccidentalDescription | number;

export type PitchShorthand = [noteName: NaturalNoteName, accidental: Accidental, octave: number];

/**
 * Returns a `Pitch` object that represents the described pitch.
 * 
 * @example
 * pitch('E', '♭', 2); // => Pitch (E flat, octave 2)
 * pitch('A', '♮', 4); // => Pitch (A natural, octave 4)
 * pitch('C', '♯♯', 9); // => Pitch (C double sharp, octave 9)
 */
export function pitch(...params: PitchShorthand): Pitch;

/**
 * Returns a new `Pitch` object with the same properties as the provided `Pitch` object or `PitchShorthand` format.
 */
export function pitch(copy: Pitch | PitchShorthand): Pitch;

export function pitch(noteNameOrPitch: NaturalNoteName | Pitch | PitchShorthand, accidental?: Accidental, octave?: number): Pitch {
    if (Array.isArray(noteNameOrPitch)) {
        if (!isValidPitchShorthand(noteNameOrPitch)) {
            throw new Error('Provided value is not a PitchShorthand');
        }
        return pitch(...noteNameOrPitch);
    }
    if (typeof noteNameOrPitch === 'object') {
        if (!isValidPitchObject(noteNameOrPitch)) {
            throw new Error('Provided object is not a Pitch');
        }
        return wrap({
            circlePosition: noteNameOrPitch.circlePosition,
            octave: noteNameOrPitch.octave,
        });
    }
    if (!isValidNoteName(noteNameOrPitch)) {
        throw new Error('Invalid note name');
    }
    if (!isValidAccidental(accidental)) {
        throw new Error('Invalid accidental');
    }
    if (!isValidOctave(octave)) {
        throw new Error('Invalid octave');
    }

    const circlePos = naturalCirclePosition[noteNameOrPitch];
    const circlePosition = circlePos + 7 * countAccidentals(accidental);

    return wrap({
        circlePosition,
        octave,
    });
}

function wrap(p: Pitch): Pitch {
    Object.defineProperty(p, 'toString', {
        value: () => pitchName(p),
    });
    Object.freeze(p);
    return p;
}

function countAccidentals(accidental: Accidental): number {
    if (typeof accidental === 'number') {
        return accidental;
    }
    return accidental.split('').map<number>(part => {
        switch (part) {
            case flatSymbol:
                return -1;
            case sharpSymbol:
                return 1;
            default:
                return 0;
        }
    }).reduce((acc, val) => acc + val, 0);
}
