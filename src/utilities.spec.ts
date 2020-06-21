import { normalizedModulo } from "./utilities";

describe("Utilities", () => {
  describe("normalizedModulo", () => {
    it("Should Throw", () => {
      expect(() => {
        normalizedModulo(undefined as any, 0);
      }).toThrow();

      expect(() => {
        normalizedModulo(0, undefined as any);
      }).toThrow();

      expect(() => {
        normalizedModulo(null as any, 0);
      }).toThrow();

      expect(() => {
        normalizedModulo(0, null as any);
      }).toThrow();

      expect(() => {
        normalizedModulo("" as any, 0);
      }).toThrow();

      expect(() => {
        normalizedModulo(0, "" as any);
      }).toThrow();

      expect(() => {
        normalizedModulo({} as any, 0);
      }).toThrow();

      expect(() => {
        normalizedModulo(0, {} as any);
      }).toThrow();

      expect(() => {
        normalizedModulo([1] as any, 0);
      }).toThrow();

      expect(() => {
        normalizedModulo(0, [1] as any);
      }).toThrow();

      expect(() => {
        normalizedModulo("invalid" as any, "number" as any);
      }).toThrow();

      expect(() => {
        normalizedModulo(NaN, 0);
      }).toThrow();

      expect(() => {
        normalizedModulo(0, NaN);
      }).toThrow();

      expect(() => {
        normalizedModulo(NaN, NaN);
      }).toThrow();
    });

    it("Should Be NaN", () => {
      expect(normalizedModulo(-15, 0)).toBeNaN();
      expect(normalizedModulo(-1, 0)).toBeNaN();
      expect(normalizedModulo(0, 0)).toBeNaN();
      expect(normalizedModulo(1, 0)).toBeNaN();
      expect(normalizedModulo(15, 0)).toBeNaN();

      expect(normalizedModulo(-Infinity, 1)).toBeNaN();
      expect(normalizedModulo(Infinity, 1)).toBeNaN();
      expect(normalizedModulo(-Infinity, 39)).toBeNaN();
      expect(normalizedModulo(Infinity, 39)).toBeNaN();
      expect(normalizedModulo(Infinity, Infinity)).toBeNaN();
      expect(normalizedModulo(Infinity, -Infinity)).toBeNaN();
    });

    it("Should be correct", () => {
      expect(normalizedModulo(-13, 5)).toEqual(2);
      expect(normalizedModulo(-8, 5)).toEqual(2);
      expect(normalizedModulo(-3, 5)).toEqual(2);
      expect(normalizedModulo(7, 5)).toEqual(2);
      expect(normalizedModulo(12, 5)).toEqual(2);
      expect(normalizedModulo(17, 5)).toEqual(2);

      expect(normalizedModulo(-3, 3)).toEqual(0);
      expect(normalizedModulo(-2, 3)).toEqual(1);
      expect(normalizedModulo(-1, 3)).toEqual(2);
      expect(normalizedModulo(0, 3)).toEqual(0);
      expect(normalizedModulo(1, 3)).toEqual(1);
      expect(normalizedModulo(2, 3)).toEqual(2);
      expect(normalizedModulo(3, 3)).toEqual(0);
      expect(normalizedModulo(4, 3)).toEqual(1);
      expect(normalizedModulo(5, 3)).toEqual(2);
      expect(normalizedModulo(6, 3)).toEqual(0);

      expect(normalizedModulo(0, -3)).toEqual(0);
      expect(normalizedModulo(1, -3)).toEqual(1);
      expect(normalizedModulo(2, -3)).toEqual(2);
      expect(normalizedModulo(3, -3)).toEqual(0);

      expect(normalizedModulo(-28, Infinity)).toBe(-28);
      expect(normalizedModulo(28, -Infinity)).toBe(28);
    });
  });
});
