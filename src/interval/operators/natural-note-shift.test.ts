import { describe, expect, test } from "vitest";
import { naturalNoteShift } from "./natural-note-shift";

describe('Natural Note Shift:', () => {
    test('Base intervals', () => {
        expect(naturalNoteShift(['P', '1'])).toBe(0);
        expect(naturalNoteShift(['P', '4'])).toBe(3);
        expect(naturalNoteShift(['P', '5'])).toBe(4);
        expect(naturalNoteShift(['P', '8'])).toBe(7);

        expect(naturalNoteShift(['M', '2'])).toBe(1);
        expect(naturalNoteShift(['M', '3'])).toBe(2);
        expect(naturalNoteShift(['M', '6'])).toBe(5);
        expect(naturalNoteShift(['M', '7'])).toBe(6);

        expect(naturalNoteShift(['m', '2'])).toBe(1);
        expect(naturalNoteShift(['m', '3'])).toBe(2);
        expect(naturalNoteShift(['m', '6'])).toBe(5);
        expect(naturalNoteShift(['m', '7'])).toBe(6);
    });

    test('Quality should not matter', () => {
        expect(naturalNoteShift([-3, '1'])).toBe(0);
        expect(naturalNoteShift([+7, '1'])).toBe(0);

        expect(naturalNoteShift([-1, '2'])).toBe(1);
        expect(naturalNoteShift([+2, '2'])).toBe(1);
    });
});
