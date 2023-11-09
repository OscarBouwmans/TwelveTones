import { describe, expect, test } from "vitest";
import { naturalDistance } from "./natural-distance";
import { pitch } from "../+public";

describe('Natural distance:', () => {
    test('naturals', () => {
        expect(naturalDistance(['C', '♮', 4], ['C', '♮', 4])).toBe(0);
        expect(naturalDistance(['C', '♮', 4], ['C', '♮', 5])).toBe(7);
        expect(naturalDistance(['C', '♮', 4], ['C', '♮', 3])).toBe(-7);
        expect(naturalDistance(['C', '♮', 4], ['G', '♮', 4])).toBe(4);
        expect(naturalDistance(['C', '♮', 4], ['F', '♮', 3])).toBe(-4);
        expect(naturalDistance(['A', '♮', 4], ['C', '♮', 5])).toBe(2);
        expect(naturalDistance(['C', '♮', 5], ['E', '♯', 6])).toBe(9);
    });

    test('accidentals', () => {
        expect(naturalDistance(['C', '♭♭', 4], ['C', '♮', 4])).toBe(0);
        expect(naturalDistance(['C', '♯♯♯', 4], ['C', '♭', 5])).toBe(7);
        expect(naturalDistance(['C', '♮', 4], ['C', '♯♯', 3])).toBe(-7);
        expect(naturalDistance(['C', '♭', 4], ['G', '♯', 4])).toBe(4);
        expect(naturalDistance(['C', '♯', 4], ['F', '♭', 3])).toBe(-4);
        expect(naturalDistance(['A', '♭', 4], ['C', '♯', 5])).toBe(2);
        expect(naturalDistance(['C', '♯', 5], ['E', '♯♯', 6])).toBe(9);
    });

    test('works as array sorter', () => {
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
});
