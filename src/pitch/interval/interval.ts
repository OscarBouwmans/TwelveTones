import { IntervalProperties } from "./properties";

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
