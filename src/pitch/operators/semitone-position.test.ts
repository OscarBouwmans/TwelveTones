import { describe, expect, test } from "vitest";
import { semitonePosition } from "./semitone-position";
import { pitch } from "../pitch";

describe('Natural Position', () => {
    test('valid arguments', () => {
        expect(semitonePosition(pitch('C', '♮', 4))).toBe(0);
        expect(semitonePosition(pitch('D', '♮', 3))).toBe(2);
        expect(semitonePosition(pitch('E', '♮', 6))).toBe(4);
        expect(semitonePosition(pitch('F', '♮', 5))).toBe(5);
        expect(semitonePosition(pitch('G', '♮', 7))).toBe(7);
        expect(semitonePosition(pitch('A', '♮', 1))).toBe(9);
        expect(semitonePosition(pitch('B', '♮', 2))).toBe(11);

        expect(semitonePosition(['C', '♭♭', 4])).toBe(10);
        expect(semitonePosition(['D', '♭♭♭', 3])).toBe(11);
        expect(semitonePosition(['E', '♯', 6])).toBe(5);
        expect(semitonePosition(['F', '♯♯', 5])).toBe(7);
        expect(semitonePosition(['G', '♯', 7])).toBe(8);
        expect(semitonePosition(['A', '♭♭♭♭', 1])).toBe(5);
        expect(semitonePosition(['B', '♯♯', 2])).toBe(1);
    });

    test('invalid arguments', () => {
        expect(() => semitonePosition({} as any)).toThrow();
        expect(() => semitonePosition(null as any)).toThrow();
    });
});
