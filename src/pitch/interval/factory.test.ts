import { describe, expect, test } from 'vitest';
import { createInterval } from "./factory";
import { noIntervalData } from "./errors";

describe("Interval Factory:", () => {
  describe("no data given", () => {
    test("should throw", () => {
      expect(() => {
        createInterval(null as any);
      }).toThrowError(noIntervalData);
    });
  });
});
