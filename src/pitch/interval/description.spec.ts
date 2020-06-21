import {
  createIntervalDescription,
  PerfectIntervalName,
  MajorOrMinorIntervalName,
  IntervalName,
  IntervalQualityFactor,
} from "./description";
import {
  invalidIntervalDescription,
  invalidIntervalQualityFactor,
} from "./errors";

describe("createIntervalDescription", () => {
  describe("with invalid data", () => {
    it("should throw", () => {
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
        it(name, () => {
          const description = createIntervalDescription({ perfect: name });
          expect(description.name).toEqual(name);
          expect(description.quality).toEqual("perfect");
          expect(description.augmented).toBeUndefined();
          expect(description.diminished).toBeUndefined();
        });

        describe("augmented", () => {
          it(`${name} should throw`, () => {
            expect(() => {
              createIntervalDescription({ augmented: name, factor: 0 });
            }).toThrowError(invalidIntervalQualityFactor);
            expect(() => {
              createIntervalDescription({ augmented: name, factor: -1 });
            }).toThrowError(invalidIntervalQualityFactor);
            expect(() => {
              createIntervalDescription({
                augmented: name,
                factor: "invalid" as any,
              });
            }).toThrowError(invalidIntervalQualityFactor);
          });
          it(name, () => {
            const sinlgy = createIntervalDescription({
              augmented: name,
              factor: IntervalQualityFactor.singly,
            });
            expect(sinlgy.name).toEqual(name);
            expect(sinlgy.quality).toEqual("perfect");
            expect(sinlgy.augmented).toEqual(1);
            expect(sinlgy.diminished).toBeUndefined();

            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.doubly,
              }).augmented
            ).toEqual(2);
            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.triply,
              }).augmented
            ).toEqual(3);
            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.quadruply,
              }).augmented
            ).toEqual(4);
            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.quintuple,
              }).augmented
            ).toEqual(5);
            expect(
              createIntervalDescription({
                augmented: name,
                factor: IntervalQualityFactor.hextuple,
              }).augmented
            ).toEqual(6);
          });
        });

        describe("diminished", () => {
          it(`${name} should throw`, () => {
            expect(() => {
              createIntervalDescription({ diminished: name, factor: 0 });
            }).toThrowError(invalidIntervalQualityFactor);
            expect(() => {
              createIntervalDescription({ diminished: name, factor: -1 });
            }).toThrowError(invalidIntervalQualityFactor);
            expect(() => {
              createIntervalDescription({
                diminished: name,
                factor: "invalid" as any,
              });
            }).toThrowError(invalidIntervalQualityFactor);
          });
          it(name, () => {
            const sinlgy = createIntervalDescription({
              diminished: name,
              factor: IntervalQualityFactor.singly,
            });
            expect(sinlgy.name).toEqual(name);
            expect(sinlgy.quality).toEqual("perfect");
            expect(sinlgy.augmented).toBeUndefined();
            expect(sinlgy.diminished).toEqual(1);

            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.doubly,
              }).diminished
            ).toEqual(2);
            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.triply,
              }).diminished
            ).toEqual(3);
            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.quadruply,
              }).diminished
            ).toEqual(4);
            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.quintuple,
              }).diminished
            ).toEqual(5);
            expect(
              createIntervalDescription({
                diminished: name,
                factor: IntervalQualityFactor.hextuple,
              }).diminished
            ).toEqual(6);
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
      it(name, () => {
        const description = createIntervalDescription({ major: name });
        expect(description.name).toEqual(name);
        expect(description.quality).toEqual("major");
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
      it(name, () => {
        const description = createIntervalDescription({ minor: name });
        expect(description.name).toEqual(name);
        expect(description.quality).toEqual("minor");
        expect((description as any).augmented).toBeUndefined();
        expect(description.diminished).toBeUndefined();
      });
    });
  });
});
