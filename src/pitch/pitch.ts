import { NaturalNoteName, FlatSymbol, NaturalSymbol, SharpSymbol, flatSymbol, naturalNoteNames, naturalSymbol, sharpSymbol, naturalNoteNameCirclePosition } from "./definitions";

export interface Pitch {
  readonly circlePosition: number;
  readonly octave: number;
}

type Flats = FlatSymbol | `${FlatSymbol}${FlatSymbol}` | `${FlatSymbol}${FlatSymbol}${FlatSymbol}` | `${FlatSymbol}${FlatSymbol}${FlatSymbol}${FlatSymbol}`;
type Sharps = SharpSymbol | `${SharpSymbol}${SharpSymbol}` | `${SharpSymbol}${SharpSymbol}${SharpSymbol}` | `${SharpSymbol}${SharpSymbol}${SharpSymbol}${SharpSymbol}`;

type AccidentalDescription = NaturalSymbol | Flats | Sharps;

type Accidental = AccidentalDescription | number;

export function pitch(noteName: NaturalNoteName, accidental: Accidental, octave: number): Pitch;
export function pitch(copy: Pitch): Pitch;
export function pitch(noteNameOrPitch: Pitch | NaturalNoteName, accidental?: Accidental, octave?: number): Pitch {
  if (typeof noteNameOrPitch === 'object') {
    if (!isPitchObject(noteNameOrPitch)) {
      throw new Error('Provided object is not a Pitch');
    }
    return {
      circlePosition: noteNameOrPitch.circlePosition,
      octave: noteNameOrPitch.octave,
    };
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

  const naturalCirclePosition = naturalNoteNameCirclePosition[noteNameOrPitch];
  const circlePosition = naturalCirclePosition + 7 * countAccidentals(accidental);

  return {
    circlePosition,
    octave,
  };
}

function isPitchObject(pitch: any): pitch is Pitch {
  return typeof pitch === 'object' && 'circlePosition' in pitch && 'octave' in pitch && typeof pitch.circlePosition === 'number' && typeof pitch.octave === 'number';
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

pitch('A', '♮', 4);
