import { describe, expect, test } from 'vitest';
import {
  createIntervalDescription,
  PerfectIntervalName,
  MajorOrMinorIntervalName,
  IntervalQualityFactor,
} from "./description";
import {
  invalidIntervalDescription,
  invalidIntervalQualityFactor,
} from "./errors";

describe("createIntervalDescription", () => {
  describe("with invalid data", () => {
    test("should throw", () => {
      expect(() => createIntervalDescription(null as any)).toThrowError(
        invalidIntervalDescription
      );
      expect(() => createIntervalDescription("" as any)).toThrowError(
        invalidIntervalDescription
      );
      expect(() => createIntervalDescription({} as any)).toThrowError(
        invalidIntervalDescription
      );
    });
  });

  describe("perfect", () => {
    (["unison", "fourth", "fifth", "octave"] as PerfectIntervalName[]).forEach(
      (name) => {
        test(name, () => {
          const description = createIntervalDescription({ perfect: name });
          expect(description.name).toBe(name);
          expect(description.quality).toBe("perfect");
          expect(description.augmented).toBeUndefined();
          expect(description.diminished).toBeUndefined();
        });

        describe("augmented", () => {
          test(`${name} should throw`, () => {
            expect(() => {
              (createIntervalDescription as any /* overload gives errors here */)({ augmented: name, factor: 0 });
            }).toThrowError(invalidIntervalQualityFactor);
            expect(() => {
              (createIntervalDescription as any /* overload gives errors here */)({ augmented: name, factor: -1 });
            }).toThrowError(invalidIntervalQualityFactor);
            expect(() => {
              createIntervalDescription({
                augmented: name,
                factor: "invalid" as any,
              });
            }).toThrowError(invalidIntervalQualityFactor);
          });
          test(name, () => {
            const sinlgy = createIntervalDescription({
              augmented: name,
              factor: IntervalQualityFactor.singly,
            });
            expect(sinlgy.name).toBe(name);
            expect(sinlgy.quality).toBe("perfect");
            expect(sinlgy.augmented).toBe(1);
            expect(sinlgy.diminished).toBeUndefined();

            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.doubly,
              }).augmented
            ).toBe(2);
            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.triply,
              }).augmented
            ).toBe(3);
            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.quadruply,
              }).augmented
            ).toBe(4);
            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.quintuple,
              }).augmented
            ).toBe(5);
            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.hextuple,
              }).augmented
            ).toBe(6);
          });
        });

        describe("diminished", () => {
          test(`${name} should throw`, () => {
            expect(() => {
              (createIntervalDescription as any /* overload gives errors here */)({ diminished: name, factor: 0 });
            }).toThrowError(invalidIntervalQualityFactor);
            expect(() => {
              (createIntervalDescription as any /* overload gives errors here */)({ diminished: name, factor: -1 });
            }).toThrowError(invalidIntervalQualityFactor);
            expect(() => {
              createIntervalDescription({
                diminished: name,
                factor: "invalid" as any,
              });
            }).toThrowError(invalidIntervalQualityFactor);
          });
          test(name, () => {
            const sinlgy = createIntervalDescription({
              diminished: name,
              factor: IntervalQualityFactor.singly,
            });
            expect(sinlgy.name).toBe(name);
            expect(sinlgy.quality).toBe("perfect");
            expect(sinlgy.augmented).toBeUndefined();
            expect(sinlgy.diminished).toBe(1);

            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.doubly,
              }).diminished
            ).toBe(2);
            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.triply,
              }).diminished
            ).toBe(3);
            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.quadruply,
              }).diminished
            ).toBe(4);
            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.quintuple,
              }).diminished
            ).toBe(5);
            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.hextuple,
              }).diminished
            ).toBe(6);
          });
        });
      }
    );
  });

  describe("major", () => {
    ([
      "second",
      "third",
      "sixth",
      "seventh",
    ] as MajorOrMinorIntervalName[]).forEach((name) => {
      test(name, () => {
        const description = createIntervalDescription({ major: name });
        expect(description.name).toBe(name);
        expect(description.quality).toBe("major");
        expect(description.augmented).toBeUndefined();
        expect((description as any).diminished).toBeUndefined();
      });
    });
  });

  describe("minor", () => {
    ([
      "second",
      "third",
      "sixth",
      "seventh",
    ] as MajorOrMinorIntervalName[]).forEach((name) => {
      test(name, () => {
        const description = createIntervalDescription({ minor: name });
        expect(description.name).toBe(name);
        expect(description.quality).toBe("minor");
        expect((description as any).augmented).toBeUndefined();
        expect(description.diminished).toBeUndefined();
      });
    });
  });
});
