import { describe, expect, test } from "vitest";
import { pitch } from "../pitch";
import { pitchName } from "./pitch-name";


describe("Pitch Name:", () => {
    test("Valid arguments", () => {
        expect(pitchName(pitch('C', '♮', 0))).toBe('C0');
        expect(pitchName(['D', '♭♭', 3])).toBe('D♭♭3');
        expect(pitchName(['E', '♯♯♯', -7])).toBe('E♯♯♯-7');
        expect(`${pitch('F', '♭♭♭♭', 999)}`).toBe('F♭♭♭♭999');
    });
});
