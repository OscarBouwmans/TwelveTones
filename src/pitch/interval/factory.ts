import { Interval, IntervalDefinition } from "./interval";
import {
  IntervalDescription,
  IntervalDescriptionBuilder,
  createIntervalDescription,
  IntervalName,
  IntervalQuality,
  DiminishedIntervalDescription,
  AugmentedIntervalDescription,
} from "./description";
import {
  invalidIntervalDefinition,
  invalidIntervalName,
  invalidIntervalQuality,
  noIntervalData,
} from "./errors";
import { intervalProperties } from "./properties";
import { isValidInteger } from "../../utilities";

export type IntervalFactory = (
  info: IntervalDefinition | IntervalDescription | IntervalDescriptionBuilder
) => Interval;

export const createInterval: IntervalFactory = (
  info: IntervalDefinition | IntervalDescription | IntervalDescriptionBuilder
) => {
  if (!info) {
    throw new Error(noIntervalData);
  }

  const builder = info as IntervalDescriptionBuilder;
  if (
    [
      builder.major,
      builder.minor,
      builder.perfect,
      builder.augmented,
      builder.diminished,
    ].some((t) => t && typeof t === "string")
  ) {
    return createInterval(createIntervalDescription(builder as any));
  }

  const description = info as IntervalDescription;
  if (description.name) {
    return createInterval(definitionFromDescription(description));
  }

  const { circleShift, octaveShift, direction } = info as IntervalDefinition;
  if (
    !isValidInteger(circleShift, octaveShift) ||
    !new Set([-1, 1]).has(direction)
  ) {
    throw new Error(invalidIntervalDefinition);
  }

  return {
    circleShift,
    octaveShift,
    direction,
    ...intervalProperties,
  };
};

const standardIntervalDefinitionMap: {
  [key in IntervalName]: {
    [key in IntervalQuality]?: IntervalDefinition | null;
  };
} = {
  unison: {
    perfect: { circleShift: 0, octaveShift: 0, direction: 1 },
  },
  second: {
    major: { circleShift: 2, octaveShift: 0, direction: 1 },
    minor: { circleShift: -5, octaveShift: 0, direction: 1 },
  },
  third: {
    major: { circleShift: 4, octaveShift: 0, direction: 1 },
    minor: { circleShift: -3, octaveShift: 0, direction: 1 },
  },
  fourth: {
    perfect: { circleShift: -1, octaveShift: 0, direction: 1 },
  },
  fifth: {
    perfect: { circleShift: 1, octaveShift: 0, direction: 1 },
  },
  sixth: {
    major: { circleShift: -4, octaveShift: 0, direction: 1 },
    minor: { circleShift: 3, octaveShift: 0, direction: 1 },
  },
  seventh: {
    major: { circleShift: -2, octaveShift: 0, direction: 1 },
    minor: { circleShift: 5, octaveShift: 0, direction: 1 },
  },
  octave: {
    perfect: { circleShift: 0, octaveShift: 1, direction: 1 },
  },
};

const definitionFromDescription = (
  description: IntervalDescription
): IntervalDefinition => {
  const nameDef = standardIntervalDefinitionMap[description.name];
  if (!nameDef) {
    throw new Error(invalidIntervalName);
  }
  if (!nameDef[description.quality]) {
    throw new Error(invalidIntervalQuality);
  }
  const qualityDef = { ...nameDef[description.quality] } as IntervalDefinition;

  const { augmented } = description as AugmentedIntervalDescription;
  if (augmented) {
    qualityDef.circleShift += 7 * augmented;
  }

  const { diminished } = description as DiminishedIntervalDescription;
  if (diminished) {
    qualityDef.circleShift -= 7 * diminished;
  }

  const { octaveShift, direction } = description;

  return {
    ...qualityDef,
    octaveShift: qualityDef.octaveShift + octaveShift,
    direction,
  };
};
