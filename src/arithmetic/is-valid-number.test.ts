import { describe, expect, test } from "vitest";
import { isValidNumber } from "./is-valid-number";

describe("isValidNumber", () => {
    test("Should be false", () => {
        expect(isValidNumber(undefined as any)).toBe(false);
        expect(isValidNumber(null as any)).toBe(false);
        expect(isValidNumber(NaN, 0)).toBe(false);
        expect(isValidNumber("imposter" as any)).toBe(false);
        expect(isValidNumber("254" as any)).toBe(false);
        expect(isValidNumber({ number: 5 } as any)).toBe(false);
        expect(isValidNumber([1, 5, 2, 5, 3] as any)).toBe(false);
        expect(isValidNumber(3, 1, 4, 1, 5, 9, null as any)).toBe(false);
        expect(isValidNumber(0, 1, 1, 2, 3, 5, 8, "imposter" as any)).toBe(false);
        expect(isValidNumber(-3, -1, -4, -1, -5, -9, {} as any)).toBe(false);
        expect(isValidNumber(Infinity)).toBe(false);
        expect(isValidNumber(-Infinity)).toBe(false);
    });

    test("Should be true", () => {
        expect(isValidNumber(1)).toBe(true);
        expect(isValidNumber(0)).toBe(true);
        expect(isValidNumber(-2342384.312, -5783744.4124, 539745.223)).toBe(true);
        expect(isValidNumber(10e6)).toBe(true);
        expect(isValidNumber(-9, -8, -7, -6, -5, -4, 3, 1, 4, 1, 5)).toBe(true);
        expect(isValidNumber(10e4, 10e5, 10e6)).toBe(true);
    });
});