import { reduceFraction } from "../arithmetic/fractions";

export interface Duration {
    readonly numerator: number;
    readonly denominator: number;
}

export type DurationShorthand = [numerator: number, denominator: number];

export function duration(numerator: number, denominator: number): Duration
export function duration(duration: Duration | DurationShorthand): Duration
export function duration(numeratorOrDuration: Duration | DurationShorthand | number, denominator?: number): Duration {
    if (Array.isArray(numeratorOrDuration)) {
        return duration(...numeratorOrDuration as DurationShorthand);
    }
    if (typeof numeratorOrDuration === 'object') {
        if ('numerator' in numeratorOrDuration && 'denominator' in numeratorOrDuration) {
            return duration(numeratorOrDuration.numerator, numeratorOrDuration.denominator);
        }
        throw new Error("Invalid duration definition.");
    }
    if (typeof numeratorOrDuration !== 'number' || !Number.isInteger(numeratorOrDuration)) {
        throw new Error("Invalid duration definition: numerator must be an integer.");
    }
    if (typeof denominator !== 'number' || !Number.isInteger(denominator)) {
        throw new Error("Invalid duration definition: denominator must be an integer.");
    }
    const [num, den] = reduceFraction([numeratorOrDuration, denominator]);

    if (den === 0) {
        throw new Error("Invalid duration definition: denominator cannot be zero.");
    }
    return wrap({ numerator: num, denominator: den });
}

function wrap(d: Duration): Duration {
    Object.defineProperty(d, 'toString', {
        value: () => `${d.numerator}/${d.denominator}`,
    });
    Object.freeze(d);
    return d;
}
