// import { describe, expect, test } from 'vitest';
// import {
//   Fraction,
//   reduceFraction,
//   sumFraction,
//   fractionsAreEqual,
// } from "./utilities";
// import { invalidFraction, invalidFractionInput } from "./errors";

// describe("Duration Utilities:", () => {
//   describe("reduceFraction", () => {
//     ([
//       [
//         [1, 2],
//         [1, 2],
//       ],
//       [
//         [4, 8],
//         [1, 2],
//       ],
//       [
//         [5, 25],
//         [1, 5],
//       ],
//       [
//         [9, 27],
//         [1, 3],
//       ],
//       [
//         [27, 9],
//         [3, 1],
//       ],
//       [
//         [25, 5],
//         [5, 1],
//       ],
//       [
//         [8, 4],
//         [2, 1],
//       ],
//       [
//         [2, 1],
//         [2, 1],
//       ],
//       [
//         [-2, 4],
//         [-1, 2],
//       ],
//       [
//         [6, -8],
//         [-3, 4],
//       ],
//     ] as [Fraction, Fraction][]).forEach(([testFraction, shouldEqual]) => {
//       test(`${testFraction.join("/")} should equal ${shouldEqual.join(
//         "/"
//       )}`, () => {
//         expect(reduceFraction(testFraction)).toEqual(shouldEqual);
//       });
//     });

//     ([
//       [null, 5] as any,
//       [0, undefined] as any,
//       [NaN, 9] as any,
//       [1, NaN] as any,
//     ] as Fraction[]).forEach((testFraction) => {
//       test(`${testFraction.join("/")} should throw`, () => {
//         expect(() => {
//           reduceFraction(testFraction);
//         }).toThrowError(invalidFraction);
//       });
//     });
//   });

//   describe("sumFraction", () => {
//     ([
//       [
//         [9, 8],
//         [117, 104],
//       ],
//       [
//         [1, 1],
//         [1, 2],
//         [1, 2],
//       ],
//       [
//         [1, 4],
//         [1, 8],
//         [1, 8],
//       ],
//       [
//         [1, 2],
//         [1, 8],
//         [3, 8],
//       ],
//       [
//         [2, 1],
//         [8, 8],
//         [5, 5],
//       ],
//       [
//         [7, 8],
//         [1, 1],
//         [-1, 8],
//       ],
//       [
//         [-1, 4],
//         [1, -8],
//         [-1, 8],
//       ],
//       [
//         [-5, 1],
//         [3, 8],
//         [9, 8],
//         [-12, 4],
//         [-7, 2],
//       ],
//     ] as Fraction[][]).forEach((fractions) => {
//       const result = fractions[0];
//       test(`${fractions
//         .slice(1)
//         .map((f) => f.join("/"))
//         .join(" + ")} = ${result.join("/")}`, () => {
//         expect(sumFraction(...fractions.slice(1))).toEqual(result);
//       });
//     });

//     ([
//       [
//         ["no", "ns"],
//         ["en", "se"],
//       ],
//       [
//         [null, null],
//         [null, null],
//       ],
//       [
//         [1, 2],
//         [1, null],
//       ],
//       [
//         [1, 8],
//         [null, 8],
//       ],
//       [
//         [1, null],
//         [3, 8],
//       ],
//       [
//         [null, 8],
//         [5, 5],
//       ],
//       [
//         [NaN, NaN],
//         [NaN, NaN],
//       ],
//       [
//         [NaN, 1],
//         [-1, 8],
//       ],
//       [
//         [1, NaN],
//         [-1, 5],
//       ],
//       [
//         [39, 1],
//         [NaN, 8],
//       ],
//       [
//         [1, 12],
//         [-1, NaN],
//       ],
//       [
//         [3, 4],
//         [8, 9],
//         [3, 4],
//         [9, Infinity],
//       ],
//     ] as Fraction[][]).forEach((fractions) => {
//       test(`${fractions
//         .map((f) => f.join("/"))
//         .join(" + ")} should throw`, () => {
//         expect(() => {
//           sumFraction(...fractions);
//         }).toThrowError(invalidFraction);
//       });
//     });

//     ([[]] as Fraction[][]).forEach((fractions) => {
//       test(`${fractions
//         .map((f) => f.join("/"))
//         .join(" + ")} should throw`, () => {
//         expect(() => {
//           sumFraction(...fractions);
//         }).toThrowError(invalidFractionInput);
//       });
//     });
//   });

//   describe("fractionsAreEqual", () => {
//     ([
//       [
//         [1, 2],
//         [1, 4],
//       ],
//       [
//         [1, 3],
//         [2, 3],
//       ],
//       [
//         [1, 8],
//         [3, 8],
//       ],
//       [
//         [8, 8],
//         [4, 5],
//       ],
//       [
//         [-1, 1],
//         [-1, -1],
//       ],
//       [
//         [1, -8],
//         [812323, -8],
//       ],
//       [
//         [3, 4],
//         [6, 8],
//         [7, 9],
//       ],
//     ] as Fraction[][]).forEach((fractions) => {
//       test(`${fractions.map((f) => f.join("/")).join(" !== ")}`, () => {
//         expect(fractionsAreEqual(...fractions)).toBe(false);
//       });
//     });

//     ([
//       [],
//       [[3, 4]],
//       [
//         [1, 2],
//         [1, 2],
//       ],
//       [
//         [5, 8],
//         [5, 8],
//       ],
//       [
//         [23, 161],
//         [3, 21],
//       ],
//       [
//         [412, 4],
//         [-721, -7],
//       ],
//       [
//         [0, -1],
//         [0, 1248234273],
//       ],
//       [
//         [17, -17],
//         [-17, 17],
//       ],
//       [
//         [5, 1],
//         [-117660, -23532],
//       ],
//       [
//         [12, 9],
//         [4, 3],
//         [-8, -6],
//         [240, 180],
//       ],
//     ] as Fraction[][]).forEach((fractions) => {
//       test(`${fractions.map((f) => f.join("/")).join(" === ")}`, () => {
//         expect(fractionsAreEqual(...fractions)).toBe(true);
//       });
//     });

//     ([
//       [
//         ["no", "ns"],
//         ["en", "se"],
//       ],
//       [
//         [null, null],
//         [null, null],
//       ],
//       [
//         [1, 2],
//         [1, null],
//       ],
//       [
//         [1, 8],
//         [null, 8],
//       ],
//       [
//         [1, null],
//         [3, 8],
//       ],
//       [
//         [null, 8],
//         [5, 5],
//       ],
//       [
//         [NaN, NaN],
//         [NaN, NaN],
//       ],
//       [
//         [NaN, 1],
//         [-1, 8],
//       ],
//       [
//         [1, NaN],
//         [-1, 5],
//       ],
//       [
//         [39, 1],
//         [NaN, 8],
//       ],
//       [
//         [1, 12],
//         [-1, NaN],
//       ],
//     ] as Fraction[][]).forEach((fractions) => {
//       test(`${fractions
//         .map((f) => f.join("/"))
//         .join(" === ")} should throw`, () => {
//         expect(() => {
//           fractionsAreEqual(...fractions);
//         }).toThrowError(invalidFraction);
//       });
//     });
//   });
// });
