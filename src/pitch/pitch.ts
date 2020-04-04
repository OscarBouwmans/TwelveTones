import { PitchProperties } from "./properties";

export interface PitchDefinition {
    readonly circlePosition: number;
    readonly octave: number;
}

export interface Pitch extends PitchDefinition, PitchProperties {
}
