import { describe, expect, test } from "vitest";
import { transpose } from "./transpose";
import { pitch } from "../../pitch/pitch";

describe('Transpose:', () => {
    test('Up', () => {
        expect(transpose(['C', '♮', 0], ['perfect', 'unison'])).toEqual(pitch('C', '♮', 0));
        expect(transpose(['C', '♮', 0], ['perfect', 'fourth'])).toEqual(pitch('F', '♮', 0));
        expect(transpose(['C', '♮', 0], ['perfect', 'fifth'])).toEqual(pitch('G', '♮', 0));
        expect(transpose(['C', '♮', 0], ['perfect', 'octave'])).toEqual(pitch('C', '♮', 1));

        expect(transpose(['C', '♮', 0], ['major', 'second'])).toEqual(pitch('D', '♮', 0));
        expect(transpose(['C', '♮', 0], ['major', 'third'])).toEqual(pitch('E', '♮', 0));
        expect(transpose(['C', '♮', 0], ['major', 'sixth'])).toEqual(pitch('A', '♮', 0));
        expect(transpose(['C', '♮', 0], ['major', 'seventh'])).toEqual(pitch('B', '♮', 0));

        expect(transpose(['C', '♮', 0], ['minor', 'second'])).toEqual(pitch('D', '♭', 0));
        expect(transpose(['C', '♮', 0], ['minor', 'third'])).toEqual(pitch('E', '♭', 0));
        expect(transpose(['C', '♮', 0], ['minor', 'sixth'])).toEqual(pitch('A', '♭', 0));
        expect(transpose(['C', '♮', 0], ['minor', 'seventh'])).toEqual(pitch('B', '♭', 0));

        expect(transpose(['C', '♮', 0], ['diminished', 'unison'])).toEqual(pitch('C', '♭', 0));
        expect(transpose(['C', '♮', 0], ['diminished', 'second'])).toEqual(pitch('D', '♭♭', 0));
        expect(transpose(['C', '♮', 0], ['diminished', 'third'])).toEqual(pitch('E', '♭♭', 0));
        expect(transpose(['C', '♮', 0], ['diminished', 'fourth'])).toEqual(pitch('F', '♭', 0));
        expect(transpose(['C', '♮', 0], ['diminished', 'fifth'])).toEqual(pitch('G', '♭', 0));
        expect(transpose(['C', '♮', 0], ['diminished', 'sixth'])).toEqual(pitch('A', '♭♭', 0));
        expect(transpose(['C', '♮', 0], ['diminished', 'seventh'])).toEqual(pitch('B', '♭♭', 0));
        expect(transpose(['C', '♮', 0], ['diminished', 'octave'])).toEqual(pitch('C', '♭', 1));

        expect(transpose(['C', '♮', 0], ['augmented', 'unison'])).toEqual(pitch('C', '♯', 0));
        expect(transpose(['C', '♮', 0], ['augmented', 'second'])).toEqual(pitch('D', '♯', 0));
        expect(transpose(['C', '♮', 0], ['augmented', 'third'])).toEqual(pitch('E', '♯', 0));
        expect(transpose(['C', '♮', 0], ['augmented', 'fourth'])).toEqual(pitch('F', '♯', 0));
        expect(transpose(['C', '♮', 0], ['augmented', 'fifth'])).toEqual(pitch('G', '♯', 0));
        expect(transpose(['C', '♮', 0], ['augmented', 'sixth'])).toEqual(pitch('A', '♯', 0));
        expect(transpose(['C', '♮', 0], ['augmented', 'seventh'])).toEqual(pitch('B', '♯', 0));
        expect(transpose(['C', '♮', 0], ['augmented', 'octave'])).toEqual(pitch('C', '♯', 1));
    });

    test('Down', () => {
        expect(transpose(['C', '♮', 0], ['perfect', 'unison'], 'down')).toEqual(pitch('C', '♮', 0));
        expect(transpose(['C', '♮', 0], ['perfect', 'fourth'], 'down')).toEqual(pitch('G', '♮', -1));
        expect(transpose(['C', '♮', 0], ['perfect', 'fifth'], 'down')).toEqual(pitch('F', '♮', -1));
        expect(transpose(['C', '♮', 0], ['perfect', 'octave'], 'down')).toEqual(pitch('C', '♮', -1));
    });

    test('Octave crossings', () => {
        expect(transpose(['A', '♮', 4], ['major', 'third'], 'up')).toEqual(pitch('C', '♯', 5));
        expect(transpose(['D', '♯', 4], ['major', 'third'], 'down')).toEqual(pitch('B', '♮', 3));
    });
});
