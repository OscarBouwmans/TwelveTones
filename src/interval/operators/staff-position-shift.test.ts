import { describe, expect, test } from "vitest";
import { staffPositionShift } from "./staff-position-shift";

describe("Staff Position Shift:", () => {
    test("Valid arguments", () => {
        expect(staffPositionShift(['perfect', 'unison'])).toBe(0);
        expect(staffPositionShift(['perfect', 'fourth'])).toBe(3);
        expect(staffPositionShift(['perfect', 'fifth'])).toBe(4);
        expect(staffPositionShift(['perfect', 'octave'])).toBe(7);

        expect(staffPositionShift(['major', 'second'])).toBe(1);
        expect(staffPositionShift(['major', 'third'])).toBe(2);
        expect(staffPositionShift(['major', 'sixth'])).toBe(5);
        expect(staffPositionShift(['major', 'seventh'])).toBe(6);

        expect(staffPositionShift(['minor', 'second'])).toBe(1);
        expect(staffPositionShift(['minor', 'third'])).toBe(2);
        expect(staffPositionShift(['minor', 'sixth'])).toBe(5);
        expect(staffPositionShift(['minor', 'seventh'])).toBe(6);

        expect(staffPositionShift(['diminished', 'unison'])).toBe(0);
        expect(staffPositionShift(['diminished', 'second'])).toBe(1);
        expect(staffPositionShift(['diminished', 'third'])).toBe(2);
        expect(staffPositionShift(['diminished', 'fourth'])).toBe(3);
        expect(staffPositionShift(['diminished', 'fifth'])).toBe(4);
        expect(staffPositionShift(['diminished', 'sixth'])).toBe(5);
        expect(staffPositionShift(['diminished', 'seventh'])).toBe(6);
        expect(staffPositionShift(['diminished', 'octave'])).toBe(7);

        expect(staffPositionShift(['augmented', 'unison'])).toBe(0);
        expect(staffPositionShift(['augmented', 'second'])).toBe(1);
        expect(staffPositionShift(['augmented', 'third'])).toBe(2);
        expect(staffPositionShift(['augmented', 'fourth'])).toBe(3);
        expect(staffPositionShift(['augmented', 'fifth'])).toBe(4);
        expect(staffPositionShift(['augmented', 'sixth'])).toBe(5);
        expect(staffPositionShift(['augmented', 'seventh'])).toBe(6);
        expect(staffPositionShift(['augmented', 'octave'])).toBe(7);
    });
});
