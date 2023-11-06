import { describe, expect, test } from "vitest";
import { pitch } from "./pitch";


describe("Pitch Creation:", () => {
    test("C Natural", () => {
        const cNatural = pitch('C', '♮', 4);
        expect(cNatural.circlePosition).toBe(0);
        expect(cNatural.octave).toBe(4);
    });
});
