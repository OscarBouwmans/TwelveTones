import { NaturalNoteName, naturalNoteNames } from "../definitions/natural-note-names";

export function isValidNoteName(noteName: any): noteName is NaturalNoteName {
    return typeof noteName === 'string' && naturalNoteNames.includes(noteName as NaturalNoteName);
}
