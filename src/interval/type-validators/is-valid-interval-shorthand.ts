import { IntervalNameDescriptor, IntervalQualityDescriptor, IntervalShorthand, intervalNameDescriptorsAll, intervalQualityDescriptorsAll } from "../interval";

export function isValidIntervalShorthand(interval: unknown): interval is IntervalShorthand {
    if (!interval) return false;
    if (!Array.isArray(interval)) return false;
    if (interval.length !== 2) return false;

    const [quality, name] = interval;

    if (quality === 0) return false;
    if (typeof quality !== 'string' && typeof quality !== 'number') return false;
    if (typeof name !== 'string') return false;

    if (!isValidIntervalQualityDescriptor(quality) && !Number.isInteger(quality)) return false;
    if (!isValidIntervalNameDescriptor(name)) return false;

    return true;
}

function isValidIntervalQualityDescriptor(quality: any): quality is IntervalQualityDescriptor {
    return intervalQualityDescriptorsAll.includes(quality);
}

function isValidIntervalNameDescriptor(name: any): name is IntervalNameDescriptor {
    return intervalNameDescriptorsAll.includes(name);
}
