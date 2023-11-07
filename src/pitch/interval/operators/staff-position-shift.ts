import { normalizedModulo } from "../../../utilities";
import { Interval, IntervalShorthand, interval } from "../interval";
import { TransposeDirection, logicalDirection } from "./transpose";

export function staffPositionShift(interval: Interval | IntervalShorthand): number;
export function staffPositionShift(interval: Interval | IntervalShorthand, direction: TransposeDirection): number;
export function staffPositionShift(_i: Interval | IntervalShorthand, _d: TransposeDirection = 1): number {
    const i = interval(_i);
    const direction = logicalDirection(_d);
    switch (normalizedModulo(i.circleShift, 7)) {
        case 0:
            return direction * (0 + 7 * i.octaveShift); // unison
        case 1:
            return direction * (4 + 7 * i.octaveShift); // fifth
        case 2:
            return direction * (1 + 7 * i.octaveShift); // second
        case 3:
            return direction * (5 + 7 * i.octaveShift); // sixth
        case 4:
            return direction * (2 + 7 * i.octaveShift); // third
        case 5:
            return direction * (6 + 7 * i.octaveShift); // seventh
        case 6:
            return direction * (3 + 7 * i.octaveShift); // fourth
        default:
            throw new Error('Invalid interval definition');
    }
}
