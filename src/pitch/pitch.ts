import { PitchProperties } from "./properties";
import { PitchMethods } from "./methods";

export interface PitchDefinition {
  readonly circlePosition: number;
  readonly octave: number;
}

export interface Pitch extends PitchDefinition, PitchProperties, PitchMethods {}
