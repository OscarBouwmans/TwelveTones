import { IntervalDefinition, Interval } from "./interval";
import { Pitch } from "../pitch";
import { normalizedModulo } from "../../utilities";

export interface IntervalProperties {
  /**
   * Returns number of step changes this interval causes on a staff.
   */
  readonly staffPositionShift: (this: IntervalDefinition) => number;
  /**
   * Returns how many times this interval crosses an octave boundary (B-C when moving up, or C-B when going down) when starting at a given Pitch.
   */
  readonly octaveCrossings: (this: Interval, from: Pitch) => number;
}

export const intervalProperties: IntervalProperties = {
  staffPositionShift() {
    switch (normalizedModulo(this.circleShift, 7)) {
      case 0:
        return this.direction * (0 + 7 * this.octaveShift); // unison
      case 1:
        return this.direction * (4 + 7 * this.octaveShift); // fifth
      case 2:
        return this.direction * (1 + 7 * this.octaveShift); // second
      case 3:
        return this.direction * (5 + 7 * this.octaveShift); // sixth
      case 4:
        return this.direction * (2 + 7 * this.octaveShift); // third
      case 5:
        return this.direction * (6 + 7 * this.octaveShift); // seventh
      case 6:
        return this.direction * (3 + 7 * this.octaveShift); // fourth
      default:
        console.log("????", this);
        return 0;
    }
  },
  octaveCrossings(from: Pitch) {
    return Math.floor(
      (from.naturalNameIndex() + this.staffPositionShift()) / 7
    );
  },
};
