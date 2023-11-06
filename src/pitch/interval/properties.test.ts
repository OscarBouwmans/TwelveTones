import { describe, expect, test } from 'vitest';
import { PerfectIntervalName } from "./description";
import { createInterval } from "./factory";
import { IntervalDirection } from "./interval";

describe("Interval Properties:", () => {
  describe("staffPositionShift", () => {
    const perfectIntervals: [PerfectIntervalName, number][] = [
      ["unison", 0],
      ["fourth", 3],
      ["fifth", 4],
      ["octave", 7],
    ];
    [IntervalDirection.up, IntervalDirection.down].forEach((direction) => {
      describe(direction === 1 ? "up" : "down", () => {
        perfectIntervals.forEach(([name, expectedShift]) => {
          describe(name, () => {
            [-2, -1, 0, 1, 2].forEach((additionalOctaveShift) => {
              describe(`octaveShift ${additionalOctaveShift}`, () => {
                [-2, -1, 0, 1, 2].forEach((augOrDimFactor) => {
                  describe(`augOrDim ${augOrDimFactor}`, () => {
                    const interval = createInterval({
                      [augOrDimFactor < 0
                        ? "diminished"
                        : augOrDimFactor > 0
                        ? "augmented"
                        : "perfect"]: name,
                      octaveShift: additionalOctaveShift,
                      factor: Math.abs(augOrDimFactor),
                    } as any);
                    test("perfect intervals", () => {
                      expect(interval.staffPositionShift()).toBe(
                        expectedShift + 7 * additionalOctaveShift
                      );
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
