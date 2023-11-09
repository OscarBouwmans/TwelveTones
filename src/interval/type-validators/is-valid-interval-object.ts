import { Interval } from "../interval";

export function isValidIntervalObject(interval: unknown): interval is Interval {
    if (!interval) return false;
    if (typeof interval !== 'object') return false;

    if (!('circleShift' in interval)) return false;
    if (!('octaveShift' in interval)) return false;

    if (!Number.isInteger(interval.circleShift)) return false;
    if (!Number.isInteger(interval.octaveShift)) return false;

    return true;
}
