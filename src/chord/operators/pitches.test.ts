import { describe, expect, test } from "vitest";
import { pitches } from './pitches';
import { triad } from "../+public";
import { pitch } from "../../pitch/pitch";

describe('Pitches', () => {
    test('Transforms chord to pitches', () => {
        expect(pitches(triad('major'), ['C', '♮', 4])).toEqual([pitch(['C', '♮', 4]), pitch(['E', '♮', 4]), pitch(['G', '♮', 4])]);
        expect(pitches(triad('major'), ['F', '♮', 4])).toEqual([pitch(['F', '♮', 4]), pitch(['A', '♮', 4]), pitch(['C', '♮', 5])]);
    });
});
