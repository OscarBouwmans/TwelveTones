import { Pitch, PitchShorthand, pitch } from '../../pitch/pitch';
import { Interval, interval } from '../../interval/interval';
import { naturalDistance } from '../../shared/operators/natural-distance';
import { transpose } from '../../interval/operators/transpose';

/**
 * Returns the interval between two pitches.
 * 
 * @example
 * intervalBetween(['C', '♮', 4], ['F', '♮', 4]); // => Interval (perfect fourth)
 * intervalBetween(['C', '♮', 4], ['A', '♯', 4]); // => Interval (augmented sixth)
 */
export function intervalBetween(a: Pitch | PitchShorthand, b: Pitch | PitchShorthand): Interval;

export function intervalBetween(_a: Pitch | PitchShorthand, _b: Pitch | PitchShorthand) {
    const [a, b] = [pitch(_a), pitch(_b)].sort((p1, p2) => -naturalDistance(p1, p2));

    const circleShift = b.circlePosition - a.circlePosition;
    const octaveShift = b.octave - a.octave;

    const octaveShiftError = transpose(a, { circleShift, octaveShift }).octave - b.octave;

    return interval({
        circleShift,
        octaveShift: octaveShift - octaveShiftError
    });
}
