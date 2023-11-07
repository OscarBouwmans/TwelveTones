import { describe, expect, test } from "vitest";
import { naturalName } from "./natural-name";
import { pitch } from "../pitch";

describe('Natural Name:', () => {
    test('valid arguments', () => {
        expect(naturalName(pitch('C', '♮', 4))).toBe('C');
        expect(naturalName(pitch('D', '♭♭', 3))).toBe('D');
        expect(naturalName(pitch('E', '♯♯', 6))).toBe('E');
        expect(naturalName(pitch('F', '♭', 5))).toBe('F');
        expect(naturalName(pitch('G', '♯', 7))).toBe('G');
        expect(naturalName(pitch('A', '♭♭♭♭', 1))).toBe('A');
        expect(naturalName(pitch('B', '♯♯♯♯', 2))).toBe('B');
    });
    test('invalid arguments', () => {
        expect(() => naturalName({} as any)).toThrow();
        expect(() => naturalName(null as any)).toThrow();
    });
});
