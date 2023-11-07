import { describe, expect, test } from "vitest";
import { pitch } from "../pitch";
import { areEnharmonicEquivalents } from "./are-enharmonic-equivalents";

describe('Enharmonic Equivalents:', () => {
    test('matches', () => {
        expect(areEnharmonicEquivalents(pitch('C', '♯', 0), pitch('D', '♭', 0))).toBe(true);
        expect(areEnharmonicEquivalents(pitch('F', '♯♯', 0), pitch('A', '♭♭', 0))).toBe(true);
        expect(areEnharmonicEquivalents(['B', '♯♯♯', -1], ['C', '♯♯', 0], ['D', '♮', 0], ['E', '♭♭', 0])).toBe(true);
    });
    test('mismatches', () => {
        expect(areEnharmonicEquivalents(pitch('C', '♮', 0), pitch('C', '♮', 1))).toBe(false);
        expect(areEnharmonicEquivalents(pitch('F', '♯♯', 0), pitch('D', '♭♭', 0))).toBe(false);
        expect(areEnharmonicEquivalents(['B', '♯♯♯', -1], ['C', '♯♯', 0], ['D', '♮', 0], ['E', '♭♭', 17])).toBe(false);
    });
    test('invalid arguments', () => {
        expect(() => areEnharmonicEquivalents()).toThrow();
        expect(() => areEnharmonicEquivalents(pitch('C', '♮', 0))).toThrow();
        expect(() => areEnharmonicEquivalents({} as any, pitch('C', '♮', 1))).toThrow();
    });
});
