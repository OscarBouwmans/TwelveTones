import { describe, expect, test } from "vitest";
import { pitch } from "./pitch";


describe("Pitch Creation:", () => {
    test("Natural circle positions", () => {
        expect(pitch('C', '♮', 0).circlePosition).toBe(0);
        expect(pitch('D', '♮', 0).circlePosition).toBe(2);
        expect(pitch('E', '♮', 0).circlePosition).toBe(4);
        expect(pitch('F', '♮', 0).circlePosition).toBe(-1);
        expect(pitch('G', '♮', 0).circlePosition).toBe(1);
        expect(pitch('A', '♮', 0).circlePosition).toBe(3);
        expect(pitch('B', '♮', 0).circlePosition).toBe(5);
    });

    test("Accidentals", () => {
        expect(pitch('C', '♮', 0).circlePosition).toBe(0);

        expect(pitch('C', '♯', 0).circlePosition).toBe(7);
        expect(pitch('C', '♯♯', 0).circlePosition).toBe(14);
        expect(pitch('C', '♯♯♯', 0).circlePosition).toBe(21);
        expect(pitch('C', '♯♯♯♯', 0).circlePosition).toBe(28);

        expect(pitch('C', '♭', 0).circlePosition).toBe(-7);
        expect(pitch('C', '♭♭', 0).circlePosition).toBe(-14);
        expect(pitch('C', '♭♭♭', 0).circlePosition).toBe(-21);
        expect(pitch('C', '♭♭♭♭', 0).circlePosition).toBe(-28);
    });

    test("Octaves", () => {
        expect(pitch('C', '♮', 0).octave).toBe(0);
        expect(pitch('G', '♭♭♭', 1).octave).toBe(1);
        expect(pitch('F', '♯', 2).octave).toBe(2);
        expect(pitch('D', '♯', -55).octave).toBe(-55);
        expect(pitch('E', '♮', 999).octave).toBe(999);
    });

    test("Copies", () => {
        const p1 = pitch('C', '♮', 0);
        expect(pitch(p1).circlePosition).toBe(p1.circlePosition);
        expect(pitch(p1).octave).toBe(p1.octave);

        const p2 = pitch('D', '♭♭♭♭', 17);
        expect(pitch(p2).circlePosition).toBe(p2.circlePosition);
        expect(pitch(p2).octave).toBe(p2.octave);
    });

    test("Factory", () => {
        expect(pitch(['F', '♮', 0]).circlePosition).toBe(-1);
        expect(pitch(['C', '♯♯', 0]).circlePosition).toBe(14);
    });

    test("Invalid pitch arguments", () => {
        expect(() => pitch([] as any)).toThrow();
        expect(() => pitch('H' as 'A', '♮', 4)).toThrow();
        expect(() => pitch('A', 'x' as '♮', 4)).toThrow();
        expect(() => pitch('A', '♮', NaN as 4)).toThrow();
    });
});
