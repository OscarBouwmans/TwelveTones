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
});
