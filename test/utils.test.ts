import { isFileSupported } from "../src/utils";

describe("isFileSupported()", () => {
    const extensions = [".FIT", ".TCX", ".GPX"];
    for (const extension of extensions) {
        test(`Allows ${extension}`, () => {
            expect(isFileSupported(`tmp${extension}`)).toBe(true);
        });
    }
});

describe("deleteTempFile()", () => {
    // test.only()
});
