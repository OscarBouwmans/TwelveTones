import { naturalName } from "../../pitch/operators/natural-name";
import { Pitch, PitchShorthand, pitch } from "../../pitch/pitch";
import { Interval, IntervalShorthand, interval } from "../interval";
import { staffPositionShift } from "./staff-position-shift";

export type TransposeDirection = 1 | -1 | 'up' | 'down';

/**
 * Transposes `pitch` up by `interval` and returns it as a new `Pitch`.
 * 
 * @example
 * transpose(pitch('A', '♭', 4), interval('major', 'third')); // => Pitch (C♮5)
 * transpose(['G', '♯', 4], ['P', '5']); // => Pitch (D♯5)
 */

export function transpose(pitch: Pitch | PitchShorthand, interval: Interval | IntervalShorthand): Pitch;
/**
 * Transposes `pitch` up or down by `interval` and returns it as a new `Pitch`.
 * 
 * @example
 * transpose(pitch('A', '♭', 4), interval('major', 'third'), 'up'); // => Pitch (C♭5)
 * transpose(['G', '♯', 4], ['P', '5'], 'down'); // => Pitch (C♯4)
 */
export function transpose(pitch: Pitch | PitchShorthand, interval: Interval | IntervalShorthand, direction: TransposeDirection): Pitch;

export function transpose(_p: Pitch | PitchShorthand, _i: Interval | IntervalShorthand, _d: TransposeDirection = 1): Pitch {
    const p = pitch(_p);
    const i = interval(_i);
    const direction = logicalDirection(_d);

    const octaveCross = octaveCrossings(i, p, direction);

    return pitch({
        circlePosition: p.circlePosition + direction * i.circleShift,
        octave: p.octave + octaveCross,
    });
}

export function logicalDirection(direction: TransposeDirection): 1 | -1 {
    if (direction === 'up') {
        return 1;
    }
    if (direction === 'down') {
        return -1;
    }
    return direction;
}

const naturalNameOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;

function octaveCrossings(i: Interval, reference: Pitch, direction: TransposeDirection) {
    const naturalNameIndex = naturalNameOrder.indexOf(naturalName(reference));
    const staffPosShift = staffPositionShift(i, direction);

    return Math.floor((naturalNameIndex + staffPosShift) / 7);
}
