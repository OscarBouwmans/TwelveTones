import { Interval, IntervalDefinition } from "./interval";

export type IntervalFactory = (definition: IntervalDefinition) => Interval;

export const createInterval: IntervalFactory = (
    { circleShift = 0, octaveShift = 0 } = { circleShift: 0, octaveShift: 0 },
) => {
    return {
        circleShift,
        octaveShift,
    }
};
