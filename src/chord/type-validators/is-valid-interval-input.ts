import { isValidIntervalObject } from "../../interval/type-validators/is-valid-interval-object";
import { isValidIntervalShorthand } from "../../interval/type-validators/is-valid-interval-shorthand";
import { Interval, IntervalShorthand } from "../../main";

export function isValidIntervalInput(input: unknown[]): input is (Interval | IntervalShorthand)[] {
    if (!Array.isArray(input)) return false;

    return input.every(pitch => isValidIntervalObject(pitch) || isValidIntervalShorthand(pitch));
}
