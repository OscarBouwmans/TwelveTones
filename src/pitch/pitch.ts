import { NaturalNoteName, FlatSymbol, NaturalSymbol, SharpSymbol, flatSymbol, naturalNoteNames, naturalSymbol, sharpSymbol, naturalNoteNameCirclePosition } from "./definitions";
import { naturalName } from "./operators/natural-name";
import { numberOfAccidentals } from "./operators/number-of-accidentals";

export interface Pitch {
  readonly circlePosition: number;
  readonly octave: number;
}

type Flats = FlatSymbol | `${FlatSymbol}${FlatSymbol}` | `${FlatSymbol}${FlatSymbol}${FlatSymbol}` | `${FlatSymbol}${FlatSymbol}${FlatSymbol}${FlatSymbol}`;
type Sharps = SharpSymbol | `${SharpSymbol}${SharpSymbol}` | `${SharpSymbol}${SharpSymbol}${SharpSymbol}` | `${SharpSymbol}${SharpSymbol}${SharpSymbol}${SharpSymbol}`;

type AccidentalDescription = NaturalSymbol | Flats | Sharps;

type Accidental = AccidentalDescription | number;

export type PitchFactory = [noteName: NaturalNoteName, accidental: Accidental, octave: number];

export function pitch(...params: PitchFactory): Pitch;
export function pitch(copy: Pitch | PitchFactory): Pitch;
export function pitch(noteNameOrPitch: NaturalNoteName | Pitch | PitchFactory, accidental?: Accidental, octave?: number): Pitch {
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

  const naturalCirclePosition = naturalNoteNameCirclePosition[noteNameOrPitch];
  const circlePosition = naturalCirclePosition + 7 * countAccidentals(accidental);

  return wrap({
    circlePosition,
    octave,
  });
}

function wrap(p: Pitch): Pitch {
  Object.defineProperty(p, 'toString', {
    value: () => {
      const accidentals = numberOfAccidentals(p);
      const accidentalString = accidentals > 0 ? sharpSymbol.repeat(accidentals) : flatSymbol.repeat(-accidentals);
      return `${naturalName(p)}${accidentalString}${p.octave}`;
    },
  });
  Object.freeze(p);
  return p;
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
