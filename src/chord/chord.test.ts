import { describe, expect, test } from "vitest";
import { chord } from "./chord";
import { interval } from "../main";

describe('Chord', () => {
    test('From intervals', () => {
        expect(
            chord(interval('P', '1'), interval('M', '3'), interval('P', '5'))
        ).toEqual({
            intervals: [
                interval(['P', '1']),
                interval(['M', '3']),
                interval(['P', '5']),
            ],
        });

        expect(
            chord(['P', '5'], ['M', '6'], ['m', '7'])
        ).toEqual({
            intervals: [
                interval(['P', '5']),
                interval(['M', '6']),
                interval(['m', '7']),
            ],
        });
    });

    test('From pitches', () => {
        expect(
            chord(['C', '♮', 4], ['E', '♮', 4], ['G', '♮', 4])
        ).toEqual({
            intervals: [
                interval(['P', '1']),
                interval(['M', '3']),
                interval(['P', '5']),
            ],
        });

        expect(
            chord(['A', '♭', 4], ['C', '♯', 5], ['E', '♯♯', 5])
        ).toEqual({
            intervals: [
                interval(['P', '1']),
                interval(['A', '3']),
                interval([+3, '5']),
            ],
        });
    });

    test('Copying', () => {
        const chordA = chord(['C', '♮', 4], ['E', '♮', 4], ['G', '♮', 4]);
        expect(chord(chordA)).toEqual(chordA);

        const chordB = chord(['A', '♭', 4], ['C', '♯', 5], ['E', '♯♯', 5]);
        expect(chord(chordB)).toEqual(chordB);
    });

    test('Shorthand', () => {
        expect(chord([['P', '1'], ['M', '3'], ['P', '5']])).toEqual(chord(['C', '♮', 4], ['E', '♮', 4], ['G', '♮', 4]));
        expect(chord([interval('P', '1'), interval('P', '5')])).toEqual(chord(['C', '♮', 4], ['G', '♮', 4]));
        expect(chord([interval('P', '1'), ['M', '3']])).toEqual(chord(['C', '♮', 4], ['E', '♮', 4]));
    });

    test('Is frozen', () => {
        expect(Object.isFrozen(chord(['C', '♮', 4], ['E', '♮', 4], ['G', '♮', 4]))).toBe(true);
        expect(Object.isFrozen(chord(['A', '♭', 4], ['C', '♯', 5], ['E', '♯♯', 5]))).toBe(true);
    });
});
