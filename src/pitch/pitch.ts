import { NaturalNoteName, naturalNoteNames } from "./definitions/natural-note-names";
import { FlatSymbol, NaturalSymbol, SharpSymbol, flatSymbol, naturalSymbol, sharpSymbol } from './definitions/symbols';
import { naturalCirclePosition } from "./definitions/natural-circle-position";
import { pitchName } from "./operators/pitch-name";

export interface Pitch {
    readonly circlePosition: number;
    readonly octave: number;
}

type Flats = FlatSymbol | `${FlatSymbol}${FlatSymbol}` | `${FlatSymbol}${FlatSymbol}${FlatSymbol}` | `${FlatSymbol}${FlatSymbol}${FlatSymbol}${FlatSymbol}`;
type Sharps = SharpSymbol | `${SharpSymbol}${SharpSymbol}` | `${SharpSymbol}${SharpSymbol}${SharpSymbol}` | `${SharpSymbol}${SharpSymbol}${SharpSymbol}${SharpSymbol}`;

type AccidentalDescription = NaturalSymbol | Flats | Sharps;

type Accidental = AccidentalDescription | number;

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
        return pitch(...noteNameOrPitch);
    }
    if (typeof noteNameOrPitch === 'object') {
        if (!isPitchObject(noteNameOrPitch)) {
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
    if (!isValidAccidentalArgument(accidental)) {
        throw new Error('Invalid accidental');
    }
    if (!isValidOctaveArgument(octave)) {
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

function isPitchObject(pitch: any): pitch is Pitch {
    return typeof pitch === 'object' && 'circlePosition' in pitch && 'octave' in pitch && Number.isInteger(pitch.circlePosition) && Number.isInteger(pitch.octave);
}

function isValidNoteName(noteName: any): noteName is NaturalNoteName {
    return typeof noteName === 'string' && naturalNoteNames.includes(noteName as NaturalNoteName);
}

function isValidAccidentalArgument(accidental: any): accidental is Accidental {
    if (typeof accidental === 'number' && Number.isInteger(accidental)) {
        return true;
    }
    if (typeof accidental !== 'string') {
        return false;
    }
    const parts = accidental.split('');
    return parts.every(part => part === naturalSymbol || part === flatSymbol || part === sharpSymbol);
}

function isValidOctaveArgument(octave: any): octave is number {
    return typeof octave === 'number' && Number.isInteger(octave);
}

function countAccidentals(accidental: Accidental): number {
    if (typeof accidental === 'number') {
        return accidental;
    }
    return accidental.split('').map<number>(part => {
        switch (part) {
            case '♭':
                return -1;
            case '♯':
                return 1;
            default:
                return 0;
        }
    }).reduce((acc, val) => acc + val, 0);
}
