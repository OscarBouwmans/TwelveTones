import { describe, expect, test } from "vitest";
import { quality } from "./quality";

describe('Interval Quality:', () => {
    test('Perfect', () => {
        expect(quality(['P', '1'])).toBe('perfect');
        expect(quality(['P', '4'])).toBe('perfect');
        expect(quality(['P', '5'])).toBe('perfect');
        expect(quality(['P', '8'])).toBe('perfect');
    });
    test('Major', () => {
        expect(quality(['M', '2'])).toBe('major');
        expect(quality(['M', '3'])).toBe('major');
        expect(quality(['M', '6'])).toBe('major');
        expect(quality(['M', '7'])).toBe('major');
    });
    test('Minor', () => {
        expect(quality(['m', '2'])).toBe('minor');
        expect(quality(['m', '3'])).toBe('minor');
        expect(quality(['m', '6'])).toBe('minor');
        expect(quality(['m', '7'])).toBe('minor');
    });
    test('Diminished', () => {
        expect(quality(['d', '1'])).toBe(-1);
        expect(quality(['d', '2'])).toBe(-1);
        expect(quality(['d', '3'])).toBe(-1);
        expect(quality(['d', '4'])).toBe(-1);
        expect(quality(['d', '5'])).toBe(-1);
        expect(quality(['d', '6'])).toBe(-1);
        expect(quality(['d', '7'])).toBe(-1);
        expect(quality(['d', '8'])).toBe(-1);
    });
    test('Augmented', () => {
        expect(quality(['A', '1'])).toBe(1);
        expect(quality(['A', '2'])).toBe(1);
        expect(quality(['A', '3'])).toBe(1);
        expect(quality(['A', '4'])).toBe(1);
        expect(quality(['A', '5'])).toBe(1);
        expect(quality(['A', '6'])).toBe(1);
        expect(quality(['A', '7'])).toBe(1);
        expect(quality(['A', '8'])).toBe(1);
    });
    test('Doubly-diminished', () => {
        expect(quality([-2, '1'])).toBe(-2);
        expect(quality([-2, '2'])).toBe(-2);
        expect(quality([-2, '3'])).toBe(-2);
        expect(quality([-2, '4'])).toBe(-2);
        expect(quality([-2, '5'])).toBe(-2);
        expect(quality([-2, '6'])).toBe(-2);
        expect(quality([-2, '7'])).toBe(-2);
        expect(quality([-2, '8'])).toBe(-2);
    });
    test('Doubly-augmented', () => {
        expect(quality([+2, '1'])).toBe(2);
        expect(quality([+2, '2'])).toBe(2);
        expect(quality([+2, '3'])).toBe(2);
        expect(quality([+2, '4'])).toBe(2);
        expect(quality([+2, '5'])).toBe(2);
        expect(quality([+2, '6'])).toBe(2);
        expect(quality([+2, '7'])).toBe(2);
        expect(quality([+2, '8'])).toBe(2);
    });
    test('Triply-diminished', () => {
        expect(quality([-3, '1'])).toBe(-3);
        expect(quality([-3, '2'])).toBe(-3);
        expect(quality([-3, '3'])).toBe(-3);
        expect(quality([-3, '4'])).toBe(-3);
        expect(quality([-3, '5'])).toBe(-3);
        expect(quality([-3, '6'])).toBe(-3);
        expect(quality([-3, '7'])).toBe(-3);
        expect(quality([-3, '8'])).toBe(-3);
    });
    test('Triply-augmented', () => {
        expect(quality([+3, '1'])).toBe(3);
        expect(quality([+3, '2'])).toBe(3);
        expect(quality([+3, '3'])).toBe(3);
        expect(quality([+3, '4'])).toBe(3);
        expect(quality([+3, '5'])).toBe(3);
        expect(quality([+3, '6'])).toBe(3);
        expect(quality([+3, '7'])).toBe(3);
        expect(quality([+3, '8'])).toBe(3);
    });
});
