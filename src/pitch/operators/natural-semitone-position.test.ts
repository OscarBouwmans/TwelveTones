import { describe, expect, test } from "vitest";
import { naturalSemitonePosition } from "./natural-semitone-position";
import { pitch } from "../pitch";

describe('Natural Position', () => {
    test('valid arguments', () => {
        expect(naturalSemitonePosition(pitch('C', '♮', 4))).toBe(0);
        expect(naturalSemitonePosition(pitch('D', '♮', 3))).toBe(2);
        expect(naturalSemitonePosition(pitch('E', '♮', 6))).toBe(4);
        expect(naturalSemitonePosition(pitch('F', '♮', 5))).toBe(5);
        expect(naturalSemitonePosition(pitch('G', '♮', 7))).toBe(7);
        expect(naturalSemitonePosition(pitch('A', '♮', 1))).toBe(9);
        expect(naturalSemitonePosition(pitch('B', '♮', 2))).toBe(11);

        expect(naturalSemitonePosition(['C', '♭♭', 4])).toBe(0);
        expect(naturalSemitonePosition(['D', '♭', 3])).toBe(2);
        expect(naturalSemitonePosition(['E', '♮', 6])).toBe(4);
        expect(naturalSemitonePosition(['F', '♯♯', 5])).toBe(5);
        expect(naturalSemitonePosition(['G', '♯', 7])).toBe(7);
        expect(naturalSemitonePosition(['A', '♭♭♭♭', 1])).toBe(9);
        expect(naturalSemitonePosition(['B', '♯♯', 2])).toBe(11);
    });

    test('invalid arguments', () => {
        expect(() => naturalSemitonePosition({} as any)).toThrow();
        expect(() => naturalSemitonePosition(null as any)).toThrow();
    });
});
