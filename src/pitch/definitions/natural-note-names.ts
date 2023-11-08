
export const naturalNoteNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type NaturalNoteName = typeof naturalNoteNames[number];
