import { describe, expect, test } from 'vitest';
import { flatter, sharper } from './sharper-flatter';
import { pitch } from '../../pitch/pitch';

describe('Sharper Flatter', () => {
    describe('Sharper', () => {
        test('Valid arguments', () => {
            expect(sharper(pitch('A', '♭', 4))).toEqual(pitch('A', '♮', 4));
            expect(sharper(pitch('A', '♮', 4))).toEqual(pitch('A', '♯', 4));
            expect(sharper(pitch('A', '♯', 4))).toEqual(pitch('A', '♯♯', 4));
        });
    });
    describe('Flatter', () => {
        test('Valid arguments', () => {
            expect(flatter(pitch('A', '♯', 4))).toEqual(pitch('A', '♮', 4));
            expect(flatter(pitch('A', '♮', 4))).toEqual(pitch('A', '♭', 4));
            expect(flatter(pitch('A', '♭', 4))).toEqual(pitch('A', '♭♭', 4));
        });
    });
});
