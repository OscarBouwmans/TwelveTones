import { test } from "./main";

describe("Test", () => {
    it("should equal The Test Works", () => {
        expect(test("Works")).toEqual("The Test Works");
    });
});
