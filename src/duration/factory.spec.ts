import { createDuration } from "./factory";
import { noDurationData, invalidDurationDefinitionData } from "./errors";

describe("Duration Factory", () => {
  describe("no data given", () => {
    it("should throw", () => {
      expect(() => {
        createDuration(null as any);
      }).toThrowError(noDurationData);
    });
  });

  describe("empty fraction", () => {
    it("should throw", () => {
      expect(() => {
        createDuration([] as any);
      }).toThrowError(invalidDurationDefinitionData);

      expect(() => {
        createDuration({} as any);
      }).toThrowError(invalidDurationDefinitionData);
    });
  });

  describe("invalid fractions", () => {
    it("should throw", () => {
      expect(() => {
        createDuration([null] as any);
      }).toThrowError(invalidDurationDefinitionData);

      expect(() => {
        createDuration([0, null] as any);
      }).toThrowError(invalidDurationDefinitionData);

      expect(() => {
        createDuration([null, 0] as any);
      }).toThrowError(invalidDurationDefinitionData);

      expect(() => {
        createDuration([NaN, NaN]);
      }).toThrowError(invalidDurationDefinitionData);

      expect(() => {
        createDuration([1.5, 3]);
      }).toThrowError(invalidDurationDefinitionData);

      expect(() => {
        createDuration([5, 8.2]);
      }).toThrowError(invalidDurationDefinitionData);
    });
  });

  describe("valid fractions", () => {
    const numDen = (numerator: number, denominator: number) => {
      return jasmine.objectContaining({ numerator, denominator });
    };

    describe("from fractions", () => {
      it("should be valid", () => {
        expect(createDuration([1, 4])).toEqual(numDen(1, 4));
        expect(createDuration([3, 7])).toEqual(numDen(3, 7));
        expect(createDuration([-4, 9])).toEqual(numDen(-4, 9));
        expect(createDuration([-7, -49])).toEqual(numDen(1, 7));
      });
    });

    describe("from durations", () => {
      it("should be valid", () => {
        expect(createDuration({ numerator: 1, denominator: 4 })).toEqual(
          numDen(1, 4)
        );
        expect(createDuration({ numerator: 3, denominator: 7 })).toEqual(
          numDen(3, 7)
        );
        expect(createDuration({ numerator: -4, denominator: 9 })).toEqual(
          numDen(-4, 9)
        );
        expect(createDuration({ numerator: -7, denominator: -49 })).toEqual(
          numDen(1, 7)
        );
      });
    });
  });
});
