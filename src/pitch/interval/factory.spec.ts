import { createInterval } from "./factory";
import { noIntervalData } from "./errors";

describe("Interval Factory:", () => {
    describe("no data given", () => {
        it("should throw", () => {
            expect(() => { createInterval(null as any); }).toThrowError(noIntervalData);
        });
    });
});
