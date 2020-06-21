import {
  Fraction,
  reduceFraction,
  sumFraction,
  fractionsAreEqual,
} from "./utilities";
import { invalidFraction } from "./errors";

describe("Duration Utilities:", () => {
  describe("reduceFraction", () => {
    ([
      [
        [1, 2],
        [1, 2],
      ],
      [
        [4, 8],
        [1, 2],
      ],
      [
        [5, 25],
        [1, 5],
      ],
      [
        [9, 27],
        [1, 3],
      ],
      [
        [27, 9],
        [3, 1],
      ],
      [
        [25, 5],
        [5, 1],
      ],
      [
        [8, 4],
        [2, 1],
      ],
      [
        [2, 1],
        [2, 1],
      ],
      [
        [-2, 4],
        [-1, 2],
      ],
      [
        [6, -8],
        [-3, 4],
      ],
    ] as [Fraction, Fraction][]).forEach(([testFraction, shouldEqual]) => {
      it(`${testFraction.join("/")} should equal ${shouldEqual.join(
        "/"
      )}`, () => {
        expect(reduceFraction(testFraction)).toEqual(shouldEqual);
      });
    });

    ([
      [null, 5] as any,
      [0, undefined] as any,
      [NaN, 9] as any,
      [1, NaN] as any,
    ] as Fraction[]).forEach((testFraction) => {
      it(`${testFraction.join("/")} should throw`, () => {
        expect(() => {
          reduceFraction(testFraction);
        }).toThrowError(invalidFraction);
      });
    });
  });

  describe("sumFraction", () => {
    ([
      [
        [1, 2],
        [1, 2],
        [1, 1],
      ],
      [
        [1, 8],
        [1, 8],
        [1, 4],
      ],
      [
        [1, 8],
        [3, 8],
        [1, 2],
      ],
      [
        [8, 8],
        [5, 5],
        [2, 1],
      ],
      [
        [1, 1],
        [-1, 8],
        [7, 8],
      ],
      [
        [1, -8],
        [-1, 8],
        [-1, 4],
      ],
    ] as [Fraction, Fraction, Fraction][]).forEach(([a, b, c]) => {
      it(`${a.join("/")} + ${b.join("/")} = ${c.join("/")}`, () => {
        expect(sumFraction(a, b)).toEqual(c);
      });
    });

    ([
      [
        ["no", "ns"],
        ["en", "se"],
      ],
      [
        [null, null],
        [null, null],
      ],
      [
        [1, 2],
        [1, null],
      ],
      [
        [1, 8],
        [null, 8],
      ],
      [
        [1, null],
        [3, 8],
      ],
      [
        [null, 8],
        [5, 5],
      ],
      [
        [NaN, NaN],
        [NaN, NaN],
      ],
      [
        [NaN, 1],
        [-1, 8],
      ],
      [
        [1, NaN],
        [-1, 5],
      ],
      [
        [39, 1],
        [NaN, 8],
      ],
      [
        [1, 12],
        [-1, NaN],
      ],
    ] as [Fraction, Fraction][]).forEach(([a, b]) => {
      it(`${a.join("/")} + ${b.join("/")} should throw`, () => {
        expect(() => {
          sumFraction(a, b);
        }).toThrowError(invalidFraction);
      });
    });
  });

  describe("fractionsAreEqual", () => {
    ([
      [
        [1, 2],
        [1, 4],
      ],
      [
        [1, 3],
        [2, 3],
      ],
      [
        [1, 8],
        [3, 8],
      ],
      [
        [8, 8],
        [4, 5],
      ],
      [
        [-1, 1],
        [-1, -1],
      ],
      [
        [1, -8],
        [812323, -8],
      ],
    ] as [Fraction, Fraction][]).forEach(([a, b]) => {
      it(`${a.join("/")} should not equal ${b.join("/")}`, () => {
        expect(fractionsAreEqual(a, b)).toBeFalse();
      });
    });

    ([
      [
        [1, 2],
        [1, 2],
      ],
      [
        [5, 8],
        [5, 8],
      ],
      [
        [23, 161],
        [3, 21],
      ],
      [
        [412, 4],
        [-721, -7],
      ],
      [
        [0, -1],
        [0, 1248234273],
      ],
      [
        [17, -17],
        [-17, 17],
      ],
      [
        [5, 1],
        [-117660, -23532],
      ],
    ] as [Fraction, Fraction][]).forEach(([a, b]) => {
      it(`${a.join("/")} should equal ${b.join("/")}`, () => {
        expect(fractionsAreEqual(a, b)).toBeTrue();
      });
    });

    ([
      [
        ["no", "ns"],
        ["en", "se"],
      ],
      [
        [null, null],
        [null, null],
      ],
      [
        [1, 2],
        [1, null],
      ],
      [
        [1, 8],
        [null, 8],
      ],
      [
        [1, null],
        [3, 8],
      ],
      [
        [null, 8],
        [5, 5],
      ],
      [
        [NaN, NaN],
        [NaN, NaN],
      ],
      [
        [NaN, 1],
        [-1, 8],
      ],
      [
        [1, NaN],
        [-1, 5],
      ],
      [
        [39, 1],
        [NaN, 8],
      ],
      [
        [1, 12],
        [-1, NaN],
      ],
    ] as [Fraction, Fraction][]).forEach(([a, b]) => {
      it(`${a.join("/")} + ${b.join("/")} should throw`, () => {
        expect(() => {
          sumFraction(a, b);
        }).toThrowError(invalidFraction);
      });
    });
  });
});
