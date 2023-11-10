import { describe, expect, test } from "vitest";
import { naturalDistance } from "./natural-distance";
import { pitch } from "../../pitch/pitch";
import { combine } from "../../interval/operators/combine";

describe('Natural distance:', () => {
    test('natural pitches', () => {
        expect(naturalDistance(['C', '♮', 4], ['C', '♮', 4])).toBe(0);
        expect(naturalDistance(['C', '♮', 4], ['C', '♮', 5])).toBe(7);
        expect(naturalDistance(['C', '♮', 4], ['C', '♮', 3])).toBe(-7);
        expect(naturalDistance(['C', '♮', 4], ['G', '♮', 4])).toBe(4);
        expect(naturalDistance(['C', '♮', 4], ['F', '♮', 3])).toBe(-4);
        expect(naturalDistance(['A', '♮', 4], ['C', '♮', 5])).toBe(2);
        expect(naturalDistance(['C', '♮', 5], ['E', '♯', 6])).toBe(9);
    });

    test('pitches with accidentals', () => {
        expect(naturalDistance(['C', '♭♭', 4], ['C', '♮', 4])).toBe(0);
        expect(naturalDistance(['C', '♯♯♯', 4], ['C', '♭', 5])).toBe(7);
        expect(naturalDistance(['C', '♮', 4], ['C', '♯♯', 3])).toBe(-7);
        expect(naturalDistance(['C', '♭', 4], ['G', '♯', 4])).toBe(4);
        expect(naturalDistance(['C', '♯', 4], ['F', '♭', 3])).toBe(-4);
        expect(naturalDistance(['A', '♭', 4], ['C', '♯', 5])).toBe(2);
        expect(naturalDistance(['C', '♯', 5], ['E', '♯♯', 6])).toBe(9);
    });

    test('works as pitch array sorter', () => {
        const pitches = [
            pitch('C', '♮', 4),
            pitch('D', '♯♯', 4),
            pitch('B', '♮', 3),
            pitch('E', '♭', 4),
        ];
        pitches.sort((a, b) => -naturalDistance(a, b));
        expect(pitches[0]).toEqual(pitch(['B', '♮', 3]));
        expect(pitches[1]).toEqual(pitch(['C', '♮', 4]));
        expect(pitches[2]).toEqual(pitch(['D', '♯♯', 4]));
        expect(pitches[3]).toEqual(pitch(['E', '♭', 4]));
    });

    test('Base intervals', () => {
        expect(naturalDistance(['P', '1'])).toBe(0);
        expect(naturalDistance(['P', '4'])).toBe(3);
        expect(naturalDistance(['P', '5'])).toBe(4);
        expect(naturalDistance(['P', '8'])).toBe(7);

        expect(naturalDistance(['M', '2'])).toBe(1);
        expect(naturalDistance(['M', '3'])).toBe(2);
        expect(naturalDistance(['M', '6'])).toBe(5);
        expect(naturalDistance(['M', '7'])).toBe(6);

        expect(naturalDistance(['m', '2'])).toBe(1);
        expect(naturalDistance(['m', '3'])).toBe(2);
        expect(naturalDistance(['m', '6'])).toBe(5);
        expect(naturalDistance(['m', '7'])).toBe(6);
    });

    test('Quality should not matter', () => {
        expect(naturalDistance([-3, '1'])).toBe(0);
        expect(naturalDistance([+7, '1'])).toBe(0);

        expect(naturalDistance([-1, '2'])).toBe(1);
        expect(naturalDistance([+2, '2'])).toBe(1);
    });

    test('Spanning multiple octaves', () => {
        expect(naturalDistance(combine(['P', '8'], ['P', '8']))).toBe(14);
        expect(naturalDistance(combine(['P', '8'], ['A', '5']))).toBe(11);
        expect(naturalDistance(combine(['P', '8'], ['d', '5']))).toBe(11);
        expect(naturalDistance(combine(['P', '8'], ['P', '8'], ['P', '8']))).toBe(21);
    });
});
