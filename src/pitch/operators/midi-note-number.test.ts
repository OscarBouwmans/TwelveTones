import { describe, expect, test } from "vitest";
import { midiNoteNumber } from "./midi-note-number";
import { pitch } from "../pitch";


describe("Midi Note Number:", () => {
    test('Basic', () => {
        expect(midiNoteNumber(pitch('C', '♮', 4))).toBe(60);
        expect(midiNoteNumber(pitch('D', '♮', 4))).toBe(62);
        expect(midiNoteNumber(pitch('E', '♮', 4))).toBe(64);
        expect(midiNoteNumber(pitch('F', '♮', 4))).toBe(65);
        expect(midiNoteNumber(pitch('G', '♮', 4))).toBe(67);
        expect(midiNoteNumber(pitch('A', '♮', 4))).toBe(69);
        expect(midiNoteNumber(pitch('B', '♮', 4))).toBe(71);
        expect(midiNoteNumber(pitch('C', '♮', 5))).toBe(72);

        expect(midiNoteNumber(pitch('C', '♭♭', 4))).toBe(58);
        expect(midiNoteNumber(pitch('C', '♭', 4))).toBe(59);
        expect(midiNoteNumber(pitch('C', '♯', 4))).toBe(61);
        expect(midiNoteNumber(pitch('C', '♯♯', 4))).toBe(62);
    });
});
