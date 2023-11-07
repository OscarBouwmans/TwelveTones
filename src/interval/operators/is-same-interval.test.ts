import { describe, expect, test } from "vitest";
import { isSameInterval } from "./is-same-interval";
import { interval } from "../interval";

describe('Is Same Interval:', () => {
    test('valid arguments', () => {
        expect(isSameInterval(['P', '1'], ['P', '1'])).toBe(true);
        expect(isSameInterval(['P', '1'], ['M', '2'])).toBe(false);
        expect(isSameInterval(['M', '3'], ['P', '4'])).toBe(false);
        expect(isSameInterval(interval('P', '5'), interval('M', '6'))).toBe(false);
        expect(isSameInterval(['P', '1'], ['P', '1'], ['P', '1'])).toBe(true);
        expect(isSameInterval(['P', '1'], ['P', '1'], ['M', '2'])).toBe(false);
    });

    test('invalid arguments', () => {
        expect(() => isSameInterval()).toThrow();
        expect(() => isSameInterval(interval('P', '1'))).toThrow();
        expect(() => isSameInterval({} as any, interval('P', '1'))).toThrow();
    });
});