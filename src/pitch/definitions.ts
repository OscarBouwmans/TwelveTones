
export const naturalNoteNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type NaturalNoteName = typeof naturalNoteNames[number];

export const naturalSymbol = '♮';
export const flatSymbol = '♭';
export const sharpSymbol = '♯';

export type NaturalSymbol = typeof naturalSymbol;
export type FlatSymbol = typeof flatSymbol;
export type SharpSymbol = typeof sharpSymbol;

export const naturalNoteNameCirclePosition = {
    C: 0,
    D: 2,
    E: 4,
    F: -1,
    G: 1,
    A: 3,
    B: 5,
} as const;
