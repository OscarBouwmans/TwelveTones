import { describe, expect, test } from "vitest";
import { pitch } from "../pitch";
import { isEnharmonicEquivalent } from "./is-enharmonic-equivalent";

describe('Enharmonic Equivalents:', () => {
    test('matches', () => {
        expect(isEnharmonicEquivalent(pitch('C', '♯', 0), pitch('D', '♭', 0))).toBe(true);
        expect(isEnharmonicEquivalent(pitch('F', '♯♯', 0), pitch('A', '♭♭', 0))).toBe(true);
        expect(isEnharmonicEquivalent(['B', '♯♯♯', -1], ['C', '♯♯', 0], ['D', '♮', 0], ['E', '♭♭', 0])).toBe(true);
    });
    test('mismatches', () => {
        expect(isEnharmonicEquivalent(pitch('C', '♮', 0), pitch('C', '♮', 1))).toBe(false);
        expect(isEnharmonicEquivalent(pitch('F', '♯♯', 0), pitch('D', '♭♭', 0))).toBe(false);
        expect(isEnharmonicEquivalent(['B', '♯♯♯', -1], ['C', '♯♯', 0], ['D', '♮', 0], ['E', '♭♭', 17])).toBe(false);
    });
    test('invalid arguments', () => {
        expect(() => isEnharmonicEquivalent()).toThrow();
        expect(() => isEnharmonicEquivalent(pitch('C', '♮', 0))).toThrow();
        expect(() => isEnharmonicEquivalent({} as any, pitch('C', '♮', 1))).toThrow();
    });
});
