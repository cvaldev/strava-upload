import { isFileSupported } from "../src/utils";

describe("isFileSupported()", () => {
    const extensions = [".FIT", ".TCX", ".GPX"];
    for (const extension of extensions) {
        it(`Allows ${extension}`, () => {
            expect(isFileSupported(`tmp${extension}`)).toBe(true);
        });
    }
    // it("Allows .FIT", () => {
    //     expect(isFileSupported("tmp.FIT")).toBe(true);
    // });
    // it("Allows .TCX", () => {
    //     expect(isFileSupported("tmp.TCX")).toBe(true);
    // });
});
