import { Interval, IntervalDefinition } from "./interval";
import { IntervalDescription, IntervalDescriptionBuilder, createIntervalDescription, IntervalName, IntervalQuality, DiminishedIntervalDescription, AugmentedIntervalDescription } from "./description";
import { invalidIntervalDefinition, invalidIntervalName, invalidIntervalQuality, noIntervalData } from "./errors";

export type IntervalFactory = (info: IntervalDefinition | IntervalDescription | IntervalDescriptionBuilder) => Interval;

export const createInterval: IntervalFactory = (
    info: IntervalDefinition | IntervalDescription | IntervalDescriptionBuilder,
) => {
    if (!info) {
        throw new Error(noIntervalData);
    }

    const builder = info as IntervalDescriptionBuilder;
    if (builder.major || builder.minor || builder.perfect || builder.augmented || builder.diminished) {
        return createInterval(createIntervalDescription(builder as any));
    }

    const description = info as IntervalDescription;
    if (description.name) {
        return createIntervalFromDescription(description);
    }

    const { circleShift, octaveShift } = info as IntervalDefinition;
    if (typeof circleShift !== "number" || typeof octaveShift !== "number") {
        throw new Error(invalidIntervalDefinition);
    }

    return {
        circleShift,
        octaveShift,
    }
};




const standardIntervalDefinitionMap: { [key in IntervalName]: { [key in IntervalQuality]?: IntervalDefinition | null } } = {
    unison: {
        perfect: { circleShift: 0, octaveShift: 0 },
    },
    second: {
        major: { circleShift: 2, octaveShift: 0 },
        minor: { circleShift: -5, octaveShift: 0 },
    },
    third: {
        major: { circleShift: 4, octaveShift: 0 },
        minor: { circleShift: -3, octaveShift: 0 },
    },
    fourth: {
        perfect: { circleShift: -1, octaveShift: 0 },
    },
    fifth: {
        perfect: { circleShift: 1, octaveShift: 0 },
    },
    sixth: {
        major: { circleShift: -4, octaveShift: 0 },
        minor: { circleShift: 3, octaveShift: 0 },
    },
    seventh: {
        major: { circleShift: -2, octaveShift: 0 },
        minor: { circleShift: 5, octaveShift: 0 },
    },
    octave: {
        perfect: { circleShift: 0, octaveShift: 1 },
    },
}

const createIntervalFromDescription = (description: IntervalDescription): IntervalDefinition => {
    const nameDef = standardIntervalDefinitionMap[description.name];
    if (!nameDef) { throw new Error(invalidIntervalName); }
    const qualityDef = nameDef[description.quality];
    if (!qualityDef) { throw new Error(invalidIntervalQuality); }

    const { augmented } = (description as AugmentedIntervalDescription);
    if (augmented) {
        qualityDef.circleShift += 7 * augmented;
    }

    const { diminished } = (description as DiminishedIntervalDescription);
    if (augmented) {
        qualityDef.circleShift -= 7 * diminished;
    }

    return qualityDef;
}
