import { Interval, IntervalShorthand, interval } from "../interval/interval";
import { Pitch, PitchShorthand, pitch } from "../pitch/pitch";
import { intervalBetween } from "../interval/operators/interval-between";
import { isValidIntervalInput } from "./type-validators/is-valid-interval-input";
import { isValidPitchInput } from "./type-validators/is-valid-pitch-input";
import { isValidChordObject } from "./type-validators/is-valid-chord-object";
import { isValidChordShorthand } from "./type-validators/is-valid-chord-shorthand";

export interface Chord {
    readonly intervals: Interval[];
}

export type ChordShorthand = [...intervals: (Interval | IntervalShorthand)[]];

export function chord(...intervals: (Interval | IntervalShorthand)[]): Chord;

export function chord(...derive: (Pitch | PitchShorthand)[]): Chord;

export function chord(shorthand: Chord | ChordShorthand): Chord;

export function chord(...input: (Interval | IntervalShorthand)[] | (Pitch | PitchShorthand)[] | (Chord | ChordShorthand)[]) {
    if (isValidPitchInput(input)) {
        const pitches = input.map(pitch);
        const intervals = pitches.map(p => intervalBetween(pitches[0], p));
        return chord(...intervals);
    }

    if (isValidIntervalInput(input)) {
        const intervals = input.map(interval);
        return wrap({ intervals });
    }

    const [first] = input;

    if (isValidChordObject(first)) {
        const intervals = first.intervals.map(interval);
        return wrap({ intervals });
    }

    if (isValidChordShorthand(first)) {
        const intervals = first.map(interval);
        return wrap({ intervals });
    }

    throw new Error(`Invalid chord input.`);
}

function wrap(chord: Chord): Chord {
    Object.freeze(chord);
    return chord;
}
