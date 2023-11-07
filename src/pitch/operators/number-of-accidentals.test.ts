import { describe, expect, test } from "vitest";
import { numberOfAccidentals } from "./number-of-accidentals";
import { pitch } from "../pitch";

describe('Number of Accidentals', () => {
    test('Valid input', () => {
        expect(numberOfAccidentals(pitch('C', '♮', 4))).toBe(0);
        expect(numberOfAccidentals(pitch('F', '♭♭♭', 3))).toBe(-3);
        expect(numberOfAccidentals(pitch('E', '♯', 6))).toBe(1);
        expect(numberOfAccidentals(pitch('F', '♯♯♯♯', 5))).toBe(4);
        expect(numberOfAccidentals(pitch('G', 0, 7))).toBe(0);
        expect(numberOfAccidentals(pitch('A', 7, 1))).toBe(7);
        expect(numberOfAccidentals(pitch('B', -4, 2))).toBe(-4);

        expect(numberOfAccidentals(['C', '♯♯♯♯♯♯♮♮' as any, 4])).toBe(6);
        expect(numberOfAccidentals(['F', '♭♭♮♮♭♭♭♭' as any, 3])).toBe(-6);
        expect(numberOfAccidentals(['E', '♮♮♯♯♯♯♭♭' as any, 6])).toBe(2);
    });

    test('Invalid input', () => {
        expect(() => numberOfAccidentals(pitch('C', 'sharps' as '♮', 4))).toThrow();
        expect(() => numberOfAccidentals(pitch('D', {} as '♮', 4))).toThrow();
        expect(() => numberOfAccidentals(pitch('E', '♮', 4.5))).toThrow();
        expect(() => numberOfAccidentals(pitch('F', '♮', NaN))).toThrow();
    });
});
