import { isFileSupported, deleteTempFile } from "../src/utils/utils";
import mockFs from "mock-fs";
import { existsSync } from "fs";

describe("isFileSupported()", () => {
    const extensions = [".FIT", ".TCX", ".GPX"];
    for (const extension of extensions) {
        test(`Allows ${extension}`, () => {
            expect(isFileSupported(`tmp${extension}`)).toBe(true);
        });
    }
});

describe("deleteTempFile()", () => {
    const file = "foo/bar.fit";
    beforeEach(() => {
        //@ts-ignore
        mockFs({
            [file]: "contents"
        });
    });
    afterEach(mockFs.restore);

    test("Can delete a file", () => {
        deleteTempFile(file);
        expect(existsSync(file)).toBe(false);
    });
});
