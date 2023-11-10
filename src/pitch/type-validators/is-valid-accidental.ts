import { flatSymbol, naturalSymbol, sharpSymbol } from "../+public";
import { Accidental } from "../pitch";

export function isValidAccidental(accidental: unknown): accidental is Accidental {
    if (typeof accidental === 'number' && Number.isInteger(accidental)) {
        return true;
    }
    if (typeof accidental !== 'string') {
        return false;
    }
    const parts = accidental.split('');
    return parts.every(part => part === naturalSymbol || part === flatSymbol || part === sharpSymbol);
}
