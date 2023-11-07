import { describe, expect, test } from "vitest";
import { duration } from "./duration";

describe("Duration:", () => {
    test('Valid arguments', () => {
        expect(duration(1, 4)).toHaveProperty('numerator', 1);
        expect(duration(1, 4)).toHaveProperty('denominator', 4);
        expect(duration(3, 7)).toHaveProperty('numerator', 3);
        expect(duration(3, 7)).toHaveProperty('denominator', 7);

        expect(duration(duration(2, 8))).toHaveProperty('numerator', 1);
        expect(duration(duration(2, 8))).toHaveProperty('denominator', 4);

        expect(duration([6, 9])).toHaveProperty('numerator', 2);
        expect(duration([6, 9])).toHaveProperty('denominator', 3);
    });

    test('Freeze', () => {
        expect(Object.isFrozen(duration(1, 4))).toBe(true);
    });

    test('Invalid arguments', () => {
        expect(() => duration(null as any, 1)).toThrow();
        expect(() => duration(1, null as any)).toThrow();
        expect(() => duration(1, 0)).toThrow();
        expect(() => duration(1, NaN)).toThrow();
        expect(() => duration(NaN, 1)).toThrow();
        expect(() => duration(1.5, 1)).toThrow();
        expect(() => duration(1, 1.5)).toThrow();
        expect(() => duration(1, Infinity)).toThrow();
        expect(() => duration(Infinity, 1)).toThrow();
        expect(() => duration('a' as any)).toThrow();
        expect(() => duration({} as any)).toThrow();
        expect(() => duration([] as any)).toThrow();
        expect(() => duration(1, 'a' as any)).toThrow();
        expect(() => duration(1, {} as any)).toThrow();
        expect(() => duration(1, [] as any)).toThrow();
        expect(() => (duration as any)()).toThrow();
    });
});
