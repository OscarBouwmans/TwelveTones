import { describe, expect, test } from "vitest";
import { pitches } from './pitches';
import { triad } from "../+public";
import { pitch } from "../../pitch/pitch";

describe('Pitches', () => {
    test('Transforms chord to pitches', () => {
        expect(pitches(triad('major'), ['C', '♮', 4])).toEqual([pitch(['C', '♮', 4]), pitch(['E', '♮', 4]), pitch(['G', '♮', 4])]);
        expect(pitches(triad('major'), ['F', '♮', 4])).toEqual([pitch(['F', '♮', 4]), pitch(['A', '♮', 4]), pitch(['C', '♮', 5])]);
    });
    test('Apply inversion', () => {
        expect(pitches(triad('major'), ['C', '♮', 4], 1)).toEqual([pitch(['E', '♮', 4]), pitch(['G', '♮', 4]), pitch(['C', '♮', 5])]);
        expect(pitches(triad('major'), ['F', '♮', 4], 1)).toEqual([pitch(['A', '♮', 4]), pitch(['C', '♮', 5]), pitch(['F', '♮', 5])]);

        expect(pitches(triad('major'), ['C', '♮', 4], 5)).toEqual([pitch(['G', '♮', 5]), pitch(['C', '♮', 6]), pitch(['E', '♮', 6])]);
        expect(pitches(triad('major'), ['F', '♮', 4], 5)).toEqual([pitch(['C', '♮', 6]), pitch(['F', '♮', 6]), pitch(['A', '♮', 6])]);

        expect(pitches(triad('major'), ['C', '♮', 4], -2)).toEqual([pitch(['E', '♮', 3]), pitch(['G', '♮', 3]), pitch(['C', '♮', 4])]);
        expect(pitches(triad('major'), ['F', '♮', 4], -2)).toEqual([pitch(['A', '♮', 3]), pitch(['C', '♮', 4]), pitch(['F', '♮', 4])]);
    });
});
