import { IntervalProperties } from "./properties";

/**
 * Barebones properties of an interval
 * @see Interval for extension with properties and methods
 */
export interface IntervalDefinition {
  circleShift: number;
  octaveShift: number;
  direction: IntervalDirection;
}

export interface Interval extends IntervalDefinition, IntervalProperties {}

export enum IntervalDirection {
  up = 1,
  down = -1,
}
