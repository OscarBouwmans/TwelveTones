import { Interval, IntervalShorthand, interval } from "../interval";
import { name } from "./name";
import { quality } from "./quality";

export function displayName(interval: Interval | IntervalShorthand): string;
export function displayName(_i: Interval | IntervalShorthand) {
    const i = interval(_i);
    const n = name(i);
    const q = displayFriendlyQuality(i);
    return `${q} ${n}`;
}

function displayFriendlyQuality(_i: Interval | IntervalShorthand) {
    const q = quality(_i);
    switch (q) {
        case 'perfect':
        case 'major':
        case 'minor':
            return q;
        case -1:
            return 'diminished';
        case -2:
            return 'doubly-diminished';
        case -3:
            return 'triply-diminished';
        case 1:
            return 'augmented';
        case 2:
            return 'doubly-augmented';
        case 3:
            return 'triply-augmented';
        default:
            if (q < 0) {
                return `${Math.abs(q)}x-diminished`;
            }
            if (q > 0) {
                return `${q}x-augmented`;
            }
            throw new Error('Invalid quality');
    }
}