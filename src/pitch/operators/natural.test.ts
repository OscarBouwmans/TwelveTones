import { describe, expect, test } from "vitest";
import { natural } from "./natural";
import { isSamePitch } from "./is-same-pitch";

describe('Natural:', () => {
    test('valid arguments', () => {
        expect(isSamePitch(['C', '♮', 4], natural(['C', '♮', 4]))).toBe(true);
        expect(isSamePitch(['F', '♮', 4], natural(['F', '♯', 4]))).toBe(true);
        expect(isSamePitch(['B', '♮', 4], natural(['B', '♭', 4]))).toBe(true);
        expect(isSamePitch(['C', '♮', 4], natural(['C', '♯', 5]))).toBe(false);
    });

    test('invalid arguments', () => {
        expect(() => natural(null as any)).toThrow();
        expect(() => natural({} as any)).toThrow();
    });
});
