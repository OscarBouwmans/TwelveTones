import { describe, expect, test } from "vitest";
import { isSamePitch } from "./is-same-pitch";
import { pitch } from "../pitch";

describe('Is Same Pitch:', () => {
    test('valid arguments', () => {
        expect(isSamePitch(pitch('A', '♮', 4), pitch('A', '♮', 4))).toBe(true);
        expect(isSamePitch(pitch('G', '♮', 4), pitch('G', '♮', 5))).toBe(false);
        expect(isSamePitch(pitch('E', '♮', 4), pitch('F', '♭', 4))).toBe(false);
        expect(isSamePitch(pitch('C', '♮', 4), pitch('D', '♮', 4))).toBe(false);
        expect(isSamePitch(['B', '♮', 4], ['B', '♮', 4], ['B', '♮', 4])).toBe(true);
        expect(isSamePitch(['C', '♮', 4], ['C', '♮', 4], ['D', '♮', 4])).toBe(false);
    });

    test('invalid arguments', () => {
        expect(() => isSamePitch()).toThrow();
        expect(() => isSamePitch(pitch('C', '♮', 4))).toThrow();
        expect(() => isSamePitch({} as any, pitch('C', '♮', 4))).toThrow();
    });
});
