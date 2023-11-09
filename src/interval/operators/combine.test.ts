import { describe, expect, test } from "vitest";
import { combine } from "./combine";
import { isSameInterval } from "./is-same-interval";
import { interval } from "../interval";
import { isEnharmonicEquivalent } from "../../pitch/operators/is-enharmonic-equivalent";
import { transpose } from "../../interval/operators/transpose";

describe('Combine', () => {
    test('Simple additions', () => {
        expect(isSameInterval(
            combine(['P', '1'], ['P', '1']),
            interval(['P', '1']),
        )).toBe(true);
        expect(isSameInterval(
            combine(['M', '2'], ['M', '2']),
            interval(['M', '3']),
        )).toBe(true);
        expect(isSameInterval(
            combine(['M', '3'], ['m', '2']),
            interval(['P', '4']),
        )).toBe(true);
        expect(isSameInterval(
            combine(['M', '2'], ['M', '2'], ['M', '2']),
            interval(['A', '4']),
        )).toBe(true);

        const [P4, P5, P8] = ([['P', '4'], ['P', '5'], ['P', '8']] as const).map(i => interval(i as any));

        expect(isSameInterval(
            combine(P4, P5),
            interval(P8),
        )).toBe(true);

        expect(isSameInterval(
            combine(P4, P4, P4, P5, P5, P5),
            combine(P8, P8, P8),
        )).toBe(true);
    });

    test('Complex', () => {
        expect(isSameInterval(
            combine(['M', '3'], ['M', '3'], ['M', '3']),
            combine(['m', '3'], ['m', '3'], ['m', '3'], ['m', '3']),
        )).toBe(false);

        expect(isEnharmonicEquivalent(
            transpose(['C', '♮', 4], combine(['M', '3'], ['M', '3'], ['M', '3'])),
            transpose(['C', '♮', 4], combine(['m', '3'], ['m', '3'], ['m', '3'], ['m', '3'])),
        )).toBe(true);
    });
});
