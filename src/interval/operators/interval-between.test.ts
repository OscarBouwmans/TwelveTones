import { describe, expect, test } from "vitest";
import { isSameInterval } from "./is-same-interval";
import { intervalBetween } from "./interval-between";

describe('Interval between:', () => {
    test('Simple', () => {
        expect(
            isSameInterval(['P', '8'], intervalBetween(['C', '♮', 4], ['C', '♮', 5]))
        ).toBe(true);

        expect(
            isSameInterval(['P', '5'], intervalBetween(['C', '♮', 4], ['G', '♮', 4]))
        ).toBe(true);

        expect(
            isSameInterval(['P', '4'], intervalBetween(['C', '♭♭♭', 4], ['F', '♭♭♭', 4]))
        ).toBe(true);

        expect(
            isSameInterval(['M', '3'], intervalBetween(['C', '♯♯', 4], ['E', '♯♯', 4]))
        ).toBe(true);

        expect(
            isSameInterval(['m', '3'], intervalBetween(['C', '♯', 4], ['E', '♮', 4]))
        ).toBe(true);
    });

    test('Octave crossings', () => {
        expect(
            isSameInterval(['P', '8'], intervalBetween(['C', '♮', 3], ['C', '♮', 4]))
        ).toBe(true);

        expect(
            isSameInterval(['P', '5'], intervalBetween(['G', '♮', 4], ['D', '♮', 5]))
        ).toBe(true);
    });

    test('Order of pitches is not important', () => {
        expect(
            isSameInterval(
                intervalBetween(['C', '♮', 4], ['E', '♮', 4]),
                intervalBetween(['E', '♮', 4], ['C', '♮', 4]),
            )
        ).toBe(true);

        expect(
            isSameInterval(
                intervalBetween(['A', '♮', 4], ['F', '♮', 7]),
                intervalBetween(['F', '♮', 7], ['A', '♮', 4]),
            )
        ).toBe;
    });
});
