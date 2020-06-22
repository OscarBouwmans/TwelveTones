/**
 * Barebones definition of a Duration, in a way a cousin of the Fraction tuple.
 * @see Fraction
 */
export interface DurationDefinition {
  readonly numerator: number;
  readonly denominator: number;
}

export interface Duration extends DurationDefinition {}
