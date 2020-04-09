import { DurationDefinition, Duration } from "./duration";
import { noDurationData, invalidDurationDefinitionData } from "./errors";
import { Fraction, reduceFraction } from "./utilities";


export type DurationFactory = (info: DurationDefinition | Fraction) => Duration;

export const createDuration: DurationFactory = (
    info: DurationDefinition | Fraction,
) => {
    if (!info) {
        throw new Error(noDurationData);
    }

    if (info instanceof Array) {
        if (info.length !== 2) {
            throw new Error(invalidDurationDefinitionData);
        }
        const [ numerator, denominator ] = info;
        return { numerator, denominator };
    }

    const { numerator, denominator } = info;
    if ([ numerator, denominator ].some((num) => typeof num !== "number" || num % 1 !== 0)) {
        throw new Error(invalidDurationDefinitionData);
    }

    const [ newNum, newDen ] = reduceFraction([ numerator, denominator ]);
    return {
        numerator: newNum,
        denominator: newDen,
    };
};