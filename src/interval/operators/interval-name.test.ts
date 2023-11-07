import { describe, expect, test } from "vitest";
import { interval } from "../interval";
import { intervalName } from "./interval-name";

describe("Interval creation:", () => {
    test('Valid arguments', () => {
        expect(intervalName(interval('perfect', 'unison'))).toBe('perfect unison');
        expect(intervalName(interval('major', 'second'))).toBe('major second');
        expect(intervalName(interval('minor', 'third'))).toBe('minor third');
        expect(intervalName(['diminished', 'fourth'])).toBe('diminished fourth');
        expect(intervalName(['augmented', 'fifth'])).toBe('augmented fifth');
        expect(intervalName(['perfect', 'octave'])).toBe('perfect octave');
    });
});
