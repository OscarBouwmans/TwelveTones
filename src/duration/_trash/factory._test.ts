// import { describe, expect, test } from 'vitest';
// import { createDuration } from "./factory";
// import { noDurationData, invalidDurationDefinitionData } from "./errors";

// describe("Duration Factory", () => {
//   describe("no data given", () => {
//     test("should throw", () => {
//       expect(() => {
//         createDuration(null as any);
//       }).toThrowError(noDurationData);
//     });
//   });

//   describe("empty fraction", () => {
//     test("should throw", () => {
//       expect(() => {
//         createDuration([] as any);
//       }).toThrowError(invalidDurationDefinitionData);

//       expect(() => {
//         createDuration({} as any);
//       }).toThrowError(invalidDurationDefinitionData);
//     });
//   });

//   describe("invalid fractions", () => {
//     test("should throw", () => {
//       expect(() => {
//         createDuration([null] as any);
//       }).toThrowError(invalidDurationDefinitionData);

//       expect(() => {
//         createDuration([0, null] as any);
//       }).toThrowError(invalidDurationDefinitionData);

//       expect(() => {
//         createDuration([null, 0] as any);
//       }).toThrowError(invalidDurationDefinitionData);

//       expect(() => {
//         createDuration([NaN, NaN]);
//       }).toThrowError(invalidDurationDefinitionData);

//       expect(() => {
//         createDuration([1.5, 3]);
//       }).toThrowError(invalidDurationDefinitionData);

//       expect(() => {
//         createDuration([5, 8.2]);
//       }).toThrowError(invalidDurationDefinitionData);
//     });
//   });

//   describe("valid fractions", () => {

//     describe("from fractions", () => {
//       test("should be valid", () => {
//         expect(createDuration([1, 4])).toHaveProperty('numerator', 1);
//         expect(createDuration([1, 4])).toHaveProperty('denominator', 4);
//         expect(createDuration([3, 7])).toHaveProperty('numerator', 3);
//         expect(createDuration([3, 7])).toHaveProperty('denominator', 7);
//         expect(createDuration([-4, 9])).toHaveProperty('numerator', -4);
//         expect(createDuration([-4, 9])).toHaveProperty('denominator', 9);
//         expect(createDuration([-7, -49])).toHaveProperty('numerator', 1);
//         expect(createDuration([-7, -49])).toHaveProperty('denominator', 7);
//       });
//     });

//     describe("from durations", () => {
//       test("should be valid", () => {
//         expect(createDuration({ numerator: 1, denominator: 4 })).toHaveProperty('numerator', 1);
//         expect(createDuration({ numerator: 1, denominator: 4 })).toHaveProperty('denominator', 4);
//         expect(createDuration({ numerator: 3, denominator: 7 })).toHaveProperty('numerator', 3);
//         expect(createDuration({ numerator: 3, denominator: 7 })).toHaveProperty('denominator', 7);
//         expect(createDuration({ numerator: -4, denominator: 9 })).toHaveProperty('numerator', -4);
//         expect(createDuration({ numerator: -4, denominator: 9 })).toHaveProperty('denominator', 9);
//         expect(createDuration({ numerator: -7, denominator: -49 })).toHaveProperty('numerator', 1);
//         expect(createDuration({ numerator: -7, denominator: -49 })).toHaveProperty('denominator', 7);
//       });
//     });
//   });
// });
