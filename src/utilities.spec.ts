import { normalizedModulo, isValidNumber, isValidInteger } from "./utilities";

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

  describe("isValidNumber", () => {
    it("Should be false", () => {
      expect(isValidNumber(undefined as any)).toBeFalse();
      expect(isValidNumber(null as any)).toBeFalse();
      expect(isValidNumber(NaN, 0)).toBeFalse();
      expect(isValidNumber("imposter" as any)).toBeFalse();
      expect(isValidNumber("254" as any)).toBeFalse();
      expect(isValidNumber({ number: 5 } as any)).toBeFalse();
      expect(isValidNumber([1, 5, 2, 5, 3] as any)).toBeFalse();
      expect(isValidNumber(3, 1, 4, 1, 5, 9, null as any)).toBeFalse();
      expect(isValidNumber(0, 1, 1, 2, 3, 5, 8, "imposter" as any)).toBeFalse();
      expect(isValidNumber(-3, -1, -4, -1, -5, -9, {} as any)).toBeFalse();
      expect(isValidNumber(Infinity)).toBeFalse();
      expect(isValidNumber(-Infinity)).toBeFalse();
    });

    it("Should be true", () => {
      expect(isValidNumber(1)).toBeTrue();
      expect(isValidNumber(0)).toBeTrue();
      expect(isValidNumber(-2342384.312, -5783744.4124, 539745.223)).toBeTrue();
      expect(isValidNumber(10e6)).toBeTrue();
      expect(isValidNumber(-9, -8, -7, -6, -5, -4, 3, 1, 4, 1, 5)).toBeTrue();
      expect(isValidNumber(10e4, 10e5, 10e6)).toBeTrue();
    });
  });
});

describe("isValidInteger", () => {
  it("Should be false", () => {
    expect(isValidInteger(undefined as any)).toBeFalse();
    expect(isValidInteger(null as any)).toBeFalse();
    expect(isValidInteger(NaN, 0)).toBeFalse();
    expect(isValidInteger(1.2)).toBeFalse();
    expect(isValidInteger(3, 1, 4, 1, 5, 9, 2.6)).toBeFalse();
    expect(isValidInteger(0.1, -9.8, 2.3)).toBeFalse();
    expect(isValidInteger(404, 405, 406, Infinity)).toBeFalse();
    expect(isValidInteger(-Infinity, -401239123, -4012391, -40121)).toBeFalse();
  });

  it("Should be true", () => {
    expect(isValidInteger(1)).toBeTrue();
    expect(isValidInteger(0)).toBeTrue();
    expect(isValidInteger(10e6)).toBeTrue();
    expect(isValidInteger(-9, -8, -7, -6, -5, -4, 3, 1, 4, 1, 5, 9)).toBeTrue();
    expect(isValidInteger(10e4, 10e5, 10e6)).toBeTrue();
  });
});
